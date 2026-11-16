import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaExclamationTriangle, FaArrowLeft } from 'react-icons/fa';

import ClubOverview from '../Components/ClubDetails/ClubOverview';
import ClubAim from '../Components/ClubDetails/ClubAim';
import ClubObjectives from '../Components/ClubDetails/ClubObjectives';
import ClubActivities from '../Components/ClubDetails/ClubActivities';
import '../Styles/ClubDetails.css';
import Breadcrum from '../Components/Common/Breadcrum';

const API_URL = import.meta.env.VITE_BACKEND_API_URL || import.meta.env.VITE_API_URL || 'http://localhost:5000';

function formatClubFromDb(club) {
  if (!club) return null;

  const clubName = club.name || 'Club';
  const coverImage = club.coverImage
    ? (club.coverImage.startsWith('http') ? club.coverImage : `${API_URL}/uploads/${club.coverImage}`)
    : '';

  // Overview
  const overview = typeof club.overview === 'object' && club.overview !== null
    ? club.overview
    : {
        title: club.tagline || `About ${clubName}`,
        description: typeof club.overview === 'string' && club.overview
          ? club.overview
          : typeof club.aim === 'string' ? club.aim : `Information regarding ${clubName} at SRM College of Nursing.`,
        image: coverImage,
        highlights: [
          { icon: 'FaCalendarAlt', value: club.code || 'Active', label: 'Club Code' },
          { icon: 'FaUsers', value: club.category ? club.category.toUpperCase() : 'General', label: 'Category' },
          { icon: 'FaStar', value: 'SRM', label: 'College of Nursing' },
          { icon: 'FaHeartbeat', value: 'Active', label: 'Charter' }
        ]
      };

  // Aim
  const aim = typeof club.aim === 'object' && club.aim !== null && club.aim.statement
    ? club.aim
    : {
        statement: typeof club.aim === 'string' && club.aim ? club.aim : 'Aim and goals are defined in the club charter.',
        image: coverImage,
        pillars: [
          { icon: 'FaHeartbeat', title: 'Professional Excellence', desc: 'Upholding highest nursing standards.' },
          { icon: 'FaBookOpen', title: 'Academic & Skill Development', desc: 'Promoting continuous learning and practice.' },
          { icon: 'FaHandsHelping', title: 'Community & Service', desc: 'Dedicated to community welfare and patient care.' },
          { icon: 'FaLightbulb', title: 'Leadership & Integrity', desc: 'Fostering ethical conduct and leadership.' }
        ]
      };

  // Objectives
  let objectives = [];
  if (Array.isArray(club.objectives)) {
    objectives = club.objectives.map((obj, i) => {
      if (typeof obj === 'string') {
        return {
          icon: 'FaBullseye',
          title: `Objective ${i + 1}`,
          desc: obj
        };
      }
      return obj;
    });
  }

  // Activities
  const activities = Array.isArray(club.activities) ? club.activities : [];

  return {
    ...club,
    name: clubName,
    overview,
    aim,
    objectives,
    activities
  };
}

export default function ClubDetailsPage({ slug: propSlug }) {
  const params = useParams();
  const slug = propSlug || params.slug;
  const [club, setClub] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchClub = async () => {
      if (!slug) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${API_URL}/api/clubs/${slug}`);
        if (res.ok) {
          const json = await res.json();
          if (isMounted && json && json.club) {
            setClub(formatClubFromDb(json.club));
            setLoading(false);
            return;
          }
        }
      } catch (err) {
        console.error('Failed to fetch club from backend:', err);
      }

      if (isMounted) {
        setClub(null);
        setLoading(false);
      }
    };

    fetchClub();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="club-details-loading">
        <div className="club-details-loading__spinner" aria-label="Loading" />
      </div>
    );
  }

  if (!club) {
    return (
      <div className="club-details-notfound">
        <div className="club-details-notfound__inner">
          <div className="club-details-notfound__icon">
            <FaExclamationTriangle />
          </div>
          <h2 className="club-details-notfound__title">Club Not Found</h2>
          <p className="club-details-notfound__desc">
            We couldn't find a club with the identifier <strong>"{slug}"</strong> in the database. Please check the URL or return to the clubs list.
          </p>
          <Link to="/clubs" className="club-details-notfound__btn">
            <FaArrowLeft /> Back to Clubs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main>
      <Breadcrum title={club.name} />
      <ClubOverview overview={club.overview} clubName={club.name} />
      <ClubAim aim={club.aim} />
      {club.objectives.length > 0 && <ClubObjectives objectives={club.objectives} />}
      {club.activities.length > 0 && <ClubActivities activities={club.activities} />}
    </main>
  );
}
