import { useState, useEffect } from 'react';
import '../Styles/departments.css';
import DepartmentsNav from '../Components/Departments/DepartmentsNav';
import DepartmentCard from '../Components/Departments/DepartmentCard';
import DepartmentsCTA from '../Components/Departments/DepartmentsCTA';
import Breadcrum from '../Components/Common/Breadcrum';

const API_URL = import.meta.env.VITE_BACKEND_API_URL || import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState([]);
  const [activeId, setActiveId] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch departments strictly from backend API and database
  useEffect(() => {
    let isMounted = true;

    const fetchDepartments = async () => {
      try {
        const res = await fetch(`${API_URL}/api/departments?status=active`);
        if (!res.ok) {
          throw new Error(`Failed to load departments (${res.status})`);
        }
        const json = await res.json();
        if (isMounted) {
          setDepartments(Array.isArray(json.departments) ? json.departments : []);
          setError(null);
        }
      } catch (err) {
        console.error('Error fetching departments from backend:', err);
        if (isMounted) {
          setError(err.message);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchDepartments();

    return () => {
      isMounted = false;
    };
  }, []);

  // IntersectionObserver for active navigation tab highlight
  useEffect(() => {
    if (!departments || departments.length === 0) return;

    const observers = departments.map((dept) => {
      const anchorId = dept.deptId || dept.id;
      const el = document.getElementById(anchorId);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(anchorId);
        },
        { rootMargin: '-40% 0px -55% 0px' }
      );
      obs.observe(el);
      return obs;
    }).filter(Boolean);

    return () => observers.forEach((o) => o.disconnect());
  }, [departments]);

  const resolveImage = (dept) => {
    if (!dept.image) return '';
    if (dept.image.startsWith('http://') || dept.image.startsWith('https://') || dept.image.startsWith('data:')) {
      return dept.image;
    }
    return `${API_URL}/uploads/${dept.image}`;
  };

  return (
    <div className="depart-page">
      <Breadcrum title="Departments" />

      {loading ? (
        <div style={{ textAlign: 'center', padding: '80px 20px', color: '#64748b' }}>
          <p style={{ fontSize: '16px' }}>Loading academic departments from database...</p>
        </div>
      ) : error ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: '#dc2626' }}>
          <p>Failed to load departments. Please ensure the backend is running.</p>
        </div>
      ) : departments.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 20px', color: '#64748b' }}>
          <p style={{ fontSize: '16px' }}>No academic departments are currently active.</p>
        </div>
      ) : (
        <>
          <DepartmentsNav activeId={activeId} departments={departments} />
          {departments.map((dept, i) => {
            const anchorId = dept.deptId || dept.id;
            const imgSrc = resolveImage(dept);

            return (
              <DepartmentCard
                key={dept._id || anchorId || i}
                id={anchorId}
                eyebrow={dept.eyebrow}
                title={dept.title}
                image={imgSrc}
                imageAlt={dept.imageAlt || dept.title}
                icon={dept.icon}
                color={dept.color}
                reversed={i % 2 !== 0}
                description={dept.description}
                highlights={dept.highlights}
              />
            );
          })}
        </>
      )}

      <DepartmentsCTA />
    </div>
  );
}
