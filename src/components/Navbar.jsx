import { useState, useEffect } from 'react';
import '../styles/Navbar.css';
import logo from '../assets/ecoventure-logo.png';

export default function Navbar({ activePage, onNavigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`} id="main-navbar">
      <div className="container navbar-inner">
        <a href="#home" className="navbar-brand" aria-label="Ecoventure Home" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>
          <img src={logo} alt="Ecoventure" className="brand-logo" />
        </a>

        <div className={`navbar-links${menuOpen ? ' open' : ''}`}>
          <a href="#home" className={activePage === 'home' ? 'active' : ''} onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>Home</a>
          <a href="#missions" className={activePage === 'missions' ? 'active' : ''} onClick={(e) => { e.preventDefault(); onNavigate('missions'); }}>Missions</a>
          <a href="#leaderboard" onClick={(e) => {
            e.preventDefault();
            if (activePage !== 'home') {
              onNavigate('home');
              setTimeout(() => {
                document.getElementById('leaderboard')?.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            } else {
              document.getElementById('leaderboard')?.scrollIntoView({ behavior: 'smooth' });
            }
          }}>Leaderboard</a>
        </div>

        <div className="navbar-actions">
          <button className="btn-get-started" onClick={() => onNavigate('teacher')}>Teacher Dashboard</button>
          <button
            className="navbar-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>
    </nav>
  );
}
