import React, { useState, useEffect } from 'react';
import '../Styles/GreenCampus.css';
import Breadcrum from '../Components/Common/Breadcrum';
import GreenCampusIntro from '../Components/GreenCampus/GreenCampusIntro';
import GreenCampusBlock from '../Components/GreenCampus/GreenCampusBlock';
import GreenCampusGallery from '../Components/GreenCampus/GreenCampusGallery';
import GreenCampusCTA from '../Components/GreenCampus/GreenCampusCTA';

const API_URL = import.meta.env.VITE_BACKEND_API_URL || import.meta.env.VITE_API_URL || 'http://localhost:5000';

const GreenCampusPage = () => {
  const [initiatives, setInitiatives] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchGreenCampusData = async () => {
      try {
        const res = await fetch(`${API_URL}/api/green-campus`);
        if (!res.ok) {
          throw new Error(`Failed to load green campus data (${res.status})`);
        }
        const json = await res.json();
        if (isMounted) {
          setInitiatives(Array.isArray(json.initiatives) ? json.initiatives : []);
          setGallery(Array.isArray(json.gallery) ? json.gallery : []);
          setError(null);
        }
      } catch (err) {
        console.error('Error fetching green campus from backend:', err);
        if (isMounted) {
          setError(err.message);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchGreenCampusData();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <main className="green-campus-page">
      <Breadcrum title="Green Campus" subtitle="Home / Green Campus" />
      <GreenCampusIntro />

      {loading ? (
        <div style={{ textAlign: 'center', padding: '80px 20px', color: '#64748b' }}>
          <p style={{ fontSize: '16px' }}>Loading green campus initiatives from database...</p>
        </div>
      ) : error ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: '#dc2626' }}>
          <p>Failed to load green campus content. Please verify the backend is running.</p>
        </div>
      ) : initiatives.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 20px', color: '#64748b' }}>
          <p style={{ fontSize: '16px' }}>No green campus initiatives are currently active.</p>
        </div>
      ) : (
        initiatives.map((item, index) => {
          const imgSrc = item.image
            ? (item.image.startsWith('http') ? item.image : `${API_URL}/uploads/${item.image}`)
            : '';

          return (
            <GreenCampusBlock
              key={item._id || item.initiativeId || index}
              reverse={index % 2 !== 0}
              number={item.number || String(index + 1).padStart(2, '0')}
              icon={item.icon}
              image={imgSrc}
              imageAlt={item.imageAlt || item.title}
              title={item.title}
              text={item.text}
              points={item.points || []}
              metric={item.metric}
            />
          );
        })
      )}

      {/* Dynamic Gallery */}
      <GreenCampusGallery gallery={gallery} />

      <GreenCampusCTA />
    </main>
  );
};

export default GreenCampusPage;
