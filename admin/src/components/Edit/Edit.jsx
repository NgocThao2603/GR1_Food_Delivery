import React, { useState } from "react";
import axios from "axios";
import "./Edit.css";
import { assets } from "../../assets/assets";
import upload_area from "../../assets/upload_area.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Edit = ({ food, url, onClose }) => {
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: food.name,
    description: food.description,
    category: food.category,
    price: food.price,
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("price", Number(data.price));
    if (image) {
      formData.append("image", image);
    }

    // Log FormData contents
    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }

    try {
      const response = await axios.post(
        `${url}/api/food/update/${food._id}`,
        formData
      );
      if (response.data.success) {
        toast.success(response.data.message);
        onClose();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error occurred during update");
    }
  };

  return (
    <div className="edit">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="edit-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={
                image
                  ? URL.createObjectURL(image)
                  : food.image
                  ? `${url}/images/${food.image}`
                  : assets.upload_area
              }
              alt=""
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
          />
        </div>
        <div className="edit-product-name flex-col">
          <p>Product name</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="Type here"
          />
        </div>
        <div className="edit-product-description flex-col">
          <p>Product description</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            rows="6"
            placeholder="Write content here"
            required
          ></textarea>
        </div>
        <div className="edit-category-price">
          <div className="edit-category flex-col">
            <p>Product category</p>
            <select
              onChange={onChangeHandler}
              value={data.category}
              name="category"
            >
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="edit-price flex-col">
            <p>Product price</p>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type="number"
              name="price"
              placeholder="$20"
            />
          </div>
        </div>
        <div className="button">
          <button type="submit" className="update-btn">
            UPDATE
          </button>
          <button type="button" onClick={onClose} className="cancel-btn">
            CANCEL
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
