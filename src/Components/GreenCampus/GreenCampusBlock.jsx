import React from 'react';
import {
  FaBroom,
  FaTrashAlt,
  FaBan,
  FaTree,
  FaSolarPanel,
  FaShuttleVan,
  FaGasPump,
  FaTint,
  FaWater,
  FaWalking,
  FaLeaf,
  FaSeedling,
  FaRecycle,
  FaCheckCircle,
} from 'react-icons/fa';

const ICON_MAP = {
  FaBroom: <FaBroom />,
  FaTrashAlt: <FaTrashAlt />,
  FaBan: <FaBan />,
  FaTree: <FaTree />,
  FaSolarPanel: <FaSolarPanel />,
  FaShuttleVan: <FaShuttleVan />,
  FaGasPump: <FaGasPump />,
  FaTint: <FaTint />,
  FaWater: <FaWater />,
  FaWalking: <FaWalking />,
  FaLeaf: <FaLeaf />,
  FaSeedling: <FaSeedling />,
  FaRecycle: <FaRecycle />,
};

function resolveIcon(icon) {
  if (!icon) return <FaLeaf />;
  if (React.isValidElement(icon)) return icon;
  if (typeof icon === 'string' && ICON_MAP[icon]) return ICON_MAP[icon];
  return <FaLeaf />;
}

const GreenCampusBlock = ({
  reverse = false,
  number,
  icon,
  image,
  imageAlt,
  title,
  text,
  points = [],
  metric,
}) => {
  const iconElement = resolveIcon(icon);

  return (
    <section className="gc-block">
      <div className="green-campus-container">
        <div className={`gc-block-grid ${reverse ? 'gc-reverse' : ''}`}>
          <div className="gc-block-media">
            {number && <span className="gc-block-num">{number}</span>}
            {image ? (
              <img src={image} alt={imageAlt || title} loading="lazy" />
            ) : (
              <div style={{
                width: '100%',
                height: '100%',
                minHeight: '260px',
                background: '#f1f5f9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#94a3b8',
                fontSize: '48px',
              }}>
                {iconElement}
              </div>
            )}
          </div>
          <div className="gc-block-copy">
            <div className="gc-block-icon">{iconElement}</div>
            <h3 className="gc-block-title">{title}</h3>
            <p className="gc-block-text">{text}</p>
            {points.length > 0 && (
              <ul className="gc-block-points">
                {points.map((p, i) => {
                  const label = typeof p === 'string' ? p : p.label;
                  return (
                    <li key={i}>
                      <FaCheckCircle style={{ color: '#059669', marginRight: '6px', flexShrink: 0 }} />
                      <span>{label}</span>
                    </li>
                  );
                })}
              </ul>
            )}
            {metric && metric.value && (
              <div className="gc-block-metric">
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GreenCampusBlock;
