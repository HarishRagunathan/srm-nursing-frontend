import { FiUsers, FiGlobe, FiHome, FiTrendingUp } from 'react-icons/fi';



const icons = { FiUsers, FiGlobe, FiHome, FiTrendingUp };

export default function PlacementStats({ stats = [] }) {
  return (
    <section className="placement-stats">
      <div className="placement-stats__bg" aria-hidden="true" />
      <div className="placement-stats__container">
        <div className="placement-stats__header">
          <div className="placement-section-label">Our Track Record</div>
          <h2 className="placement-section-title">
            Numbers That <span>Speak Volumes</span>
          </h2>
          <p className="placement-section-desc">
            Consistently delivering exceptional career outcomes for our nursing graduates since 2018.
          </p>
        </div>

        <div className="placement-stats__grid">
          {stats.map((s, i) => (
            <div className="placement-stat-card" key={i}>
              <div className="placement-stat-card__icon">{(() => { const Icon = icons[s.icon] || FiUsers; return <Icon />; })()}</div>
              <div className="placement-stat-card__number">
                {s.number}<span>{s.suffix}</span>
              </div>
              <div className="placement-stat-card__label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
