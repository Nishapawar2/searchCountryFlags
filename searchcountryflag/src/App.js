import "./App.css";

import { useState, useEffect } from "react";
import axios from "axios";
export default function App() {
  const [countries, setCountries] = useState([]);
  const [filterCountries, setFilterCountries] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        setCountries(response.data);
        setFilterCountries(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const onChangeHandler = (e) => {
    e.preventDefault();
    const searchVal = e.target.value;
    setSearch(searchVal);
    if (search !== "" && search.length>0) {
      const filterBySearch = countries.filter((item) => {
        return item.name.common.toLowerCase().includes(search.toLowerCase());
      });
      console.log(filterBySearch);
      setFilterCountries(filterBySearch);
    } 
  };

  return (
    <div className="App">
      <input type="text" value={search} onChange={onChangeHandler} className="searchInput" placeholder="Search for countries"/>
      <div className="MainContainer">
        {filterCountries.map((country) => {
          return (
            <div key={country.cca3} className="countryCard">
              <img
                className="FlagImage"
                src={country.flags.png}
                alt={`flag of ${country.name.common}`}
              />
              <h2>{country.name.common}</h2>
            </div>
          );
        })}
      </div>
    </div>
  );
}
