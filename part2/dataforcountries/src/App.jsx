import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import countriesService from "./services/countries.js";

const initialCountries = [];
const Filter = ({ handleInputChange, value }) => {
  return (
    <div className="country-form">
      <label className="form-label">find countries</label>
      <input
        className="form-input"
        value={value}
        onChange={handleInputChange}
      ></input>
    </div>
  );
};

const Countries = ({ countries, changeQuery }) => {
  const handleClick = (name) => {
    return changeQuery(name);
  };

  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  } else if (countries.length === 1) {
    const country = countries[0];
    return <Country country={country} />;
  } else {
    return (
      <div className="country-suggestions">
        {countries.map(({ name: { common } }) => (
          <div key={common} className="country-item">
            <span className="country-name">{common}</span>
            <button
              className="country-button"
              onClick={() => handleClick(common)}
            >
              show
            </button>
          </div>
        ))}
      </div>
    );
  }
};

const Country = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>Capital {country.capital}</div>
      <div>Area {country.area} square miles</div>
      <h2>Languages</h2>
      <ul>
        {Object.entries(country.languages).map(([code, language]) => (
          <li key={code}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={`Flag of ${country.name.common}`}></img>
      <CountryWeather
        capital={country.capital}
        lat={country.latlng[0]}
        lng={country.latlng[1]}
        apiKey={import.meta.env.VITE_KEY}
      />
    </div>
  );
};

const CountryWeather = ({ capital, lat, lng, apiKey }) => {
  const [temperature, setTemperature] = useState(0);
  const [wind, setWind] = useState(0);
  const [iconCode, setIconCode] = useState("");

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lng}&appid=${apiKey}&units=metric`
      )
      .then((response) => response.data)
      .then((data) => {
        setTemperature(data.current.temp);
        setWind(data.current.wind_speed);
        setIconCode(data.current.weather[0].icon);
      });
  }, [lat, lng, apiKey]);

  return (
    <div>
      <h2>Weather in {capital}</h2>
      <p>Temperature {Math.round(temperature)} °C</p>
      <img
        src={`https://openweathermap.org/img/wn/${iconCode}@2x.png`}
        alt={"Weather icon"}
      ></img>
      <p>Wind {wind} m/s</p>
    </div>
  );
};

function App() {
  const [countries, setCountries] = useState(initialCountries);
  const [query, setQuery] = useState("");

  useEffect(() => {
    countriesService
      .getAllCountries()
      .then((fetchedCountries) => setCountries(fetchedCountries));
  }, []);

  const filteredCountries = countries.filter(({ name: { common } }) =>
    common.toLowerCase().includes(query.toLowerCase())
  );

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  const showCountry = (name) => {
    setQuery(name);
  };

  return (
    <div>
      <Filter handleInputChange={handleQueryChange} value={query} />
      <Countries countries={filteredCountries} changeQuery={showCountry} />
    </div>
  );
}

export default App;
