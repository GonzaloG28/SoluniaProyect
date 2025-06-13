import React, { useEffect, useState } from "react";
import "./animatedFace.css";

const emotions = ["neutral","feliz", "triste", "enojo", "sorprendido"];

export default function AnimatedFace({ style= "empatico" }){
    const [emotion, setEmotion] = useState("neutral");
    const [shock, setShock] = useState(false)

    useEffect(() =>{
        const interval = setInterval(() =>{
            const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
            setEmotion(randomEmotion);
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        setShock(true);
        const timeout = setTimeout(() => setShock(false), 1000);
        return () => clearTimeout(timeout);
    } , [emotion]);


return(
    <div className={`face-container ${style} ${emotion}`}>
        <div className="eyebrow left-brow"></div>
        <div className="eyebrow right-brow"></div>
        <div className="eyes">
            <div className={`eye ${shock ? 'eye-shock' : ''}`}></div>
            <div className={`eye ${shock ? 'eye-shock' : ''}`}></div>
        </div>
    </div>
)
}