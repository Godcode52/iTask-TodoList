import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex justify-between bg-indigo-900 text-white py-2">
      <span className="font-bold text-xl mx-8">iTask</span>
      <ul className="flex gap-8 mx-9">
        <li className="cursor-pointer hover:font-bold transition-all">
          <Link to="/">Home</Link>
        </li>
        <li className="cursor-pointer hover:font-bold transition-all">
          <Link to="/tasks">Your Tasks</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
