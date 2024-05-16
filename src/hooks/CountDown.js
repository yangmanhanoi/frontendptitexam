import { useState, useEffect, useRef } from "react";
const formatTime = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time - minutes*60)

    if(minutes < 10) minutes = '0' + minutes
    if(seconds < 10) seconds = '0' + seconds
    return minutes + ":" + seconds
}
export default function CountDown({seconds}){
    const [countDown, setCountDown] = useState(seconds)
    const timerId = useRef()

    useEffect(() => {
        timerId.current = setInterval(() => {
            setCountDown(prev => prev - 1)
        }, 1000)
        return () => clearInterval(timerId.current)
    }, [])

    useEffect(() => {
        if(countDown <= 0)
            {
                clearInterval(timerId.current)
                alert("END")
            }
    }, [countDown])
    return(
        <div id="remain">
            {formatTime(countDown)}
        </div>
    )
}