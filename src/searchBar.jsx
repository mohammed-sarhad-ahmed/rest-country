import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export function SearchBar({ mode, onSetQuery, query }) {
  return (
    <div
      className={`search-bar ${
        mode === "light"
          ? "light-mode-input white-bg "
          : "white dark-mode-el-bg "
      }`}
    >
      <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
      <input
        className="search-input"
        type="text"
        placeholder="Search for a country..."
        value={query}
        onChange={(e) => onSetQuery(e.target.value)}
      />
    </div>
  );
}
