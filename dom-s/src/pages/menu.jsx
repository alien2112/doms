import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { CartContext } from "../context/cart-context";

function Menu() {
  const { handleAddToCart, setGetCount, setMenuItems, menuItems } = useContext(CartContext);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("date"); // Default sorting by date
  const [selectedCategory, setSelectedCategory] = useState(null); // Selected category state
  let categories = []; // Initialize categories array

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/products/find`);
        setMenuItems(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    }
    
    fetchData(); // Invoke the async function to fetch data
  }, [setMenuItems]);

  // Extract unique categories from menu items
  if (menuItems.length > 0) {
    categories = Array.from(new Set(menuItems.flatMap((item) => item.categories)));
    categories.push("All");
  }

  // Function to handle search by item name
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Function to handle category selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  // Function to sort menu items based on sorting criteria

  const sortedMenuItems = menuItems.sort((a, b) => {
    if (sortBy === "date") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else {
      return a.title.localeCompare(b.title);
    }
  });
  
  // Filter menu items based on search query, selected category, and sorting criteria
 
  const filteredMenuItems = sortedMenuItems.filter((item) => {
    const includesSearchQuery = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    if (selectedCategory === "All") {
      return includesSearchQuery;
    }
    const matchesCategory = !selectedCategory || item.categories.includes(selectedCategory);
    return includesSearchQuery && matchesCategory;
  });

  return (
    <div id="menu" className="w-full mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-10 gap-x-10 mt-10 mb-5">
      <div className="w-full flex justify-center mb-4">
        {/* Search input */}
        <input
          type="text"
          placeholder="Search by item name..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>
      {/* Floating buttons for categories */}
      <div className="grid-cols-2 justify-center mb-4 space-x-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategorySelect(category)}
            className={`px-4 py-2 rounded-md focus:outline-none ${selectedCategory === category ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
          >
            {category}
          </button>
        ))}
      </div>
      {/* Sort by dropdown */}
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
      >
        <option value="date">Sort by Date</option>
        <option value="name">Sort by Name</option>
      </select>
      {/* Render menu items */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        filteredMenuItems.map((item, index) => (
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
