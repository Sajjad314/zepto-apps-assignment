import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className=" bg-teal-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
      <Link
          to="/" className="text-white text-2xl font-bold cursor-pointer">Gutendex</Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white md:hidden focus:outline-none"
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
        {!isOpen && <div
          className={`${
            isOpen ? "block" : "hidden"
          } md:flex md:items-center space-x-4`}
        >
          <Link
            to="/"
            className="block text-white hover:bg-teal-700 px-3 py-2 rounded-md cursor-pointer"
          >
            Home
          </Link>
          <Link
            to="/wishlist"
            className="block text-white hover:bg-teal-700 px-3 py-2 rounded-md cursor-pointer"
          >
            Wishlist
          </Link>
        </div>}
      </div>
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } md:hidden mt-2 space-y-2 bg-teal-500 p-4 rounded-md cursor-pointer`}
      >
        <Link
          to="/"
          className="block text-white hover:bg-teal-700 px-3 py-2 rounded-md cursor-pointer"
          onClick={() => setIsOpen(false)}
        >
          Home
        </Link>
        <Link
          to="/wishlist"
          className="block text-white hover:bg-teal-700 px-3 py-2 rounded-md cursor-pointer"
          onClick={() => setIsOpen(false)}
        >
          Wishlist
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
