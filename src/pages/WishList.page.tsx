import { useEffect, useState } from "react";
import BookCard from "../components/bookCard.component";
import { Book } from "../interface/bookCard.interface";

const Wishlist: React.FC = () => {

  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("")

  const fetchBooks = async (url:string) => {
    setLoading(true)
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch books.");
      const data = await response.json();
      
      setBooks(data.results);
      setError("")
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    if(favorites.length > 0){
      console.log(favorites);
      
      let url = "https://gutendex.com/books?ids=";
      url = url + favorites.join(",")
      fetchBooks(url)
    }else{
      setError("you haven't added any books to your wishlist yet")
    }
  },[])

    return (
      <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center">Favorite Books</h2>
      {loading && (
        <div className="spinner">
          <div className="spinner-icon"></div>
        </div>
      )}
      {!loading && error && <p className="text-center mt-8 text-red-500">{error}</p>}
      {!loading && <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <BookCard key={book.id} book={book} isWishListPage={true} />
        ))}
      </div>}
      {/* {filteredBooks.length>0 && 
        <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />} */}
    </div>
    );
  };
  
  export default Wishlist;
  