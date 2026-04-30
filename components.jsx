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
      <a href="Index.html#top" className="nav-logo" style={{ display: 'inline-flex', alignItems: 'center', height: '32px' }}>
        <img className="nav-logo-img nav-logo-img--light" src="assets/logos/logo-horizontal-texture-white.png" alt="ABNØRMAAL" />
        <img className="nav-logo-img nav-logo-img--dark" src="assets/logos/logo-horizontal-texture-purple.png" alt="" aria-hidden="true" />
      </a>
      <div className="nav-links">
        <a href="about.html">about</a>
        <a href="lineup.html">line-up</a>
        <a href="#archive">past events</a>
        <a href="#mailing">pre-register</a>
        <a href="#contact">contact</a>
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
    { label: "past events", href: "#archive" },
    { label: "pre-register", href: "#mailing" },
    { label: "contact", href: "#contact" },
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
          <a href="tickets.html" className="hero-btn hero-btn--primary">
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
      <span>SAT 5 SEP 2026</span>
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
              <div className="meta-row"><span className="k">date</span><span className="v">Sat 5 Sep 2026</span></div>
              <div className="meta-row"><span className="k">hours</span><span className="v">13:00 - 00:00</span></div>
              <div className="meta-row"><span className="k">venue</span><span className="v">Natuurstrook A1 · Apeldoorn</span></div>
              <div className="meta-row"><span className="k">stages</span><span className="v">02 — house & techno</span></div>
            </div>
            <div className="ticket-tier-grid">
              <div className="ticket-tier" data-status="not-yet">
                <div className="ticket-tier-name">Blind Tickets</div>
                <div className="ticket-tier-price">€44,95</div>
                <div className="ticket-tier-status">Not yet on sale</div>
              </div>
              <div className="ticket-tier" data-status="not-yet">
                <div className="ticket-tier-name">Early Bird</div>
                <div className="ticket-tier-price">€49,95</div>
                <div className="ticket-tier-status">Not yet on sale</div>
              </div>
              <div className="ticket-tier" data-status="not-yet">
                <div className="ticket-tier-name">Regular Bird</div>
                <div className="ticket-tier-price">€54,95</div>
                <div className="ticket-tier-status">Not yet on sale</div>
              </div>
              <div className="ticket-tier" data-status="not-yet">
                <div className="ticket-tier-name">Late Bird</div>
                <div className="ticket-tier-price">€59,95</div>
                <div className="ticket-tier-status">Not yet on sale</div>
              </div>
            </div>
            <button className="event-cta is-disabled" type="button" disabled>
              <span>tickets not yet on sale</span><span className="arrow">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>);

};

