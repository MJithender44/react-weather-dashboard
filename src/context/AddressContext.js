import React, { useContext, useState, useEffect } from "react";
import { WeatherUnitContext } from "./WeatherUnitContext";
import axios from "axios";
import validName from "./../utils/ValidCityName";
import fetchIPAddress from "../utils/FetchIpAddress";
import constants from "../constants/constants";
import isValid from "../utils/ValidityChecker";
import { isNil } from "lodash-es";
import { formatCoords } from "../utils/FormatCoords";


// const token = process.env.REACT_APP_IPINFO_TOKEN
const AddressContext = React.createContext(null);

/**
 * Today, countries that use the Fahrenheit include the United States, Bahamas, Palau,
 * Belize, the Cayman Islands, the Federated States of Micronesia,
 * the Marshall Islands, and the territories such as Puerto Rico,
 * the U.S. Virgin Islands, and Guam.
 */
const SPECIAL_COUNTRY_CODES = [
  "US",
  "BS",
  "PW",
  "BZ",
  "KY",
  "FM",
  "PR",
  "VI",
  "GU",
];

const AddressContextProvider = ({ children }) => {
  
  const updateState = (state) => {
    setState((prevState) => ({...prevState, ...state }));
  };

  const [state, setState] = useState({
    showLoader: true,
    error: null,
    cityName: "",
    latlong: null,
    updateState: updateState,
    showCityWeather: false,
  });
  const { updateWeatherUnit } = useContext(WeatherUnitContext);
  // get weather unit
  //   static contextType = WeatherUnitContext

  const upgradeWeatherUnit = (countryCode) => {
    // update the weatherUnit to 'F' if the countryCode is a special country code
    if (SPECIAL_COUNTRY_CODES.includes(countryCode)) {
      updateWeatherUnit("F");
    }
  };

  const returnError = () => {
    updateState({
      showLoader: false,
      error:
        "Failed to fetch address information based on your geolocation. Please allow location access to get weather forecast!!",
    });
  };

  /**
   * update address using reverse geocoding of OpenWeatherMap to obtain city and country
   */
  const updateAddress = async (latlong) => {
    let hit = {};
    try {
       hit = (
        await axios.get(
          `https://geocode.xyz/${latlong}?geoit=json&auth=${process.env.REACT_APP_GEOCODE_API_KEY}`
        )
      ).data;

      if (isValid(hit)) {
        const city = hit.city ?? "";
        const state = hit.state ?? "";
        const country = hit.country ?? "";
        const cityName = `${validName(city)}${validName(state)}${validName(
          country,
          false
        )}`;
        upgradeWeatherUnit(country);
        updateState({
          showLoader: false,
          error: null,
          cityName,
          latlong,
        });
      }
    } catch (error) {
      returnError();
      console.error(error);
    }
  };

  /**
   * get ip and city info using ip-api
   * update the address
   */
  const getIPAddress = async () => {
    try {
      const data = await fetchIPAddress();
      if (isValid(data)) {
        const {
          latitude,
          longitude,
          city,
          region,
          country_name,
          country_code,
        } = data;
        const cityName = `${city}, ${region}, ${country_name}`;
        upgradeWeatherUnit(country_code);

        // check whether latitude and longitude are strings which are NaN as well as if value is null or undefined
        const Latitude =
          isNil(latitude) || isNaN(Number(latitude)) ? "00" : latitude;
        const Longitude =
          isNil(longitude) || isNaN(Number(longitude)) ? "00" : longitude;
        updateState({
          showLoader: false,
          error: null,
          cityName,
          latlong: formatCoords(Latitude, Longitude),
        });
      } else {
        updateState({ showLoader: false, error: null });
      }
    } catch (error) {
      returnError();
      console.error(error);
    }
  };

  const getAddress = async () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const latlong = formatCoords(
            position.coords.latitude,
            position.coords.longitude
          );
          updateAddress(latlong);
        },
        (error) => {
          console.error(error);
          getIPAddress();
        }
      );
    } else {
      getIPAddress();
    }
  };

  useEffect(() => {
    getAddress();
  }, []);

  return (
    <AddressContext.Provider value={state}>{children}</AddressContext.Provider>
  );
};

export { AddressContext, AddressContextProvider };
