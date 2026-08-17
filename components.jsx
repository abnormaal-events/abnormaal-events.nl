/* Components for Abnormaal NoArt-style site */

const Nav = () => {
  const [scrolled, setScrolled] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;
    const update = () => {
      const y = window.scrollY;
      // Keep the nav transparent (cream logo) across the whole hero; only
      // flip to the light state once the cream sections below start.
      const hero = document.querySelector('.hero');
      const flipAt = hero ? Math.max(80, hero.offsetHeight - 90) : 8;
      setScrolled(y > flipAt);
      // Hide on scroll-down past threshold; show on scroll-up.
      // Only auto-hide on mobile (≤900px) or on the tickets page.
      const isTickets = document.body.getAttribute('data-screen-label') === 'Tickets page' ||
      !!document.querySelector('#celebratix-ticket-widget');
      const isMobile = window.matchMedia('(max-width: 900px)').matches;
      const enableHide = isMobile || isTickets;
      if (enableHide) {
        if (y > 80 && y > lastY + 4) {
          setHidden(true);
        } else if (y < lastY - 4 || y < 80) {
          setHidden(false);
        }
      } else {
        setHidden(false);
      }
      lastY = y;
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);
  React.useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {document.body.style.overflow = '';};
  }, [open]);
  const close = () => setOpen(false);
  return (
    <nav className={"nav" + (scrolled ? " is-scrolled" : "") + (hidden ? " is-hidden" : "") + (open ? " is-open" : "")}>
    <div className="nav-inner">
      <a href="index.html#top" className="nav-logo" style={{ display: 'inline-flex', alignItems: 'center', height: '32px' }}>
        <img className="nav-logo-img nav-logo-img--light" src="assets/logos/logo-horizontal-texture-white.png" alt="ABNØRMAAL" />
        <img className="nav-logo-img nav-logo-img--dark" src="assets/logos/logo-horizontal-texture-purple.png" alt="" aria-hidden="true" />
      </a>
      <div className="nav-links">
        <a href="about.html">about</a>
        <a href="index.html#archive">past events</a>
      </div>
      <button
          className="nav-burger"
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}>
          
        <span></span>
        <span></span>
      </button>
    </div>
    <MobileMenu isOpen={open} onClose={close} />
  </nav>);

};

const MobileMenu = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  const items = [
    { label: "about", href: "about.html" },
    { label: "past events", href: "index.html#archive" },
  ];
  return (
    <div className="mobile-menu" role="dialog" aria-modal="true" aria-label="Main menu">
      <button
        type="button"
        className="mobile-menu-close"
        aria-label="Close menu"
        onClick={onClose}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M5 5L19 19M19 5L5 19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" />
        </svg>
      </button>
      <nav className="mobile-menu-nav">
        {items.map((it) => (
          <a key={it.href} href={it.href} onClick={onClose}>{it.label}</a>
        ))}
      </nav>
    </div>
  );
};

const EVENT_CTA_URL = "https://drop.cobrand.com/d/MichelDeHey/Abnormaal-PHL-summernights";
const EVENT_CTA_LABEL = "Pre-register now";

