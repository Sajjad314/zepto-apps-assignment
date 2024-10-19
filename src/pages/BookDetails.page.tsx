import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IBookDetails } from "../interface/bookDetails.interface";

const BookDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get the book ID from the URL
  const [book, setBook] = useState<IBookDetails>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`https://gutendex.com/books/${id}`);
        const data = await response.json();
        setBook(data);
      } catch (error) {
        console.error("Error fetching book details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) {
    return <p className="text-center mt-10 text-xl">Loading book details...</p>;
  }

  if (!book) {
    return <p className="text-center mt-10 text-xl text-red-500">Book not found!</p>;
  }

  const coverImage = book.formats["image/jpeg"] || "https://via.placeholder.com/150";
  const authorName = book.authors[0]?.name || "Unknown Author";
  const genres = book.subjects.join(", ");
  const downloadLinks = Object.entries(book.formats)
    .filter(([format]) => format.includes("text") || format.includes("epub"))
    .map(([format, url]) => ({ format, url }));

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Cover Image */}
        <img
          src={coverImage}
          alt={book.title}
          className="w-full md:w-1/3 object-cover h-auto"
        />

        {/* Book Details */}
        <div className="p-6 flex-1">
          <h1 className="text-3xl font-bold mb-2">{book.title}</h1>

          <p className="text-gray-700 mb-1">
            <span className="font-semibold">Author:</span> {authorName}
          </p>

          {book.authors[0]?.birth_year && (
            <p className="text-gray-700 mb-1">
              <span className="font-semibold">Author's Life:</span>{" "}
              {book.authors[0].birth_year} - {book.authors[0].death_year || "Present"}
            </p>
          )}

          <p className="text-gray-700 mb-1">
            <span className="font-semibold">Genres:</span> {genres}
          </p>

          <p className="text-gray-500 mb-4">
            <span className="font-semibold">Languages:</span> {book.languages.join(", ")}
          </p>

          <p className="text-sm text-gray-500 mb-4">
            <span className="font-semibold">Download Count:</span> {book.download_count}
          </p>

          {/* Download Links */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Available Formats:</h2>
            <ul className="list-disc pl-5">
              {downloadLinks.map(({ format, url }, index) => (
                <li key={index}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {format}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
