/* Line-up 2026 — full page components */

const LINEUP_ARTISTS = [
  { id: 1,  name: "MISS K8",              role: "hard closing", stage: "VIPER HARD AREA", bio: "", image: "assets/lineup/miss-k8.png" },
  { id: 2,  name: "CLAESSENS",            role: "",        stage: "VIPER HARD AREA", bio: "", image: "assets/lineup/claessens.png" },
  { id: 3,  name: "MICHEL DE HEY",        role: "",        stage: "BOOST ARENA",     bio: "", image: "assets/lineup/michel-de-hey.png" },
  { id: 4,  name: "D|K|OXY",              role: "",        stage: "VIPER HARD AREA", bio: "", image: "assets/lineup/dkoxy.png" },
  { id: 5,  name: "D-STONE",              role: "",        stage: "BOOST ARENA",     bio: "", image: "assets/lineup/d-stone.png" },
  { id: 6,  name: "MOODY MEHRAN",         role: "",        stage: "BOOST ARENA",     bio: "", image: "assets/lineup/moody-mehran.png" },
  { id: 7,  name: "BURNR",                role: "",        stage: "BOOST ARENA",     bio: "", image: "assets/lineup/burnr.png" },
  { id: 8,  name: "TITI",                 role: "",        stage: "VIPER HARD AREA", bio: "", image: "assets/lineup/titi.png" },
  { id: 9,  name: "BLNK",                 role: "",        stage: "VIPER HARD AREA", bio: "", image: "assets/lineup/blnk.png" },
  { id: 10, name: "JO3Y3T",               role: "",        stage: "VIPER HARD AREA", bio: "", image: "assets/lineup/jo3y3t.png" },
  { id: 11, name: "FREDDI B2B KARA.OKAY", role: "",        stage: "BOOST ARENA",     bio: "", image: "assets/lineup/freddi-b2b-karaokay.png" },
  { id: 12, name: "IOSIO",                role: "",        stage: "BOOST ARENA",     bio: "", image: "assets/lineup/iosio.png" },
  { id: 13, name: "SASHE",                role: "",        stage: "VIPER HARD AREA", bio: "", image: "assets/lineup/sashe.png" },
  { id: 14, name: "CONCEPT",              role: "",        stage: "BOOST ARENA",     bio: "", image: "assets/lineup/concept.png" },
];

const LineupContext = React.createContext({
  filter: 'all',
  setFilter: () => {},
  modalArtist: null,
  openModal: () => {},
  closeModal: () => {},
});

const prefersReduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* -------- Portrait with onError → typographic fallback -------- */
const ArtistPortrait = ({ artist, className = '' }) => {
  const [failed, setFailed] = React.useState(false);
  return (
    <div className={"artist-portrait " + className}>
      {!failed && (
        <img
          src={artist.image}
          alt={`${artist.name} portrait`}
          loading="lazy"
          onError={() => setFailed(true)}
        />
      )}
      {failed && (
        <div className="artist-portrait-fallback" aria-hidden="true">
          <span className="artist-portrait-fallback-name">{artist.name}</span>
        </div>
      )}
      <div className="artist-portrait-grain" aria-hidden="true"></div>
    </div>
  );
};

/* -------- Opening (compact) -------- */
const OpeningStatement = () => {
  const titleRef = React.useRef(null);

  React.useEffect(() => {
    if (typeof gsap === 'undefined') return;
    const el = titleRef.current;
    if (!el) return;
    const words = el.querySelectorAll('.word');
    if (prefersReduced()) {
      gsap.set(words, { opacity: 1, y: 0 });
      return;
    }
    gsap.set(words, { opacity: 0, y: 20 });
    gsap.to(words, {
      opacity: 1, y: 0,
      duration: 0.6, stagger: 0.12,
      ease: 'back.out(1.7)',
      delay: 0.15,
    });
  }, []);

  const words = "THIS IS WHO WE'RE BUILDING THIS WITH.".split(' ');
  return (
    <section className="lineup-opening lineup-opening--compact" data-bg="dark" data-screen-label="01 Opening">
      <div className="lineup-opening-inner">
        <div className="lineup-opening-eyebrow">LINE-UP 2026</div>
        <h1 ref={titleRef} className="lineup-opening-title">
          {words.map((w, i) => (
            <React.Fragment key={i}>
              <span className="word">{w}</span>
              {i < words.length - 1 ? '\u00A0' : null}
            </React.Fragment>
          ))}
        </h1>
      </div>
    </section>
  );
};

