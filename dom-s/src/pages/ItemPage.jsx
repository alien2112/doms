import React, { useState, useEffect,useContext } from "react";
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CartContext } from "../context/cart-context";
const ItemPage = () => {
    const { id } = useParams();
    const [item, setItem] = useState(null);
    const [randomItems, setRandomItems] = useState([]);
    const {handleAddToCart,removeCartItem,fetchCartItems,handleIncreaseQuantity,handleDecreaseQuantity,cartItems,setCartItems} = useContext(CartContext);
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/v1/products/find/${id}`);
                setItem(response.data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();
    }, [id]);

    // useEffect(() => {
    //     const fetchRandomItems = async () => {
    //         try {
    //             const response = await axios.get("http://localhost:5000/api/v1/products/random");
    //             setRandomItems(response.data);
    //         } catch (error) {
    //             console.error('Error fetching random items:', error);
    //         }
    //     };
    
    //     fetchRandomItems();
    // }, []);  
    

    const handleAdd= (id) => {
        handleAddToCart(id);
        toast.success('Item has been added to the cart');
    };

    if (!item) {
        return <p>Loading...</p>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-4">{item.title}</h2>
            <div className="flex justify-center">
                <img
                    src={item.img}
                    alt={item.title}
                    className="border border-gray-300 rounded-lg shadow-lg max-w-md"
                />
            </div>
            <div className="text-lg text-gray-700 mb-4 mt-4">
                <p>{item.description}</p>
                <p className="text-xl font-semibold text-blue-600">${item.price.toFixed(2)}</p>
            </div>
            <div className="flex justify-center">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={()=>{handleAdd(id)}}
                >
                    Add to Cart
                </button>
            </div>
            {randomItems.length > 0 && (
                <div>
                    <h3 className="text-2xl font-bold mb-4">Associated Items</h3>
                    <div className="grid grid-cols-3 gap-8">
                        {randomItems.map((randomItem) => (
                            <div key={randomItem.id} className="text-center border border-gray-700 rounded-lg p-4">
                                <Link to={`/item/${randomItem.id}`}>
                                    <div>
                                        <img
                                            src={randomItem.image || ''}
                                            alt={randomItem.title || 'No Title'}
                                            className="cursor-pointer w-48 h-48 object-cover mx-auto"
                                        />
                                    </div>
                                    <p className="mt-2 text-lg font-semibold">{randomItem.title || 'No Title'}</p>
                                    <p className="text-gray-700">${randomItem.price ? randomItem.price.toFixed(2) : 'N/A'}</p>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            <ToastContainer />
        </div>
    );
};

export default ItemPage;
