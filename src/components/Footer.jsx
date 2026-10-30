export default function Footer({ onNavigate, activePage }) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="brand-text">
              Ecoventure
            </div>
            <p>
              A fun, school-based platform turning everyday eco-actions into
              real change. Small actions, big impact.
            </p>
          </div>

          <div className="footer-col">
            <h4>Platform</h4>
            <a href="#home" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>Home</a>
            <a href="#missions" onClick={(e) => { e.preventDefault(); onNavigate('missions'); }}>Missions</a>
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
            <a href="#how-it-works" onClick={(e) => { e.preventDefault(); onNavigate('how-it-works'); }}>How It Works</a>
          </div>

          <div className="footer-col">
            <h4>Resources</h4>
            <a href="#">Teacher Guide</a>
            <a href="#">Parent Info</a>
            <a href="#">Blog</a>
            <a href="#">FAQ</a>
          </div>

          <div className="footer-col">
            <h4>Connect</h4>
            <a href="#">Contact Us</a>
            <a href="#">Twitter</a>
            <a href="#">Instagram</a>
            <a href="#">YouTube</a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>Made with care for a greener future <span>💚</span></p>
          <small>© 2026 Ecoventure. All rights reserved.</small>
        </div>
      </div>
    </footer>
  );
}
