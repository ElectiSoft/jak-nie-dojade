import { useState, useEffect } from 'react'
import StopSelect from './StopSelect.js'
import {DisplayArrivals} from './DisplayArrivals.js'
import logo from './assets/images/logo.svg'
import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [stops, setStops] = useState();
  const [stopsID, setStopsID] = useState();
  const [stopID, setStopID] = useState();
  
  const getStopID = stopName => {
    if(stops) {
      const stop = stops["2021-03-30"].stops.filter(item => item.stopName === stopName);
      if (stop) {
        return stop.map(item => item.stopId);
      }
    }
  }

  useEffect(() => {
    fetch("/stops.json")
    .then(response => response.json())
    .then(data => setStops(data))
  }, []);

  useEffect(() => {
    if(!searchQuery){
      setStopsID(undefined);
      setStopID(undefined);
      return;
    }
    setStopsID(getStopID(searchQuery))
  }, [searchQuery])

  if (!stops) {
    return <>loading</>
  }

  return (
    <div className="App">
      <div className="LogoDiv">
        <img src={logo} className="Logo"/>
      </div>
      <input type="text" onChange={e => setSearchQuery(e.target.value)} className="StopInput" placeholder="Wprowadź nazwę przystanku"/>
      <div className='stopSelect'>{stopsID ? <StopSelect stops={stopsID} onChange={setStopID} /> : <></>}</div>
      {stopsID ? <DisplayArrivals stopID={stopID} /> : <></>}
    </div>
  );
}

export default App;