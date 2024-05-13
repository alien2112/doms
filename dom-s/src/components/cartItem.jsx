import React, { useState, useEffect } from "react";

export const CartItem = ({ product, quantity, onDecrease, onIncrease, onRemove }) => {
  const [productDetails, setProductDetails] = useState(null);
  const [totalPrice,setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchProductDetails = () => {
      const menuItems = JSON.parse(localStorage.getItem("menuItems")) || [];
      const matchingProduct = menuItems.find((item) => item._id === product.productId);
      if (matchingProduct) {
        setProductDetails(matchingProduct);
        setTotalPrice(totalPrice+matchingProduct.price);
      }
    };

    fetchProductDetails();
  }, [product.productId]);

  if (!productDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-4">
      <div className="flex items-center">
        <img
          src={productDetails.img}
          alt={productDetails.title}
          className="h-24 w-24 object-cover rounded-md mr-4"
        />
        <div>
          <p className="font-semibold text-gray-900 dark:text-white">{productDetails.title}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">{productDetails.description}</p>
          <p className="font-semibold text-gray-900 dark:text-white">Price: {productDetails.price}</p>
          <p className="text-gray-600 dark:text-gray-400">Quantity: {quantity}</p>
          {quantity > 1 && <p className="font-semibold text-gray-900 dark:text-white">TotalPrice: {productDetails.price*quantity}</p>}
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div className="bg-white p-2 rounded-md flex items-center">
          <button
            onClick={() => onDecrease()}
            className="border-none text-2xl text-amber-600 dark:text-amber-300 px-3 py-1 rounded-l-md border-amber-600 border-4"
          >
            -
          </button>
          <span className="font-semibold text-xl mx-2">{quantity}</span>
          <button
            onClick={() => { onIncrease() }}
            className="border-none text-2xl text-amber-600 dark:text-amber-300 px-3 py-1 rounded-r-md border-amber-600 border-4"
          >
            +
          </button>
        </div>
      </div>
      <button
        onClick={() => onRemove()}
        className="bg-gray-500 text-white px-2 py-1 rounded-md mt-2"
      >
        Remove
      </button>
    </div>
  );
};