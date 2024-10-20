import { useEffect, useState } from "react";
import BookCard from "../components/bookCard.component";
import { Book } from "../interface/bookCard.interface";
import Pagination from "../components/pagination.component";
import SearchAndFilter from "../components/searchAndFilter.component";

const Home: React.FC = () => {
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>(
    localStorage.getItem("search") || ""
  );
  const [selectedGenre, setSelectedGenre] = useState<string>(
    localStorage.getItem("genre") || ""
  );
  const [genres, setGenres] = useState<{ key: string; value: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const fetchBooks = async (pageNo: number, searchQuery: string) => {
    setLoading(true);
    let url = `https://gutendex.com/books?page=${pageNo}`;
    if (searchQuery.length > 0) {
      url = url + `&search=${searchTerm}`;
    }
    if (selectedGenre.length > 0) {
      url = url + `&topic=${selectedGenre}`;
    }
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch books.");
      const data = await response.json();
      setTotalPages(Math.ceil(data.count / Math.max(data.results.length, 32)));
      setTimeout(() => {
        setFilteredBooks(data.results);
      }, 500);
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
    fetchBooks(1, searchTerm);
  }, [selectedGenre]);

  const handleSearch = () => {
    setCurrentPage(1);
    setTotalPages(1);
    fetchBooks(1, searchTerm);
    localStorage.setItem("search", searchTerm);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchBooks(page, searchTerm);
  };

  return (
    <div className=" py-6 px-12 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center">Book List</h2>

      <SearchAndFilter
        genres={genres}
        handleSearch={handleSearch}
        searchTerm={searchTerm}
        selectedGenre={selectedGenre}
        setCurrentPage={setCurrentPage}
        setSearchTerm={setSearchTerm}
        setSelectedGenre={setSelectedGenre}
        setTotalPages={setTotalPages}
      />

      {loading && (
        <div className="spinner">
          <div className="spinner-icon"></div>
        </div>
      )}
      {!loading && error && filteredBooks.length > 0 && (
        <p className="text-center mt-8 text-red-500">{error}</p>
      )}
      {!loading && (
        <div className={`grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6`}>
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} isWishListPage={false} />
          ))}
        </div>
      )}
      {!loading && filteredBooks.length === 0 && (
        <h1 className="text-center mt-8 font-bold">
          No available books found yet!!!
        </h1>
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
