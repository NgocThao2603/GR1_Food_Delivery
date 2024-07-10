import mongoose from "mongoose";
export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://ngocthao:001101@cluster0.zcyeimx.mongodb.net/food-del"
    )
    .then(() => console.log("DB Connected"));
};
