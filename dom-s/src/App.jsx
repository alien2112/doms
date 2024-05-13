import React, { useEffect, useState } from "react";
import Bar from "./components/bar";
import Footer from "./components/Footer";
import Home from "./pages/home";
import Menu from "./pages/menu";
import About from "./pages/about";
import Account from "./pages/account";
import Cart from "./pages/cart";
import Checkout from "./pages/checkout";
import Contact from "./pages/contact";
import NotFound from "./pages/NotFound";
import ItemPage from "./pages/ItemPage"
import {CartContextProvider} from './context/cart-context'


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";

function App() {

  const current_theme = localStorage.getItem("current_theme");
  const [theme, setTheme] = useState(current_theme ? current_theme : "light");
  useEffect(() => {
    localStorage.setItem("current_theme", theme);
  }, [theme]);
  return (
    <CartContextProvider>
    <div
      className={
        " " + (theme === `light` ? `bg-[#eceffd]` : `bg-[#171717]`)
      }
    >

      <Router>
        <Bar className="navbar" theme={theme} setTheme={setTheme} />
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route path="/account" element={<Account theme={theme} setTheme={setTheme}/>}/>
          <Route path="/about" element={<About/>} />
          <Route path="/menu" element={<Menu/>} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/checkout" element={<Checkout/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/item/:id" element={<ItemPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
   
    </div>
    </CartContextProvider>
  );
}

export default App;
