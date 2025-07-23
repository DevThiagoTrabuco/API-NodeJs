import userService from "../services/userService.js";

const create = async (req, res) => {
  try {
    const user = await userService.createService(req.body);
    if (!user) {
      res.status(400).send({ message: "Erro ao criar usuário" });
    }
    res.status(201).send({
      message: "Usuário criado com sucesso!",
      user: {
        _id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        password: user.password,
        avatar: user.avatar,
        bg: user.bg,
      },
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const findAll = async (req, res) => {
  try {
    const users = await userService.findAllService();
    if (!users === 0) {
      return res.status(400).send({ message: "Sem usuários registrados" });
    }
    res.send(users);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const findById = async (req, res) => {
  try {
    const { id, user } = req;
    res.send(user);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const update = async (req, res) => {
  try {
    const { name, username, email, password, avatar, bg } = req.body;
    if (!name && !username && !email && !password && !avatar && !bg) {
      return res.status(400).send({ message: "Altere pelo menos um campo" });
    }
    const { id, user } = req;
    await userService.updateService(
      id,
      name,
      username,
      email,
      password,
      avatar,
      bg
    );
    res.send({ message: "Usuário atualizado com sucesso!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export {
  create,
  findAll,
  findById,
  update,
};
