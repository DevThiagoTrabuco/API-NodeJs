import News from "../models/News.js";

const createRepository = (body) => News.create(body);

const findAllRepository = (offSet, limit) =>
  News.find().sort({ _id: -1 }).skip(offSet).limit(limit).populate("user");

const countRepository = () => News.countDocuments();

const findLastRepository = () =>
  News.findOne().sort({ _id: -1 }).populate("user");

const findByIdRepository = (id) => News.findById(id).populate("user");

const searchByTitleRepository = (title) =>
  News.find({
    title: { $regex: `${title || ""}`, $options: "i" },
  })
    .sort({ _id: -1 })
    .populate("user");

const searchByUserRepository = (id) =>
  News.find({ user: id }).sort({ _id: -1 }).populate("user");

const updateRepository = (id, title, text, banner) =>
  News.findOneAndUpdate(
    { _id: id },
    { title, text, banner },
    { rawResult: true }
  );

const eraseRepository = (id) => News.findOneAndDelete({ _id: id });

const likeNewsRepository = (idNews, userId) =>
  News.findOneAndUpdate(
    { _id: idNews, "likes.userId": { $nin: [userId] } },
    { $push: { likes: { userId, createdAt: Date.now() } } },
    { new: true }
  );

const dislikeNewsRepository = (idNews, userId) =>
  News.findOneAndUpdate(
    { _id: idNews, "likes.userId": userId },
    { $pull: { likes: { userId } } },
    { new: true }
  );

const addCommentRepository = (idNews, userId, comment) => {
  let idComment = Math.floor(Date.now() * Math.random()).toString(36);

  return News.findOneAndUpdate(
    { _id: idNews },
    { $push: {
        comments: { idComment, userId, comment, createdAt: Date.now() },
      },
    }
  );
};

const removeCommentRepository = (idNews, idComment, userId) => News.findOneAndUpdate( 
  { _id: idNews },
  { $pull: { comments: { idComment, userId } } },
);

export default {
    createRepository,
    findAllRepository,
    countRepository,
    findLastRepository,
    findByIdRepository,
    searchByTitleRepository,
    searchByUserRepository,
    updateRepository,
    eraseRepository,
    likeNewsRepository,
    dislikeNewsRepository,
    addCommentRepository,
    removeCommentRepository,
}