import mongoose from "mongoose";

const connectDb = () => {
  console.log("Conectando ao MongoDB");
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("Conectado ao MongoDB"))
    .catch((err) => console.log(err));
};

export default connectDb;
