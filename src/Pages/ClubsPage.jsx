import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Languages,
  Newspaper,
  Stethoscope,
  Palette,
  HeartHandshake,
  HeartPulse,
  Cross,
  ShieldAlert,
  Globe,
  Check,
  Target,
  Crosshair,
  Loader2,
} from 'lucide-react';
import '../Styles/ClubsPage.css';
import Breadcrum from '../Components/Common/Breadcrum';
import AssoYRC from '../Components/Association/AssoYRC';

const API_URL = import.meta.env.VITE_BACKEND_API_URL || import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Maps the "icon" string from DB to an icon component
const ICONS = {
  'book-open': BookOpen,
  languages: Languages,
  newspaper: Newspaper,
  stethoscope: Stethoscope,
  palette: Palette,
  'heart-handshake': HeartHandshake,
  'heart-pulse': HeartPulse,
  cross: Cross,
  'shield-alert': ShieldAlert,
  globe: Globe,
};

function getClubImageUrl(coverImage) {
  if (!coverImage) return '';
  if (coverImage.startsWith('http://') || coverImage.startsWith('https://') || coverImage.startsWith('data:')) {
    return coverImage;
  }
  return `${API_URL}/uploads/${coverImage}`;
}

function ClubSection({ club, index }) {
  const Icon = ICONS[club.icon] || Stethoscope;
  const isEven = index % 2 === 0;
  const codeDisplay = club.code || String(index + 1).padStart(2, '0');
  const imageUrl = getClubImageUrl(club.coverImage);

  // Aim points (split by sentences if string)
  const aimPoints = typeof club.aim === 'string'
    ? club.aim.split(/(?<=\.)\s+/).filter((s) => s.trim().length > 0)
    : Array.isArray(club.aim)
      ? club.aim
      : [];

  const objectivesList = Array.isArray(club.objectives)
    ? club.objectives
    : typeof club.objectives === 'string'
      ? club.objectives.split('\n').filter(Boolean)
      : [];

  return (
    <section className={`club-section ${isEven ? 'club-section--left' : 'club-section--right'}`} data-color={club.color || 'accent'}>
      {/* Decorative background number */}
      <span className="club-section__bg-number" aria-hidden="true">{codeDisplay}</span>

      <div className="club-section__container">
        {/* Section Header */}
        <div className="club-section__header">
          <div className="club-section__icon-wrap">
            <Icon size={28} strokeWidth={2} />
          </div>
          <div className="club-section__title-group">
            <span className="club-section__eyebrow">Club {codeDisplay}</span>
            <h2 className="club-section__name">{club.name}</h2>
            {club.tagline && <p className="club-section__tagline">{club.tagline}</p>}
          </div>
        </div>

        {/* Content Grid: Image + Aim + Objectives */}
        <div className="club-section__content">
          {/* Club Image from Backend */}
          <div className="club-section__image-card">
            <div className="club-section__image-wrap">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={club.name}
                  className="club-section__image"
                  loading="lazy"
                />
              ) : (
                <div style={{
                  width: '100%',
                  height: '100%',
                  minHeight: '260px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#f1f5f9',
                  color: '#94a3b8'
                }}>
                  <Icon size={48} strokeWidth={1.5} />
                </div>
              )}
              <div className="club-section__image-overlay">
                <Icon size={32} strokeWidth={1.5} />
              </div>
            </div>
            <div className="club-section__image-caption">
              <span>{club.shortName || club.name}</span>
            </div>
          </div>

          {/* Details Column: Aim + Objectives stacked */}
          <div className="club-section__details">
            {/* AIM Card */}
            {aimPoints.length > 0 && (
              <div className="club-section__aim-card">
                <div className="club-section__card-label">
                  <Target size={16} strokeWidth={2.5} />
                  <span>Aim</span>
                </div>
                <ul className="club-section__aim-list">
                  {aimPoints.map((point, i) => (
                    <li key={i}>
                      <span className="club-section__aim-bullet" aria-hidden="true" />
                      <span>{typeof point === 'string' ? point.trim() : JSON.stringify(point)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* OBJECTIVES Card */}
            {objectivesList.length > 0 && (
              <div className="club-section__obj-card">
                <div className="club-section__card-label">
                  <Crosshair size={16} strokeWidth={2.5} />
                  <span>Objectives</span>
                </div>
                <ol className="club-section__obj-list">
                  {objectivesList.map((objective, i) => (
                    <li key={i}>
                      <span className="club-section__obj-num">{String(i + 1).padStart(2, '0')}</span>
                      <span className="club-section__obj-text">
                        <Check size={14} strokeWidth={3} className="club-section__check-icon" />
                        {typeof objective === 'string' ? objective : objective.desc || objective.title || JSON.stringify(objective)}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ClubsPage() {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchClubs = async () => {
      try {
        const res = await fetch(`${API_URL}/api/clubs?status=active`);
        if (!res.ok) {
          throw new Error(`Failed to fetch clubs (${res.status})`);
        }
        const json = await res.json();
        if (isMounted) {
          setClubs(Array.isArray(json.clubs) ? json.clubs : []);
          setError(null);
        }
      } catch (err) {
        console.error('Error fetching clubs from backend:', err);
        if (isMounted) {
          setError(err.message);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchClubs();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="clubs-page">
      {/* ───── Hero ───── */}
      <Breadcrum title="Clubs" />

      {/* ───── Intro ───── */}
      <section className="clubs-intro">
        <div className="clubs-intro-eyebrow">— Student Organisations —</div>
        <h2>Explore Our Clubs</h2>
        <p>
          Each club runs on its own charter of aims and objectives. Scroll
          through to see what each one stands for and what it commits to
          delivering every year.
        </p>
      </section>

      {/* ───── Dynamic Clubs List from Backend & Database Only ───── */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: '#64748b' }}>
          <Loader2 className="animate-spin" size={36} style={{ margin: '0 auto 12px', display: 'block', animation: 'spin 1s linear infinite' }} />
          <p style={{ fontSize: '15px' }}>Loading clubs...</p>
        </div>
      ) : error ? (
        <div style={{ textAlign: 'center', padding: '40px 20px', color: '#dc2626' }}>
          <p>Failed to load clubs. Please verify the backend service is running.</p>
        </div>
      ) : clubs.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: '#64748b' }}>
          <p>No clubs are currently available.</p>
        </div>
      ) : (
        clubs.map((club, index) => (
          <ClubSection key={club._id || club.slug || index} club={club} index={index} />
        ))
      )}

      <AssoYRC />
    </div>
  );
}
