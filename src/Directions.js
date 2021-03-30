import {useState, useEffect} from 'react';

export const Directions = ({stopsID}) => {
    const [stopsData, setStopsData] = useState();

    useEffect(()=>{
        console.log(stopsID);
                
        (async function(){

            const headsigns = [];
            const lines = [];
            const delays = [];

            for (let i = 0; i < stopsID.length; i++) {
                const req = await fetch(`https://ckan2.multimediagdansk.pl/delays?stopId=${stopsID[i]}`);
                const data = await req.json();
                headsigns.push(data.delay.map(item => item.headsign));
                lines.push(data.delay.map(item => item.routeId));
                delays.push(data.delay.map(item => item.delayInSeconds));
            }

            return {headsigns, lines, delays}
        })().then(setStopsData)

    },[stopsID]);
    
    return(<>
        {JSON.stringify(stopsData, null, 2)}
    </>);
}