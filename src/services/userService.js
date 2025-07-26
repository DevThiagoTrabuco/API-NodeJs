import authService from "../services/authService.js";
import userRepository from "../repositories/userRepository.js";
import bcrypt from "bcrypt";

async function createService({ name, username, email, password, avatar, bg }) {
  if (!name || !username || !email || !password || !avatar || !bg)
    throw new Error("Preencha todos os campos");

  const foundUser = await userRepository.findByEmailRepository(email);
  if (foundUser) throw new Error("Email já cadastrado");

  const user = await userRepository.createRepository({
    name,
    username,
    email,
    password,
    avatar,
    bg,
  });

  if (!user) throw new Error("Erro ao criar usuário");

  const token = authService.generateToken(user.id);
  return token;
}

async function findByIdService(userIdParam, userIdLogged) {
  const idParam = userIdParam || userIdLogged;

  if (!idParam) throw new Error("Escreva um id válido");

  const user = await userRepository.findByIdRepository(idParam);

  if (!user) throw new Error("Usuário não encontrado");

  return user;
}

async function findAllService() {
  const users = await userRepository.findAllRepository();

  if (users.length === 0) throw new Error("Nenhum usuário encontrado");

  return users;
}

async function updateService(
  { name, username, email, password, avatar, bg },
  userId,
  userIdLogged
) {
  if (!name && !username && !email && !password && !avatar && !bg) throw new Error("Altere pelo menos um campo")
  
  const user = await userRepository.findByIdRepository(userId);

  if(String(user._id) !== String(userIdLogged)) throw new Error("Você não tem permissão para alterar esse usuário")

  if (password) password = await bcrypt.hash(password, 10);

  await userRepository.updateRepository({
    userId,
    name,
    username,
    email,
    password,
    avatar,
    bg,
  });

  return { message: "Usuário atualizado com sucesso!" };
}

export default {
  createService,
  findByIdService,
  findAllService,
  updateService,
}