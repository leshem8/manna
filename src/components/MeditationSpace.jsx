import React, { useState, useEffect } from 'react';
import { getDailyVerse } from '../utils/verses';

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwBMl0bmcdSCn_otXWAxsgwlU6y13SspHt9MyEEmggyUqs05JEpPhxP-y4azj2Ls_IE/exec';

export default function MeditationSpace() {
  const [note, setNote] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Load from local storage on mount (optional - can still keep local backup)
  useEffect(() => {
    const todayStr = new Date().toISOString().split('T')[0];
    const savedNote = localStorage.getItem(`meditation_${todayStr}`);
    if (savedNote) {
      setNote(savedNote);
    }
  }, []);

  const handleSave = async () => {
    const todayStr = new Date().toISOString().split('T')[0];
    // Save locally first for backup/speed
    localStorage.setItem(`meditation_${todayStr}`, note);
    
    setIsSaving(true);
    
    try {
      const verseInfo = getDailyVerse();
      const verseText = `${verseInfo.text} - ${verseInfo.reference}`;
      
      const payload = {
        date: new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }),
        verse: verseText,
        note: note
      };

      // Send to Google Sheets
      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // required to bypass CORS on simple GAS fetches
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    } catch (error) {
      console.error("Error saving to Google Sheets:", error);
      alert("구글 시트 저장에 실패했습니다. 하지만 브라우저에는 저장되었습니다.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (e) => {
    setNote(e.target.value);
    if (isSaved) setIsSaved(false);
  };

  return (
    <div className="glass-panel animate-fade-in" style={{ animationDelay: '0.4s', opacity: 0, animationFillMode: 'forwards' }}>
      <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>묵상 및 기도</span>
        {isSaved && <span style={{ fontSize: '0.875rem', color: 'var(--accent-color)', fontWeight: 500, animation: 'fadeIn 0.3s ease' }}>구글 문서에 저장됨 \u2713</span>}
      </h3>
      
      <textarea 
        className="glass-input"
        placeholder="마음을 잠잠히 하고 기도로 나아가세요..."
        value={note}
        onChange={handleChange}
        disabled={isSaving}
        style={{ 
          minHeight: '200px', 
          resize: 'vertical',
          marginBottom: '1.5rem',
          lineHeight: '1.6',
          opacity: isSaving ? 0.7 : 1
        }}
      />
      
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button 
          className="glass-button" 
          onClick={handleSave}
          disabled={!note.trim() || isSaving}
          style={{ 
            opacity: (!note.trim() || isSaving) ? 0.5 : 1, 
            cursor: (!note.trim() || isSaving) ? 'not-allowed' : 'pointer' 
          }}
        >
          {isSaving ? '저장 중...' : (isSaved ? '저장 완료 \u2713' : '노트 저장')}
        </button>
      </div>
    </div>
  );
}
