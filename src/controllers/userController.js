import userService from "../services/userService.js";

const createController = async (req, res) => {
  const { name, username, email, password, avatar, bg  } = req.body;

  try {
    const token = await userService.createService({
      name,
      username,
      email,
      password,
      avatar,
      bg,
    });
    return res.status(201).send({ token });
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
};

const findAllController = async (req, res) => {
  try {
    const users = await userService.findAllService();
    return res.send(users);
  } catch (err) {
    return res.status(404).send({ message: err.message });
  }
};

const findByIdController = async (req, res) => {
  try {
    const user = await userService.findByIdService(
      req.params.id,
      req.userId
    );
    return res.send(user);
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
};

const updateController = async (req, res) => {
  try {
    const { name, username, email, password, avatar, bg } = req.body;
    const { id: userId } = req.params;
    const userIdLogged = req.userId;
    const response = await userService.updateService(
      {name, username, email, password, avatar, bg },
      userId,
      userIdLogged
    );
    return res.send(response);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

export default{
  createController,
  findAllController,
  findByIdController,
  updateController,
};
