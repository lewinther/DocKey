import { useState } from "react";

const DockFilter = ({ onDockSelect, usernames }) => {
  const [username, setUsername] = useState("");

  const handleSelectionChange = (selectedDockNumber) => {
    onDockSelect(selectedDockNumber);
  };

  const handleChange = (e) => {
    const newUsername = usernames.find(x => x == e.target.value);
    setUsername(newUsername);
    handleSelectionChange(newUsername);
  };

  return (
    <form className="dock-select-form" onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="dock-select" className="dock-select-label">
        <select
          id="dock-select"
          value={username}
          onChange={handleChange}
          className="dock-select"
        >
          <option value="">Choose a dock number to contact</option>
          {usernames.map(username => (
            <option key={username} value={username}>
              {username}
            </option>
          ))}
        </select>
      </label>
    </form>
  );
};

export default DockFilter;
