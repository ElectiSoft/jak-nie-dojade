import { useState, useEffect } from 'react'

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [stops, setStops] = useState();

  useEffect(() => {
    fetch("https://cors-anywhere.herokuapp.com/https://ckan.multimediagdansk.pl/dataset/c24aa637-3619-4dc2-a171-a23eec8f2172/resource/4c4025f0-01bf-41f7-a39f-d156d201b82b/download/stops.json")
    .then(result => result.json())
    .then(result => setStops(result))}, []);

  if (!stops) {
    return <>loading</>
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          <input type="text" onChange={e => setSearchQuery(e.target.value)} />
        </p>
      </header>
    </div>
  );
}

export default App;