import { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;

const Results = ({ country, countries }) => {
  if (!country) {
    return null;
  }

  // function to filter countries based on searchquery
  const filterCountries = () => {
    return countries.filter((c) =>
      c.name.common.toLowerCase().includes(country.toLowerCase())
    );
  };
  const filteredCountries = filterCountries();

  // display results
  if (filteredCountries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  } else if (filteredCountries.length > 1) {
    return <CountriesDisplay countries={filteredCountries} />;
  } else if (filteredCountries.length === 1) {
    return <CountryDisplay country={filteredCountries[0]} />;
  }
};

const CountriesDisplay = ({ countries }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleSelectedCountry = (country) => {
    setSelectedCountry(country);
  };

  // display selected country or list of countries
  if (selectedCountry) {
    return <CountryDisplay country={selectedCountry} />;
  }
  return (
    <div>
      {countries.map((country) => (
        <Country
          key={country.name.common}
          country={country}
          handleSelectedCountry={() => handleSelectedCountry(country)}
        />
      ))}
    </div>
  );
};

const Country = ({ country, handleSelectedCountry }) => {
  return (
    <div>
      {country.name.common}
      <button onClick={handleSelectedCountry}>show</button>
    </div>
  );
};

const CountryDisplay = ({ country }) => {
  const [weatherData, setWeatherData] = useState(null);

  console.log("display", country.name.common);

  // function to fetch weather data

  // use effect hook to fetch temperature data
  useEffect(() => {
    console.log("fetch");
    const getWeatherData = () => {
      const request = axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&appid=${API_KEY}`
      );
      return request.then((response) => response.data);
    };
    // only fetch data when country changes
    getWeatherData().then((weatherDataResults) => {
      setWeatherData(weatherDataResults);
    });
  }, [country]);

  if (!weatherData) {
    return null;
  }

  // render country info
  const languages = Object.values(country.languages);
  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>capital {country.capital}</div>
      <div>area {country.area} </div>
      <h3>languages:</h3>
      <ul>
        {languages.map((language, index) => {
          return <li key={index}>{language}</li>;
        })}
      </ul>
      <img src={country.flags.png} />
      <h2>Weather in {country.capital}</h2>
      <div>temperature {`${weatherData.main.temp} Celcius`}</div>
      <img
        src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
      />
      <div>wind {`${weatherData.wind.speed} m/s`} </div>
    </div>
  );
};

export default Results;
