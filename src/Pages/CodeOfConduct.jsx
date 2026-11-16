import { useEffect, useState } from 'react';
import DisciplinaryCommittee from '../Components/CodeOfContact/DisciplinaryCommittee';
import QuickNav from '../Components/CodeOfContact/QuickNav';
import Students from '../Components/CodeOfContact/Students';
import DressCode from '../Components/CodeOfContact/DressCode';
import AntiRagging from '../Components/CodeOfContact/AntiRagging';
import Faculty from '../Components/CodeOfContact/Faculty';
import SupportStaff from '../Components/CodeOfContact/SupportStaff';
import Hostel from '../Components/CodeOfContact/Hostel';
import '../Styles/coc.css';
import Principal from '../Components/CodeOfContact/Principal';
import Breadcrum from '../Components/Common/Breadcrum';


// ─── APP ───────────────────────────────────────────────────────
export default function CodeOfConduct_Responsive() {
  const [sections, setSections] = useState(null);
  const [error, setError] = useState('');
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    const api = (import.meta.env.VITE_BACKEND_API_URL || import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '');
    async function load() {
      try {
        const response = await fetch(api + '/api/code-of-conduct', { signal: controller.signal });
        const result = await response.json();
        if (!response.ok || !result.success || !Array.isArray(result.data)) throw new Error('Unable to load the code of conduct. Please try again.');
        setSections(result.data);
      } catch (err) {
        if (!controller.signal.aborted) setError(err.message);
      }
    }
    load();
    return () => controller.abort();
  }, [attempt]);
  const has = id => sections?.some(section => section.id === id);
  return (
    <>
      <Breadcrum title="Code of Conduct"/>
      <QuickNav sections={sections || []} />
      {!sections && !error && <p role="status" className="coc-container">Loading code of conduct...</p>}
      {error && <div role="alert" className="coc-container"><p>{error}</p><button type="button" onClick={() => { setError(''); setAttempt(value => value + 1); }}>Try again</button></div>}
      {sections?.length === 0 && <p className="coc-container">Code of conduct information will be available soon.</p>}
      {has('disciplinary-committee') && has('general-rules') && <DisciplinaryCommittee sections={sections} />}
      {has('students') && <Students sections={sections} />}
      {has('dress') && <DressCode sections={sections} />}
      {has('hostel') && <Hostel sections={sections} />}
      {has('ragging') && <AntiRagging sections={sections} />}
      {has('principal') && <Principal sections={sections} />}
      {has('faculty') && <Faculty sections={sections} />}
      {has('support') && <SupportStaff sections={sections} />}
    </>
  );
}
