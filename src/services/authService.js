import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import "dotenv/config";
import userRepository from "../repositories/userRepository.js";

function generateToken(id) {
  return jwt.sign({ id }, process.env.SECRET_JWT, { expiresIn: 86400 });
}

const loginService = async ({ email, password }) => {
  const user = await userRepository.findByEmailRepository(email);
  if (!user) throw new Error("Email ou senha inválidos");

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new Error("Email ou senha inválidos");

  const token = generateToken(user.id);
  return token;
};

export default { generateToken, loginService };
