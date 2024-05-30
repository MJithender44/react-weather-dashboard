# React Weather Dashboard

### APIs Used
[Open Weather APIs](https://openweathermap.org/)

https://openweathermap.org/current


# reverse geocoding (lat,lng -> address)
### API Info
* Method: `GET`
* URL: `https://geocode.xyz/${lat,long}?geoit=json&auth={API_KEY}`

# direct geocoding (address -> lat,lng)
### API Info
* Method: `GET`
* URL: `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`

### API Info
* Method: `GET`
* URL: `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lng}&appid=${API_KEY}`

### Fonts used
* Font Link: `<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&display=swap" rel="stylesheet">`

* SpaceGrotesk

### Libraries used

* axios
* axios-retry
* dotenv
* lodash-es
* moment-timezone
* nuka-carousel
* prop-types
* react
* react-dom
* react-icons
* react-router-dom
* react-scripts
* react-toggle
* web-vitals

## How to run Application ?

* npm install
* npm start

note : replace api keys on your own in api urls to make this app run on localhost :)

