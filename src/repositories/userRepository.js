import User from "../models/User.js";

const createRepository = (body) => User.create(body);
const findAllRepository = () => User.find();
const findByEmailRepository = (email) => User.findOne({ email: email }).select('+password');
const findByIdRepository = (id) => User.findById(id);
const updateRepository = ({id, name, username, email, password, avatar, bg}) =>
  User.findOneAndUpdate(
    { _id: id },
    { name, username, email, password, avatar, bg }
  );

export default {
  createRepository,
  findAllRepository,
  findByIdRepository,
  findByEmailRepository,
  updateRepository,
};
