import newsRepository from "../repositories/newsRepository.js";

async function createService({ title, text, banner }, userId) {
  if (!title || !text || !banner) throw new Error("Preencha todos os campos");

  const { id } = await newsRepository.createRepository({
    title,
    text,
    banner,
    user: userId,
  });

  return {
    message: "Notícia publicada com sucesso!",
    post: { id, title, text, banner },
  };
}

async function findAllService(offSet, limit, currentUrl) {
  limit = Number(limit);
  offSet = Number(offSet);

  if (!limit || !offSet) {
    limit = 5;
    offSet = 0;
  }

  const news = await newsRepository.findAllRepository(offSet, limit);
  const total = await newsRepository.countRepository();

  const next = offSet + limit;
  const nextUrl =
    next < total ? `${currentUrl}?offSet=${next}&limit=${limit}` : null;

  const previous = offSet - limit < 0 ? null : offSet - limit;
  const previousUrl =
    previous !== null
      ? `${currentUrl}?offSet=${previous}&limit=${limit}`
      : null;

  return {
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
  };
}

async function findLastService() {
  const news = await newsRepository.findLastRepository();

  if (!news) throw new Error("Nenhuma notícia encontrada");
  return {
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
  };
}

async function searchByTitleService(title) {
  const foundNews = await newsRepository.searchByTitleRepository(title);

  if (foundNews.length === 0) throw new Error("Nenhuma notícia encontrada");

  return {
    foundNews: foundNews.map((news) => ({
      id: news._id,
      title: news.title,
      text: news.text,
      banner: news.banner,
      likes: news.likes,
      comments: news.comments,
      name: news.user.name,
      username: news.user.username,
      avatar: news.user.avatar,
    })),
  };
}

async function findByIdService(id) {
  const news = await newsRepository.findByIdRepository(id);

  if (!news) throw new Error("Notícia não encontrada");

  return {
    id: news._id,
    title: news.title,
    text: news.text,
    banner: news.banner,
    likes: news.likes,
    comments: news.comments,
    name: news.user.name,
    username: news.user.username,
    avatar: news.user.avatar,
  };
}

async function searchByUserService(id) {
  const news = await newsRepository.searchByUserRepository(id);

  return {
    newsByUser: news.map((newsItem) => ({
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
  };
}

async function updateService(id, title, text, banner, userId) {
  if (!title && !text && !banner) throw new Error("Altere pelo menos um campo");
  const news = await newsRepository.findByIdRepository(id);

  if (!news) throw new Error("Notícia não encontrada");
  if (String(news.user._id) !== String(userId))
    throw new Error("Você não tem permissão para alterar essa notícia");

  await newsRepository.updateRepository(id, title, text, banner);
}

async function eraseService(id, userId) {
  const news = await newsRepository.findByIdRepository(id);

  if (!news) throw new Error("Notícia não encontrada");

  if (String(news.user._id) !== String(userId))
    throw new Error("Você não tem permissão para excluir essa notícia");

  await newsRepository.eraseRepository(id);
}

async function likeNewsService(idNews, userId) {
  const news = await newsRepository.findByIdRepository(idNews)
  if (!news) throw new Error("Notícia não encontrada");

  const userLiked = news.likes.find((likes) => String(likes.userId) === String(userId));

  if (userLiked) {
    await newsRepository.dislikeNewsRepository(idNews, userId);
    return { message: "Notícia descurtida" };
  }

  await newsRepository.likeNewsRepository(idNews, userId)
  return { message: "Notícia curtida" };
}

async function addCommentService(idNews, userId, comment) {
  if (!comment) throw new Error("Insira um comentário");

  const news = await newsRepository.findByIdRepository(idNews);

  if (!news) throw new Error("Notícia não encontrada");

  await newsRepository.addCommentRepository(idNews, userId, comment);
}

async function removeCommentService(idNews, idComment, userId) {
  const news = await newsRepository.findByIdRepository(idNews);

  if (!news) throw new Error("Notícia não encontrada");

  await newsRepository.removeCommentRepository(idNews, idComment, userId);
}

export default {
  createService,
  findAllService,
  findLastService,
  findByIdService,
  searchByTitleService,
  searchByUserService,
  updateService,
  eraseService,
  likeNewsService,
  addCommentService,
  removeCommentService,
}