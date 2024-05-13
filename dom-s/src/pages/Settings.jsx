import React, { useState , useEffect } from 'react';
import axios from 'axios';
function Settings({ user, updateUser,theme,setTheme}){
  

function ProductManagement() {
  const [formData, setFormData] = useState({
    _id:'',
    title: '',
    description:'',
    img: '',
    categories: '',
    price: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const submitProduct = async () => {
    const authToken = localStorage.getItem("authToken");
    const url = formData._id ? `http://localhost:5000/api/v1/products/update/${formData._id}` : 'http://localhost:5000/api/v1/products/create';
    const method = formData._id ? 'PUT' : 'POST';
    const productData = {
      title: formData.title,
      description: formData.description,
      img: formData.img,
      categories: formData.categories,
      price: formData.price
    };
  
    if (method === 'PUT') {
      productData._id = formData._id;
    }
    try {
      console.log(formData);
      const response = await axios({
        method: method,
        url: url,
        data: productData, 
        headers: {
          token: `Bearer ${authToken}`,
        },
      });
      

      if (!formData._id) {
        setFormData({ ...formData, title: '', price: '', categories: '', description: '', img: '' });
      }
      
      console.log('Operation successful:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  


  return (
    <div>
      <h1>Product Management</h1>
      <form className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
 
  <div className="mb-4">
    <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Id:</label>
    <input type="text" name="name" value={formData._id} onChange={handleInputChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
  </div>
  <div className="mb-4">
    <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Title:</label>
    <input type="text" name="title" value={formData.title} onChange={handleInputChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
  </div>
  <div className="mb-4">
    <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description:</label>
    <input type="text" name="description" value={formData.description} onChange={handleInputChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
  </div>
  <div className="mb-4">
    <label htmlFor="img" className="block text-gray-700 text-sm font-bold mb-2">Image:</label>
    <input type="text"  name="img" value={formData.img} onChange={handleInputChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
  </div>
  <div className="mb-4">
    <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">Price:</label>
    <input type="number" id="price" name="price" value={formData.price} onChange={handleInputChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
  </div>
  <div className="mb-4">
    <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">Category:</label>
    <input type="text" id="category" name="categories" value={formData.categories} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
  </div>

  <div className="text-center">
    <button type="button" onClick={submitProduct} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
      Submit
    </button>
  </div>
</form>

    </div>
  );
}



  
  
  ///////////////
  const [formData, setFormData] = useState({ ...user });
  var selectedTheme;
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleThemeChange = (e) => {
    selectedTheme = e.target.value;
   
  };
  useEffect(() => {
    localStorage.setItem("current_theme", theme);
  }, [theme]);

  const handleSubmit = async(e) => {
    setTheme(selectedTheme)
    e.preventDefault();
    
    const userId = JSON.parse(localStorage.getItem("loggedInUser"))._id;
    const authToken = localStorage.getItem("authToken");
    try {
      const response = await axios.put(`http://localhost:5000/api/v1/users/update/${userId}`,
       { userId,...formData },
              {
                  headers: {
                      token: `Bearer ${authToken}`,
                  },
              }
            );
            console.log(user);
            console.log(formData);
            console.log(response.data);
      return response.data;
    
    } catch (error) {
      console.error("Error updating user details:", error);
      return null;
    }


  };



    
    

  return (
    <>
    {user.isAdmin &&  <ProductManagement/>}
    <div className="container">
      <h2 className="text-2xl font-bold mb-4">Settings</h2>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Phone Number :</label>
            <input
              type="phonenumber"
              name="phonenumber"
              value={formData.phonenumber}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Theme:</label>
            <select
              
              onChange={handleThemeChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          
          >
            Save
          </button>
        </form>
      </div>
    </div>
    </>
  );
}

export default Settings;
