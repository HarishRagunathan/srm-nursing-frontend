import { useEffect, useState } from 'react';
import '../Styles/placement.css';
import PlacementStats from "../Components/Placement/PlacementStats";
import PlacementOverview from "../Components/Placement/PlacementOverview";
import PlacementInternational from "../Components/Placement/PlacementInternational";
import PlacementPartners from "../Components/Placement/PlacementPartners";
import PlacementCTA from "../Components/Placement/PlacementCTA";
import Breadcrum from "../Components/Common/Breadcrum";

/* ─── PAGE ─── */
export default function PlacementPage() {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    const api = (import.meta.env.VITE_BACKEND_API_URL || import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '');
    async function load() {
      try {
        const response = await fetch(`${api}/api/placements`, { signal: controller.signal });
        if (!response.ok) throw new Error('Unable to load placement information. Please try again.');
        const result = await response.json();
        if (!result.success || !result.data || !['batches', 'stats', 'internationalPlacements', 'destinations', 'partners'].every(key => Array.isArray(result.data[key]))) {
          throw new Error('Placement information is unavailable. Please try again.');
        }
        setData(result.data);
      } catch (err) {
        if (!controller.signal.aborted) setError(err.message);
      }
    }
    load();
    return () => controller.abort();
  }, [attempt]);

  return (
    <>
      <div className="placement-page">
        <Breadcrum title={"Placements"} />
        {!data && !error && <p role="status" className="placement-section-desc">Loading placement information...</p>}
        {error && <div role="alert" className="placement-section-desc">
          <p>{error}</p>
          <button type="button" className="placement-btn-primary" onClick={() => { setError(''); setAttempt(value => value + 1); }}>Try again</button>
        </div>}
        {data && <>
          {data.batches.length > 0 ? <PlacementOverview batches={data.batches} /> : <p className="placement-section-desc">Placement records will be available soon.</p>}
          {data.stats.length > 0 && <PlacementStats stats={data.stats} />}
          {(data.internationalPlacements.length > 0 || data.destinations.length > 0) && <PlacementInternational internationalPlacements={data.internationalPlacements} destinations={data.destinations} />}
          {data.partners.length > 0 && <PlacementPartners partners={data.partners} />}
        </>}
        <PlacementCTA/>
      </div>
    </>
  );
}
