import React, { useContext, useState } from "react";
import { Rate } from "antd";
import {
  PlusCircleFilled,
  MinusCircleTwoTone,
  PlusCircleTwoTone,
} from "@ant-design/icons";
import "./FoodItem.css";
import { StoreContext } from "../../context/StoreContext";

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);
  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img className="food-item-image" src={image} alt="" />
        {!cartItems[id] ? (
          <PlusCircleFilled className="add" onClick={() => addToCart(id)} />
        ) : (
          <div className="food-item-counter">
            <MinusCircleTwoTone
              twoToneColor="#ff0000"
              className="remove-icon"
              onClick={() => removeFromCart(id)}
            />
            <p>{cartItems[id]}</p>
            <PlusCircleTwoTone
              twoToneColor="#00c04b"
              className="plus-icon"
              onClick={() => addToCart(id)}
            />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p className="food-item-name">{name}</p>
          <Rate disabled defaultValue={4} className="rate-star" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">{price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
