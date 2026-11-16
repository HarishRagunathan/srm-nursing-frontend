import React from 'react';

const API_URL = import.meta.env.VITE_BACKEND_API_URL || import.meta.env.VITE_API_URL || 'http://localhost:5000';

const GreenCampusGallery = ({ gallery = [] }) => {
  if (!gallery || gallery.length === 0) return null;

  return (
    <section className="gc-gallery">
      <div className="green-campus-container">
        <div className="gc-gallery-head">
          <div>
            <span className="green-campus-eyebrow">In Pictures</span>
            <h2 className="green-campus-title" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', marginBottom: 0 }}>
              Green Campus, Captured
            </h2>
          </div>
        </div>
        <div className="gc-gallery-grid">
          {gallery.map((img, i) => {
            const imgSrc = img.image
              ? (img.image.startsWith('http') ? img.image : `${API_URL}/uploads/${img.image}`)
              : '';
            return (
              <img
                key={img._id || i}
                src={imgSrc}
                alt={img.alt || img.title || 'Green Campus'}
                loading="lazy"
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default GreenCampusGallery;