const Marquee = () => {
  const items = [
  { text: "ABNØRMAAL FESTIVAL" },
  { text: "SEP 5 2026" },
  { text: "APELDOORN" },
  { text: "HOUSE × TECHNO" },
  { text: "TWO STAGES" },
  { text: "OUTDOOR ONLY" },
  { text: "TICKETS MAY 8" },
  { text: "LINE-UP MAY 22" }];

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


const TravelLocation = () =>
<section className="section travel-section" id="travel">
  <div className="shell">
    <div className="section-header">
      <div className="section-label"><span className="num squid accent-squid">02</span>TRAVEL &amp; LOCATION</div>
      <div className="section-title">— how to get there</div>
    </div>
    <div className="travel-grid">
      <div className="travel-info">
        <div className="travel-item">
          <div className="travel-label">By car</div>
          <div className="travel-body">A1 exit Apeldoorn-Zuid, signposted from the off-ramp. On-site parking €15, reserve in advance.</div>
        </div>
        <div className="travel-item">
          <div className="travel-label">Public transport</div>
          <div className="travel-body">Train to Apeldoorn Centraal — bus 4 / 102 stops 200m from the gate. Last bus back leaves 23:30.</div>
        </div>
        <div className="travel-item">
          <div className="travel-label">Festival shuttle</div>
          <div className="travel-body">Free shuttle from Apeldoorn Centraal every 15 min. 11:00 — 02:00 inbound. 22:00 — 04:00 outbound.</div>
        </div>
        <div className="travel-item">
          <div className="travel-label">Bike</div>
          <div className="travel-body">Free supervised parking, 2.000 spots. Use the south entrance, signposted from the canal path.</div>
        </div>
      </div>
      <div className="travel-map">
        <iframe
          title="Natuurstrook A1, Apeldoorn"
          src="https://www.google.com/maps?q=Natuurstrook+A1+Apeldoorn&output=embed"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen></iframe>
        <div className="travel-map-pin">
          <span className="travel-pin-label">Natuurstrook A1</span>
          <span className="travel-pin-sub">Apeldoorn · NL</span>
        </div>
      </div>
    </div>
  </div>
</section>;


const Archive = () => {
  const past = [
  { ed: "ed. 03", name: "In de Kerk", date: "dec '25", venue: "Bakkerskerk, Apeldoorn", tone: "ritual house", bg: "assets/backgrounds/bg-social-5.jpg" },
  { ed: "ed. 02", name: "Nacht van Apeldoorn", date: "sep '25", venue: "Stadspark, Apeldoorn", tone: "open-air techno", bg: "assets/backgrounds/bg-social-1.jpg" },
  { ed: "ed. 01", name: "Op de IJssel", date: "jun '25", venue: "IJsselboot, Zutphen", tone: "sunset house", bg: "assets/backgrounds/bg-social-7.jpg" }];

  return (
    <section className="section" id="archive">
      <div className="shell">
        <div className="section-header">
          <div className="section-label"><span className="num squid accent-squid">03</span>PAST EDITIONS</div>
          <div className="section-title">— we've been here before</div>
        </div>
        <div className="archive-grid">
          {past.map((p, i) =>
          <div className="archive-card" key={i}>
              <div className="archive-thumb" style={{ backgroundImage: `url(${p.bg})` }}>
                <div className="archive-thumb-inner">
                  <div className="archive-edition">{p.ed}</div>
                  <div>
                    <div className="archive-thumb-title">{p.name}</div>
                    <div className="archive-tone">{p.tone.toUpperCase()}</div>
                  </div>
                </div>
              </div>
              <div className="archive-meta">
                <span className="name">{p.name} — {p.venue}</span>
                <span className="date squid accent-squid">{p.date}</span>
              </div>
            </div>
          )}
        </div>
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
            <h2 className="mailing-title">Tickets drop<br /><em>8 May 2026.</em></h2>
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
                  onKeyDown={(e) => e.key === 'Enter' && email.includes('@') && setDone(true)} />
                
                  <button onClick={() => email.includes('@') && setDone(true)}>pre-register</button>
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
            <li><a href="#mailing">Tickets</a></li>
            <li><a href="#archive">Past editions</a></li>
            <li><a href="#">FAQ</a></li>
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
          <ul>
            <li><a href="#">Instagram</a></li>
            <li><a href="#">Resident Advisor</a></li>
            <li><a href="#">SoundCloud</a></li>
            <li><a href="#">Bandcamp</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 ABNØRMAAL Events · Amsterdam · KvK 89234567</span>
        <span className="signoff">show up. stay abnormal.</span>
      </div>
    </div>
  </footer>;

const Manifesto = () =>
<section className="manifesto" id="manifesto">
    <div className="manifesto-inner">
      <div className="manifesto-eyebrow" style={{ fontSize: "27px" }}>a first.</div>
      <p className="manifesto-body" style={{ fontFamily: "\"Lenia Sans\"" }}>Apeldoorn has clubs. Apeldoorn has had parties. But we've never had this. On september 5, 2026, two stages open in the open air. Thousands of people. One full day of house and techno. The biggest dance-event in the city to date.

    </p>
      <p className="manifesto-close" style={{ fontFamily: "SquidBoy" }}>NEW GROUND, YOU'RE HERE FIRST.</p>
    </div>
  </section>;

Object.assign(window, { Nav, Hero, DateStrip, NextEvent, Marquee, Manifesto, About, TravelLocation, Archive, Mailing, Footer });
