import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CartContext } from "../context/cart-context";

const ItemPage = () => {
    const { id } = useParams();
    const [item, setItem] = useState(null);
    const {handleAddToCart} = useContext(CartContext);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/products/find/${id}`);
                setItem(response.data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };
        fetchProduct();
    }, [id]);

    const handleAdd = (id) => {
        handleAddToCart(id);
        toast.success('Item has been added to the cart');
    };

    if (!item) {
        return <p className="text-center text-lg text-gray-700">Loading...</p>;
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
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={()=>{handleAdd(id)}}
                >
                    Add to Cart
                </button>
            </div>
            <ToastContainer />
        </div>
    );
};

export default ItemPage;
