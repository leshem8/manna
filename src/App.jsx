import React from 'react';
import './index.css';
import DailyVerse from './components/DailyVerse';
import MeditationSpace from './components/MeditationSpace';

function App() {
  return (
    <div className="container">
      <header className="animate-fade-in" style={{ textAlign: 'center', marginBottom: '4rem', marginTop: '2rem' }}>
        <img src="/logo.png" alt="데일리 만나 로고" style={{ width: '80px', height: '80px', marginBottom: '1rem', borderRadius: '50%', objectFit: 'cover' }} />
        <h1 style={{ fontSize: '3rem', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: '0.5rem' }}>
          데일리 만나
        </h1>
        <p style={{ fontSize: '1.2rem', opacity: 0.8, fontWeight: 300 }}>
          마음을 고요히, 영혼을 풍성하게
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
        <p>© {new Date().getFullYear()} Daily Manna. 평온함과 함께 디자인되었습니다.</p>
      </footer>
    </div>
  );
}

export default App;
