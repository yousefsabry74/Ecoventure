import '../styles/Hero.css';

export default function Hero({ onBrowseMissions, onBrowseChallenges }) {
  const handleBrowse = onBrowseMissions || onBrowseChallenges;
  return (
    <section className="hero" id="home">
      {/* Decorative leaves */}
      <span className="hero-leaf hero-leaf-1">🍃</span>
      <span className="hero-leaf hero-leaf-2">🌿</span>

      <div className="container hero-inner">
        {/* Left Content */}
        <div className="hero-content">
          <h1>
            Small Actions.<br />
            <span className="highlight">Big Impact.</span>
          </h1>
          <p>
            Ecoventure is a fun, school-based platform that turns everyday
            eco-actions into real change. Together, we can build a greener future!
          </p>
          <button className="hero-cta" id="hero-start-btn" onClick={handleBrowse}>
            Explore Missions <span className="cta-arrow">→</span>
          </button>
        </div>

        {/* Right Visual */}
        <div className="hero-visual">
          <div className="hero-mascot-wrapper">
            <span className="hero-float-star">✦</span>
            <span className="hero-float-star">⭐</span>
            <span className="hero-float-star">🌟</span>
            <span className="hero-float-star">✨</span>
            <img
              src="/greeno-wave.png"
              alt="Greeno, the Ecoventure mascot waving hello"
              width="520"
              height="520"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
