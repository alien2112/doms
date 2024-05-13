import React, { useState, useEffect,useContext } from "react";
import { CartItem } from "../components/cartItem";
import { CartContext } from "../context/cart-context";
import { Link } from "react-router-dom";

const Cart = () => {
  const {removeCartItem,fetchCartItems,handleIncreaseQuantity,handleDecreaseQuantity,cartItems,getProductDetails,setCartItems,setGetCount} = useContext(CartContext);

  useEffect(() => {
    fetchCartItems();
  
  }, []);



  return (
    <div className="min-h-screen container mx-auto py-8">
      <h1 className="text-2xl font-semibold mb-4">Your Cart</h1>

        <div>
          {cartItems.length === 0 ?(
            <div>Your cart is empty.</div>
         
          ) 
          : (
            <div>
              {cartItems.map((item) => (
                <CartItem
                  key={item._id}
                  product={item}
                  quantity={item.quantity}
                  onDecrease={() => handleDecreaseQuantity(item._id)}
                  onIncrease={() => handleIncreaseQuantity(item._id)}
                  onRemove={() => removeCartItem(item._id)}
                  getProductDetails={getProductDetails}
                />
              ))}
              <Link to="/checkout">
              <div className="flex justify-center">
  <button className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-96 rounded mt-4">
    Proceed to Checkout
  </button>
</div>
              </Link>
            </div>
          )}
        </div>

    </div>
  );
};

export default Cart;
