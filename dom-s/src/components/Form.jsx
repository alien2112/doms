import React, { useState,useEffect } from "react";
import axios from "axios"; 
import { json } from "react-router-dom";

function Form({ user,setUser,setIsSignedIn, theme }) {
  const [action, setAction] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
    phonenumber: "",
  });
  useEffect(() => {
    // Check if there's a stored authentication token in localStorage
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      // If there's a token, automatically log in the user
      setIsSignedIn(true);
      setUser(JSON.parse(localStorage.getItem("loggedInUser")))
    }
  }, []);
  var userData ={}
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { username, password } = formData;
      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/login",
        { username, password }
      );
      console.log("Login successful:", response.data);
      setIsSignedIn(true);
       userData = {
        _id:response.data._id,
        username:response.data.username,
        phonenumber:response.data.phonenumber,
        isAdmin:response.data.isAdmin
      };
      setUser(userData)
localStorage.setItem("loggedInUser",JSON.stringify(userData))
      // Store the authentication token in localStorage
localStorage.setItem("authToken", response.data.accessToken);
console.log("Authentication token stored in localStorage:", response.data.accessToken);


      

      // Optionally, reset the form after successful login
      setFormData({
        username: "",
        password: "",
        repeatPassword: "",
        email: "",
        phonenumber: "",
      });
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };


  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // Destructure formData to exclude repeatPassword
      const { repeatPassword, ...formDataWithoutRepeatPassword } = formData;

      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/register",
        formDataWithoutRepeatPassword
      );

      console.log("Registration successful:", response.data);

      // Optionally, reset the form after successful registration
      setFormData({
        username: "",
        email: "",
        password: "",
        repeatPassword: "",
        phonenumber: "",
      });
    } catch (error) {
      console.error("Error registering:", error);
    }
  };

  const handleSubmit = action === "Login" ? handleLogin : handleRegister;

  return (
    <div className="min-h-screen max-w-sm mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="header">
          <div className="text-center p-2 text-xl">
            {action === "Login" ? "Welcome back" : "Register"}
          </div>
        </div>
        <div className="inputs">
          <div className="mb-5">
            <label
              htmlFor="username"
              className={`block mb-2 text-sm font-medium ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder=""
              required
            />
          </div>
          {action==="Login" &&(
                          <div className="mb-5">
                          <label
                            htmlFor="password"
                            className={`block mb-2 text-sm font-medium ${
                              theme === "dark" ? "text-white" : "text-gray-900"
                            }`}
                          >
                            Your password
                          </label>
                          <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                            required
                          />
                        </div>
          )}
          {action === "Sign up" && (
            <>
              <div className="mb-5">
                <label
                  htmlFor="email"
                  className={`block mb-2 text-sm font-medium ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
                >
                  Your email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  placeholder=""
                  required
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="password"
                  className={`block mb-2 text-sm font-medium ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
                >
                  Your password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  required
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="repeat-password"
                  className={`block mb-2 text-sm font-medium ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
                >
                  Repeat password
                </label>
                <input
                  type="password"
                  id="repeat-password"
                  name="repeatPassword"
                  value={formData.repeatPassword}
                  onChange={handleChange}
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  required
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="phonenumber"
                  className={`block mb-2 text-sm font-medium ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
                >
                  Phone number
                </label>
                <input
                  type="text"
                  id="phonenumber"
                  name="phonenumber"
                  value={formData.phonenumber}
                  onChange={handleChange}
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  required
                />
              </div>
            </>
          )}
        </div>
        <div className="forgot-password">
          {action === "Login" ? (
            <>
              Forgot password <span>click</span>
            </>
          ) : null}
        </div>
        <div className="submit-container">
          <button
            type="submit"
            className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ${
              theme === "dark" ? "dark:bg-blue-600" : ""
            } m-1 ${
              action === "Sign up"
                ? "dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                : ""
            }`}
          >
            {action === "Sign up" ? "Sign up" : "Login"}
          </button>
          <button
            className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ${
              theme === "dark" ? "dark:bg-blue-600" : ""
            } m-1 ${
              action === "Login"
                ? "dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                : ""
            }`}
            onClick={() => {
              setAction(action === "Login" ? "Sign up" : "Login");
            }}
          >
            {action === "Login" ? "Sign up" : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form;
