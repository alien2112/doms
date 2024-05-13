import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { CartContext } from '../context/cart-context';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Slide, Fade } from 'react-awesome-reveal';

const Admin = () => {
    const { setMenuItems, menuItems } = useContext(CartContext);
    const [users, setUsers] = useState([]);
    const [orders, setOrders] = useState([]);
    const [newUser, setNewUser] = useState({ username: '', email: ''});
    const [stats, setStats] = useState([]);
    const [income, setIncome] = useState([]);
    const authToken = localStorage.getItem("authToken");

    const fetchUsers = () => {
        axios.get('http://localhost:5000/api/v1/users/find', {
            headers: {
                token: `Bearer ${authToken}`,
            },
        }).then(response => {
            setUsers(response.data);
        }).catch(error => {
            console.error('Error fetching users:', error);
        });
    };

    const fetchOrders = () => {
        axios.get('http://localhost:5000/api/v1/orders/find', {
            headers: {
                token: `Bearer ${authToken}`,
            },
        }).then(response => {
            setOrders(response.data);
        }).catch(error => {
            console.error('Error fetching orders:', error);
        });
    };

    const fetchStats = () => {
        axios.get('http://localhost:5000/api/v1/users/stats', {
            headers: {
                token: `Bearer ${authToken}`,
            },
        }).then(response => {
            setStats(response.data);
        }).catch(error => {
            console.error('Error fetching stats:', error);
        });
    };

    const fetchIncome = () => {
        axios.get('http://localhost:5000/api/v1/orders/income', {
            headers: {
                token: `Bearer ${authToken}`,
            },
        }).then(response => {
            setIncome(response.data);
        }).catch(error => {
            console.error('Error fetching income:', error);
        });
    };

    useEffect(() => {
        fetchUsers();
        fetchOrders();
        fetchStats();
        fetchIncome();
    }, []);

    const handleAddUser = () => {
        if (newUser.username && newUser.email ) {
            axios.post('http://localhost:5000/api/v1/users', newUser, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            }).then(response => {
                setNewUser({ username: '', email: '' });
                fetchUsers();
            }).catch(error => {
                console.error('Error adding user:', error);
            });
        } else {
            alert('Please enter username, email, and role');
        }
    };

    const handleRemoveUser = (id) => {
        axios.delete(`http://localhost:5000/api/v1/users/delete/${id}`, {
            headers: {
                token: `Bearer ${authToken}`,
            },
        }).then(() => {
            fetchUsers();
        }).catch(error => {
            console.error('Error removing user:', error);
        });
    };
    const handleRemoveOrder = (id) => {
        axios.delete(`http://localhost:5000/api/v1/orders/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        }).then(() => {
            fetchOrders();
        }).catch(error => {
            console.error('Error removing order:', error);
        });
    };
    

    const StatsDisplay = ({ data, title }) => (
        <div className="bg-white shadow-md rounded-lg p-4 mb-4">
            <h2 className="text-lg font-semibold mb-2">{title}</h2>
            <BarChart width={900} height={400} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="_id" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="total" fill="#8884d8" />
            </BarChart>
        </div>
    );

    return (
        <div className="container mx-auto p-4">
            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                <Fade direction="down" triggerOnce>
                    <h2 className="text-lg font-semibold mb-2 text-center">Dashboard</h2>
                </Fade>
                <div className="flex flex-wrap -mx-4">
                    <div className="w-full md:w px-4 mb-4">
                        <Slide direction="left" triggerOnce>
                            <div >
                                <h2 className="text-lg font-semibold mb-2">{stats.length > 0 ? 'User Registrations by Month' : 'Loading...'}</h2>
                                {stats.length > 0 && (
 <StatsDisplay data={stats}
 />                                )}
                            </div>
                        </Slide>
                    </div>
                    </div>
                    <div>
                    <div className="w-full md:w px-4 mb-4">
                        <Slide direction="right" triggerOnce>
                            <div >
                                <h2 className="text-lg font-semibold mb-2">{income.length > 0 ? 'Income by Month' : 'Loading...'}</h2>
                                {income.length > 0 && 
             <StatsDisplay data={income}/>
                                }
                            </div>
                        </Slide>
                    </div>
                </div>
                <Fade direction="up" triggerOnce>
                    <h2 className="text-lg font-semibold mb-2">Users</h2>
                </Fade>
                <Slide direction="left" triggerOnce>
                    <div className="user-add-form">
                        <h3 className="text-sm font-semibold mb-2">Find users</h3>
                        <div className="mb-4">
                            <label htmlFor="username" className="block text-gray-700 font-bold mb-2">Username</label>
                            <input type="text" id="username" value={newUser.username} onChange={(e) => setNewUser({ ...newUser, username: e.target.value })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="username" className="block text-gray-700 font-bold mb-2">Username</label>
                            <input type="text" id="username" value={newUser.username} onChange={(e) => setNewUser({ ...newUser, username: e.target.value })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
                            <input type="email" id="email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        </div>
                        <button onClick={handleAddUser} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-300">Add User</button>
                    </div>
                </Slide>
                <Slide direction="right" triggerOnce>
                    <div className="user-list">
                        {users.map(user => (
                            <div key={user.id} className="bg-gray-200 p-3 rounded-md mb-2 flex justify-between items-center user-item">
                                <div>
                                    <p><strong>Username:</strong> {user._id}</p>
                                    <p><strong>Username:</strong> {user.username}</p>
                                    <p><strong>Email:</strong> {user.email}</p>
                                </div>
                                <button onClick={() => handleRemoveUser(user._id)} className="text-red-500 hover:text-red-700 transition-colors duration-300">Remove</button>
                            </div>
                        ))}
                    </div>
                </Slide>
                {/* Orders section */}
                <Fade direction="up" triggerOnce>
                    <h2 className="text-lg font-semibold mb-2">Orders</h2>
                </Fade>
                <Slide direction="left" triggerOnce>
                    <div className="order-list">
                        {orders.map(order => (
                            <div key={order.id} className="bg-gray-200 p-3 rounded-md mb-2 flex justify-between items-center order-item">
                                <div>
                                    <p><strong>Order ID:</strong> {order._id}</p>
                                    <p><strong>Status:</strong> {order.status}</p>
                                </div>
                                {order.status === 'pending' && (
                                    <button onClick={() => handleRemoveOrder(order._id)} className="text-red-500 hover:text-red-700 transition-colors duration-300">Remove</button>
                                )}
                            </div>
                        ))}
                    </div>
                </Slide>
            </div>
        </div>
    );
}

export default Admin;