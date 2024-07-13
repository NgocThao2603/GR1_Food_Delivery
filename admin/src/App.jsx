import React from "react";
// Ensure the relative paths to Navbar and Sidebar components are correct
import Navbar from "./components/Navbar/Navbar"; // Check this path
import Sidebar from "./components/Sidebar/Sidebar"; // Check this path
import { Routes, Route } from "react-router-dom";
import Add from "./pages/Add/Add";
import Orders from "./pages/Orders/Orders";
import List from "./pages/List/List";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  const url = "http://localhost:4000";
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="app-content">
        {" "}
        {/* Ensure styles for app-content are correctly applied */}
        <Sidebar /> {/* Ensure Sidebar component is correctly exported */}
        <Routes>
          <Route path="/add" element={<Add url={url} />} />
          <Route path="/list" element={<List url={url} />} />
          <Route path="/orders" element={<Orders url={url} />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
