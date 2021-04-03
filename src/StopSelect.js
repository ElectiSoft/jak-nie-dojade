function StopSelect(props) {
    
    if(props.stops && props.stops.length != 0) {
        const buttons = props.stops.map(item => {
            return <button key={item}>{item}</button>
        })

        console.log(buttons)

        return buttons
    }

    return null
}

export default StopSelect;