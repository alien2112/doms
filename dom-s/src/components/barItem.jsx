import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const BarItem = ({ name, to }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <li className="relative underlinee">
      <NavLink 
        to={to} 
        className="text-lg font-semibold"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {name}
      </NavLink>
      <div 
        className={`absolute  bottom-0 border-b-4 ${isHovered ? 'border-amber-600' : 'border-transparent'} inset-x-0`}
        style={{ transition: 'border-color 0.5s' }}
      ></div>
    </li>
  );
};

export default BarItem;
