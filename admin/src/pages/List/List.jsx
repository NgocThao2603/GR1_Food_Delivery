import React, { useState, useEffect } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";
import Edit from "../../components/Edit/Edit"; // Import Edit component

const List = ({ url }) => {
  const [list, setList] = useState([]);
  const [editFood, setEditFood] = useState(null); // State to store the food being edited

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("Error");
    }
  };

  const removeFood = async (foodID) => {
    const response = await axios.post(`${url}/api/food/remove`, { id: foodID });
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error("Error");
    }
  };

  const editFoodHandler = (food) => {
    setEditFood(food); // Set the food to be edited
  };

  const closeEditHandler = () => {
    setEditFood(null); // Close the edit mode
    fetchList(); // Refresh the list after editing
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flex-col">
      <p>All Foods List</p>
      {editFood ? (
        <Edit food={editFood} url={url} onClose={closeEditHandler} />
      ) : (
        <div className="list-table">
          <div className="list-table-format title">
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b>Action</b>
          </div>
          {list.map((item, index) => {
            return (
              <div key={index} className="list-table-format">
                <img src={`${url}/images/` + item.image} alt="" />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>{item.price}</p>
                <p className="cursor" onClick={() => editFoodHandler(item)}>
                  Edit
                </p>
                <p className="cursor" onClick={() => removeFood(item._id)}>
                  X
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default List;