/* -------- Sticky filter bar with logo + text buttons -------- */
const FilterBar = () => {
  const { filter, setFilter } = React.useContext(LineupContext);
  const stageLabel =
    filter === 'BOOST ARENA' ? 'Mr. Boost Arena' :
    filter === 'VIPER HARD AREA' ? 'Viper Hard Area' :
    'Showing all artists';
  const isStageActive = filter !== 'all';
  return (
    <div className="lineup-filterbar" data-bg="dark" role="toolbar" aria-label="Filter line-up by stage">
      <div className="lineup-filterbar-inner">
        <button
          type="button"
          className={"lineup-filter-btn" + (filter === 'all' ? ' is-active' : '')}
          aria-pressed={filter === 'all'}
          onClick={() => setFilter('all')}
        >
          <span>All</span>
        </button>
        <button
          type="button"
          className={"lineup-filter-btn" + (filter === 'BOOST ARENA' ? ' is-active' : '')}
          aria-pressed={filter === 'BOOST ARENA'}
          onClick={() => setFilter('BOOST ARENA')}
        >
          <img src="assets/logos/mr-boost-white.svg" alt="" aria-hidden="true" />
          <span>Mr. Boost Arena</span>
        </button>
        <button
          type="button"
          className={"lineup-filter-btn" + (filter === 'VIPER HARD AREA' ? ' is-active' : '')}
          aria-pressed={filter === 'VIPER HARD AREA'}
          onClick={() => setFilter('VIPER HARD AREA')}
        >
          <img src="assets/logos/viper-white.webp" alt="" aria-hidden="true" className="viper-logo" />
          <span>Viper Hard Area</span>
        </button>
      </div>
      <div
        key={filter}
        className={"filter-stage-label" + (isStageActive ? ' filter-stage-label--active' : '')}
        aria-live="polite"
      >
        {stageLabel}
      </div>
    </div>
  );
};

/* -------- Artist tile (photo with name overlay) -------- */
const getNameSizeClass = (name) => {
  const clean = name.replace(/\s+B2B\s+/i, ' ').trim();
  const length = clean.length;
  if (length <= 8)  return 'artist-name--regular';
  if (length <= 14) return 'artist-name--medium';
  return 'artist-name--small';
};

const renderArtistName = (name) => {
  const b2bMatch = name.match(/^(.+?)\s+B2B\s+(.+)$/i);
  if (b2bMatch) {
    const [, before, after] = b2bMatch;
    return (
      <React.Fragment>
        <span className="artist-name-part">{before}</span>
        <span className="artist-name-b2b">B2B</span>
        <span className="artist-name-part">{after}</span>
      </React.Fragment>
    );
  }
  return name;
};

const ArtistTile = ({ artist }) => {
  const { filter, openModal } = React.useContext(LineupContext);
  const hidden = filter !== 'all' && filter !== artist.stage;
  const [failed, setFailed] = React.useState(false);
  const sizeClass = getNameSizeClass(artist.name);
  return (
    <article
      className={"artist-card artist-card-equal" + (failed ? ' artist-card--placeholder' : '')}
      data-stage={artist.stage}
      style={hidden ? { display: 'none' } : undefined}
    >
      <button
        type="button"
        className="artist-card-equal-btn"
        onClick={() => openModal(artist)}
        aria-label={`${artist.name}${artist.role ? ' — ' + artist.role : ''}`}
      >
        <div className="artist-card-image-wrapper">
          {!failed && (
            <img
              src={artist.image}
              alt={artist.name}
              className="artist-card-image"
              loading="lazy"
              decoding="async"
              onError={() => setFailed(true)}
            />
          )}
          {failed && (
            <div className="artist-card-fallback" aria-hidden="true">
              <span className="artist-card-fallback-name">{artist.name}</span>
            </div>
          )}
          <div className="artist-card-overlay" aria-hidden="true"></div>
          <h3 className={"artist-card-name-on-image " + sizeClass}>
            {renderArtistName(artist.name)}
            {artist.role && <span className="artist-role-inline"> ({artist.role})</span>}
          </h3>
        </div>
      </button>
    </article>
  );
};

const ArtistGrid = () => {
  const gridRef = React.useRef(null);
  const { filter } = React.useContext(LineupContext);

  React.useEffect(() => {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);
    const grid = gridRef.current;
    if (!grid) return;
    if (prefersReduced()) return;
    const cards = grid.querySelectorAll('.artist-card-equal');
    gsap.set(cards, { autoAlpha: 0, y: 30, scale: 0.95 });
    const tween = gsap.to(cards, {
      autoAlpha: 1, y: 0, scale: 1,
      duration: 0.6, stagger: 0.08,
      ease: 'back.out(1.5)',
      scrollTrigger: { trigger: grid, start: 'top 80%', toggleActions: 'play none none none', once: true },
    });
    return () => { if (tween.scrollTrigger) tween.scrollTrigger.kill(); };
  }, []);

  // Trigger a soft re-fade-in when filter changes
  React.useEffect(() => {
    if (typeof gsap === 'undefined') return;
    if (prefersReduced()) return;
    const grid = gridRef.current;
    if (!grid) return;
    const visible = [...grid.querySelectorAll('.artist-card-equal')].filter(c => c.style.display !== 'none');
    gsap.fromTo(visible,
      { autoAlpha: 0.2, y: 10 },
      { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.04, ease: 'power2.out' });
  }, [filter]);

  return (
    <section className="artist-grid-section" data-bg="dark" data-screen-label="02 Artists" aria-label="Artists">
      <div className="shell">
        <div ref={gridRef} className="artist-grid">
          {LINEUP_ARTISTS.map(a => <ArtistTile key={a.id} artist={a} />)}
        </div>
      </div>
    </section>
  );
};

