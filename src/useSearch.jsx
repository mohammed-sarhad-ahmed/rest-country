import { useEffect, useState, useRef } from "react";

async function handleFetchAll() {
  try {
    const res = await fetch("https://restcountries.com/v3.1/all");
    return await res.json();
  } catch (error) {
    throw error;
  }
}

async function handleQueryFetch(abortController, query) {
  try {
    const res = await fetch(`https://restcountries.com/v3.1/name/${query}`, {
      signal: abortController.signal,
    });
    const data = await res.json();
    if (data.length === 0 || data.status === 404)
      throw new Error(" ⛔ No country with that name was found.");
    return data;
  } catch (error) {
    throw error;
  }
}
async function handleFilterFetch(region) {
  try {
    const res = await fetch(`https://restcountries.com/v3.1/region/${region}`);
    const data = await res.json();
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
  function resetQuery() {
    setQuery("");
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
        if (filterBy === "all") data = await handleFetchAll();
        else data = await handleFilterFetch(filterBy);
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
        if (query.length === 0) data = await handleFetchAll();
        else data = await handleQueryFetch(abortController, query);
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
    resetQuery,
    setIsLoading,
  };
}
