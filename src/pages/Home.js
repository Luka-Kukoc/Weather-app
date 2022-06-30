import { useState } from 'react';
var data = require("../gradovi.json")

function Home() {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const onSearch = (searchTerm) => {
    setValue(searchTerm);
    // our api to fetch the search result
    console.log("search ", searchTerm);
  };

  return (
    <div className="App">
      <h1>Search</h1>

      <div className="search-container">
        <div className="search-inner">
          <input type="text" value={value} onChange={onChange} />
          <button onClick={() => onSearch(value)}> Search </button>
        </div>
        <div className="dropdown">
          {data
            .filter((item) => {
              const searchTerm = value.toLowerCase();
              const fullCityName = item.city.toLowerCase();

              return (
                searchTerm &&
                fullCityName.startsWith(searchTerm) &&
                fullCityName !== searchTerm
              );
            })
            .slice(0, 5)
            .map((item) => (
              <div
                onClick={() => onSearch(item.city)}
                className="dropdown-row"
                key={item.city}
              >
                {item.city}
              </div>
            ))}
        </div>
      </div>
    </div>
  );

}

export default Home;
