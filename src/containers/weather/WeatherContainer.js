import React, { useState, useEffect, useContext } from "react";
import { Link } from 'react-router-dom'
import { ThemeContext } from "../../context/ThemeContext";
import { AddressContext } from "../../context/AddressContext";
import FetchWeatherData from "../../utils/FetchWeatherData";
import LoaderComponent from "../../components/loader/LoaderComponent";
import ErrorComponent from "../../components/error/ErrorComponent";
import isValid from "../../utils/ValidityChecker";
import { isNil } from "lodash-es";
import WeatherForecastContainer from "../weather-forecast/WeatherForecastContainer";

const WeatherContainer = ({address, currentLocation}) => {
  const { theme, colorTheme } = useContext(ThemeContext);
  const addressContext = useContext(AddressContext);
  const [weatherForecast, setWeatherForecast] = useState({});
  const [weatherCurrent, setWeatherCurrent] = useState({});
  const [alerts, setAlerts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const addressCtxNew = address || addressContext;

  // check whether to show/hide weatherForecastContainer based on weatherCurrent
  const showWeatherForecast = () => {
    return isValid(weatherCurrent);
  };

  // check whether the cityName is valid
  const validCityName = () => {
    if (isValid(addressCtxNew.cityName)) {
      const cityName = addressCtxNew.cityName;
      return (
        isValid(cityName) &&
        !cityName.includes("undefined") &&
        !cityName.includes("null")
      );
    }
    return false;
  };

  const setWeatherData = (current, forecast, alerts) => {
    if (isValid(current) && isValid(forecast)) {
      setWeatherCurrent(current);
      setWeatherForecast(forecast);
      setAlerts(alerts);
    }
  };

  const fetchWeatherData = async (sample = false) => {
    try {
      setIsLoading(true);
      const { weatherCurrent, weatherForecast, alerts, error } =
        await FetchWeatherData(addressCtxNew, sample);
      // set the weatherCurrent and weatherForecast only when the data is non-empty
      // this way, the old fetched data can be preserved when api call fail or limit exceed
      if (isNil(error)) {
        setWeatherData(weatherCurrent, weatherForecast, alerts);
        // set the error to false state with the above successful weather data fetch
        setIsError(false);
      } else {
        setIsError(true);
      }
    } catch (err) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  // show the loading state when fetching address information using lat & long from addressCtxNew
  useEffect(() => {
    setIsLoading(addressCtxNew.showLoader);
  }, [addressCtxNew.showLoader]);

  useEffect(() => {
    if (isValid(addressCtxNew.latlong)) {
      fetchWeatherData();
    } else {
      setIsError(true);
    }
    // fetch weather data every 60 minutes
    const timer = setInterval(() => {
      fetchWeatherData();
    }, 3600000);

    return () => {
      clearInterval(timer);
    };
    // eslint-disable-next-line
  }, [addressCtxNew.latlong]);

  return (
    <>
      {isLoading ? (
        <LoaderComponent
          loaderText={
            validCityName()
              ? `Fetching weather forecast for ${addressCtxNew.cityName} 😎`
              : "Fetching address information using your geolocation coordinates"
          }
        />
      ) : (
        <>
          {isError ? (
            <div className="flex justify-center">
              <div className="sm:w-full lg:w-2/3 xl:w-1/2">
                <ErrorComponent
                  errorMessage={
                    validCityName()
                      ? `Something went wrong. Failed to fetch weather forecast for ${addressCtxNew.cityName}! 😢`
                      : `${
                          addressCtxNew.error ||
                          "Something went wrong. Please try again!"
                        }`
                  }
                />
                <div className="text-center py-5">
                  <p>
                    <button
                      className={`bg-${colorTheme} text-${theme} font-semibold py-3 px-6 rounded-full capitalize`}
                      onClick={() => {
                        fetchWeatherData(true);
                      }}
                    >
                      Show Sample Weather Information
                    </button>
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <>
              {showWeatherForecast() ? (
                <>
                  <WeatherForecastContainer
                    weatherCurrent={weatherCurrent}
                    weatherForecast={weatherForecast}
                    alerts={alerts}
                    address={addressCtxNew}
                    latlong={addressCtxNew.latlong}
                  />
                  {currentLocation && 
                  <p className={`mx-auto text-sm text-center text-${colorTheme} p-4`}>
                    <Link
                      to="/city"
                      className={`link z-0 font-bold hover:text-${theme} text-center`}
                    >
                      Need weather of your city ?
                    </Link>
                  </p>
                  }
                </>
              ) : null}
            </>
          )}
        </>
      )}
    </>
  );
};

export default WeatherContainer;
