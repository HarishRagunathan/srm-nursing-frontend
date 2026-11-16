import { FaTools } from 'react-icons/fa';
import Img1 from '../../assets/images/CodeOfConduct/COCForSupportStaffs/1.JPG';

import RuleCard from './RuleCard';

export default function SupportStaff({ sections }) {
  const data = sections.find(s => s.id === 'support');

  return (
    <section id="support" className="coc-section" style={{ background: 'white' }}>
      <div className="coc-container">

        {/* Full-width Image Hero */}
        <div className="coc-hero">
          <img src={Img1} alt="Support staff at work" />
          <div className="coc-hero__overlay"
            style={{ background: 'linear-gradient(to right, rgba(15,140,166,0.88) 0%, rgba(47,27,92,0.55) 55%, transparent 100%)' }}
          />
          <div className="coc-hero__content">
            <div className="section-chip white"><FaTools style={{ fontSize: 12 }}/> Support Staff</div>
            <h2 className="coc-hero__title">{data.title}</h2>
            <p className="coc-hero__subtitle">{data.intro}</p>
          </div>
        </div>

        {/* Uniform 2-Column Rules Grid (Numbered sequentially 1 to 14) */}
        <div className="coc-rules-grid">
          {data.rules.map(rule => (
            <RuleCard
              key={rule.num}
              num={rule.num}
              text={rule.text}
              numClass="teal"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
