import { useEffect, useState } from 'react'

function StopSelect(props) {

    const [delays, setDelays] = useState();

    useEffect(() => {
        (async () => {
            let headsigns = []
            for (let i = 0; i < props.stops.length; i++) {
                const req = await fetch(`https://ckan2.multimediagdansk.pl/delays?stopId=${props.stops[i]}`);
                const data = await req.json();
                headsigns.push([data.delay.map(item => item.headsign), props.stops[i]]);
            }
            headsigns = headsigns.map(arr => [arr[0].reduce((acc, item) => {
                const prevOcc = acc.find(element => element === item)
                if(!prevOcc) {
                    acc.push(item)
                }
                return acc
            }, []), arr[1]])
            setDelays(headsigns);
        })()
    }, [props])

    if(delays && delays.length) {
        return delays.map((item, index) => {
            if(item[0] != "") {
                return <button onClick={() => props.onChange(item[1])} key={index}>{item[0].join(", ")}</button>
            }
        })
    }

    return null
}

export default StopSelect