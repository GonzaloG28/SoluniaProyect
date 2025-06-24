import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from "react-router-dom";
import ProtectedLink from '../ProtectedLink/ProtectedLink';
import { AuthContext } from '../../authContext';
import './header.css';

const Header = ({ style }) => {
  const [animateBall, setAnimateBall] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
   const { token, userEmail, logout } = useContext(AuthContext);
  const location = useLocation();


  useEffect(() => {
    setAnimateBall(true);
    const timer = setTimeout(() => setAnimateBall(false), 3500);
    return () => clearTimeout(timer);
  }, [style]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
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

          {token ? (
            <>
              <span className="user-email">{userEmail}</span>
              <button onClick={logout} className={`btn ${style}`}>Cerrar sesión</button>
            </>
          ) : (
            <>
              <Link to="/register" onClick={closeMenu} className={`btn ${style}`}>Registrarse</Link>
              <Link to="/login" onClick={closeMenu} className={`btn ${style}`}>Iniciar Sesion</Link>
            </>
          )}


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
          {token ? (
            <>
              <span className="user-email">{userEmail}</span>
              <button onClick={logout} className={`btn ${style}`}>Cerrar sesión</button>
            </>
          ) : (
            <>
              <Link to="/register" onClick={closeMenu} className={`btn ${style}`}>Registrarse</Link>
              <Link to="/login" onClick={closeMenu} className={`btn ${style}`}>Iniciar Sesion</Link>
            </>
          )}
        </div>
      </nav>
      
    </header>

  );
};

export default Header;