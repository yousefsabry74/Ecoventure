import { useState } from 'react';
import greenoImg from '../assets/greeno.png';
import { ChevronDown, ChevronUp, Sparkles, BookOpen, Lightbulb, Award } from 'lucide-react';
import { HeaderIcon, MissionScene, StepGraphic } from '../components/MissionIllustrations';

export function ActivityDetails({ activity }) {
  const [showFullExplanation, setShowFullExplanation] = useState(false);
  const [selectedStep, setSelectedStep] = useState(null);

  return (
    <div className="mp-wrapper">
      {/* ── Greeno Welcome Banner ── */}
      <div className="mp-mascot-banner">
        <div className="mp-mascot-img-box">
          <img src={greenoImg} alt="Greeno mascot" className="mp-mascot-img" />
        </div>
        <div className="mp-mascot-content">
          <div className="mp-mascot-header">
            <span className="mp-mascot-name">Greeno says:</span>
            <span className="mp-points-pill">
              <Award size={14} /> +{activity.points || 20} Eco Points
            </span>
          </div>
          <p className="mp-mascot-quote">
            "{activity.mascotQuoteLine1} {activity.mascotQuoteLine2}"
          </p>
        </div>
      </div>

      {/* ── Main Mission Card ── */}
      <div className="mp-main-card">
        {/* Header: Icon + Category Badge + Title */}
        <div className="mp-card-header">
          <div className="mp-header-icon-box">
            <HeaderIcon type={activity.headerIcon} />
          </div>
          <div className="mp-header-info">
            <span className="mp-category-badge">{activity.category}</span>
            <h1 className="mp-title">{activity.title}</h1>
          </div>
        </div>

        {/* Hero Section: Visual Scene on Left + Story on Right */}
        <div className="mp-hero-section">
          {/* Visual Scene Box */}
          <div className="mp-visual-frame">
            <div className="mp-visual-badge">
              <Sparkles size={13} />
              <span>Mission Visual</span>
            </div>
            {activity.imageUrl ? (
              <img src={activity.imageUrl} alt={activity.title} className="mp-visual-img" />
            ) : (
              <div className="mp-visual-scene">
                <MissionScene type={activity.id} title={activity.title} />
              </div>
            )}
          </div>

          {/* Story & Info */}
          <div className="mp-story-frame">
            <div className="mp-story-title-row">
              <BookOpen size={18} className="mp-story-icon" />
              <h2 className="mp-story-heading">About This Mission</h2>
            </div>

            <p className="mp-story-overview">{activity.overview}</p>

            <button
              type="button"
              className="mp-toggle-btn"
              onClick={() => setShowFullExplanation(!showFullExplanation)}
            >
              <Lightbulb size={16} />
              <span>{showFullExplanation ? 'Hide Details' : 'Read Fun Facts & Materials'}</span>
              {showFullExplanation ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {showFullExplanation && (
              <div className="mp-expanded-box">
                <div className="mp-fun-fact">
                  <span className="mp-fact-emoji">💡</span>
                  <p>{activity.funFact}</p>
                </div>

                {activity.materials && activity.materials.length > 0 && (
                  <div className="mp-materials-section">
                    <span className="mp-materials-title">✂️ What you'll need:</span>
                    <div className="mp-materials-tags">
                      {activity.materials.map((mat, idx) => (
                        <span key={idx} className="mp-mat-tag">{mat}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Steps Section */}
        <div className="mp-steps-section">
          <div className="mp-steps-header">
            <h2 className="mp-steps-title">
              {activity.stepsHeadline || `Follow these ${activity.steps.length} simple steps:`}
            </h2>
            <span className="mp-steps-tip">Click any step for guidance</span>
          </div>

          <div className="mp-steps-grid">
            {activity.steps.map((step) => {
              const isSelected = selectedStep === step.number;
              return (
                <div
                  key={step.number}
                  className={`mp-step-card${isSelected ? ' is-selected' : ''}`}
                  onClick={() => setSelectedStep(isSelected ? null : step.number)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedStep(isSelected ? null : step.number);
                    }
                  }}
                >
                  <div className="mp-step-top">
                    <span className="mp-step-num">{step.number}</span>
                    <span className="mp-step-toggle-hint">
                      {isSelected ? '▲ Less' : '▼ Details'}
                    </span>
                  </div>

                  <div className="mp-step-graphic">
                    <StepGraphic type={step.type} />
                  </div>

                  <p className="mp-step-text">{step.text}</p>

                  {isSelected && (
                    <div className="mp-step-details-box">
                      <p>{step.details}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Note */}
        <div className="mp-bottom-note">
          🌟 Complete this activity with your classmates, then show your teacher to earn points for your school!
        </div>
      </div>
    </div>
  );
}

export default ActivityDetails;
