import React, { useState, useEffect, useRef } from 'react';
import "./breathingCircle.css"

const BreathingCircle = () => {
  const [inhaleTime, setInhaleTime] = useState(4);
  const [hold1Time, setHold1Time] = useState(2);
  const [exhaleTime, setExhaleTime] = useState(4);
  const [hold2Time, setHold2Time] = useState(2);
  const [totalDuration, setTotalDuration] = useState(60);
  const [phase, setPhase] = useState('');
  const [running, setRunning] = useState(false);
  const [mainTimer, setMainTimer] = useState(0);
  const [mode, setMode] = useState('full'); // 'full' or 'simple'

  const fullPhases = [
    { name: 'inhale', duration: inhaleTime },
    { name: 'aguanta', duration: hold1Time },
    { name: 'exhale', duration: exhaleTime },
    { name: 'mantenlo', duration: hold2Time },
  ];

  const simplePhases = [
    { name: 'inhale', duration: inhaleTime },
    { name: 'exhale', duration: exhaleTime },
  ];

  useEffect(() => {
    if (!running) return;

    const phases = mode === 'full' ? fullPhases : simplePhases;

    let phaseIndex = 0;
    let timeLeft = phases[phaseIndex].duration;
    setPhase(phases[phaseIndex].name);
    setMainTimer(totalDuration);

    const interval = setInterval(() => {
      setMainTimer(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setRunning(false);
          setPhase('');
          return 0;
        }
        return prev - 1;
      });

      if (timeLeft <= 1) {
        phaseIndex = (phaseIndex + 1) % phases.length;
        setPhase(phases[phaseIndex].name);
        timeLeft = phases[phaseIndex].duration;
      } else {
        timeLeft -= 1;
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [running, mode]);


  const handleStop = () => {
    setRunning(false);
    setPhase('');
    setMainTimer(0);
  };

  return (
    <div className="breathing-box-container">

      {phase && running && (
        <div
          key={phase}
          className="phase-text visible"
          style={{ color: 'white', fontSize: '28px', marginTop: '10px' }}
        >
           {phase.startsWith('hold') ? 'Mantén' : phase.charAt(0).toUpperCase() + phase.slice(1)}
        </div>
      )}

      {/* FULL MODE */}
  <div className="mode-wrapper">
  <div className={`mode-view ${mode === 'full' ? 'visible' : ''}`}>
    <div className={`breathing-box ${phase}`}>
      <div
        className={`breathing-ball ${phase}`}
        style={{
          transitionDuration:
            phase === 'inhale' ? `${inhaleTime}s` :
            phase === 'aguanta' ? `${hold1Time}s` :
            phase === 'exhale' ? `${exhaleTime}s` :
            phase === 'mantenlo' ? `${hold2Time}s` : '0s'
        }}
      >
      </div>
    </div>
  </div>

  <div className={`mode-view ${mode === 'simple' ? 'visible' : ''}`}>
    <div className="simple-breathing-container">
      <div
        className={`simple-ball ${phase}`}
        style={{
          animationDuration:
            phase === 'inhale' ? `${inhaleTime}s` :
            phase === 'exhale' ? `${exhaleTime}s` : undefined
        }}
      ></div>
    </div>
  </div>
</div>


      {running && (
        <div className="timer-display">
          Tiempo restante: {mainTimer}s
        </div>
      )}

      {/* CONTROLES */}
      <div className="breathing-controls">
        <div className="control-group">
          <label>Inhalar: {inhaleTime}s</label>
          <div>
            <button onClick={() => setInhaleTime(t => Math.max(1, t - 1))}>-</button>
            <button onClick={() => setInhaleTime(t => t + 1)}>+</button>
          </div>
        </div>

        {mode === 'full' && (
          <div className="control-group">
            <label>Aguantar: {hold1Time}s</label>
            <div>
              <button onClick={() => setHold1Time(t => Math.max(0, t - 1))}>-</button>
              <button onClick={() => setHold1Time(t => t + 1)}>+</button>
            </div>
          </div>
        )}

        <div className="control-group">
          <label>Exhalar: {exhaleTime}s</label>
          <div>
            <button onClick={() => setExhaleTime(t => Math.max(1, t - 1))}>-</button>
            <button onClick={() => setExhaleTime(t => t + 1)}>+</button>
          </div>
        </div>

        {mode === 'full' && (
          <div className="control-group">
            <label>Mantener: {hold2Time}s</label>
            <div>
              <button onClick={() => setHold2Time(t => Math.max(0, t - 1))}>-</button>
              <button onClick={() => setHold2Time(t => t + 1)}>+</button>
            </div>
          </div>
        )}

        <div className="control-group">
          <label>Total: {totalDuration}s</label>
          <div>
            <button onClick={() => setTotalDuration(t => Math.max(10, t - 1))}>-</button>
            <button onClick={() => setTotalDuration(t => t + 1)}>+</button>
          </div>
        </div>
      </div>

      <div className="button-group">
        <button className="button-s" onClick={() => setRunning(true)}>INICIAR</button>
        <button className="button-s" onClick={handleStop}>DETENER</button>
        <button className="button-s" onClick={() => {
          setRunning(false);
          setPhase('');
          setMainTimer(0);
          setMode(prev => (prev === 'full' ? 'simple' : 'full'));
        }}>
          Cambiar a modo {mode === 'full' ? 'simple' : 'completo'}
        </button>
      </div>
    </div>
  );
};

export default BreathingCircle;