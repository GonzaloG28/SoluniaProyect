import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EmotionalForm from './components/EmotionalForm/EmotionalForm'
import SugerenciasForm from './components/sugerenciasForm/SugerenciasForm';
import Header from './components/Header/Header';
import BreathingCircle from './components/BreathingCircle/BreathingCircle';
import CourseSection from './components/CourseSection/CourseSection';
import "./style.css";



function App() {
  const [style, setStyle] = useState('empatico');

  return (
      <Router>
          <div className={`App ${style}`}>
            <Header style={style} />
              <main className="main-content">
            <Routes>
                <Route
                  path="/"
                  element={
                    <>
                      <EmotionalForm setStyle={setStyle} />
                      <SugerenciasForm />
                    </>
                  }
                />
                <Route path="/cursos" element={<CourseSection style={style} />} />
                <Route path="/respiracion" element={<BreathingCircle />} />
            </Routes>
    </main>
  </div>
      </Router>
  )
}

export default App
