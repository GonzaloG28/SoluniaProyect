import React from "react";
import "./courseSection.css";

const CourseSection = ({ style }) => {
    return(
       <> 
            <div>
                <h2 className="course-title">Solunia Academic</h2>
                <p className="course-subtitle">Descubre los distintos cursos que tenemos para ti</p>
            </div>
    
        <section className={`course-section ${style}`}>
            <div className="course-card">
                <h3 className="course-name">CURSO DE RESPIRACION</h3>
                <p className="course-description">
                    Descubrirás la ciencia de la respiración a través de 7 módulos y 38 lecciones, aprendiendo la que se convertirá en una de las principales herramientas para cuidar de tu salud y tu bienestar.
                </p>

                <div className="video-container">
                    <iframe 
                    src="https://www.youtube.com/embed/UWeS3j9Inbw?si=52SiJ9qxIc7SIErV"
                    title="Ejemplo curso"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    ></iframe>
                </div>
            </div>


            <div className="course-card">
                <h3 className="course-name">CURSO 2</h3>
                <p className="course-description">
                    Aprende una técnica sencilla para calmar tu mente en momentos de ansiedad o tensión.
                </p>

                <div className="video-container">
                    <iframe 
                    src="https://www.youtube.com/embed/1eMFChd4sL8?si=U2BNSh75RrUO2DlR"
                    title="Ejemplo curso" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    ></iframe>
                </div>
            </div>

             <div className="course-card">
                <h3 className="course-name">CURSO 3</h3>
                <p className="course-description">
                    Aprende una técnica sencilla para calmar tu mente en momentos de ansiedad o tensión.
                </p>

                <div className="video-container">
                    <iframe 
                    src="https://www.youtube.com/embed/UWeS3j9Inbw?si=52SiJ9qxIc7SIErV"
                    title="Ejemplo curso"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    ></iframe>
                </div>
            </div>

             <div className="course-card">
                <h3 className="course-name">CURSO 1</h3>
                <p className="course-description">
                    Aprende una técnica sencilla para calmar tu mente en momentos de ansiedad o tensión.
                </p>

                <div className="video-container">
                    <iframe 
                    src="https://www.youtube.com/embed/UWeS3j9Inbw?si=52SiJ9qxIc7SIErV"
                    title="Ejemplo curso"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    ></iframe>
                </div>
            </div>
            
        </section>
        </>
    )
}

export default CourseSection;