/* -------- MORE TO BE ANNOUNCED + CTA (continuous dark) -------- */
const MoreToBeAnnounced = () => (
  <section className="lineup-more" data-bg="dark" data-screen-label="03 More + tickets">
    <div className="lineup-more-inner">
      <h2 className="lineup-more-title">More to be announced</h2>
      <p className="lineup-more-sub">Full timetable drops August</p>
      <a href="tickets.html" className="lineup-more-cta">
        <span>Secure your ticket</span>
        <svg width="18" height="18" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M3 11L11 3M11 3H4.5M11 3V9.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" />
        </svg>
      </a>
    </div>
  </section>
);

/* -------- Modal (portrait + name + role + bio only) -------- */
const ArtistModal = () => {
  const { modalArtist, closeModal } = React.useContext(LineupContext);
  const closeRef = React.useRef(null);

  React.useEffect(() => {
    if (!modalArtist) return;
    const handleKey = (e) => { if (e.key === 'Escape') closeModal(); };
    document.addEventListener('keydown', handleKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    setTimeout(() => { if (closeRef.current) closeRef.current.focus(); }, 0);
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [modalArtist, closeModal]);

  if (!modalArtist) return null;

  return (
    <div
      className="lineup-modal-overlay"
      onClick={closeModal}
      role="dialog"
      aria-modal="true"
      aria-label={`${modalArtist.name} info`}
    >
      <div className="lineup-modal" onClick={(e) => e.stopPropagation()}>
        <button
          ref={closeRef}
          type="button"
          className="lineup-modal-close"
          onClick={closeModal}
          aria-label="Close"
        >×</button>
        <div className="lineup-modal-portrait">
          <ArtistPortrait artist={modalArtist} />
        </div>
        <div className="lineup-modal-body">
          <h2 className="lineup-modal-name">{modalArtist.name}</h2>
          {modalArtist.role && <div className="lineup-modal-role">({modalArtist.role})</div>}
          {modalArtist.bio && <p className="lineup-modal-bio">{modalArtist.bio}</p>}
        </div>
      </div>
    </div>
  );
};

/* -------- Page root -------- */
const LineupPage = () => {
  const [filter, setFilter] = React.useState('all');
  const [modalArtist, setModalArtist] = React.useState(null);

  // Force-white nav class on body
  React.useEffect(() => {
    document.body.classList.add('page-lineup');
    return () => document.body.classList.remove('page-lineup');
  }, []);

  // Sticky-state detection for filter bar (toggle .is-sticky for bg + shadow)
  React.useEffect(() => {
    const bar = document.querySelector('.lineup-filterbar');
    if (!bar) return;
    const sentinel = document.createElement('div');
    sentinel.style.cssText = 'position:absolute;height:1px;width:1px;';
    bar.parentNode.insertBefore(sentinel, bar);
    const io = new IntersectionObserver(([entry]) => {
      bar.classList.toggle('is-sticky', !entry.isIntersecting);
    }, { rootMargin: '-80px 0px 0px 0px', threshold: 0 });
    io.observe(sentinel);
    return () => { io.disconnect(); sentinel.remove(); };
  }, []);

  const ctx = React.useMemo(() => ({
    filter,
    setFilter,
    modalArtist,
    openModal: (a) => setModalArtist(a),
    closeModal: () => setModalArtist(null),
  }), [filter, modalArtist]);

  return (
    <LineupContext.Provider value={ctx}>
      <div data-screen-label="Line-up 2026 page">
        <section className="lineup-hero-zone" data-bg="dark">
          <div className="lineup-hero-zone-photo" aria-hidden="true"></div>
          <div className="lineup-hero-zone-overlay" aria-hidden="true"></div>
          <div className="lineup-hero-zone-grain" aria-hidden="true"></div>
          <OpeningStatement />
        </section>
        <div className="lineup-hero-divider" aria-hidden="true"></div>
        <FilterBar />
        <div className="lineup-dark-wrap">
          <ArtistGrid />
          <MoreToBeAnnounced />
        </div>
        <ArtistModal />
      </div>
    </LineupContext.Provider>
  );
};

window.LineupPage = LineupPage;
