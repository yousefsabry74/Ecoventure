export default function CtaBanner({ onStart }) {
  return (
    <section className="cta-banner" id="cta">
      <div className="container cta-inner">
        <div className="cta-content">
          <h2>Are you a teacher?</h2>
          <p>
            Sign in to create classroom teams, plan real-world activities, and
            award points after every eco-action.
          </p>
          <button className="cta-btn" onClick={onStart}>
            Open teacher workspace →
          </button>
        </div>
        <div className="cta-mascot">
          <img
            src="/seedling-backpack.png"
            alt="Greeno mascot with backpack"
            width="200"
            height="200"
          />
        </div>
      </div>
    </section>
  );
}
