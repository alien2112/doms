import React, { useState,useEffect, useContext } from 'react';
import axios from 'axios';
import { CartContext } from "../context/cart-context";
import { Link } from 'react-router-dom';

const Explore = () => {
    const { setMenuItems, menuItems } = useContext(CartContext);

    useEffect(() => {
        axios
          .get(`$process.env.REACT_APP_API_URL/api/v1/products/find`)
          .then((res) => {
            setMenuItems(res.data);
            console.log(res.data)
          })
          .catch((err) => {
            console.error(err);
          });
      }, []);




    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-white">Explore <span className='text-red-600'>Menu.</span></h2>
                <Link to='/menu'><button className="px-4 py-2 text-blue-600">View All</button></Link>
            </div>
            {menuItems.length > 0  ? (
                <div className="flex justify-center items-center border border-gray-500 rounded-md p-2 gap-16"> 
                    {/* Render the first 5 items */}
                    {menuItems.slice(0, 5).map((item) => (
                        <Link key={item.id} to={`/item/${item.id}`}>
                            <div className="w-20 h-20 flex items-center justify-center rounded-full overflow-hidden border border-gray-200 shadow-md mr-4 hover:shadow-lg hover:scale-110 transition duration-300"> 
                                <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default Explore;
