import { useState } from "react";
import { useEffect } from "react";
import countriesService from "./services/countries.js";

const initialPerson = [];
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
      <div>Area {country.area}</div>
      <h2>Languages</h2>
      <ul>
        {Object.entries(country.languages).map(([code, language]) => (
          <li key={code}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png}></img>
    </div>
  );
};

function App() {
  const [countries, setCountries] = useState(initialPerson);
  const [query, setQuery] = useState("");

  useEffect(() => {
    countriesService
      .getAllCountries()
      .then((country) => setCountries(countries.concat(country)));
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
