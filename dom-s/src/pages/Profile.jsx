import React, { useState, useEffect } from "react";
import axios from "axios";
import Settings from "./Settings";
import Admin from "./admin";
import { motion } from "framer-motion";

function Profile({ setIsSignedIn, user, theme, setTheme }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const authToken = localStorage.getItem("authToken");
      const userId = JSON.parse(localStorage.getItem("loggedInUser"))._id;
      const response = await axios.get(
        `http://localhost:5000/api/v1/orders/find/${userId}`,
        {
          headers: {
            token: `Bearer ${authToken}`,
          },
        }
      );
      console.log(response.data);
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleLogout = () => {
    // Clear auth token and user from local storage
    localStorage.removeItem("authToken");
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("cartId");

    setIsSignedIn(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto py-8"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">User Profile</h2>
      <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Name:
          </label>
          <p className="text-gray-700">{user.username}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email:
          </label>
          <p className="text-gray-700">{user.email}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Phone Number:
          </label>
          <p className="text-gray-700">{user.phonenumber}</p>
        </div>
        {/* Add more user information fields as needed */}
      </div>
      <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
        <h2 className="text-xl font-semibold mb-4">Order History</h2>
        <ul>
          {orders.map((order) => (
            <motion.li
              key={order._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-4"
            >
              <p>Order ID: {order._id}</p>
              <p>Amount: {order.amount}</p>
              <div className="mb-2">
                <label className="block text-gray-700 text-sm font-bold mb-1">
                  Address:
                </label>
                <p className="text-gray-700">{`${order.address.street}, ${order.address.city}`}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
      <Settings user={user} theme={theme} setTheme={setTheme} />
      {user.username === "admin" && <Admin />}
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300"
      >
        Logout
      </button>
    </motion.div>
  );
}

export default Profile;