import "dotenv/config";
import jwt from "jsonwebtoken";
import userRepositories from "../repositories/userRepository.js";

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).send({ message: "Informe o token de autenticação" });

  const parts = authHeader.split(" "); /* ["Bearer", "asdasdasdadsadasd"] */
  if (parts.length !== 2)
    return res.status(401).send({ message: "Token inválido" });

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme))
    return res.status(401).send({ message: "Malformatted Token!" });

  jwt.verify(token, process.env.SECRET_JWT, async (err, decoded) => {
    if (err) return res.status(401).send({ message: "Token inválido" });

    const user = await userRepositories.findByIdRepository(decoded.id);
    if (!user || !user._id)
      return res.status(401).send({ message: "Token inválido" });

    req.userId = user._id;

    return next();
  });
}

export default authMiddleware;