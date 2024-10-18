import "../styles/totalSelect.css";

const TotalSelect = ({ selectedCount, setSelectedCount }) => {
  const handleButtonClear = () => {
    setSelectedCount(0);
  };

  return (
    <div className="total-select-container">
      <span className="title">Total Selected Student: {selectedCount}</span>
      <button className="Clear-button" onClick={handleButtonClear}>Clear</button>
    </div>
  );
}

export default TotalSelect;
