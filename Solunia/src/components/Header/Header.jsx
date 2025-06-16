import React, { useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import ProtectedLink from '../ProtectedLink/ProtectedLink';
import AuthModal from '../AuthModal/AuthModal';
import './header.css';

const Header = ({ style }) => {
  const [animateBall, setAnimateBall] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("login")
  const closeMenu = () => setMenuOpen(false);
  const location = useLocation();


  useEffect(() => {
    setAnimateBall(true);
    const timer = setTimeout(() => setAnimateBall(false), 3500);
    return () => clearTimeout(timer);
  }, [style]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const abrirModal = (modo) => {
    setModalMode(modo);     
    setShowModal(true);    
  };

  return (
    <header className="header">

      <div className="header-top">
      

        <h1 className="title">Solunia</h1>


         {!menuOpen && (
            <button className="mobile-toggle" onClick={toggleMenu}>
              ☰
            </button>
          )}

        <div className="header-top-right desktop-only">
          <button onClick={() => abrirModal("register")} className={`btn ${style}`}>Registrarse</button>
          <button onClick={() => abrirModal("login")} className={`btn ${style}`}>Iniciar Sesion</button>

          <AuthModal isOpen={showModal} onClose={() => setShowModal(false)} mode={modalMode}/>
        </div>
        
      </div>

      <div className="bouncing-wrapper">
        <div className={`bouncing-ball ${style} ${animateBall ? 'expand' : ''}`}></div>
      </div>
    
      <nav className={`nav-container ${menuOpen ? 'open' : ''}`}>

          {menuOpen && (
            <button className="nav-close" onClick={toggleMenu}>
              X
            </button>
          )}

        <div className="nav-left">
          <Link to="/" className={`nav-link ${style} ${location.pathname === '/' ? 'active-link' : ''}`} onClick={closeMenu}>INICIO</Link>
          <ProtectedLink>
          <Link to="/respiracion" className={`nav-link ${style} ${location.pathname === '/respiracion' ? 'active-link' : ''}`} onClick={closeMenu}>PULSO</Link>
          </ProtectedLink>
        </div>
        <div className="nav-right">
          <ProtectedLink>
          <Link to="/cursos" className={`nav-link ${style} ${location.pathname === '/cursos' ? 'active-link' : ''}`} onClick={closeMenu}>CURSOS</Link>
          </ProtectedLink>
          <Link to="/" className={style} onClick={closeMenu}>SOON</Link>
        </div>
         
        <div className="nav-auth mobile-only">
          <button onClick={() => abrirModal("register")} className={`btn ${style}`}>Registrarse</button>
          <button onClick={() => abrirModal("login")} className={`btn ${style}`}>Iniciar Sesion</button>
          <AuthModal isOpen={showModal} onClose={() => setShowModal(false)} mode={modalMode}/>
        </div>
      </nav>
      
    </header>

  );
};

export default Header;