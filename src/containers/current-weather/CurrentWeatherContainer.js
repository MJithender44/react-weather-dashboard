import React from 'react'
import InfoComponent from '../../components/weather/InfoComponent'
import InfoDetailComponent from '../../components/weather/InfoDetailComponent'
import LoaderComponent from './../../components/loader/LoaderComponent'

const CurrentWeatherContainer = ({weatherCurrent, address}) => {
  return (
      <>
        {address && weatherCurrent ? (
          <div>
            <InfoComponent address={address} weatherCurrent={weatherCurrent} />
            <InfoDetailComponent weatherCurrent={weatherCurrent} />
          </div>
        ) : (
          <LoaderComponent />
        )}
      </>
  )
}

export default CurrentWeatherContainer;
