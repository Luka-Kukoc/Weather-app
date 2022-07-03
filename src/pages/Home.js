import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Favorites from '../components/Favorites';
import AppContext from '../AppContext';

var cityList = require("../gradovi.json")


function Home() {

  const {data} = useContext(AppContext)
  const [value, setValue] = useState("");
  const navigate = useNavigate()

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const onSearch = (searchTerm) => {
    const cityLatLong = cityList.find(item => item.city.toLowerCase() === searchTerm.toLowerCase())
    navigate("/details",{state:cityLatLong})
    console.log("data.fav ", data.favorites);
  };

  return (
    <div className="App">
      <h1>Search</h1>
    <Favorites favoritesList={data.favorites}/>
      <div className="search-container">
        <div className="search-inner">
          <input type="text" value={value} onChange={onChange} />
          <button onClick={() => onSearch(value)}> Search </button>
        </div>
        <div className="dropdown">
          {cityList
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
