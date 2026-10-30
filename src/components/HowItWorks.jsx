export default function HowItWorks() {
  const steps = [
    {
      num: 1,
      title: 'Explore a Mission',
      desc: 'Open a visual mission card to see the goals and easy steps.',
    },
    {
      num: 2,
      title: 'Take Action',
      desc: 'Complete the mission at school or home and capture your eco-moment.',
    },
    {
      num: 3,
      title: 'Share With Your Teacher',
      desc: 'Tell your teacher when you finish. They award points for your team.',
    },
  ];

  return (
    <section className="how-it-works" id="how-it-works">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">
            Three simple steps to start your eco-adventure
          </p>
        </div>

        <div className="steps-grid">
          {steps.map((s) => (
            <div className="step-card" key={s.num}>
              <div className="step-number">{s.num}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
