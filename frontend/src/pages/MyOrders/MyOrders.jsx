import React, { useContext, useState, useEffect } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import "./MyOrders.css";
import { assets } from "../../assets/assets";

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    const response = await axios.post(
      url + "/api/order/userorders",
      {},
      { headers: { token } }
    );
    // Sắp xếp các đơn hàng từ mới nhất đến cũ nhất dựa trên trường date
    const sortedData = response.data.data.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    setData(sortedData);
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

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

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="container">
        {data.map((order, index) => {
          return (
            <div key={index} className="my-orders-order">
              <img className="parcel-icon" src={assets.parcel} alt="" />
              <p>
                {order.items.map((item, index) => (
                  <span key={item.name + index}>
                    {item.name} x {item.quantity}
                    <br />
                    <span className="order-date">
                      {formatDateVN(order.date)}
                    </span>
                    {index < order.items.length - 1 ? ", " : ""}
                  </span>
                ))}
              </p>
              <p>${order.amount}.00</p>
              <p>Items: {order.items.length}</p>
              <p className="status">
                <span>&#x25cf;</span> <b>{order.status}</b>
              </p>
              <button onClick={fetchOrders}>Track Orders</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyOrders;
