import { ListOfNames } from "./listNames";

export function Country({ country, mode, onSelect }) {
  return (
    <div
      className={`country ${
        mode === "dark" ? "dark-mode-el-bg white" : " white-bg  light-text "
      }`}
      onClick={() => onSelect(country)}
    >
      <img src={country.flags.png} alt={country.flags.alt} className="flag" />
      <h2 className="title">{country.name.common}</h2>
      <div className="sub-info">
        <p>
          <strong className="population ">Population : </strong>{" "}
          {country.population.toLocaleString()}
        </p>
        <p>
          <strong className="region ">Region : </strong>
          {country.region}
        </p>
        <p>
          {" "}
          <strong className="capital ">Capital : </strong>
          {country.capital ? <ListOfNames list={country.capital} /> : "none"}
        </p>
      </div>
    </div>
  );
}
