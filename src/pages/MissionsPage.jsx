import { useState, useEffect } from 'react';
import { missions } from '../data/missions';
import ActivityDetails from './ActivityDetails';
import '../styles/MissionsPage.css';

export default function MissionsPage({ onBack }) {
  const [activeMissionId, setActiveMissionId] = useState(missions[0].id);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeMissionId]);

  const currentMission = missions.find(m => m.id === activeMissionId) || missions[0];

  const handleBack = () => {
    const currentIndex = missions.findIndex(m => m.id === activeMissionId);
    if (currentIndex > 0) {
      setActiveMissionId(missions[currentIndex - 1].id);
    } else if (onBack) {
      onBack();
    }
  };

  return (
    <div className="missions-page">
      {/* Top bar: Back + Mission Tabs */}
      <header className="missions-header">
        <div className="missions-header-inner">
          {onBack && (
            <button className="missions-back-btn" onClick={onBack}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5" /><path d="M12 19l-7-7 7-7" />
              </svg>
              <span>Back to Home</span>
            </button>
          )}

          <nav className="missions-tabs">
            {missions.map((m) => {
              const isActive = m.id === activeMissionId;
              return (
                <button
                  key={m.id}
                  onClick={() => setActiveMissionId(m.id)}
                  className={`missions-tab${isActive ? ' active' : ''}`}
                >
                  <span className="tab-emoji">{m.emoji}</span>
                  <span className="tab-label">{m.navLabel || m.title}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Mission Content */}
      <main className="missions-content">
        <ActivityDetails
          key={currentMission.id}
          activity={currentMission}
          onBack={handleBack}
        />
      </main>
    </div>
  );
}
