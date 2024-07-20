import foodModel from "../models/foodModel.js";
import fs from "fs";

// add food item
const addFood = async (req, res) => {
  let image_filename = `${req.file.filename}`;

  const food = new foodModel({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    category: req.body.category,
    image: image_filename,
  });

  try {
    await food.save();
    res.json({ success: true, message: "Food Added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// add food list
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// remove food item
const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    fs.unlink(`uploads/${food.image}`, () => {});
    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Food Removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// update food item
const updateFood = async (req, res) => {
  const { id } = req.params; // Lấy ID từ URL params
  const updateData = req.body;

  if (!id) {
    return res.status(400).json({ success: false, message: "ID is required" });
  }

  if (req.file) {
    updateData.image = req.file.filename;
  }

  try {
    const food = await foodModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (food) {
      res.status(200).json({
        success: true,
        message: "Food updated successfully",
        data: food,
      });
    } else {
      res.status(404).json({ success: false, message: "Food not found" });
    }
  } catch (error) {
    console.error("Error:", error); // Log error details
    res.status(500).json({ success: false, message: error.message });
  }
};

export { addFood, listFood, removeFood, updateFood };
