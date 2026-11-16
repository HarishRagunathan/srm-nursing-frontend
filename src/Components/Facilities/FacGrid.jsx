import React, { useState, useEffect } from 'react';
import {
  FiMonitor,
  FiUsers,
  FiBook,
  FiActivity,
  FiZap,
  FiMusic,
  FiTruck,
  FiHome,
  FiCoffee,
  FiWifi,
  FiShield,
  FiHeart,
} from 'react-icons/fi';

const API_URL = import.meta.env.VITE_BACKEND_API_URL || import.meta.env.VITE_API_URL || 'http://localhost:5000';

const ICON_MAP = {
  FiMonitor: <FiMonitor />,
  FiUsers: <FiUsers />,
  FiBook: <FiBook />,
  FiActivity: <FiActivity />,
  FiZap: <FiZap />,
  FiMusic: <FiMusic />,
  FiTruck: <FiTruck />,
  FiHome: <FiHome />,
  FiCoffee: <FiCoffee />,
  FiWifi: <FiWifi />,
  FiShield: <FiShield />,
  FiHeart: <FiHeart />,
};

const FacGrid = () => {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const res = await fetch(`${API_URL}/api/facilities?status=active`);
        if (!res.ok) throw new Error('Failed to fetch facilities');
        const data = await res.json();
        setFacilities(data.facilities || []);
      } catch (err) {
        console.error('Error loading facilities:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFacilities();
  }, []);

  const getImageUrl = (img) => {
    if (!img) return '';
    return img.startsWith('http') ? img : `${API_URL}/uploads/${img}`;
  };

  return (
    <section className="fac-grid">
      <div className="fac-grid__inner">
        <div className="fac-grid__header">
          <span className="fac-section-label">What We Offer</span>
          <h2 className="fac-section-title">Our Campus Facilities</h2>
          <p className="fac-section-desc">
            Explore every dimension of student life at SRM Trichy College of Nursing —
            from academic excellence to holistic well-being.
          </p>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#64748b' }}>
            Loading campus facilities...
          </div>
        ) : facilities.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#64748b' }}>
            No facilities available at the moment.
          </div>
        ) : (
          <div className="fac-grid__list">
            {facilities.map((fac, i) => {
              const iconElement = ICON_MAP[fac.icon] || <FiMonitor />;
              const imgSrc = getImageUrl(fac.img);

              return (
                <div className="fac-card" key={fac._id || i}>
                  <div className="fac-card__image-wrap">
                    {imgSrc && <img src={imgSrc} alt={fac.title} />}
                    <div className="fac-card__overlay" />
                    <span className="fac-card__tag">{fac.tag}</span>
                  </div>

                  <div className="fac-card__body">
                    <h3 className="fac-card__title">
                      <span className="fac-card__icon-badge">{iconElement}</span>
                      {fac.title}
                    </h3>
                    <p className="fac-card__desc">{fac.desc}</p>
                    {fac.features && fac.features.length > 0 && (
                      <div className="fac-card__features">
                        {fac.features.map((f, j) => (
                          <span className="fac-card__feature-tag" key={j}>
                            {f}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default FacGrid;
