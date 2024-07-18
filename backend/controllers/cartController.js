import userModel from "../models/userModel.js";

// add items to user cart
const addToCart = async (req, res) => {
  try {
    // console.log("Request body:", req.body); // Log request body

    let userData = await userModel.findById(req.body.userId);
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    // console.log("User data:", userData); // Log user data
    let cartData = userData.cartData || {}; // Ensure cartData is initialized

    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }

    // console.log("Updated cartData:", cartData); // Log updated cartData

    // Use findByIdAndUpdate to update the cartData directly in the database
    await userModel.findByIdAndUpdate(
      req.body.userId,
      { cartData: cartData },
      { new: true, useFindAndModify: false }
    );

    // Fetch the updated userData to confirm the change
    const updatedUserData = await userModel.findById(req.body.userId);
    // console.log("User data after save:", updatedUserData); // Log user data after save

    res.json({ success: true, message: "Added to Cart" });
  } catch (error) {
    console.log("Error in addToCart:", error); // Log error
    res.json({ success: false, message: "Error" });
  }
};

// remove items from user cart
const removeFromCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = userData.cartData;
    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    }
    await userModel.findByIdAndUpdate(
      req.body.userId,
      { cartData: cartData },
      { new: true, useFindAndModify: false }
    );
    res.json({ success: true, message: "Removed From Cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// fetch user cart data
const getCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = userData.cartData;
    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};
export { addToCart, removeFromCart, getCart };
