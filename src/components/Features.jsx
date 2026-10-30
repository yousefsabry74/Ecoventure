export default function Features() {
  const features = [
    {
      icon: '🌿',
      iconClass: 'icon-green',
      title: 'Real Eco Actions',
      desc: 'Students complete real-world missions like recycling, saving water, and growing plants right in their school.',
    },
    {
      icon: '👥',
      iconClass: 'icon-blue',
      title: 'Team Missions',
      desc: 'Work together as a class to complete team missions and earn bonus points for the whole group.',
    },
    {
      icon: '🏆',
      iconClass: 'icon-yellow',
      title: 'Grow Your Garden',
      desc: 'Watch your virtual garden grow as you earn points! Every eco-action plants a seed in your class garden.',
    },
  ];

  return (
    <section className="features-section" id="features">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Making Eco-Learning Fun & Impactful</h2>
          <p className="section-subtitle">
            A platform designed for schools to inspire the next generation of
            eco-champions through play, teamwork, and real action.
          </p>
        </div>

        <div className="features-grid">
          {features.map((f, i) => (
            <article className="feature-card" key={i}>
              <div className={`feature-icon ${f.iconClass}`}>{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
