import { ChangeEvent, useEffect, useState } from "react";
import BookCard from "../components/bookCard.component";
import { Book } from "../interface/bookCard.interface";
import Pagination from "../components/pagination.component";

const Home: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedGenre, setSelectedGenre] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const fetchBooks = async (pageNo:number, searchQuery:string) => {
    setLoading(true)
    let url = `https://gutendex.com/books?page=${pageNo}`
    if(searchQuery.length>0 ){
      url = url +`&search=${searchTerm}`
    }
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch books.");
      const data = await response.json();
      if(data.count>32)setTotalPages(Math.ceil(data.count/32));
      else setTotalPages(Math.ceil(data.count/data.results.length));
      
      setBooks(data.results);
      setFilteredBooks(data.results); 
      setError("")
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchBooks(1,"");
  }, []);

  // Handle Genre Change
  const handleGenreChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const genre = event.target.value;
    setSelectedGenre(genre);
    filterBooks(searchTerm, genre);
  };

  // Filter Books Based on Search Term and Selected Genre
  const filterBooks = (term: string, genre: string) => {
    let filtered = books;

    if (term) {
      filtered = filtered.filter((book) =>
        book.title.toLowerCase().includes(term)
      );
    }

    if (genre) {
      filtered = filtered.filter((book) =>
        book.subjects.some((subject) =>
          subject.toLowerCase().includes(genre.toLowerCase())
        )
      );
    }

    setFilteredBooks(filtered);
  };

  const handleSearch = () =>{
    setCurrentPage(1);
    fetchBooks(1,searchTerm);
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchBooks(page,searchTerm)
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center">Book List</h2>

      {/* Search Bar and Genre Filter */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className=" flex gap-5">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className=" p-1 rounded-md bg-blue-400 text-lg font-medium px-4" onClick={()=>handleSearch()}>Search</button>
        </div>

        <select
          value={selectedGenre}
          onChange={handleGenreChange}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Genres</option>
          <option value="fiction">Fiction</option>
          <option value="adventure">Adventure</option>
          <option value="romance">Romance</option>
          <option value="history">History</option>
        </select>
      </div>

      
      {loading && <p className="text-center mt-8">Loading books...</p>}
      {!loading && error && <p className="text-center mt-8 text-red-500">{error}</p>}
      {!loading && <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.map((book) => (
          <BookCard key={book.id} book={book} isWishListPage={false} />
        ))}
      </div>}
      {filteredBooks.length>0 && 
        <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />}
    </div>
  );
};

export default Home;
