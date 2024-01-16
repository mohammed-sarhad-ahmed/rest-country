import { useEffect, useState, useRef } from "react";

async function handleFetchAll() {
  try {
    const res = await fetch("https://restcountries.com/v3.1/all");
    return await res.json();
  } catch (error) {
    throw error;
  }
}

async function handleQueryFetch(query, filterBy, abortController) {
  try {
    const res = await fetch(`https://restcountries.com/v3.1/name/${query}`, {
      signal: abortController?.signal,
    });
    if (res.status === 404)
      throw new Error(" ⛔ No country with that name was found.");

    let data = await res.json();
    if (filterBy !== "all") {
      console.log(filterBy);
      data = data.filter((country) => {
        console.log(country.region);
        return country.region === filterBy;
      });
    }
    if (data.length === 0)
      throw new Error(" ⛔ No country with that name was found.");
    return data;
  } catch (error) {
    throw error;
  }
}
async function handleFilterFetch(region, query) {
  try {
    const res = await fetch(`https://restcountries.com/v3.1/region/${region}`);
    if (res.status === 404)
      throw new Error(" ⛔ No country with that name was found.");
    let data = await res.json();
    if (query) {
      const regex = new RegExp(`${query}`, "i");
      data = data.filter((country) => {
        return (
          regex.test(country.name.common) ||
          regex.test(country.cca2) ||
          regex.test(country.ccn3) ||
          regex.test(country.name.official) ||
          regex.test(country.cca3) ||
          regex.test(country.cioc) ||
          country.altSpellings.some((spelling) => regex.test(spelling))
        );
      });
    }

    if (data.length === 0)
      throw new Error(" ⛔ No country with that name was found.");
    return data;
  } catch (error) {
    throw error;
  }
}

export function useSearch() {
  const [query, setQuery] = useState("");
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [filterBy, setFilterBy] = useState("all");
  const isMount = useRef(true);
  function handleChangeFilter(value) {
    setFilterBy(value);
  }

  function handleSetQuery(newQuery) {
    if (newQuery.trim() === "") return setQuery("");
    setError("");
    setQuery(newQuery);
  }
  useEffect(() => {
    if (isMount.current) return;
    (async () => {
      try {
        setError("");
        setIsLoading(true);
        let data;
        if (filterBy === "all" && !query) data = await handleFetchAll();
        else if (filterBy === "all" && query) {
          data = await handleQueryFetch(query, filterBy);
        } else data = await handleFilterFetch(filterBy, query);
        setCountries(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [filterBy]);

  useEffect(() => {
    const abortController = new AbortController();
    async function fetchOnQuery() {
      try {
        setError("");
        setIsLoading(true);
        let data;
        if (query.length === 0 && filterBy === "all")
          data = await handleFetchAll();
        else if (query.length === 0 && filterBy !== "all")
          data = await handleFilterFetch(filterBy);
        else data = await handleQueryFetch(query, filterBy, abortController);
        isMount.current = false;
        setCountries(data);
      } catch (err) {
        if (err.name === "AbortError") return;
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchOnQuery();

    return () => {
      abortController.abort();
    };
  }, [query]);

  return {
    handleSetQuery,
    countries,
    query,
    isLoading,
    error,
    filterBy,
    handleChangeFilter,
    handleFilterFetch,
    setIsLoading,
    handleQueryFetch,
    setCountries,
  };
}
