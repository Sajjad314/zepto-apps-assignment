import React, { useRef, useState, useEffect } from "react";

interface SearchAndFilterProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedGenre: string;
  setSelectedGenre: (genre: string) => void;
  genres: { key: string; value: string }[];
  handleSearch: () => void;
  setCurrentPage: (val: number) => void;
  setTotalPages: (val: number) => void;
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  searchTerm,
  setSearchTerm,
  selectedGenre,
  setSelectedGenre,
  genres,
  handleSearch,
  setCurrentPage,
  setTotalPages,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [genreSearchTerm, setGenreSearchTerm] = useState<string>("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredGenres = genres.filter((genre) =>
    genre.key.toLowerCase().includes(genreSearchTerm.toLowerCase())
  );

  const handleGenreChange = (genre: string) => {
    setSelectedGenre(genre);
    setCurrentPage(1);
    setTotalPages(1);
    localStorage.setItem("genre", genre);
    setIsDropdownOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
      <div className="flex gap-5">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        <button
          className="p-1 rounded-md bg-teal-400 text-lg text-white font-medium px-4"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      <div className="relative w-64" ref={dropdownRef}>
        <div
          className="p-2 border border-gray-500 rounded-md cursor-pointer flex items-center justify-between"
          onClick={() => setIsDropdownOpen((prev) => !prev)}
        >
          <span>{selectedGenre ? selectedGenre : "Select a genre..."}</span>
          <svg
            className={`w-5 h-5 transition-transform duration-200 ${
              isDropdownOpen ? "rotate-180" : ""
            }`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
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
                All Genre
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
  );
};

export default SearchAndFilter;
