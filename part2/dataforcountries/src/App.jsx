import { useState, useEffect } from "react";
import axios from "axios";

import SearchBar from "./components/SearchBar";
import Results from "./components/Results";

const COUNTRIES_URL = "https://studies.cs.helsinki.fi/restcountries/api/all";

const App = () => {
  // component states
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState([]);

  // function to fetch countries data
  const getCountries = () => {
    const request = axios.get(COUNTRIES_URL);
    return request.then((response) => response.data);
  };

  // effect hook to fetch data
  useEffect(() => {
    getCountries().then((countryResults) => {
      setCountries(countryResults);
    });
  }, []);

  // update form value
  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  return (
    <div>
      <SearchBar country={country} handleCountryChange={handleCountryChange} />
      <Results country={country} countries={countries} />
    </div>
  );
};

export default App;
