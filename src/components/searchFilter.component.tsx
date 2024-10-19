
const SearchFilter = ({ search, setSearch, genre, setGenre, genres }:{search:string, setSearch:Function, genre:string, setGenre:Function, genres:string[]}) => (
  <div className="search-filter">
    <input
      type="text"
      placeholder="Search by title..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="search-bar"
    />
    <select
      value={genre}
      onChange={(e) => setGenre(e.target.value)}
      className="filter-dropdown"
    >
      {genres.map((g) => (
        <option key={g} value={g}>
          {g}
        </option>
      ))}
    </select>
  </div>
);

export default SearchFilter;
