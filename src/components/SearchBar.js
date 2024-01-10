import { Fragment, useState } from "react";

const SearchBar = ({ onSearch }) => {
  // onSearch is a function passed from the parent
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    setSearch(e.target.value);
    onSearch(e.target.value); // updates the search term on each change in input
  };

  return (
    <Fragment>
    <form>
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