const Hero = () => {
  const [stuck, setStuck] = React.useState(false);
  React.useEffect(() => {
    const btn = document.querySelector('.phl-cta');
    if (!btn || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(([e]) => setStuck(!e.isIntersecting), { threshold: 0 });
    io.observe(btn);
    return () => io.disconnect();
  }, []);
  React.useEffect(() => {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const bg = document.querySelector('.hero-bg');
    const stage = document.querySelector('.hero-stage');
    const tweens = [];
    if (bg) {
      tweens.push(gsap.to(bg, {
        yPercent: 16, scale: 1.07, ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
      }));
    }
    if (stage) {
      tweens.push(gsap.to(stage, {
        yPercent: -10, opacity: 0.3, ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
      }));
    }
    return () => {
      tweens.forEach((t) => { if (t.scrollTrigger) t.scrollTrigger.kill(); t.kill(); });
    };
  }, []);
  return (
<section className="hero hero--phl" id="top">
    <div className="hero-bg hero-bg--phl"></div>
    <div className="shell hero-inner">
      <div className="hero-stage">
        <h1 className="sr-only">Summer Nights x ABNØRMAAL x Michel de Hey &amp; Friends — Paleis Het Loo, 4 september 2026</h1>
        <img
          src="assets/logos/phl-summer-nights-lockup.png"
          alt="Summer Nights — Paleis Het Loo x ABNØRMAAL"
          className="phl-lockup" />
        <img
          src="assets/logos/mdh-friends-wordmark.png"
          alt="Michel de Hey &amp; Friends op het bordes van Paleis Het Loo"
          className="phl-wordmark" />
        <div className="phl-lineup">
          <span className="phl-lineup-label">a - z</span>
          <span className="phl-lineup-name">CONCEPT</span>
          <span className="phl-lineup-name">Michel de Hey</span>
          <span className="phl-lineup-name">Violet B2B Nino Wattimena</span>
        </div>
        <p className="phl-practical">PALEIS HET LOO · 4 SEPTEMBER · 18:30 - 21:30</p>
        <a
          className="event-cta-btn phl-cta"
          href={EVENT_CTA_URL}
          target="_blank"
          rel="noopener noreferrer">{EVENT_CTA_LABEL}</a>
        <p className="phl-cta-note">Tickets go on sale Thursday 12:00.<br />Pre-registered guests get the link first.</p>
      </div>
      <p className="phl-presenter">PRESENTED BY PALEIS HET LOO · SUMMER NIGHTS X EARTH WATER</p>
    </div>
    <div className={"event-cta-sticky" + (stuck ? " is-visible" : "")} aria-hidden={stuck ? "false" : "true"}>
      <a
        className="event-cta-btn"
        href={EVENT_CTA_URL}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={stuck ? 0 : -1}>{EVENT_CTA_LABEL}</a>
    </div>
  </section>
  );
};

const DateStrip = () => <div className="date-strip" style={{ backgroundColor: "rgb(214, 0, 0)" }}>
    <div className="date-strip-inner">
      <span>SAT, SEP 5TH, 2026</span>
      <span className="squid">Mheenpark · Apeldoorn</span>
      <span>13:00 — 00:00</span>
      <span className="squid">two stages</span>
      <span>18+ only</span>
    </div>
  </div>;

const NextEvent = () => {
  return (
    <section className="section" id="event" style={{ paddingTop: 120 }}>
      <div className="shell">
        <div className="section-header">
          <div className="section-label"><span className="num squid accent-squid">01</span>FEATURED EVENT</div>
          <div className="section-title">— the next one</div>
        </div>
        <div className="event-card">
          <div className="event-card-left">
            <a href="#" className="event-logo" aria-label="Abnormaal Festival">
              <span className="event-logo-mark" role="img" aria-label="Abnormaal Festival"></span>
            </a>
            <div className="event-lineup">
              <div className="lineup-label">Line-up · house & techno</div>
              <div className="lineup-names">
                {[
                  "BLNK", "BURNR", "CLAESSENS", "CONCEPT", "D|K|OXY", "D STONE",
                  "FREDDI B2B KARA OKAY", "IOSIO", "JO3Y3T", "MICHEL DE HEY",
                  "MISS K8", "MOODY MEHRAN", "MORGAN SEATREE", "SASHE", "TITI"
                ].map((name, i, arr) => (
                  <span key={name} className="lineup-item">
                    <span className="lineup-name">{name}</span>
                    {i < arr.length - 1 && <span className="lineup-sep" aria-hidden="true">×</span>}
                  </span>
                ))}
              </div>
              <a href="lineup.html" className="lineup-see-full">
                <span>See full line-up</span>
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
          <div className="event-card-right">
            <div className="bg"></div>
            <div className="event-meta-stack">
              <div className="meta-row"><span className="k">date</span><span className="v">Sat, September 5th, 2026</span></div>
              <div className="meta-row"><span className="k">hours</span><span className="v">13:00 - 00:00</span></div>
              <div className="meta-row"><span className="k">venue</span><span className="v">Mheenpark · Apeldoorn</span></div>
              <div className="meta-row"><span className="k">stages</span><span className="v">02 — house & techno</span></div>
            </div>
            <div className="ticket-tier-grid">
              {[
                { tier: "Blind Tickets", price: "€44,95", status: "sold_out" },
                { tier: "Early Bird",    price: "€49,95", status: "sold_out" },
                { tier: "Regular Bird",  price: "€54,95", status: "available" },
                { tier: "Late Bird",     price: "€59,95", status: "available" },
              ].map((t) => {
                const isSold = t.status === "sold_out";
                const isAlmost = t.status === "almost";
                return (
                  <a
                    key={t.tier}
                    href={isSold ? undefined : "tickets.html"}
                    className={"ticket-tier" + (isSold ? " ticket-tier--sold" : "")}
                    data-status={isSold ? "sold-out" : isAlmost ? "almost" : "not-yet"}
                    aria-disabled={isSold ? "true" : undefined}
                    tabIndex={isSold ? -1 : 0}
                  >
                    {isSold && <span className="ticket-tier-badge">Sold out</span>}
                    {isAlmost && <span className="ticket-tier-badge ticket-tier-badge--almost">Almost sold out</span>}
                    <div className="ticket-tier-name">{t.tier}</div>
                    <div className="ticket-tier-price">{t.price}</div>
                  </a>
                );
              })}
            </div>
            <a href="tickets.html" className="event-cta event-cta--tickets">
              <span>tickets</span><span className="arrow">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>);

};

const Marquee = () => {
  const items = [
  { text: "ABNØRMAAL FESTIVAL" },
  { text: "SEP 5TH 2026" },
  { text: "APELDOORN" },
  { text: "HOUSE × TECHNO" },
  { text: "TWO STAGES" },
  { text: "OUTDOOR ONLY" },
  { text: "TICKETS MAY 8TH" },
  { text: "LINE-UP MAY 22ND" }];

  const all = [...items, ...items, ...items];
  return (
    <div className="marquee">
      <div className="marquee-track">
        {all.map((it, i) =>
        <span key={i} className="marquee-item">
            <span className="star" aria-hidden="true"></span>
            <span className="marquee-text">{it.text}</span>
          </span>
        )}
      </div>
    </div>);

};

const About = () =>
<section className="section" id="about">
    <div className="shell">
      <div className="section-header">
        <div className="section-label"><span className="num squid accent-squid">02</span>ABOUT</div>
        <div className="section-title">— who we are</div>
      </div>
      <div className="about-grid">
        <div className="about-mark">
          <img src="assets/icons/shape-white.png" alt="" />
          <div className="stamp"></div>
        </div>
        <div>
          <div className="about-body">
            <p>
              ABNØRMAAL is a Netherlands-based dance-event organisation
              throwing house & techno nights since <span className="squid">2023</span>.
            </p>
            <p>
              We book the records you've had on repeat for a year, and the
              names you'll have on repeat next. <span className="accent">Two stages, one night, no return.</span>
            </p>
            <p>
              The festival is our outdoor edition — eight thousand people,
              two stages, a single sun-down. Indoor edition <em>In de Kerk</em> runs every winter.
            </p>
          </div>
          <div className="about-stats">
            <div className="stat">
              <div className="num">04</div>
              <div className="label">editions to date</div>
            </div>
            <div className="stat">
              <div className="num">8.<em>000</em></div>
              <div className="label">cap, edition 04</div>
            </div>
            <div className="stat">
              <div className="num">02</div>
              <div className="label squid accent-squid">stages running</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>;


const TravelLocation = () => {
  const headingRef = React.useRef(null);

  React.useEffect(() => {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const root = headingRef.current;
    if (!root) return;
    const phrases = root.querySelectorAll('.phrase');

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      gsap.set(phrases, { y: 0, opacity: 1 });
      return;
    }

    const tween = gsap.to(phrases, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'back.out(1.5)',
      stagger: 1.0,
      scrollTrigger: {
        trigger: root,
        start: 'top 85%',
        toggleActions: 'play none none none',
        once: true,
      },
    });

    return () => {
      if (tween.scrollTrigger) tween.scrollTrigger.kill();
      tween.kill();
    };
  }, []);

  return (
    <section className="section travel-section" id="travel">
      <div className="shell">
        <div className="section-header">
          <div className="section-label"><span className="num squid accent-squid">02</span>TRAVEL &amp; LOCATION</div>
          <h2 className="sr-only">Locatie: Mheenpark, Apeldoorn</h2>
          <div className="section-title">— mheenpark</div>
        </div>
        <div className="travel-frame">
          <img
            className="travel-drone"
            src="assets/photos/location-mheenpark.jpg"
            alt="Festival locatie Mheenpark Apeldoorn vanuit de lucht — outdoor house en techno festival"
            loading="lazy" />
        </div>
        <div className="travel-copy">
          <h3 ref={headingRef} className="travel-display travel-heading">
            <span className="phrase">You've walked it.</span>
            <span className="phrase">You've passed it.</span>
            <span className="phrase">Now you'll feel it.</span>
          </h3>
          <p className="travel-body-text">Mheenpark. Green, open, right in the middle of Apeldoorn. A place the whole city knows, but has never seen like this. On September 5th we turn it into two stages, thousands of people, and a sound system that fills the trees.</p>
          <p className="travel-closer"><em>The city's backyard. For one day, it's ours.</em></p>
        </div>
      </div>
    </section>
  );
};


