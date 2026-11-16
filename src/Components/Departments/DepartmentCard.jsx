import React from 'react';
import { FaArrowRight, FaCheckCircle, FaUniversity } from 'react-icons/fa';
import { getDepartmentIcon } from '../../utils/departmentIcons';

/**
 * DepartmentCard
 * Props:
 *   id          – anchor id
 *   eyebrow     – short label above title
 *   title       – department name
 *   image       – image URL
 *   imageAlt    – alt text
 *   icon        – React icon component or string name
 *   color       – accent hex
 *   reversed    – boolean, flips columns
 *   description – string or string[]
 *   highlights  – [{ icon, text }]
 *   fallbackImage – optional fallback image
 */
export default function DepartmentCard({
  id,
  eyebrow,
  title,
  image,
  imageAlt,
  icon,
  color = 'var(--accent)',
  reversed = false,
  description,
  highlights = [],
  fallbackImage
}) {
  const paragraphs = Array.isArray(description) ? description : [description];

  const IconComp = typeof icon === 'function'
    ? icon
    : (typeof icon === 'object' && icon !== null
      ? () => icon
      : getDepartmentIcon(icon, FaUniversity));

  return (
    <section id={id} className={`depart-card${reversed ? ' depart-card--rev' : ''}`}>
      <div className="depart-card-inner">

        {/* Image column */}
        <div className="depart-card-img-wrap">
          <img
            src={image}
            alt={imageAlt || title}
            className="depart-card-img"
            onError={(e) => {
              if (fallbackImage && e.target.src !== fallbackImage) {
                e.target.src = fallbackImage;
              }
            }}
          />
          <div
            className="depart-card-img-badge"
            style={{ background: color }}
          >
            {IconComp && <IconComp />}
          </div>
        </div>

        {/* Text column */}
        <div className="depart-card-body">
          <span className="depart-card-eyebrow" style={{ color }}>{eyebrow}</span>
          <h2 className="depart-card-title">{title}</h2>
          <div className="depart-card-divider" style={{ background: color }} />

          {paragraphs.map((p, i) => (
            <p key={i} className="depart-card-para">{p}</p>
          ))}

          {highlights && highlights.length > 0 && (
            <ul className="depart-card-highlights">
              {highlights.map((hl, i) => {
                const HIconComp = typeof hl.icon === 'function'
                  ? hl.icon
                  : (typeof hl.icon === 'object' && hl.icon !== null
                    ? () => hl.icon
                    : getDepartmentIcon(hl.icon, FaArrowRight));

                return (
                  <li key={i} className="depart-card-hl-item">
                    <span
                      className="depart-card-hl-dot"
                      style={{ background: color }}
                    >
                      {HIconComp ? <HIconComp /> : <FaArrowRight />}
                    </span>
                    <span>{hl.text}</span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

      </div>
    </section>
  );
}
