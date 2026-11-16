import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { FaHeart, FaBook, FaLanguage, FaPenNib, FaStethoscope } from 'react-icons/fa';

const API_URL = import.meta.env.VITE_BACKEND_API_URL || import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function AcademicClubsOverview() {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    fetch(`${API_URL}/api/clubs?status=active`)
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (isMounted && json && Array.isArray(json.clubs)) {
          setClubs(json.clubs);
        }
      })
      .catch((err) => console.error('Error fetching clubs in overview:', err))
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading || clubs.length === 0) {
    return null;
  }

  return (
    <section style={{ background: '#ffffff', padding: '80px 0' }}>
      <div className="academic-container">
        <div className="academic-courses-header" style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div className="academic-section-label">Campus Life &amp; Committees</div>
          <h2 className="academic-section-title">
            Committees &amp; Student <span>Clubs</span>
          </h2>
          <p className="academic-section-subtitle" style={{ margin: '0 auto', maxWidth: '680px' }}>
            Empowering student nurses through leadership, statutory compliance, professional advocacy, and extracurricular excellence.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '20px',
          marginBottom: '36px'
        }}>
          {clubs.slice(0, 4).map((club) => {
            const imgSrc = club.coverImage
              ? (club.coverImage.startsWith('http') ? club.coverImage : `${API_URL}/uploads/${club.coverImage}`)
              : '';

            return (
              <div
                key={club._id || club.slug}
                style={{
                  background: '#f8f6fc',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: '1px solid #ebe7f4',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                {imgSrc && (
                  <div style={{ height: '160px', overflow: 'hidden' }}>
                    <img
                      src={imgSrc}
                      alt={club.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                )}
                <div style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                  <div>
                    <span style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      padding: '3px 8px',
                      borderRadius: '12px',
                      background: '#5b21b6',
                      color: '#ffffff',
                      textTransform: 'capitalize',
                      display: 'inline-block',
                      marginBottom: '8px'
                    }}>
                      {club.category || 'Club'}
                    </span>
                    <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#2f1b5c', margin: '0 0 6px' }}>
                      {club.name}
                    </h4>
                    <p style={{ fontSize: '12px', color: '#5f5578', lineHeight: 1.5, margin: 0 }}>
                      {club.tagline || (typeof club.aim === 'string' ? club.aim.slice(0, 100) + '...' : '')}
                    </p>
                  </div>

                  <Link
                    to={`/clubs`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      color: '#0f8ca6',
                      fontWeight: 700,
                      fontSize: '13px',
                      marginTop: '14px',
                      textDecoration: 'none'
                    }}
                  >
                    View Charter &amp; Objectives <FiArrowRight />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ textAlign: 'center' }}>
          <Link
            to="/clubs"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '14px 28px',
              borderRadius: '50px',
              background: '#0f8ca6',
              color: '#ffffff',
              fontWeight: 700,
              textDecoration: 'none'
            }}
          >
            Explore All Clubs &amp; Committees <FiArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

