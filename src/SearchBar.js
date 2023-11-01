import {useState} from 'react';

const SearchBar = ({ onSearch }) => {
    const [term, setTerm] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onSearch(term);
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Search..."
        />
        <button type="submit">Search</button>
      </form>
    );
  };
  
  export default SearchBar;