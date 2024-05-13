import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { CartContext } from "../context/cart-context";

function Menu() {
  const { handleAddToCart,setGetCount, setMenuItems, menuItems } = useContext(CartContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/v1/products/find")
      .then((res) => {
        setMenuItems(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

localStorage.setItem("menuItems", JSON.stringify(menuItems));

  return (
    <div id="menu" className="w-full mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-10 gap-x-10 mt-10 mb-5">
      {loading ? (
        <div>Loading...</div>
      ) : (
        menuItems.map((item, index) => (
          <motion.div
            key={index}
            className="w-full bg-white shadow-md rounded-xl overflow-hidden relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link key={item._id} to={`/item/${item._id}`} className="block">
              <div className="w-full h-56 overflow-hidden">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
              </div>
            </Link>
            <div className="px-4 py-3">
              <h5 className="text-xl font-semibold mb-2 truncate">{item.title}</h5>
              <p className="text-sm text-gray-600 overflow-hidden line-clamp-2" style={{ maxHeight: "2.5rem" }}>
                {item.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold">${item.price}</span>
                <button onClick={() => handleAddToCart(item._id)} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                  Add To Cart
                </button>
              </div>
            </div>
          </motion.div>
        ))
      )}
    </div>
  );
}

export default Menu;
