import authService from "../services/authService.js";

const loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await authService.loginService({ email, password });
    return res.send(token);
  } catch (err) {
    return res.status(401).send({ message: err.message });
  }
};

export default { loginController };
