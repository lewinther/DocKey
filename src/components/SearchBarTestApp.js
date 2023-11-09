import React, { useState } from "react";
import "./App.css";
import "./styles.css";
import SearchBar from "./SearchBar";

function App() {
  const [messages, setMessages] = useState([
    { id: 1, content: "Hello there friends" },
    { id: 2, content: "How are you doing?" },
    { id: 3, content: "Testing 1 2 3" },
    { id: 4, content: "Hello again" },
  ]);
  const [filteredMessages, setFilteredMessages] = useState(messages);

  const handleSearch = (term) => {
    if (term) {
      const results = messages.filter((message) =>
        message.content.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredMessages(results);
    } else {
      setFilteredMessages(messages);
    }
  };

  return (
    <div className="App">
      <SearchBar onSearch={handleSearch} />
      <div className="inbox-messages">
        {filteredMessages.map((message) => (
          <div key={message.id} className="message">
            {message.content}
          </div>
        ))}
      </div>
      {/* Other components and content */}
    </div>
  );
}

export default App;
