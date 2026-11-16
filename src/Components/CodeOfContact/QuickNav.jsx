import { useEffect, useRef, useState } from 'react';
import { FaShieldAlt, FaUserGraduate, FaTshirt, FaBan, FaRegBuilding, FaChalkboardTeacher, FaTools, FaHome } from 'react-icons/fa';

const tabs = [
  { icon: <FaShieldAlt />,         label: 'Disciplinary Committee', href: '#disciplinary-committee' },
  { icon: <FaUserGraduate />,       label: 'Students',              href: '#students' },
  { icon: <FaTshirt />,             label: 'Dress Code',            href: '#dress' },
  { icon: <FaHome />,               label: 'Hostel',                href: '#hostel' },
  { icon: <FaBan />,                label: 'Anti-Ragging',          href: '#ragging' },
  { icon: <FaRegBuilding />,        label: 'Principal',             href: '#principal' },
  { icon: <FaChalkboardTeacher />,  label: 'Faculty',               href: '#faculty' },
  { icon: <FaTools />,              label: 'Support Staff',         href: '#support' },
];

export default function QuickNav({ sections = [] }) {
  const navRef = useRef(null);
  const [active, setActive] = useState('');
  const visibleTabs = tabs.filter(tab => sections.some(section => '#' + section.id === tab.href)
    && (tab.href !== '#disciplinary-committee' || sections.some(section => section.id === 'general-rules')));
  const sectionKey = visibleTabs.map(tab => tab.href.slice(1)).join(',');

  useEffect(() => {
    const elements = sectionKey.split(',').map(id => document.getElementById(id)).filter(Boolean);
    if (!elements.length) return;
    let frame;
    const previousMargins = elements.map(element => element.style.scrollMarginTop);
    const offset = () => 68 + (navRef.current?.offsetHeight || 0) + 16;
    const update = () => {
      frame = undefined;
      const line = offset();
      let current = elements[0];
      for (const element of elements) {
        if (element.getBoundingClientRect().top <= line + 2) current = element;
      }
      setActive('#' + current.id);
    };
    const schedule = () => { if (frame === undefined) frame = requestAnimationFrame(update); };
    const resize = () => {
      elements.forEach(element => { element.style.scrollMarginTop = offset() + 'px'; });
      schedule();
    };
    const goToHash = () => {
      const target = elements.find(element => '#' + element.id === window.location.hash);
      if (target) target.scrollIntoView({ block: 'start', behavior: 'instant' });
      schedule();
    };
    resize();
    goToHash();
    const observer = new ResizeObserver(resize);
    if (navRef.current) observer.observe(navRef.current);
    elements.forEach(element => observer.observe(element));
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', resize);
    window.addEventListener('hashchange', goToHash);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', resize);
      window.removeEventListener('hashchange', goToHash);
      elements.forEach((element, index) => { element.style.scrollMarginTop = previousMargins[index]; });
    };
  }, [sectionKey]);

  useEffect(() => {
    const link = navRef.current?.querySelector('[aria-current="location"]');
    const scroller = link?.parentElement;
    if (!link || !scroller) return;
    const linkRect = link.getBoundingClientRect();
    const scrollRect = scroller.getBoundingClientRect();
    if (linkRect.left < scrollRect.left || linkRect.right > scrollRect.right) {
      scroller.scrollLeft += linkRect.left - scrollRect.left - (scrollRect.width - linkRect.width) / 2;
    }
  }, [active]);

  return (
    <nav ref={navRef} className="coc-quicknav" aria-label="Code of conduct sections">
      <div className="coc-quicknav__container">
        <div className="quicknav-scroll">
          {visibleTabs.map(tab => (
            <a key={tab.href} href={tab.href}
              className={'coc-quicknav__link' + (active === tab.href ? ' is-active' : '')}
              aria-current={active === tab.href ? 'location' : undefined}>
              <span className="coc-quicknav__icon" aria-hidden="true">{tab.icon}</span>
              {tab.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
