import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { ListOfNames } from "./listNames";
import Button from "./button";
import ReactLoading from "react-loading";

function driveValueFromAnObject(objects, desiredItem) {
  return Object.values(objects).map((object) => {
    return object[desiredItem];
  });
}

function Details({
  onGoBack,
  mode,
  selectedCountry,
  onBorderSelect,
  onLoading,
  isLoading,
}) {
  const [borders, setBorders] = useState([]);
  useEffect(() => {
    if (!selectedCountry.borders) {
      return onLoading(false);
    }
    async function getTheBorderName() {
      const res = await Promise.all(
        selectedCountry.borders.map(async (borderCountry) => {
          return await fetch(
            `https://restcountries.com/v3.1/alpha/${borderCountry}?fields=name,ccn3`
          );
        })
      );

      const data = await Promise.all(
        res.map((country) => {
          return country.json();
        })
      );
      setBorders(data);
      onLoading(false);
    }

    getTheBorderName();
  }, []);

  useEffect(() => {
    document.title = selectedCountry.name.common;
    return () => {
      document.title = "where in the world";
    };
  }, [selectedCountry.name.common]);

  const nativeName = driveValueFromAnObject(
    selectedCountry.name.nativeName,
    "common"
  );
  const currencies = driveValueFromAnObject(selectedCountry.currencies, "name");
  const languages = Object.values(selectedCountry.languages);

  return (
    <>
      <Button mode={mode} className="go-back" action={onGoBack}>
        <FontAwesomeIcon icon={faArrowLeftLong} className="left-arrow" />
        <span>Back</span>
      </Button>
      {isLoading && (
        <ReactLoading
          type={"spinningBubbles"}
          color={mode === "dark" ? "dark-mode-el-bg " : "white-bg "}
          height={200}
          width={200}
          className="loading"
        />
      )}
      {!isLoading && (
        <div className={`details`}>
          <img
            src={selectedCountry.flags.png}
            alt={selectedCountry.flags.alt}
          />
          <h2>{selectedCountry.name.common}</h2>
          <div className="main-infos">
            <p>
              <strong>Native Name : </strong>
              <ListOfNames list={nativeName} />
            </p>

            <p>
              {" "}
              <strong>Population</strong>:{" "}
              {selectedCountry.population.toLocaleString()}
            </p>
            <p>
              <strong>Region</strong>: {selectedCountry.region}
            </p>
            <p>
              <strong>SubRegion</strong>: {selectedCountry.subregion}
            </p>

            <p>
              {" "}
              <strong className="capital ">Capital : </strong>
              <ListOfNames list={selectedCountry.capital} />
            </p>
          </div>
          <div className="secondary-infos">
            <p>
              <strong>Top Level Domain : </strong>
              <ListOfNames list={selectedCountry.tld} />
            </p>{" "}
            <p>
              <strong> Currencies : </strong>
              <ListOfNames list={currencies} />
            </p>
            <p>
              <strong> Languages : </strong>
              <ListOfNames list={languages} />
            </p>
          </div>
          <div className="borders">
            <strong className="border-text">Border Countries: </strong>
            <div className="border-btns" id="border-btns">
              {selectedCountry.borders?.length ? (
                borders.map((borderCountry) => {
                  return (
                    <Button
                      key={borderCountry.name.common}
                      mode={mode}
                      action={() => {
                        onBorderSelect(borderCountry.ccn3);
                      }}
                    >
                      {borderCountry.name.common}
                    </Button>
                  );
                })
              ) : (
                <p className="none-text">❌ None</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Details;
