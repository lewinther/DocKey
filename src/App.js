import './App.css';

import SearchBar from './SearchBar';

function App() {
  return (
    <div className="App">
      <SearchBar onSearch={(term) => console.log(term)} />
      {/* Other components and content */}
    </div>
  );
}

export default App;