import { Fragment, useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    setSearch(e.target.value);
    onSearch(e.target.value); // updates the search term on each change in input
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(search);
  };

  return (
    <Fragment>
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={search}
        onChange={handleChange}
        placeholder="🔍︎ Search..."
        className="search-input"
      />
    </form>
    </Fragment>
  );
};

export default SearchBar;
