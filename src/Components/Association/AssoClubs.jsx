import React, { useState, useEffect } from 'react';
import {
  FaHeart,
  FaBook,
  FaLanguage,
  FaPenNib,
  FaStethoscope,
  FaPalette,
  FaShieldAlt,
  FaGlobe,
  FaHandHoldingHeart,
  FaHeartbeat
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_BACKEND_API_URL || import.meta.env.VITE_API_URL || 'http://localhost:5000';

const ICON_MAP = {
  stethoscope: <FaStethoscope />,
  'book-open': <FaBook />,
  newspaper: <FaPenNib />,
  languages: <FaLanguage />,
  palette: <FaPalette />,
  'heart-handshake': <FaHandHoldingHeart />,
  'heart-pulse': <FaHeartbeat />,
  cross: <FaHeart />,
  'shield-alert': <FaShieldAlt />,
  globe: <FaGlobe />
};

const AssoClubs = () => {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchClubs = async () => {
      try {
        const res = await fetch(`${API_URL}/api/clubs?status=active`);
        if (res.ok) {
          const json = await res.json();
          if (isMounted && Array.isArray(json.clubs)) {
            setClubs(json.clubs);
          }
        }
      } catch (err) {
        console.error('Error fetching clubs in AssoClubs:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchClubs();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading || clubs.length === 0) {
    return null;
  }

  return (
    <section className="asso-clubs" id="clubs">
      <div className="asso-container">
        <div className="asso-section-header">
          <div className="asso-section-badge">Campus Life</div>
          <h2 className="asso-section-title">
            Student <span>Clubs &amp; Activities</span>
          </h2>
          <p className="asso-section-sub">
            Diverse platforms for holistic development — from humanitarian service
            to research excellence and communication mastery.
          </p>
        </div>

        <div className="asso-clubs__grid">
          {clubs.map((club, i) => {
            const icon = ICON_MAP[club.icon] || <FaHeart />;
            const imgSrc = club.coverImage
              ? (club.coverImage.startsWith('http') ? club.coverImage : `${API_URL}/uploads/${club.coverImage}`)
              : '';
            const desc = club.tagline || (typeof club.aim === 'string' ? club.aim.slice(0, 120) + '...' : '');

            return (
              <Link to={`/clubs/${club.slug}`} style={{ textDecoration: 'none' }} key={club._id || club.slug || i} className="asso-club-card">
                <div className="asso-club-card__image">
                  {imgSrc ? (
                    <img src={imgSrc} alt={club.name} />
                  ) : (
                    <div style={{ width: '100%', height: '100%', background: '#1e293b', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
                      {icon}
                    </div>
                  )}
                  <div className="asso-club-card__image-overlay" />
                  <div className="asso-club-card__icon-badge">{icon}</div>
                  <div className="asso-club-card__img-title">{club.shortName || club.name}</div>
                </div>
                <div className="asso-club-card__body">
                  <p className="asso-club-card__desc">{desc}</p>
                  <span className="asso-club-card__tag" style={{ textTransform: 'capitalize' }}>
                    {club.category || 'Club'}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AssoClubs;
