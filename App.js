
import React, {Component, useState} from 'react'
import axios from 'axios'
import {Map, GoogleApiWrapper} from 'google-maps-react'



class MapContainer extends Component{
  render(){
    return(
  <Map
  google = {this.props.google}
  style = {{width: "100%", height: "100%" }}
  zoom = {10}
  initialCenter = {
    {
    lat: 51.160522,
    lng: 71.470360
    }
  }
  />
    )
  }
}



function App() {

  const [data, setData] = useState({});
  const [location, setLocation] = useState('')
  const url = `api_key`

  const searchLocation = (event) => {
    if (event.key === 'Enter' || event.keyCode === 13) {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
  }};

  ////////////////////////////////////////////////////////////

  return (
    <div className="app">
      <div className="search">
        <input value={location} 
        onChange={event => setLocation(event.target.value)}
        onKeyPress={searchLocation}
        placeholder='Enter Location'
        type="text">

        </input>
      </div>
     <div className="container">
      <div className="top">
        <div className="location">
          <p>{data.name}</p>
        </div>
        <div className="temp">
          {data.main ? <h1>{data.main.temp} °C</h1> : null}
        </div>
        <div className="description">
          {data.weather ? <p>{data.weather[0].main}</p> : null}
        </div>
      </div>

    {data.name != undefined && 
        <div className="bottom">
        <div className="feels">
          {data.main ? <p className='bold'>{data.main.feels_like} °C</p> : null}
          <p>Feels like</p>
        </div>
        <div className="humidity">
          {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
          <p>Humidity</p>
        </div>
        <div className="wind">
          {data.wind ? <p className='bold'>{data.wind.speed} MPS</p> : null}
          <p>Wind Speed</p>
        </div>
        <div className='Longitude'>
          {data.coord ? <p className='bold'>{data.coord.lon}</p> : null}
          <p>Longitude</p>
        </div>
        <div className='Latitude'>
          {data.coord ? <p className='bold'>{data.coord.lat}</p> : null}
          <p>Latitude</p>
        </div>
        <div className='Pressure'>
        {data.main ? <p className='bold'>{data.main.pressure}</p> : null}
          <p>Pressure</p>
        </div>
      </div> 
    }<br></br>


    {data.name != undefined &&
    <div className="table">
      <div className='Timezone'>
        <p className='bold'>{data.timezone}</p>
        <p>Timezone</p>
      </div>
      <div className='country'>
        {data.sys ? <p className="bold">{data.sys.country}</p> : null}
        <p>Country</p>

        
      </div>
    </div>
    
    }
    

      </div>  
  </div>

  
  );
}
export default App;
// export default GoogleApiWrapper({
//  
// })(MapContainer); 

