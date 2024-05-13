import { menu } from "@material-tailwind/react";
import { createContext, useEffect, useState } from "react";
const CartContext = createContext({});
import axios from "axios";

const CartContextProvider = (props) => {
  const [menuItems, setMenuItems] = useState({});
  const [getCount, setGetCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const cartId = localStorage.getItem("cartId");
  const authToken = localStorage.getItem("authToken");
  const fetchCartItems = async () => {
    try {
      if (cartId) {
        const response = await axios.get(
          `http://localhost:5000/api/v1/carts/find/${cartId}`,
          {
            headers: {
              token: `Bearer ${authToken}`,
            },
          }
        );
        setCartItems(response.data.product);
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const getProductDetails = async (product) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/v1/products/find/${product._id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching product details:", error);
      return null;
    }
  };

  const handleAddToCart = async (itemId) => {
    try {
        const userId = JSON.parse(localStorage.getItem("loggedInUser"))._id;
        const cartId = localStorage.getItem("cartId");
        const authToken = localStorage.getItem("authToken");

        const productToAdd = { productId: itemId, quantity: 1 };

        let updatedCart;
       

        if (cartId) {
            const cart = await axios.get(`http://localhost:5000/api/v1/carts/find/${cartId}`, {
                headers: {
                    token: `Bearer ${authToken}`,
                },
            });
       

            updatedCart = {
                ...cart.data,
                product: [...cart.data.product, productToAdd],
            };

            const updatedCartResponse = await axios.put(
                `http://localhost:5000/api/v1/carts/update/${cartId}`,
                updatedCart,
                {
                    headers: {
                        token: `Bearer ${authToken}`,
                    },
                }
            );

            console.log(updatedCartResponse.data);

         
            setGetCount(cart.data.product.length + 1);
        } else {
            const newCartResponse = await axios.post(
                "http://localhost:5000/api/v1/carts/create",
                { userId, product: [productToAdd] },
                {
                    headers: {
                        token: `Bearer ${authToken}`,
                    },
                }
            );

            updatedCart = newCartResponse.data;

            console.log(newCartResponse.data);
            localStorage.setItem("cartId", updatedCart._id);

            
            setGetCount(1)
        }

        return { updatedCart }; 
    } catch (error) {
        console.error("Error adding item to cart:", error);
    }
};

  const updateCartItem = async (productId, quantity) => {
    try {
      const updatedCart = await axios.put(
        `http://localhost:5000/api/v1/carts/update/${cartId}`,
        {
          product: cartItems.map((item) =>
            item._id === productId ? { ...item, quantity: quantity } : item
          ),
        },
        {
          headers: {
            token: `Bearer ${authToken}`,
          },
        }
      );
      setCartItems(updatedCart.data.product);

    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  const removeCartItem = async (productId) => {
    try {
      const updatedCart = await axios.put(
        `http://localhost:5000/api/v1/carts/update/${cartId}`,
        {
          product: cartItems.filter((item) => item._id !== productId),
        },
        {
          headers: {
            token: `Bearer ${authToken}`,
          },
        }
      );
      setCartItems(updatedCart.data.product);
      setGetCount((cartItems.length)-1);
    } catch (error) {
      console.error("Error removing cart item:", error);
    }
  };

  const handleDecreaseQuantity = (productId) => {
    const newCartItems = cartItems.map((item) =>
      item._id === productId ? item.quantity==1?(setGetCount(getCount-1), removeCartItem(productId)): { ...item, quantity: item.quantity - 1 } : item
    );


    updateCartItem(
      productId,
      newCartItems.find((item) => item._id === productId).quantity,
      false
    );
    setGetCount(getCount-1)
  };

  const handleIncreaseQuantity = (productId) => {
    const newCartItems = cartItems.map((item) =>
      item._id === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateCartItem(
      productId,
      newCartItems.find((item) => item._id === productId).quantity
    );
    setGetCount(getCount+1)
  };

  const contextValue = {
    handleAddToCart,
    removeCartItem,
    fetchCartItems,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
    setMenuItems,
    menuItems,
    setGetCount,
    getCount,
    cartItems,
    menuItems,
    getProductDetails,
    setCartItems,
    setGetCount,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {props.children}
      {/* <CartDrawer isOpen={isOpen} onClose={()=>closeCart()} /> */}
    </CartContext.Provider>
  );
};

export { CartContext, CartContextProvider };
