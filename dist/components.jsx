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
      setScrolled(y > 8);
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
        <a href="lineup.html">line-up</a>
        <a href="index.html#archive">past events</a>
        <a href="tickets.html">pre-register</a>
      </div>
      <a className="nav-cta-circle" href="tickets.html" aria-label="Get ticket">
        <span className="nav-cta-circle-text" aria-hidden="true">
          {"TICKETS·TICKETS·TICKETS·".split("").map((ch, i) =>
            <span key={i} style={{ "--index": i }}>{ch}</span>
            )}
        </span>
        <span className="nav-cta-circle-inner">
          <svg className="nav-cta-circle-icon" width="16" height="16" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M3 11L11 3M11 3H4.5M11 3V9.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
          </svg>
          <svg className="nav-cta-circle-icon nav-cta-circle-icon--copy" width="16" height="16" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M3 11L11 3M11 3H4.5M11 3V9.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
          </svg>
        </span>
      </a>
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
    { label: "line-up", href: "lineup.html" },
    { label: "past events", href: "index.html#archive" },
    { label: "pre-register", href: "tickets.html" },
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
        <a className="mobile-menu-cta" href="tickets.html" onClick={onClose}>
          get tickets
          <svg width="18" height="18" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M3 11L11 3M11 3H4.5M11 3V9.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" />
          </svg>
        </a>
      </nav>
    </div>
  );
};

const Hero = () =>
<section className="hero" id="top">
    <div className="hero-bg"></div>
    <div className="shell hero-inner">
      <div className="hero-stage">
        <img
        className="hero-festival-logo"
        src="assets/logos/festival-logo-white.png"
        alt=""
        aria-label="Abnormaal Festival"
        role="img"
        loading="eager"
        decoding="async"
        style={{ opacity: "1", margin: "3px", objectFit: "contain", width: "100%", maxWidth: "633px" }} />
        <div className="hero-actions">
          <a href="tickets.html" className="hero-btn hero-btn--primary" onClick={() => {
            if (typeof fbq !== 'undefined') {
              fbq('track', 'ViewContent', { content_name: 'tickets_cta' });
            }
            if (typeof ttq !== 'undefined') {
              ttq.track('ClickButton', { content_name: 'tickets_cta' });
            }
          }}>
            <span className="hero-btn-glow" aria-hidden="true"></span>
            <span className="hero-btn-inner">
              <span>Tickets</span>
              <svg width="16" height="16" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M3 11L11 3M11 3H4.5M11 3V9.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" /></svg>
            </span>
          </a>
          <a href="lineup.html" className="hero-btn hero-btn--ghost">
            <span className="hero-btn-inner">
              <span>Line-up</span>
              <svg width="16" height="16" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M3 11L11 3M11 3H4.5M11 3V9.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" /></svg>
            </span>
          </a>
        </div>
      </div>
      <div className="hero-info">
        <div className="hero-info-item">
          <div className="label">Date</div>
          <div className="value">September 5<sup>th</sup>, 2026</div>
        </div>
        <div className="hero-info-divider"></div>
        <div className="hero-info-item">
          <div className="label">Location</div>
          <div className="value">Natuurstrook A1, Apeldoorn</div>
        </div>
        <div className="hero-info-divider"></div>
        <div className="hero-info-item">
          <div className="label">Programme</div>
          <div className="value">Two stages — <em style={{ color: "rgb(255, 255, 255)" }}>House</em> &amp; <em style={{ color: "rgb(255, 255, 255)" }}>Techno</em></div>
        </div>
      </div>
    </div>
    <div className="hero-chain"></div>
  </section>;const DateStrip = () => <div className="date-strip" style={{ backgroundColor: "rgb(214, 0, 0)" }}>
    <div className="date-strip-inner">
      <span>SAT, SEP 5TH, 2026</span>
      <span className="squid">Natuurstrook A1 · Apeldoorn</span>
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
              <div className="lineup-tba">
                <span className="tba-mark squid accent-squid">T.B.A.</span>
                <span className="tba-text">to be announced</span>
              </div>
              <Countdown
                target="2026-05-22T00:00:00+02:00"
                label="Line-up reveal in"
                tone="light"
                hideTarget
                expiredLabel="Line-up revealed"
              />
            </div>
          </div>
          <div className="event-card-right">
            <div className="bg"></div>
            <div className="event-meta-stack">
              <div className="meta-row"><span className="k">date</span><span className="v">Sat, September 5th, 2026</span></div>
              <div className="meta-row"><span className="k">hours</span><span className="v">13:00 - 00:00</span></div>
              <div className="meta-row"><span className="k">venue</span><span className="v">Natuurstrook A1 · Apeldoorn</span></div>
              <div className="meta-row"><span className="k">stages</span><span className="v">02 — house & techno</span></div>
            </div>
            <div className="ticket-tier-grid">
              <a href="tickets.html" className="ticket-tier" data-status="not-yet">
                <div className="ticket-tier-name">Blind Tickets</div>
                <div className="ticket-tier-price">€44,95</div>
              </a>
              <a href="tickets.html" className="ticket-tier" data-status="not-yet">
                <div className="ticket-tier-name">Early Bird</div>
                <div className="ticket-tier-price">€49,95</div>
              </a>
              <a href="tickets.html" className="ticket-tier" data-status="not-yet">
                <div className="ticket-tier-name">Regular Bird</div>
                <div className="ticket-tier-price">€54,95</div>
              </a>
              <a href="tickets.html" className="ticket-tier" data-status="not-yet">
                <div className="ticket-tier-name">Late Bird</div>
                <div className="ticket-tier-price">€59,95</div>
              </a>
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
          <div className="section-title">— natuurstrook A1</div>
        </div>
        <div className="travel-frame">
          <img
            className="travel-drone"
            src="assets/photos/location-drone.jpg"
            alt="Aerial view of Natuurstrook A1, Apeldoorn — a green strip wedged between industry and the A1 highway"
            loading="lazy" />
        </div>
        <div className="travel-copy">
          <h3 ref={headingRef} className="travel-display travel-heading">
            <span className="phrase">Not a park.</span>
            <span className="phrase">Not a meadow.</span>
            <span className="phrase">Not a stadium.</span>
          </h3>
          <p className="travel-body-text">A green strip of land in the south of Apeldoorn, wedged between industry and a highway. Most days, nothing happens here. On September 5th, thousands of people, two stages, and a sound system that fills the sky.</p>
          <p className="travel-closer"><em>Find us where Apeldoorn forgets to look.</em></p>
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
                    <img src={e.photo} alt={`${e.name} — ${e.venue}`} loading="lazy" />
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
                    <img src={e.photo} alt={`${e.name} — ${e.venue}`} loading="lazy" />
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

          <li className="timeline-item timeline-item--terminus">
            <div className="timeline-rail" aria-hidden="true">
              <span className="timeline-dot timeline-dot--terminus">
                <span className="timeline-dot-num squid">06</span>
              </span>
            </div>
            <div className="timeline-terminus">
              <div className="timeline-terminus-eyebrow squid accent-squid">final destination</div>
              <h3 className="timeline-terminus-title">ABNORMAAL<br />FESTIVAL</h3>
              <div className="timeline-terminus-meta">
                <span>September 5th, 2026</span>
                <span className="dot" aria-hidden="true">·</span>
                <span>Natuurstrook A1, Apeldoorn</span>
              </div>
              <a href="tickets.html" className="timeline-terminus-cta">
                <span>tickets</span><span className="arrow">→</span>
              </a>
            </div>
          </li>
        </ol>
      </div>
    </section>);

};

