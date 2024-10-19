// src/components/Navbar.tsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi"; // Icons for open/close

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false); // State to toggle the menu

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Site Title */}
        <h1 className="text-white text-2xl font-bold">BookList App</h1>

        {/* Hamburger Menu Button for Mobile */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white md:hidden focus:outline-none"
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        {/* Navbar Links */}
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } md:flex md:items-center space-x-4`}
        >
          <Link
            to="/"
            className="block text-white hover:bg-blue-700 px-3 py-2 rounded-md"
          >
            Home
          </Link>
          <Link
            to="/wishlist"
            className="block text-white hover:bg-blue-700 px-3 py-2 rounded-md"
          >
            Wishlist
          </Link>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } md:hidden mt-2 space-y-2 bg-blue-500 p-4 rounded-md`}
      >
        <Link
          to="/"
          className="block text-white hover:bg-blue-700 px-3 py-2 rounded-md"
          onClick={() => setIsOpen(false)}
        >
          Home
        </Link>
        <Link
          to="/wishlist"
          className="block text-white hover:bg-blue-700 px-3 py-2 rounded-md"
          onClick={() => setIsOpen(false)}
        >
          Wishlist
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
