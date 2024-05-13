import React, { useContext, useState } from "react";
import axios from "axios";
import { CartContext } from "../context/cart-context";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Checkout() {
  var totalPrice = 20;
  const [paymentMethod, setPaymentMethod] = useState("creditCard");
  const [address, setAddress] = useState({
    street: "",
    city: "",
  });
  const [creditCard, setCreditCard] = useState({
    cardNumber: "",
    expirationDate: "",
    cvv: "",
  });
  const deliveryFee = 20;

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
  };

  const handleCreditCardChange = (e) => {
    const { name, value } = e.target;
    setCreditCard({ ...creditCard, [name]: value });
  };

  const handleOrderPlacement = async (e) => {
    e.preventDefault();

    try {
      const cartId = localStorage.getItem("cartId");
      const authToken = localStorage.getItem("authToken");
      const userId = JSON.parse(localStorage.getItem("loggedInUser"))._id;

      if (cartId) {
        const cart = await axios.get(`http://localhost:5000/api/v1/carts/find/${cartId}`, {
          headers: {
            token: `Bearer ${authToken}`,
          },
        });

        const orderResponse = await axios.post(
          "http://localhost:5000/api/v1/orders/create",
          {
            userId,
            products: cart.data.products,
            amount: 50,
            paymentMethod,
            address,
            creditCard: paymentMethod === "creditCard" ? creditCard : null,
          },
          {
            headers: {
              token: `Bearer ${authToken}`,
            },
          }
        );

        console.log("Order placed successfully:", orderResponse.data, cart.data.product);
        toast.success('Order placed successfully')
        localStorage.removeItem('cartId');
      }
      clearCart();
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-4">Checkout</h1>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-2/3 pr-8">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Address Information</h2>
            <form onSubmit={handleOrderPlacement}>
              <div className="mb-4">
                <label htmlFor="street" className="block text-sm font-medium text-gray-700">
                  Street
                </label>
                <input
                  type="text"
                  id="street"
                  name="street"
                  value={address.street}
                  onChange={handleAddressChange}
                  className="mt-1 p-2 block w-full border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={address.city}
                  onChange={handleAddressChange}
                  className="mt-1 p-2 block w-full border-gray-300 rounded-md"
                />
              </div>
            </form>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
            <form onSubmit={handleOrderPlacement}>
              {paymentMethod === "creditCard" && (
                <div>
                  <div className="mb-4">
                    <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
                      Card Number
                    </label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      value={creditCard.cardNumber}
                      onChange={handleCreditCardChange}
                      className="mt-1 p-2 block w-full border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="expirationDate" className="block text-sm font-medium text-gray-700">
                      Expiration Date
                    </label>
                    <input
                      type="text"
                      id="expirationDate"
                      name="expirationDate"
                      value={creditCard.expirationDate}
                      onChange={handleCreditCardChange}
                      className="mt-1 p-2 block w-full border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
                      CVV
                    </label>
                    <input
                      type="text"
                      id="cvv"
                      name="cvv"
                      value={creditCard.cvv}
                      onChange={handleCreditCardChange}
                      className="mt-1 p-2 block w-full border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              )}
              <div className="flex items-center">
                <input
                  type="radio"
                  id="creditCard"
                  name="paymentMethod"
                  value="creditCard"
                  checked={paymentMethod === "creditCard"}
                  onChange={handlePaymentMethodChange}
                  className="form-radio h-5 w-5 text-indigo-600"
                />
                <label htmlFor="creditCard" className="ml-2 text-sm text-gray-700">
                  Credit Card
                </label>
              </div>
              <div className="flex items-center mt-2">
                <input
                  type="radio"
                  id="payOnDelivery"
                  name="paymentMethod"
                  value="payOnDelivery"
                  checked={paymentMethod === "payOnDelivery"}
                  onChange={handlePaymentMethodChange}
                  className="form-radio h-5 w-5 text-indigo-600"
                />
                <label htmlFor="payOnDelivery" className="ml-2 text-sm text-gray-700">
                  Pay on Delivery
                </label>
              </div>
              <button
                type="submit"
                className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600 mt-4"
              >
                Place Order
              </button>
            </form>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 mt-4">
           { totalPrice >0 && ( <p>Total Price : {totalPrice}</p>)}
           <ToastContainer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
