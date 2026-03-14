import React from 'react';
import { getDailyVerse } from '../utils/verses';

export default function DailyVerse() {
  const verse = getDailyVerse();

  return (
    <div className="glass-panel" style={{ marginBottom: '2rem' }}>
      <h2 style={{ fontSize: '1rem', color: 'var(--accent-color)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>
        오늘의 말씀
      </h2>
      <blockquote style={{ margin: 0 }}>
        <p style={{ 
          fontSize: '1.5rem', 
          color: 'var(--text-primary)', 
          fontStyle: 'italic', 
          lineHeight: '1.4',
          marginBottom: '1.5rem'
        }}>
          "{verse.text}"
        </p>
        <footer style={{ 
          textAlign: 'right', 
          fontWeight: 600, 
          color: 'var(--text-secondary)' 
        }}>
          — {verse.reference}
        </footer>
      </blockquote>
    </div>
  );
}
