


export default function PlacementOverview({ batches = [] }) {
  return (
    <section className="placement-overview">
      <div className="placement-overview__container">
        <div className="placement-section-label">Placement Overview</div>
        <h2 className="placement-section-title">
          Batch-wise <span>Hospital Placements</span>
        </h2>
        <p className="placement-section-desc">
          Our graduates have consistently secured positions in premier hospitals across Tamil Nadu and beyond, with year-on-year growth in placement numbers.
        </p>

        <div className="placement-overview__grid">
          {batches.map((batch, i) => (
            <div className="placement-batch-card" key={i}>
              <div className="placement-batch-card__header">
                <span className="placement-batch-card__year">{batch.year}</span>
                <span className="placement-batch-card__count">{batch.total}</span>
              </div>
              <div className="placement-batch-card__hospitals">
                {batch.hospitals.map((h, j) => (
                  <div className="placement-batch-hospital" key={j}>
                    <span className="placement-batch-hospital__dot" />
                    <span className="placement-batch-hospital__name">{h.name}</span>
                    <span className="placement-batch-hospital__count">{h.count}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
