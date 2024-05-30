import React, {useContext} from 'react'
import {WeatherUnitContext} from '../../context/WeatherUnitContext'
import {kToC,cToF} from '../../utils/TemperatureConvert'
import getWeatherIcon from '../../utils/WeatherIcon'
import FormatTime from './../../utils/FormatTime'
import WeatherIconComponent from './WeatherIconComponent'
import {ThemeContext} from '../../context/ThemeContext'

const TimeframeComponent = ({Timeframe}) => {
  const {weatherUnit} = useContext(WeatherUnitContext)
  const {colorTheme} = useContext(ThemeContext)
  const {description} = Timeframe.weather[0];

  const computedTempValue = (type) => {
    const tempC = kToC(Timeframe[`${type}`]);
    return weatherUnit === 'F'
      ? Math.round(cToF(tempC))
      : tempC;
  }

  return (
    <div
      className={`border-none flex flex-col justify-start items-center mx-3 mb-3 w-full font-light text-${colorTheme} md:text-light timeframe`}>
      <div>
        {getWeatherIcon(Timeframe).startsWith('wi') ? (
          <p className='text-5xl mt-4' title={description}>
            <WeatherIconComponent type={getWeatherIcon(Timeframe)} />
          </p>
        ) : (
          <img
            src={`./weather/${getWeatherIcon(Timeframe)}.svg`}
            alt='icon'
            title={description}
            className='w-16 h-16 object-contain'
          />
        )}
      </div>
      <p className='text-base pb-1'>
        {computedTempValue('temp')}
        <sup>o</sup>
      </p>
      <p className='text-xs pb-1'>
        {computedTempValue('feels_like')}
        <sup>o</sup>
      </p>
      <p className='text-sm font-medium'>
        {FormatTime(Timeframe.dt, Timeframe.timezone, 'h:mm A')}
      </p>
    </div>
  )
}

export default TimeframeComponent;