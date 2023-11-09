import { useState } from "react";

const DockFilter = ({ onDockSelect, dockNumbers }) => {
  const [dockNumber, setDockNumber] = useState("");

  const handleSelectionChange = (selectedDockNumber) => {
    onDockSelect(selectedDockNumber);
  };

  const handleChange = (e) => {
    const newDockNumber = e.target.value;
    setDockNumber(newDockNumber);
    handleSelectionChange(newDockNumber);
  };

  return (
    <form className="dock-select-form" onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="dock-select" className="dock-select-label">
        <select
          id="dock-select"
          value={dockNumber}
          onChange={handleChange}
          className="dock-select"
        >
          <option value="">Choose dock number</option>
          {dockNumbers.map((number) => (
            <option key={number} value={number}>
              {number}
            </option>
          ))}
        </select>
      </label>
    </form>
  );
};

export default DockFilter;
