import React, { useEffect, useState } from "react";
import "./Orders.css";
import { toast } from "react-toastify";
import axios from "axios";
import { assets } from "../../assets/assets";

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  // Quản lý trạng thái của giá trị chọn
  const [selectValue, setSelectValue] = useState({});

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + "/api/order/list");
      if (response.data.success) {
        const sortedData = response.data.data.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setOrders(sortedData);
        // Cập nhật trạng thái với giá trị mặc định
        const initialSelectValues = {};
        sortedData.forEach((order) => {
          initialSelectValues[order._id] = order.status;
        });
        setSelectValue(initialSelectValues);
      } else {
        toast.error("Failed to fetch orders");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("An error occurred while fetching orders");
    }
  };

  const formatDateVN = (date) => {
    const utcDate = new Date(date);
    const vnOffset = 7 * 60; // 7 giờ tính bằng phút
    const localDate = new Date(utcDate.getTime() + vnOffset * 60 * 1000);

    const day = String(localDate.getUTCDate()).padStart(2, "0");
    const month = String(localDate.getUTCMonth() + 1).padStart(2, "0"); // Tháng từ 0-11
    const year = localDate.getUTCFullYear();
    const hour = String(localDate.getUTCHours()).padStart(2, "0");
    const minute = String(localDate.getUTCMinutes()).padStart(2, "0");

    return `${day}/${month}/${year} - ${hour}:${minute}`;
  };

  // Cập nhật giá trị chọn khi thay đổi
  const handleSelectChange = async (orderId, event) => {
    const newValue = event.target.value;
    setSelectValue((prev) => ({
      ...prev,
      [orderId]: newValue,
    }));
    // Thực hiện cập nhật trạng thái đơn hàng trong backend
    const response = await axios.post(url + "/api/order/status", {
      orderId,
      status: newValue,
    });
    if (response.data.success) {
      fetchAllOrders();
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [url]);

  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order) => (
          <div key={order._id} className="order-item">
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className="order-item-food">
                {order.items.map((item, index) => (
                  <div key={item.name + index}>
                    {item.name} x {item.quantity}
                  </div>
                ))}
                <div className="order-date">{formatDateVN(order.date)}</div>
              </p>
              <p className="order-item-name">
                {order.address.firstName + " " + order.address.lastName}
              </p>
              <div className="order-item-address">
                <p>{order.address.street + ", "}</p>
                <p>
                  {order.address.city +
                    ", " +
                    order.address.state +
                    ", " +
                    order.address.country +
                    ", " +
                    order.address.zipcode}
                </p>
              </div>
              <p className="order-item-phone">{order.address.phone}</p>
            </div>
            <p>Items: {order.items.length}</p>
            <p>${order.amount}</p>
            <select
              value={selectValue[order._id] || "Food Processing"}
              onChange={(e) => handleSelectChange(order._id, e)}
              className={`order-item-select ${
                selectValue[order._id] === "Food Processing"
                  ? "option-processing"
                  : selectValue[order._id] === "Out for delivery"
                  ? "option-delivery"
                  : selectValue[order._id] === "Delivered"
                  ? "option-delivered"
                  : ""
              }`}
            >
              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
