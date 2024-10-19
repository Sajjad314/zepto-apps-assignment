// src/components/BookCard.tsx
import { Book } from "../interface/bookCard.interface";
import { useState } from "react";

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const coverImage = book.formats["image/jpeg"] || "https://via.placeholder.com/150";
  const authorName = book.authors[0]?.name || "Unknown Author";
  const genre = book.subjects[0] || "Unknown Genre";

  // State to track if the book is favorited
  const [isFavorited, setIsFavorited] = useState<boolean>(false);

  // Function to toggle favorite status
  const toggleFavorite = () => {
    setIsFavorited((prev) => !prev);
  };

  return (
    <div className="bg-white shadow-md rounded-md overflow-hidden p-4">
      <img
        src={coverImage}
        alt={book.title}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <h3 className="text-xl font-bold mb-2">{book.title}</h3>
      <p className="text-gray-700 mb-1">
        <span className="font-semibold">Author:</span> {authorName}
      </p>
      <p className="text-gray-700 mb-1">
        <span className="font-semibold">Genre:</span> {genre}
      </p>
      <p className="text-gray-500 text-sm">ID: {book.id}</p>
      
      {/* Heart Icon for Favorite */}
      <button
        onClick={toggleFavorite}
        className={`mt-4 text-2xl focus:outline-none ${isFavorited ? 'text-red-500' : 'text-gray-400'}`}
      >
        {isFavorited ? (
          <span>&#9829;</span> // Filled heart
        ) : (
          <span>&#9825;</span> // Empty heart
        )}
      </button>
    </div>
  );
};

export default BookCard;
