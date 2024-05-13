import React from 'react';
import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="px-4 py-2 mx-auto flex justify-between items-center">
        <nav className="flex gap-4 font-bold left-full">
          <NavLink to="/about" className="text-gray-500 hover:text-gray-900 transition duration-300">
            About
          </NavLink>
          <a href="#" className="text-gray-500 hover:text-gray-900 transition duration-300">
            Team
          </a>
          <a href="#" className="text-gray-500 hover:text-gray-900 transition duration-300">
            Pricing
          </a>
          <NavLink to="/contact" className="text-gray-500 hover:text-gray-900 transition duration-300">
            Contact
          </NavLink>
          <a href="#" className="text-gray-500 hover:text-gray-900 transition duration-300">
            Terms
          </a>
        </nav>
        <div className="border-r border-gray-200 h-8"></div> {/* Vertical line */}
        <div className="flex flex-col items-center">
          <div className="text-gray-500 mb-2">Phone: +20106500046</div>
          <div className="flex space-x-6">
            <a href="https://www.facebook.com/doms.egypt/" className="text-gray-500 hover:text-gray-900 transition duration-300">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M2 12c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12zm13.118-3.008h-1.425c-.188 0-.353.145-.353.333v1.645h2.14a.347.347 0 00.35-.332v-1.646c0-.188-.164-.333-.352-.333zm1.31 3.005h-3.465v6.695c0 .185-.15.334-.333.334h-1.973a.332.332 0 01-.334-.334v-6.695H7.296a.333.333 0 01-.334-.333l-.002-1.917c0-.184.15-.333.334-.333h1.414v-.943c0-1.26.647-1.966 1.994-1.966h1.728c.184 0 .334.15.334.333l.002.944h1.568c.185 0 .334.15.334.333v1.915a.333.333 0 01-.333.334z" clipRule="evenodd"/>
              </svg>
            </a>
            <a href="https://www.instagram.com/doms.egypt/" className="text-gray-500 hover:text-gray-900 transition duration-300">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M12 2.162c3.204 0 3.582.012 4.858.07 1.22.055 1.95.246 2.478.417.658.205 1.13.458 1.63.957.498.5.752.972.957 1.63.17.527.363 1.258.417 2.478.058 1.276.07 1.654.07 4.858s-.012 3.582-.07 4.858c-.055 1.22-.246 1.95-.417 2.478a4.88 4.88 0 01-.957 1.63c-.5.498-.972.752-1.63.957-.528.171-1.258.363-2.478.417-1.276.058-1.654.07-4.858.07s-3.582-.012-4.858-.07c-1.22-.055-1.95-.246-2.478-.417a4.88 4.88 0 01-1.63-.957c-.498-.5-.752-.972-.957-1.63a5.162 5.162 0 01-.417-2.478c-.058-1.276-.07-1.654-.07-4.858s.012-3.582.07-4.858c.055-1.22.246-1.95.417-2.478.205-.658.458-1.13.957-1.63.5-.498.972-.752 1.63-.957.528-.17 1.258-.363 2.478-.417 1.276-.058 1.654-.07 4.858-.07zM12 0C8.741 0 8.343.014 7.06.072 5.515.144 4.45.336 3.5.785c-1.018.426-1.85 1.258-2.276 2.276C.335 4.45.144 5.515.072 7.06.012 8.343 0 8.741 0 12c0 3.259.014 3.657.072 4.94.072 1.545.264 2.61.713 3.56.426 1.018 1.258 1.85 2.276 2.276C3.55 23.665 4.515 23.856 6.06 23.928 7.343 23.988 7.741 24 12 24c3.259 0 3.657-.014 4.94-.072 1.545-.072 2.61-.264 3.56-.713 1.018-.426 1.85-1.258 2.276-2.276.449-.949.641-2.015.713-3.56.058-1.283.072-1.681.072-4.94 0-3.259-.014-3.657-.072-4.94-.072-1.545-.264-2.61-.713-3.56-.426-1.018-1.258-1.85-2.276-2.276C20.45.335 19.485.144 17.94.072 16.657.012 16.259 0 12 0zm0 5.162a6.84 6.84 0 100 13.68 6.84 6.84 0 000-13.68zm0 2.433a4.407 4.407 0 110 8.814 4.407 4.407 0 010-8.814zM18.032 4.5a1.968 1.968 0 11-3.937 0 1.968 1.968 0 013.937 0z" clipRule="evenodd"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
