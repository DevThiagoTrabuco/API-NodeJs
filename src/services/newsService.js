import News from "../models/News.js";

export const createService = (body) => News.create(body);

export const findAllService = (offSet, limit) =>
  News.find().sort({ _id: -1 }).skip(offSet).limit(limit).populate("user");

export const countService = () => News.countDocuments();

export const findLastService = () =>
  News.findOne().sort({ _id: -1 }).populate("user");

export const findByIdService = (id) => News.findById(id).populate("user");

export const searchByTitleService = (title) =>
  News.find({
    title: { $regex: `${title || ""}`, $options: "i" },
  })
    .sort({ _id: -1 })
    .populate("user");

export const searchByUserService = (id) =>
  News.find({ user: id }).sort({ _id: -1 }).populate("user");

export const updateService = (id, title, text, banner) =>
  News.findOneAndUpdate(
    { _id: id },
    { title, text, banner },
    { rawResult: true }
  );

export const eraseService = (id) => News.findOneAndDelete({ _id: id });

export const likeNewsService = (idNews, userId) =>
  News.findOneAndUpdate(
    { _id: idNews, "likes.userId": { $nin: [userId] } },
    { $push: { likes: { userId, createdAt: Date.now() } } }
  );

export const dislikeNewsService = (idNews, userId) =>
  News.findOneAndUpdate(
    { _id: idNews, "likes.userId": { $nin: [userId] } },
    { $pull: { likes: { userId } } }
  );

export const addCommentService = (idNews, userId, comment) => {
  let idComment = Math.floor(Date.now() * Math.random()).toString(36);

  return News.findOneAndUpdate(
    { _id: idNews },
    { $push: {
        comments: { idComment, userId, comment, createdAt: Date.now() },
      },
    }
  );
};

export const removeCommentService = (idNews, idComment, userId) => News.findOneAndUpdate( 
  { _id: idNews },
  { $pull: { comments: { idComment, userId } } },
);
