import { useEffect, useState } from "react";
import axios from "axios";

function App() {

  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState('')
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(res => setCountries(res.data))
  }, [])
  return (
    <div>
      <CountryForm country={country} setCountry={setCountry} />
      <DisplayCountry countries={countries} country={country} />
    </div>
  );
}

const CountryForm = ({ country, setCountry }) => {

  return (
    <div>
      <form>
        find countries:<input type="text" value={country} onChange={(e) => setCountry(e.target.value)} />
      </form>
    </div>

  )
}

const DisplayCountry = ({ countries, country }) => {
  const searchList = country !== '' && countries.filter(c => c.name.common.toLowerCase().includes(country))

  if (searchList.length > 10) {
    return <div><p>Too many matches, specify another filter</p></div>
  } else if (searchList.length > 1 && searchList.length < 11) {
    return (
      <div>
        {
          searchList.map(s => <div key={s.name.common}>{s.name.common} <span><ShowButton country={s} /></span></div>)
        }
      </div>
    )
  } else if (searchList.length === 1 && searchList[0].name.common.toLowerCase() === country) {
    return <DisplayCountryInfo country={searchList[0]} />
  }
}

const DisplayCountryInfo = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      capital {country.capital[0]}
      <p>area {country.area}</p>
      <h5>languages</h5>
      {Object.entries(country.languages).map(l => <li key={l[1]}>{l[1]}</li>)}
      <img src={country.flags.png} alt="country.name.common" />
      {console.log(country.latlng[0], typeof country.latlng[0])}
      <WeatherInfo name={country.name.common} lat={String(country.latlng[0]).slice(0, 5)} lon={String(country.latlng[1]).slice(0, 5)} />
    </div>
  )
}

const ShowButton = ({ country }) => {
  const [display, setDisplay] = useState(false)
  const displayCountry = () => {
    setDisplay(!display)
  }
  return (
    <>
      <button onClick={displayCountry}>{display ? 'Hide' : 'Show'}</button>
      {display && <DisplayCountryInfo country={country} />}
    </>
  )
}

const WeatherInfo = ({ name, lat, lon }) => {
  const api_key = process.env.REACT_APP_API_KEY
  const baseurl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`
  const [weatherData, setWeatherData] = useState('')
  useEffect(() => {
    axios
      .get(baseurl)
      .then(res => {
        console.log(res.data)
        setWeatherData(res.data)
      })
  }, [name, lat, lon])

  return (
    <>
      {weatherData && <div>
        <h1>Weather in {name}</h1>
        <p>temperature {weatherData.main.temp}Celcius </p>
        <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt={weatherData.weather[0].icon} />
        <p>wind {weatherData.wind.speed}</p>
      </div>}
    </>
  )
}

export default App;
