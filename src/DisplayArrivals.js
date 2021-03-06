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
                {arrivalsData[0].map((item, index) => (<div className='Card' key={index}> 
                    <div className = "LineDiv">
                        <p className = "Line">{item.line}</p>
                    </div>
                    <div className = "InfoDiv">
                        <div className = "Headsign">{item.headsign.length <= 22 ? item.headsign : item.headsign.slice(0, 22) + "..."}</div>
                        <div className = "TimeText">Odjazd o:</div>
                        <div className = "DepartureTime">{item.departureTime}</div>
                        {(item.delay-(item.delay%60))/60 != 0 ?
                            <div className = "DelayInfo">{item.theoreticalTime} {(item.delay-(item.delay%60))/60 < 0 ?
                                <>- {((item.delay-(item.delay%60))/60)*-1}</> : 
                                <>+ {(item.delay-(item.delay%60))/60}</>} min.</div> : 
                            <div className = "DelayInfo">Brak opóźnienia</div>}
                    </div>
                </div>))}
            </div>
        );
    }
    return null;    
}