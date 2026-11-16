import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { FaHeartbeat, FaUserMd, FaUsers, FaBaby, FaBrain, FaFemale, FaBuilding } from 'react-icons/fa';

const API_URL = import.meta.env.VITE_BACKEND_API_URL || import.meta.env.VITE_API_URL || 'http://localhost:5000';

const ICON_MAP = {
  FaHeartbeat: <FaHeartbeat />,
  FaUserMd: <FaUserMd />,
  FaUsers: <FaUsers />,
  FaBaby: <FaBaby />,
  FaBrain: <FaBrain />,
  FaFemale: <FaFemale />
};

export default function AcademicDepartmentsOverview() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    fetch(`${API_URL}/api/departments?status=active`)
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (isMounted && json && Array.isArray(json.departments)) {
          setDepartments(json.departments);
        }
      })
      .catch((err) => console.error('Error fetching departments in overview:', err))
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading || departments.length === 0) {
    return null;
  }

  return (
    <section className="academic-courses" style={{ background: '#f8f6fc', padding: '80px 0' }}>
      <div className="academic-container">
        <div className="academic-courses-header" style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div className="academic-section-label">Academic Departments</div>
          <h2 className="academic-section-title">
            Specialized Nursing <span>Departments</span>
          </h2>
          <p className="academic-section-subtitle" style={{ margin: '0 auto', maxWidth: '680px' }}>
            Comprehensive clinical and theoretical instruction across dedicated nursing specialities with modern simulation labs.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '24px',
          marginBottom: '36px'
        }}>
          {departments.slice(0, 6).map((dept) => {
            const imgSrc = dept.image
              ? (dept.image.startsWith('http') ? dept.image : `${API_URL}/uploads/${dept.image}`)
              : '';
            const desc = Array.isArray(dept.description)
              ? dept.description[0]
              : typeof dept.description === 'string' ? dept.description : '';

            return (
              <div
                key={dept._id || dept.deptId}
                style={{
                  background: '#ffffff',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 20px rgba(75, 46, 131, 0.08)',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  border: '1px solid #ebe7f4'
                }}
              >
                <div style={{ position: 'relative', height: '190px', overflow: 'hidden', background: '#e2e8f0' }}>
                  {imgSrc && (
                    <img
                      src={imgSrc}
                      alt={dept.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  )}
                  <span style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    background: dept.color || '#4b2e83',
                    color: '#ffffff',
                    fontSize: '11px',
                    fontWeight: 700,
                    padding: '4px 10px',
                    borderRadius: '20px'
                  }}>
                    {dept.eyebrow || 'Department'}
                  </span>
                </div>

                <div style={{ padding: '20px 22px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#2f1b5c', margin: '0 0 8px' }}>
                      {dept.title}
                    </h3>
                    <p style={{ fontSize: '13px', color: '#5f5578', lineHeight: 1.6, margin: 0 }}>
                      {desc ? (desc.length > 130 ? desc.slice(0, 130) + '...' : desc) : 'Structured clinical progression and hands-on laboratory education.'}
                    </p>
                  </div>

                  <Link
                    to={`/departments#${dept.deptId}`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      color: dept.color || '#4b2e83',
                      fontWeight: 700,
                      fontSize: '13px',
                      marginTop: '16px',
                      textDecoration: 'none'
                    }}
                  >
                    View Curriculum &amp; Labs <FiArrowRight />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ textAlign: 'center' }}>
          <Link
            to="/departments"
            className="academic-btn academic-btn-primary"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '14px 28px',
              borderRadius: '50px',
              background: '#4b2e83',
              color: '#ffffff',
              fontWeight: 700,
              textDecoration: 'none'
            }}
          >
            Explore All Departments &amp; Labs <FiArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
