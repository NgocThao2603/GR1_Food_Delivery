import foodModel from "../models/foodModel.js";

import fs from "fs";

// add food item
const addFood = async (reg, res) => {
  let image_filename = `${reg.file.image_filename}`;

  const food = new foodModel({
    name: reg.body.name,
    price: reg.body.price,
    description: reg.body.description,
    category: reg.body.category,
    image: image_filename,
  });
};

export { addFood };
