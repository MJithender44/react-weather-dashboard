import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { ThemeContext } from "../../context/ThemeContext";
import constants from "../../constants/constants";
import { formatCoords } from "../../utils/FormatCoords";
import WeatherContainer from "../../containers/weather/WeatherContainer";
import LoaderComponent from "../loader/LoaderComponent";
// import { AddressContext } from "../../context/AddressContext";

const Search = () => {
  const { theme, colorTheme } = useContext(ThemeContext);
  const [city, setCity] = useState("");
  const [address, setAddress] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
      );
      const data = await res.json();
      if(data.length === 0) throw new Error('no city found 😢! please try with another city name.');
      const { name, state, country, lat, lon } = data[0];
      const cityName = `${name}, ${state}, ${country}`;
      setAddress({
        showLoader: false,
        error: null,
        cityName,
        latlong: formatCoords(lat, lon),
      });
    } catch (e) {
      console.error("error :", e.message);
      setAddress(null);
      alert(e.message);
    }
    finally {
      setIsLoading(false);
      setCity('');
    }
  };
  return isLoading ? (
    <LoaderComponent />
  ) : (
    <>
      <div>
        <form onSubmit={submitHandler}>
          <h2
            className={`text-xl font-bold my-4 text-center text-${colorTheme}`}
          >
            {" "}
            Find Weather of your city{" "}
          </h2>
          <div className="flex flex-row justify-center items-center">
            <input
              type="search"
              id="city"
              name="city"
              class="block w-2/6 max-w-lg p-4 ps-10 mr-2 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter your city"
              required
            />
            <button type="submit" className="p-2">
              <FaArrowRight
                fill="#4a81c4"
                style={{
                  width: "25px",
                  height: "25px",
                }}
              />
            </button>
          </div>
        </form>
        <p className={`mx-auto text-sm text-center text-${colorTheme} p-4`}>
          <Link
            to="/"
            className={`link z-0 font-bold hover:text-${theme} text-center`}
          >
            Need weather of your current location ?
          </Link>
        </p>
      </div>
      {address && <WeatherContainer address={address} />}
    </>
  );
};

export default Search;
