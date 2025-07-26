import newsService from "../services/newsService.js";

const createController = async (req, res) => {
  const { title, text, banner } = req.body;
  const userId = req.userId;

  try {
    const news = await newsService.createService(req.body, req.userId);
    return res.status(201).send(news);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const findAllController = async (req, res) => {
  const { offSet, limit } = req.query;
  const currentUrl = req.baseUrl;
  try {
    const news = await newsService.findAllService(offSet, limit, currentUrl);
    return res.send(news);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const findLastController = async (req, res) => {
  try {
    const news = await newsService.findLastService();
    return res.send(news);
  } catch (error) {
    res.status(500).send({ message: err.message });
  }
};

const findByIdController = async (req, res) => {
  const { id } = req.params;

  try {
    const news = await newsService.findByIdService(id);
    return res.send(news);
  } catch (err) {
    return res.status(404).send({ message: err.message });
  }
};

const searchByTitleController = async (req, res) => {
  const { title } = req.query;

  try {
    const news = await newsService.searchByTitleService(title);
    return res.send(news);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const searchByUserController = async (req, res) => {
  const id = req.userId;

  try {
    const news = await newsService.searchByUserService(id);
    return res.send(news);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const updateController = async (req, res) => {
  const { title, text, banner } = req.body;
  const { id } = req.params;
  const userId = req.userId;
  try {
    await newsService.updateService(id, title, text, banner, userId);
    return res.send({ message: "Notícia atualizada com sucesso!" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const eraseController = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;

  try {
    await newsService.eraseService(id, userId);
    return res.send({ message: "Notícia excluída com sucesso!" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const likeController = async (req, res) => {
  const { id: idNews } = req.params;
  const userId = req.userId;
  try {
    const response = await newsService.likeNewsService(idNews, userId);
    return res.send(response);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const addCommentController = async (req, res) => {
  const { id: idNews } = req.params;
  const userId = req.userId;
  const { comment } = req.body;
  try {
    await newsService.addCommentService(idNews, userId, comment);
    return res.send({ message: "Comentário adicionado" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const removeCommentController = async (req, res) => {
  const { idNews, idComment } = req.params;
  const userId = req.userId;

  try {
    await newsService.removeCommentService(idNews, idComment, userId);
    return res.send({ message: "Comentário removido" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

export default {
  createController,
  findAllController,
  findLastController,
  findByIdController,
  searchByTitleController,
  searchByUserController,
  updateController,
  eraseController,
  likeController,
  addCommentController,
  removeCommentController,
}