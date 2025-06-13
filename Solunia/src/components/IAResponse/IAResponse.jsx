import React from "react";
import "./iaResponse.css"


export default function IAResponse({ response, style, loading }) {
    if(loading){
        return(
            <p className="ia-loading">Generando respuesta...</p>
        )
        }

    if (!response) return null;

    const containerClass = `ia-response-container ${style}`;

    return(
        <div className={containerClass}>
            <p className="ia-respopnse-text">{response}</p>
        </div>
    )
}