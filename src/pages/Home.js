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
        if(cityLatLong) {
          navigate("/Weather-app/details",{state:cityLatLong})
      } else {
        alert("Please provide correct input")
    }
  };

  return (
      <div className='flex bg-sky-500 flex-col items-center justify-center min-h-screen '>
          <h1 className='m-10 font-mono text-8xl'>Meteo</h1>
    <div className="bg-sky-500 flex items-center justify-center py-1">
    <Favorites favoritesList={data.favorites}/>
          <div className="search-container">
        <div className="flex items-center">
          <input type="text" className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
           value={value} onChange={onChange} />
          <button 
           className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
           onClick={() => onSearch(value)
        }> Search </button>
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
                className="p-1 pl-3 text-white bg-blue-600"
                key={item.city}
              >
                {item.city}
              </div>
            ))}
        </div>
      </div>
    </div>
    </div>
  );

}

export default Home;
