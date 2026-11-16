import { useState, useEffect } from 'react';
import { FaHeartbeat, FaUserMd, FaUsers, FaBaby, FaBrain, FaFemale, FaUniversity } from 'react-icons/fa';
import { getDepartmentIcon } from '../../utils/departmentIcons';

const DEFAULT_TABS = [
  { id: 'fundamentals',  label: 'Fundamentals',   icon: FaHeartbeat },
  { id: 'adult-health',  label: 'Adult Health',    icon: FaUserMd    },
  { id: 'community',     label: 'Community',       icon: FaUsers     },
  { id: 'child-health',  label: 'Child Health',    icon: FaBaby      },
  { id: 'mental-health', label: 'Mental Health',   icon: FaBrain     },
  { id: 'midwifery',     label: 'Midwifery & OBG', icon: FaFemale    },
];

export default function DepartmentsNav({ activeId, departments = [] }) {
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const tabs = (departments && departments.length > 0)
    ? departments.map(d => ({
        id: d.deptId || d.id,
        label: d.shortName || d.title,
        icon: getDepartmentIcon(d.icon, FaUniversity)
      }))
    : DEFAULT_TABS;

  return (
    <nav className={`depart-nav${stuck ? ' depart-nav--stuck' : ''}`}>
      <div className="depart-nav-inner">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            className={`depart-nav-tab${activeId === id ? ' depart-nav-tab--active' : ''}`}
            onClick={() => scrollTo(id)}
          >
            {Icon && <Icon className="depart-nav-tab-icon" />}
            <span>{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
