import React, { useContext } from 'react';
import "./bar.css";
import Logo22 from "../assets/Logo22.png";
import search_icon_light from "../assets/search-w.png";
import search_icon_dark from "../assets/search-b.png";
import toggle_light from "../assets/night.png";
import toggle_dark from "../assets/day.png";
import { Link, NavLink } from "react-router-dom";
import BarItem from "./barItem";
import { Button } from "react-bootstrap"
import { CartContext } from '../context/cart-context';
function Bar({ theme, setTheme }) {
  const {getCount,openCart} = useContext(CartContext)
  function toggle_theme() {
    theme == "light" ? setTheme("dark") : setTheme("light");
  }

  return (
    <div className={theme==="dark"? `dark`:``}>
      <div className="navbar flex-col md:flex-row justify-between items-center ">
        <a href="#first">
        <img
          src={theme == "light" ? Logo22 : Logo22}
          alt=""
          className="logo xs:ml-28"
          
        />
        </a>
        <ul className="  sm:mr-28 ">
        <BarItem name="Home" to="/" />
  <BarItem name="Menu" to="/menu" />
  <BarItem name="Account" to="/account" />
        </ul>
        {/* <div className="search-box">
          <input type="text" placeholder="search" />
          <img
            src={theme == "light" ? search_icon_light : search_icon_dark}
            alt=""
          />
        </div> */}
     <div className="flex justify-center">
          <Button
            
            style={{ width: "3rem", height: "3rem", position: "relative" }}
            variant="outline-primary"
            className="rounded-circle"
          >
            <Link to='/cart'>            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
              fill="currentColor"
            >
              <path d="M96 0C107.5 0 117.4 8.19 119.6 19.51L121.1 32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24C0 10.75 10.75 0 24 0H96zM128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464zM512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464z" />
            </svg>
            </Link>
       
            <div
              className="rounded-circle bg-danger d-flex justify-content-center align-items-center"
              style={{
                color : theme=='dark'? 'white':'black',
                width: "1.5rem",
                height: "1.5rem",
                position: "absolute",
                bottom: 0,
                right: 0,
                transform: "translate(50%, 45%)",
                fontWeight:700,
              }}
           
           >
              {getCount}
            </div>
          </Button>
          </div>

        <img
          src={theme == "light" ? toggle_light : toggle_dark}
          alt=""
          className="toggle-icon justify-between items-center"
          onClick={toggle_theme}
        />
      </div>
    </div>
  );
}

export default Bar;
