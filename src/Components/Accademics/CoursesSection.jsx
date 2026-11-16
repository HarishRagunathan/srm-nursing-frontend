import React, { useState, useEffect } from 'react';
import { FiClock, FiArrowRight, FiCheckCircle } from 'react-icons/fi';

const API_URL = import.meta.env.VITE_BACKEND_API_URL || import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function CoursesSection() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(`${API_URL}/api/courses?status=active`);
        if (!res.ok) throw new Error('Failed to fetch courses');
        const data = await res.json();
        setCourses(data.courses || []);
      } catch (err) {
        console.error('Error fetching courses:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const getImageUrl = (image) => {
    if (!image) return '';
    return image.startsWith('http') ? image : `${API_URL}/uploads/${image}`;
  };

  return (
    <section className="academic-courses">
      <div className="academic-container">
        <div className="academic-courses-header">
          <div className="academic-section-label">What We Offer</div>
          <h2 className="academic-section-title">
            Courses <span>Offered</span>
          </h2>
          <p className="academic-section-subtitle" style={{ margin: '0 auto' }}>
            Choose from our nationally recognized nursing programmes, each designed to equip you
            with the skills and knowledge to excel in modern healthcare.
          </p>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#64748b' }}>
            Loading courses...
          </div>
        ) : courses.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#64748b' }}>
            No courses available at the moment.
          </div>
        ) : (
          <div className="academic-courses-grid">
            {courses.map((course, i) => {
              const imgSrc = getImageUrl(course.image);
              return (
                <div className="academic-course-card" key={course._id || i}>
                  <div className="academic-course-card-image">
                    {imgSrc && <img src={imgSrc} alt={course.title} />}
                    <div className="academic-course-card-image-overlay">
                      <span className="academic-course-card-badge">{course.badge}</span>
                    </div>
                  </div>
                  <div className="academic-course-card-body">
                    <h3 className="academic-course-card-title">{course.title}</h3>
                    <div className="academic-course-card-duration">
                      <FiClock size={14} />
                      {course.duration}
                    </div>
                    <p className="academic-course-card-desc">{course.desc}</p>

                    {course.criteria && course.criteria.length > 0 && (
                      <div className="academic-course-card-criteria">
                        <div className="academic-course-card-criteria-title">Admission Criteria</div>
                        <ul>
                          {course.criteria.map((c, j) => (
                            <li key={j}>
                              <FiCheckCircle size={13} />
                              {c}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <a href="/contact" className="academic-btn academic-btn-accent" style={{ width: '100%', justifyContent: 'center' }}>
                      Apply Now / Enquire
                      <FiArrowRight size={16} />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
