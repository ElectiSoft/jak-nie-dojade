import { useState, useEffect } from 'react'
import StopSelect from './StopSelect.js'

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [stops, setStops] = useState();
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
    setStopID(getStopID(searchQuery))
  }, [searchQuery])

  if (!stops) {
    return <>loading</>
  }

  return (
    <div className="App">
      <input type="text" onChange={e => setSearchQuery(e.target.value)} />
      <StopSelect stops={stopID} />
    </div>
  );
}

export default App;