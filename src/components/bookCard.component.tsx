// src/components/BookCard.tsx
import { Book } from "../interface/bookCard.interface";
import { useEffect, useState } from "react";
import filledHeart from "../assets/heart_fiiled.png";
import heart from "../assets/heart.png";
import { Link } from "react-router-dom";

interface BookCardProps {
  book: Book;
  isWishListPage: boolean;
}

const BookCard: React.FC<BookCardProps> = ({ book, isWishListPage }) => {
  const coverImage =
    book.formats["image/jpeg"] || "https://via.placeholder.com/150";
  const authorName = book.authors[0]?.name || "Unknown Author";
  const genre = book.subjects || "Unknown Genre";

  const [isFavorited, setIsFavorited] = useState<boolean>(false);

  const handleFavoriteClick = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

    let updatedFavorites;
    if (isFavorited) {
      updatedFavorites = favorites.filter((id: number) => id !== book.id);
    } else {
      updatedFavorites = [...favorites, book.id];
    }

    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setIsFavorited(!isFavorited);
  };

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    if (favorites.find((f_id: number) => book.id === f_id)) {
      setIsFavorited(true);
    } else {
      setIsFavorited(false);
    }
  }, [book.id]);

  return (
    <div className="bg-white shadow-md rounded-md overflow-hidden">
      <img
        src={coverImage}
        alt={book.title}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <div className=" overflow-hidden mx-4 mb-2">
        <div className=" flex gap-2 justify-between">
          <Link
            to={`/book/${book.id}`}
            className="text-xl font-bold mb-2 cursor-pointer"
          >
            {book.title}
          </Link>
          {!isWishListPage && (
            <div>
              <img
                src={isFavorited ? filledHeart : heart}
                alt="heart icon"
                width={30}
                height={30}
                className="cursor-pointer"
                onClick={handleFavoriteClick}
              />
            </div>
          )}
        </div>
        <p className="text-gray-700 mb-1">
          <span className="font-semibold">Author:</span> {authorName}
        </p>
        <p className="text-gray-700 mb-1">
          <span className="font-semibold">Genre:</span> {genre.join(", ")}
        </p>
        <p className="text-gray-500 text-sm">ID: {book.id}</p>
      </div>
    </div>
  );
};

export default BookCard;
