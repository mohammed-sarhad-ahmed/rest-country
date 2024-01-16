import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-regular-svg-icons";
import { faSun } from "@fortawesome/free-regular-svg-icons";

export default function Mode({ mode, onModeChange }) {
  return (
    <div className="mode-change" onClick={onModeChange}>
      {mode === "dark" ? (
        <FontAwesomeIcon icon={faSun} spin className="mode-icon" />
      ) : (
        <FontAwesomeIcon icon={faMoon} spin className="mode-icon" />
      )}
      <span className="mode-name">
        {mode === "dark" ? "light" : "dark"} mode
      </span>
    </div>
  );
}