const Archive = () => {
  const editions = [
    {
      ed: "01",
      name: "Op de IJssel",
      date: "Aug 31st, 2023",
      venue: "Rederij Eureka, Deventer",
      photo: "assets/photos/edition-01-ijssel-2023.jpeg",
      link: "https://youtu.be/gXqKrDk_71U?si=ywARZwhi7KRg4ZRU",
    },
    {
      ed: "02",
      name: "In de Kerk",
      date: "Mar 1st, 2024",
      venue: "Grote Kerk, Apeldoorn",
      photo: "assets/photos/edition-02-kerk-2024.jpeg",
      link: "https://youtu.be/NcMb-DBeFgE?si=ubeJ6rVbmaHUy15S",
      altText: "In de Kerk Apeldoorn 2024 — house en techno event",
    },
    {
      ed: "03",
      name: "In de Kerk",
      date: "Mar 7-8th, 2025",
      venue: "Grote Kerk, Apeldoorn",
      photo: "assets/photos/edition-03-kerk-2025.jpeg",
      link: "https://www.youtube.com/watch?v=BgtwQ83VWSk",
    },
    {
      ed: "04",
      name: "Nacht van Apeldoorn",
      date: "Aug 29th, 2025",
      venue: "Van Reekumplein, Apeldoorn",
      photo: "assets/photos/edition-04-nacht-2025.jpeg",
    },
    {
      ed: "05",
      name: "In de Kerk",
      date: "Feb 27-28th, 2026",
      venue: "Grote Kerk, Apeldoorn",
      photo: "assets/photos/edition-05-kerk-2026.jpeg",
      flag: "Most recent",
    },
  ];

  return (
    <section className="section archive-section" id="archive">
      <div className="shell">
        <div className="section-header">
          <div className="section-label"><span className="num squid accent-squid">03</span>PAST EDITIONS</div>
          <h2 className="sr-only">Past Editions van ABNØRMAAL Festival</h2>
          <div className="section-title">— the road so far</div>
        </div>

        <ol className="timeline">
          {editions.map((e, i) => (
            <li className="timeline-item" key={e.ed}>
              <div className="timeline-rail" aria-hidden="true">
                <span className="timeline-dot"><span className="timeline-dot-num squid">{e.ed}</span></span>
              </div>
              {e.link ? (
                <a
                  href={e.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="timeline-card timeline-card--linked"
                  aria-label={`${e.name} — ${e.date} (watch aftermovie)`}
                >
                  <div className="timeline-photo">
                    <img src={e.photo} alt={e.altText || `${e.name} — ${e.venue}`} loading="lazy" />
                    {e.flag && <span className="timeline-flag">{e.flag}</span>}
                  </div>
                  <div className="timeline-meta">
                    <div className="timeline-date squid accent-squid">{e.date}</div>
                    <h3 className="timeline-name">{e.name}</h3>
                    <div className="timeline-venue">{e.venue}</div>
                  </div>
                </a>
              ) : (
                <div className="timeline-card timeline-card--static" aria-label={`${e.name} — ${e.date}`}>
                  <div className="timeline-photo">
                    <img src={e.photo} alt={e.altText || `${e.name} — ${e.venue}`} loading="lazy" />
                    {e.flag && <span className="timeline-flag">{e.flag}</span>}
                  </div>
                  <div className="timeline-meta">
                    <div className="timeline-date squid accent-squid">{e.date}</div>
                    <h3 className="timeline-name">{e.name}</h3>
                    <div className="timeline-venue">{e.venue}</div>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>);

};

const Footer = () =>
<footer className="footer" id="contact">
    <div className="shell">
      <img className="footer-wordmark" src="assets/logos/logo-horizontal-texture-black.png" alt="ABNØRMAAL" style={{ display: 'block', width: '100%', maxWidth: '100%', height: 'auto' }} />
      <div className="footer-grid">
        <div>
          <div className="footer-tag">
            Dance-event organisation, Netherlands.
          </div>
          <div className="footer-stamp-row">
            <div className="footer-stamp"></div>
            <div className="footer-stamp-text">established<br />twenty-twenty-three</div>
          </div>
        </div>
        <div className="footer-col">
          <h4>Explore</h4>
          <ul>
            <li><a href="about.html">About</a></li>
            <li><a href="index.html#archive">Past editions</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Contact</h4>
          <ul>
            <li><a href="mailto:info@abnormaal-events.nl">info@abnormaal-events.nl</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Follow</h4>
          <div className="footer-socials">
            <a href="https://www.instagram.com/abnormaal.events/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="footer-social">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6"/>
                <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6"/>
                <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor"/>
              </svg>
            </a>
            <a href="https://www.tiktok.com/@abnormaal.events" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="footer-social">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M14.5 3v10.2a3.3 3.3 0 1 1-3.3-3.3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14.5 3c0 2.6 2.1 4.7 4.7 4.7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="https://www.youtube.com/@ABNORMAALEVENTS" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="footer-social">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="2.5" y="5.5" width="19" height="13" rx="3" stroke="currentColor" strokeWidth="1.6"/>
                <path d="M10.5 9.5v5l4-2.5-4-2.5z" fill="currentColor"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 ABNØRMAAL Events · Apeldoorn · KvK 42042420</span>
        <span className="footer-legal-links">
          <a className="footer-privacy" href="privacy.html">Privacy Policy</a>
          <span aria-hidden="true">·</span>
          <a className="footer-privacy" href="terms.html">Terms &amp; Conditions</a>
          <span aria-hidden="true">·</span>
          <a className="footer-privacy" href="#" data-cookie-settings>Cookie settings</a>
        </span>
        <span className="signoff">show up. stay abnormal.</span>
      </div>
    </div>
  </footer>;

const Manifesto = () => {
  const closerRef = React.useRef(null);

  React.useEffect(() => {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const root = closerRef.current;
    if (!root) return;
    const words = root.querySelectorAll('.word');

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      gsap.set(words, { y: 0, opacity: 1 });
      return;
    }

    const trigger = gsap.to(words, {
      y: 0,
      opacity: 1,
      duration: 1.33,
      ease: 'back.out(1.7)',
      stagger: 0.2,
      scrollTrigger: {
        trigger: root,
        start: 'top 85%',
        toggleActions: 'play none none none',
        once: true,
      },
    });

    return () => {
      if (trigger.scrollTrigger) trigger.scrollTrigger.kill();
      trigger.kill();
    };
  }, []);

  const closerWords = "NEW GROUND, YOU'RE HERE FIRST.".split(' ');

  return (
    <section className="manifesto" id="manifesto">
      <div className="manifesto-inner">
        <h2 className="sr-only">Het eerste outdoor house en techno festival van Apeldoorn</h2>
        <div className="manifesto-eyebrow" style={{ fontSize: "27px" }}>a first.</div>
        <p className="manifesto-body" style={{ fontFamily: "\"Lenia Sans\"" }}>Apeldoorn has clubs. Apeldoorn has had parties. But we've never had this. On September 5th, 2026, two stages open in the open air. Thousands of people. One full day of house and techno. The biggest dance-event in the city to date.

      </p>
        <p ref={closerRef} className="manifesto-close" style={{ fontFamily: "SquidBoy" }}>
          {closerWords.map((w, i) => (
            <React.Fragment key={i}>
              <span className="word">{w}</span>
              {i < closerWords.length - 1 ? ' ' : null}
            </React.Fragment>
          ))}
        </p>
      </div>
    </section>
  );
};

const HERO_HOUSE_DJS = [
  "MORGAN SEATREE", "MICHEL DE HEY", "D STONE", "MOODY MEHRAN", "BURNR",
  "FREDDI B2B KARA OKAY", "IOSIO", "CONCEPT",
];
const HERO_TECHNO_DJS = [
  "MISS K8", "CLAESSENS", "D|K|OXY", "TITI", "BLNK", "JO3Y3T", "SASHE",
];

const renderDjName = (name) => {
  const m = name.match(/^(.+?)\s+B2B\s+(.+)$/i);
  if (m) {
    return (
      <React.Fragment>
        <span className="hero-dj-name-part">{m[1]}</span>
        <span className="hero-dj-name-b2b">B2B</span>
        <span className="hero-dj-name-part">{m[2]}</span>
      </React.Fragment>
    );
  }
  return name;
};

const HeroMarqueeSet = ({ list, ariaHidden }) => (
  <React.Fragment>
    {list.map((name, i) => (
      <React.Fragment key={i}>
        <a
          href="lineup.html"
          className="hero-dj-name"
          aria-hidden={ariaHidden ? "true" : undefined}
          tabIndex={ariaHidden ? -1 : 0}
        >
          {renderDjName(name)}
        </a>
        <span className="hero-dj-x" aria-hidden="true">×</span>
      </React.Fragment>
    ))}
  </React.Fragment>
);

const HeroMarquee = () => (
  <div className="hero-marquees" aria-label="Line-up 2026 — by stage">
    <div className="hero-marquee hero-marquee--house" aria-label="Mr. Boost Arena line-up">
      <div className="hero-marquee-logo hero-marquee-logo--left" aria-hidden="true">
        <img src="assets/logos/mr-boost-white.svg" alt="" />
      </div>
      <div className="hero-marquee-track hero-marquee-track--rtl">
        <HeroMarqueeSet list={HERO_HOUSE_DJS} />
        <HeroMarqueeSet list={HERO_HOUSE_DJS} ariaHidden />
      </div>
    </div>
    <div className="hero-marquee hero-marquee--techno" aria-label="Viper Hard Area line-up">
      <div className="hero-marquee-track hero-marquee-track--ltr">
        <HeroMarqueeSet list={HERO_TECHNO_DJS} />
        <HeroMarqueeSet list={HERO_TECHNO_DJS} ariaHidden />
      </div>
      <div className="hero-marquee-logo hero-marquee-logo--right" aria-hidden="true">
        <img src="assets/logos/viper-white.webp" alt="" className="viper-marquee-logo" />
      </div>
    </div>
  </div>
);

Object.assign(window, { Nav, Hero, DateStrip, NextEvent, Marquee, Manifesto, About, TravelLocation, Archive, HeroMarquee, Footer });