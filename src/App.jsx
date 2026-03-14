import React from 'react';
import './index.css';
import DailyVerse from './components/DailyVerse';
import MeditationSpace from './components/MeditationSpace';

function App() {
  return (
    <div className="container">
      <header className="animate-fade-in" style={{ textAlign: 'center', marginBottom: '4rem', marginTop: '2rem' }}>
        <img src="/logo.png" alt="Daily Manna Logo" style={{ width: '80px', height: '80px', marginBottom: '1rem', borderRadius: '50%', objectFit: 'cover' }} />
        <h1 style={{ fontSize: '3rem', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: '0.5rem' }}>
          Daily Manna
        </h1>
        <p style={{ fontSize: '1.2rem', opacity: 0.8, fontWeight: 300 }}>
          Quiet your mind, nourish your soul
        </p>
      </header>

      <main>
        <DailyVerse />
        <MeditationSpace />
      </main>

      <footer className="animate-fade-in" style={{ 
        textAlign: 'center', 
        marginTop: '4rem', 
        paddingBottom: '2rem',
        opacity: 0.6, 
        fontSize: '0.9rem',
        animationDelay: '0.6s', 
        animationFillMode: 'forwards' 
      }}>
        <p>© {new Date().getFullYear()} Daily Manna. Designed with peace.</p>
      </footer>
    </div>
  );
}

export default App;
