import {
  createService,
  findAllService,
  countService,
  findLastService,
  findByIdService,
  searchByTitleService,
  searchByUserService,
  updateService,
  eraseService,
  likeNewsService,
  dislikeNewsService,
  addCommentService,
  removeCommentService,
} from "../services/newsService.js";

export const create = async (req, res) => {
  try {
    const { title, text, banner } = req.body;
    if (!title || !text || !banner) {
      return res.status(400).send({ message: "Preencha todos os campos" });
    }

    await createService({
      title,
      text,
      banner,
      user: req.userId,
    });

    res.status(201).send({ message: "Notícia publicada com sucesso!" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

export const findAll = async (req, res) => {
  try {
    let { limit, offSet } = req.query;
    limit = Number(limit);
    offSet = Number(offSet);

    if (!limit || !offSet) {
      limit = 5;
      offSet = 0;
    }

    const news = await findAllService(offSet, limit);
    const total = await countService();
    const currentUrl = req.baseUrl;

    const next = offSet + limit;
    const nextUrl =
      next < total ? `${currentUrl}?offSet=${next}&limit=${limit}` : null;

    const previous = offSet - limit < 0 ? null : offSet - limit;
    const previousUrl =
      previous !== null
        ? `${currentUrl}?offSet=${previous}&limit=${limit}`
        : null;

    // if (news.length === 0) {
    //   return res.status(400).send({ message: "Sem notícias publicadas" });
    // }

    res.send({
      nextUrl,
      previousUrl,
      limit,
      offSet,
      total,
      results: news.map((newsItem) => ({
        id: newsItem._id,
        title: newsItem.title,
        text: newsItem.text,
        banner: newsItem.banner,
        likes: newsItem.likes,
        comments: newsItem.comments,
        name: newsItem.user.name,
        username: newsItem.user.username,
        avatar: newsItem.user.avatar,
      })),
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const findLast = async (req, res) => {
  try {
    const news = await findLastService();

    if (!news) {
      return res.status(404).send({ message: "Nenhuma notícia encontrada" });
    }

    res.send({
      news: {
        id: news._id,
        title: news.title,
        text: news.text,
        banner: news.banner,
        likes: news.likes,
        comments: news.comments,
        name: news.user.name,
        username: news.user.username,
        avatar: news.user.avatar,
      },
    });
  } catch (error) {
    res.status(500).send({ message: err.message });
  }
};

export const findById = async (req, res) => {
  try {
    const { id } = req.params;
    const news = await findByIdService(id);

    res.send({
      news: {
        id: news._id,
        title: news.title,
        text: news.text,
        banner: news.banner,
        likes: news.likes,
        comments: news.comments,
        name: news.user.name,
        username: news.user.username,
        avatar: news.user.avatar,
      },
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

export const searchByTitle = async (req, res) => {
  try {
    const { search } = req.query;
    const news = await searchByTitleService(search);

    if (!search) {
      return res.status(400).send({ message: "Não é possível buscar" });
    }

    if (news.lenght === 0) {
      return res
        .status(404)
        .send({ message: "Nenhuma notícia encontrada com este título" });
    }

    res.send({
      results: news.map((item) => ({
        id: item._id,
        title: item.title,
        text: item.text,
        banner: item.banner,
        likes: item.likes,
        comments: item.comments,
        name: item.user.name,
        username: item.user.username,
        avatar: item.user.avatar,
      })),
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

export const searchByUser = async (req, res) => {
  try {
    const id = req.userId;
    const news = await searchByUserService(id);

    res.send({
      results: news.map((item) => ({
        id: item._id,
        title: item.title,
        text: item.text,
        banner: item.banner,
        likes: item.likes,
        comments: item.comments,
        name: item.user.name,
        username: item.user.username,
        avatar: item.user.avatar,
      })),
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

export const update = async (req, res) => {
  try {
    const { title, text, banner } = req.body;
    const { id } = req.params;

    if (!title && !text && !banner) {
      return res.status(400).send({ message: "Altere pelo menos um campo" });
    }

    const news = await findByIdService(id);

    if (String(news.user._id) !== String(req.userId)) {
      return res
        .status(401)
        .send({ message: "Você não tem permissão para alterar essa notícia" });
    }

    await updateService(id, title, text, banner);

    res.send({ message: "Notícia atualizada com sucesso!" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

export const erase = async (req, res) => {
  try {
    const { id } = req.params;

    const news = await findByIdService(id);
    if (String(news.user._id) !== String(req.userId)) {
      return res
        .status(401)
        .send({ message: "Você não tem permissão para alterar essa notícia" });
    }

    await eraseService(id);

    res.send({ message: "Notícia excluída com sucesso!" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

export const like = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const newsLiked = await likeNewsService(id, userId);
    if (!newsLiked) {
      await dislikeNewsService(id, userId);
      return res.send({ message: "Curtida removida" });
    }

    res.send({ message: "Curtida adicionada" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

export const addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    const { comment } = req.body;

    if (!comment) {
      return res.status(400).send({ message: "Insira um comentário" });
    }

    await addCommentService(id, userId, comment);

    res.send({ message: "Comentário adicionado" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

export const removeComment = async (req, res) => {
  try {
    const { idNews, idComment } = req.params;
    const userId = String(req.userId);
    
    const removedComment = await removeCommentService(idNews, idComment, userId);
    const commentCatcher = removedComment.comments.find(
      (comment) => comment.idComment === idComment
    );

    if (!commentCatcher) {
      return res.status(404).send({ message: "Comentário não encontrado" });
    }

    if (commentCatcher.userId !== userId) {
      return res
        .status(401)
        .send({ message: "Você não tem permissão para remover este comentário" });
    }

    res.send({ message: "Comentário removido" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};
