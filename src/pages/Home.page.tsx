import { useEffect, useState, useRef } from "react";
import BookCard from "../components/bookCard.component";
import { Book } from "../interface/bookCard.interface";
import Pagination from "../components/pagination.component";

const Home: React.FC = () => {
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>(localStorage.getItem("search") || "");
  const [selectedGenre, setSelectedGenre] = useState<string>(localStorage.getItem("genre") || "");
  const [genres, setGenres] = useState<{ key: string; value: string }[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [genreSearchTerm, setGenreSearchTerm] = useState<string>("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const fetchBooks = async (pageNo: number, searchQuery: string) => {
    setLoading(true);
    let url = `https://gutendex.com/books?page=${pageNo}`;
    if (searchQuery.length > 0) {
      url = url + `&search=${searchTerm}`;
    }
    if(selectedGenre.length>0){
      url = url + `&topic=${selectedGenre}`
    }
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch books.");
      const data = await response.json();
      setTotalPages(Math.ceil(data.count / Math.max(data.results.length, 32)));
      setFilteredBooks(data.results);
      extractGenres(data.results);
      setError("");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const extractGenres = (books: Book[]) => {
    const allGenres = books.flatMap((book) => book.subjects);
    const uniqueGenres = [...new Set(allGenres)];
    const keyValueArray = uniqueGenres.map((str) => ({
      key: str,
      value: str.toLowerCase(),
    }));
    setGenres(keyValueArray);
  };

  useEffect(() => {
    fetchBooks(1, "");
  }, []);

  useEffect(() => {
    fetchBooks(1, searchTerm);
  }, [selectedGenre]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleGenreChange = (genre: string) => {
    setSelectedGenre(genre);
    setCurrentPage(1)
    localStorage.setItem("genre", genre);
    setIsDropdownOpen(false);
  };

  const handleSearch = () => {
    setCurrentPage(1);
    fetchBooks(1, searchTerm);
    localStorage.setItem("search", searchTerm);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchBooks(page, searchTerm);
  };

  const filteredGenres = genres.filter((genre) =>
    genre.key.toLowerCase().includes(genreSearchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center">Book List</h2>

      {/* Search Bar and Genre Filter */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex gap-5">
          <input
            type="text"
            placeholder="Search by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            className="p-1 rounded-md bg-blue-400 text-lg font-medium px-4"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>

        {/* Searchable Genre Dropdown */}
        <div className="relative w-64" ref={dropdownRef}>
          <div
            className="p-2 border border-gray-300 rounded-md cursor-pointer"
            onClick={() => setIsDropdownOpen((prev) => !prev)}
          >
            {selectedGenre ? selectedGenre : "Select a genre..."}
          </div>

          {isDropdownOpen && (
            <div className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg">
              <input
                type="text"
                className="p-2 w-full border-b border-gray-300 focus:outline-none"
                placeholder="Search genres..."
                value={genreSearchTerm}
                onChange={(e) => setGenreSearchTerm(e.target.value)}
              />
              <ul className="max-h-40 overflow-y-auto">
              <li
                    key={"All genre"}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleGenreChange("")}
                  >
                    {"All Genre"}
                  </li>
                {filteredGenres.map((genre) => (
                  <li
                    key={genre.value}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleGenreChange(genre.value)}
                  >
                    {genre.key}
                  </li>
                ))}
                {filteredGenres.length === 0 && (
                  <li className="p-2 text-gray-500">No genres found</li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>

      {loading && <p className="text-center mt-8">Loading books...</p>}
      {!loading && error && <p className="text-center mt-8 text-red-500">{error}</p>}
      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} isWishListPage={false} />
          ))}
        </div>
      )}
      {filteredBooks.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default Home;
