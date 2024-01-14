export function Filter({ mode, onChangeFilter, filterBy }) {
  return (
    <select
      value={filterBy}
      onChange={(e) => onChangeFilter(e.target.value)}
      className={`filter ${
        mode === "dark" ? "dark-mode-el-bg white" : "white-bg light-text"
      }`}
    >
      <option value="all">All Regions</option>
      <option value="Africa">Africa</option>
      <option value="America">America</option>
      <option value="Asia">Asia</option>
      <option value="Europe">Europe</option>
      <option value="Oceania">Oceania</option>
    </select>
  );
}
