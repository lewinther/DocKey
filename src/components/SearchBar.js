import { Fragment, useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [search, setSearch] = useState("");

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
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search..."
        className="search-input"
      />
    </form>
    </Fragment>
  );
};

export default SearchBar;
