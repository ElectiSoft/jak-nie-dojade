import {useState, useEffect} from 'react';

export const DisplayArrivals = ({stopID}) => {
    const [arrivalsData, setArrivalsData] = useState();

    useEffect(()=>{     
        (async function(){
            const arrivals = [];
            if(stopID){
                const req = await fetch(`https://ckan2.multimediagdansk.pl/delays?stopId=${stopID}`);
                const data = await req.json();
                const stopData = data.delay;
                if(stopData){
                    arrivals.push(stopData.map(item => ({
                        headsign: item.headsign,
                        line: item.routeId,
                        delay: item.delayInSeconds,
                        departureTime: item.estimatedTime,
                        theoreticalTime: item. theoreticalTime
                    })))
                }
            }
            return arrivals
        })().then(setArrivalsData)
    },[stopID]);
    
    if(arrivalsData && arrivalsData[0]){
        return(
            <div className = "DisplayArrivals">
                {arrivalsData[0].map((item, index) => (<div key={index}> 
                    <p className = "Line">Linia: {item.line}</p>
                    <p className = "Headsign">W kierunku: {item.headsign}</p>
                    <p className = "TheoreticalTime">Planowy odjazd: {item.theoreticalTime}</p>
                    <p className = "Delay">Opóźnienie: {item.delay}</p>
                    <p className = "DepartureTime">Odjazd z opóźnieniem: {item.departureTime}</p>
                    <p className = "Separator">===============================================</p>
                </div>))}
            </div>
        );
    }
    return null;    
}