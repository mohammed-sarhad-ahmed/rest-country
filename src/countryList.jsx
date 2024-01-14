import { Country } from "./country";

export function CountryList({ countries, mode, handleSelect }) {
  return (
    <div className="country-list">
      {countries.map((country) => {
        return (
          <Country
            country={country}
            key={country.cca2}
            mode={mode}
            onSelect={handleSelect}
          />
        );
      })}
    </div>
  );
}
