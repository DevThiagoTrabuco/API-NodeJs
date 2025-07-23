import bcrypt from "bcrypt";
import { loginService, generateToken } from "../services/authService.js";

const login = async (req, res) => {
    const { email, password } = req.body;
    
  try {
    const user = await loginService(email);
    if (!user) {
      return res.status(404).send({ message: "Usuário ou senha inválidos" });
      }
      
    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      return res.status(404).send({ message: "Usuário ou senha inválidos" });
      }
      
    const token = generateToken(user._id);
    res.send({token});
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export { login };
