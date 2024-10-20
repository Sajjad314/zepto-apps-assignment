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
        if(data.details.length>0){
          console.log(data);
          
        }else{
          setBook(data);
        }
        
      } catch (error) {
        console.error("Error fetching book details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) {
    return (
      <div className="spinner">
        <div className="spinner-icon"></div>
      </div>
    );
  }

  if (!book) {
    return (
      <p className="text-center mt-10 text-xl text-red-500">Book not found!</p>
    );
  }

  const coverImage =
    book.formats["image/jpeg"] || "https://via.placeholder.com/150";
  const authorName = book.authors[0]?.name || "Unknown Author";
  const downloadLinks = Object.entries(book.formats)
    .filter(([format]) => format.includes("text") || format.includes("epub"))
    .map(([format, url]) => ({ format, url }));

  return (
    <div className=" max-w-6xl mx-auto p-6">
      <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
        <img
          src={coverImage}
          alt={book.title}
          className="w-full md:w-1/2 h-auto"
        />
        <div className="p-6 flex-1 gap-3">
          <h1 className="text-3xl font-bold mb-2">{book.title}</h1>

          <p className="text-gray-700 mb-1">
            <span className="font-semibold">Author:</span> {authorName}
          </p>

          {book.authors[0]?.birth_year && (
            <p className="text-gray-700 mb-1">
              <span className="font-semibold">Author's Life:</span>{" "}
              {book.authors[0].birth_year} -{" "}
              {book.authors[0].death_year || "Present"}
            </p>
          )}

          {book.translators.length > 0 && (
            <p className="text-gray-700 mb-1">
              <span className="font-semibold">Translators:</span>{" "}
              {book.translators.join(", ")}
            </p>
          )}

          <p className="text-gray-700 mb-1">
            <span className="font-semibold">Genres:</span>
            <ul className="list-disc list-inside mt-2 space-y-1">
              {book.subjects.map((genre) => (
                <li
                  key={genre}
                  className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md inline-block mx-2"
                >
                  {genre}
                </li>
              ))}
            </ul>
          </p>

          <p className="text-gray-700 mb-1">
            <span className="font-semibold">Bookshelves:</span>
            <ul className="list-disc list-inside space-y-2 text-gray-500 mx-3">
              {book.bookshelves.map((shelf)=>{
                return(
                  <li key={shelf}>{shelf}</li>
                )
              })}
            </ul>
          </p>

          <p className="text-gray-500 mb-4">
            <span className="font-semibold">Languages:</span>{" "}
            {book.languages.join(", ")}
          </p>

          <p className="text-lg text-gray-700 mb-4">
            <span className="font-semibold">Download Count:</span>{" "}
            {book.download_count}
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
