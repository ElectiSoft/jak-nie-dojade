import { useEffect, useState } from 'react'

function StopSelect(props) {

    const [delays, setDelays] = useState();

    useEffect(() => {
        (async () => {
            let headsigns = []
            for (let i = 0; i < props.stops.length; i++) {
                const req = await fetch(`https://ckan2.multimediagdansk.pl/delays?stopId=${props.stops[i]}`);
                const data = await req.json();
                headsigns.push(data.delay.map(item => item.headsign));
            }
            headsigns = headsigns.map(arr => arr.reduce((acc, item) => {
                const prevOcc = acc.find(element => element === item)
                if(!prevOcc) {
                    acc.push(item)
                }
                return acc
            }, []))
            setDelays(headsigns);
        })()
    }, [props])

    if(delays && delays.length) {
        const headsignsTexts = delays.map(item => item.join(", "))
        return headsignsTexts.map(item => <button>{item}</button>)
    }

    return null
}

export default StopSelect