import Header from "./header.jsx";
import React, { useEffect } from "react";
import ReactLoading from "react-loading";
import Mode from "./mode.jsx";
import { useState, useRef } from "react";
import { SearchBar } from "./searchBar.jsx";
import { Filter } from "./filter.jsx";
import { CountryList } from "./countryList.jsx";
import { useSearch } from "./useSearch.jsx";
import Error from "./error.jsx";
import Details from "./details.jsx";

function App() {
  const key = crypto.randomUUID();
  const [mode, setMode] = useState("dark");
  const [selectedCountry, setSelectedCountry] = useState("");
  const isMount = useRef(true);
  const {
    handleSetQuery,
    countries,
    query,
    isLoading,
    error,
    filterBy,
    handleChangeFilter,
    resetQuery,
    setIsLoading,
  } = useSearch();

  function handleSelect(country) {
    setIsLoading(true);
    setSelectedCountry(country);
  }

  function handleGoBack() {
    resetQuery();
    setSelectedCountry("");
  }

  function handleModeChange() {
    setMode((mode) => (mode === "light" ? "dark" : "light"));
  }

  async function handelBorderSelect(country) {
    const res = await fetch(`https://restcountries.com/v3.1/alpha/${country}`);
    const [data] = await res.json();
    setSelectedCountry(data);
    setIsLoading(true);
  }

  useEffect(() => {
    if (isMount.current) {
      isMount.current = false;
      return;
    }
    document.body.classList.toggle("light-mode-bg");
    document.body.classList.toggle("dark-mode-bg");
  }, [mode]);

  return (
    <div
      className={`App ${
        mode === "dark" ? "dark-mode-bg white" : "light-mode-bg light-text "
      }`}
    >
      <Header mode={mode}>
        <Mode mode={mode} onModeChange={handleModeChange} />
      </Header>
      {!selectedCountry && (
        <section className="actions">
          <SearchBar mode={mode} onSetQuery={handleSetQuery} query={query} />
          <Filter
            mode={mode}
            filterBy={filterBy}
            onChangeFilter={handleChangeFilter}
          />
        </section>
      )}

      {selectedCountry && (
        <Details
          selectedCountry={selectedCountry}
          onGoBack={handleGoBack}
          mode={mode}
          onBorderSelect={handelBorderSelect}
          key={key}
          onLoading={setIsLoading}
          isLoading={isLoading}
        />
      )}

      {!selectedCountry && (
        <>
          {isLoading && (
            <ReactLoading
              type={"spinningBubbles"}
              color={mode === "dark" ? "dark-mode-el-bg " : "white-bg "}
              height={200}
              width={200}
              className="loading"
            />
          )}
          {error && <Error mode={mode} error={error} />}
          {!error && !isLoading && (
            <CountryList
              countries={countries}
              mode={mode}
              handleSelect={handleSelect}
            />
          )}
        </>
      )}
    </div>
  );
}

export default App;