const Mailing = () => {
  const [email, setEmail] = React.useState("");
  const [done, setDone] = React.useState(false);
  return (
    <section className="section mailing-section" id="mailing">
      <div className="shell">
        <div className="section-header">
          <div className="section-label"><span className="num squid accent-squid">04</span>PRE-REGISTER</div>
          <div className="section-title">— first in line</div>
        </div>
        <div className="mailing-inner">
          <div className="mailing-left">
            <h2 className="mailing-title">Tickets drop<br /><em>May 8th, 2026.</em></h2>
            <Countdown
              target="2026-05-08T00:00:00+02:00"
              label="Tickets live in"
              tone="dark"
              hideTarget
              expiredLabel="Tickets live now"
              expiredHref="tickets.html"
              expiredCta="Buy tickets"
            />
          </div>
          <div className="mailing-form">
            {!done ?
            <>
                <div className="row">
                  <input
                  type="email" placeholder="your@email.nl"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && email.includes('@')) {
                      setDone(true);
                      if (typeof fbq !== 'undefined') fbq('track', 'Lead');
                      if (typeof ttq !== 'undefined') ttq.track('SubmitForm');
                    }
                  }} />
                
                  <button onClick={() => {
                    if (email.includes('@')) {
                      setDone(true);
                      if (typeof fbq !== 'undefined') fbq('track', 'Lead');
                      if (typeof ttq !== 'undefined') ttq.track('SubmitForm');
                    }
                  }}>pre-register</button>
                </div>
                <div className="mailing-fine">
                  <span>You'll get the link 24 hours before public sale.</span>
                  <span className="squid accent-squid">while supplies last</span>
                </div>
              </> :

            <div className="row">
                <span className="mailing-success">✓ you're on the list — see you 5 sep.</span>
              </div>
            }
          </div>
        </div>
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
            <em>Sound system for the eyes.</em><br />
            Dance-event organisation, Netherlands.
          </div>
          <div className="footer-stamp-row">
            <div className="footer-stamp"></div>
            <div className="footer-stamp-text">established<br />twenty-twenty-three</div>
          </div>
        </div>
        <div className="footer-col">
          <h4>Festival</h4>
          <ul>
            <li><a href="#event">Lineup</a></li>
            <li><a href="tickets.html">Tickets</a></li>
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

Object.assign(window, { Nav, Hero, DateStrip, NextEvent, Marquee, Manifesto, About, TravelLocation, Archive, Mailing, Footer });