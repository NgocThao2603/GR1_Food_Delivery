import express from "express";
import multer from "multer";
import {
  addFood,
  listFood,
  removeFood,
  updateFood, // Import updateFood
} from "../controllers/foodController.js";

const foodRouter = express.Router();

// Image Storage Engine
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list", listFood);
foodRouter.post("/remove", removeFood);
foodRouter.post("/update/:id", upload.single("image"), updateFood); // Add update route

export default foodRouter;
