/* Subpage hero + countdown for lineup / tickets / about */

const SubpageHero = ({ eyebrow, title, subtitle, kicker, accentNum }) =>
<section className="subpage-hero">
  <div className="hero-bg"></div>
  <div className="shell subpage-hero-inner">
    <div className="subpage-eyebrow">
      <span className="dot"></span>
      {accentNum && <span className="num squid accent-squid">{accentNum}</span>}
      <span>{eyebrow}</span>
      <span className="squid accent-squid">est. 2023</span>
    </div>
    <h1 className="subpage-title">{title}</h1>
    {subtitle && <p className="subpage-subtitle">{subtitle}</p>}
    {kicker && <div className="subpage-kicker">{kicker}</div>}
  </div>
</section>;


const Countdown = ({ target, label, tone, expiredLabel, expiredHref, expiredCta, hideTarget }) => {
  const [now, setNow] = React.useState(() => Date.now());
  React.useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, new Date(target).getTime() - now);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const mins = Math.floor((diff / (1000 * 60)) % 60);
  const secs = Math.floor((diff / 1000) % 60);
  const pad = (n) => String(n).padStart(2, '0');
  const expired = diff === 0;
  const cls = "countdown" + (expired ? " is-expired" : "") + (tone ? ` countdown--${tone}` : "");
  return (
    <div className={cls}>
      {(label || (expired && expiredLabel)) && (
        <div className="countdown-label">{expired && expiredLabel ? expiredLabel : label}</div>
      )}
      <div className="countdown-grid">
        <div className="countdown-cell"><div className="num">{pad(days)}</div><div className="unit">days</div></div>
        <span className="countdown-sep">:</span>
        <div className="countdown-cell"><div className="num">{pad(hours)}</div><div className="unit">hours</div></div>
        <span className="countdown-sep">:</span>
        <div className="countdown-cell"><div className="num">{pad(mins)}</div><div className="unit">min</div></div>
        <span className="countdown-sep">:</span>
        <div className="countdown-cell"><div className="num">{pad(secs)}</div><div className="unit">sec</div></div>
      </div>
      {!hideTarget && (
        <div className="countdown-target squid accent-squid">
          {(() => {
            const d = new Date(target);
            const wd = d.toLocaleString('en-US', { weekday: 'long' });
            const mo = d.toLocaleString('en-US', { month: 'long' });
            const day = d.getDate();
            const yr = d.getFullYear();
            const ord = (n) => {
              const v = n % 100;
              if (v >= 11 && v <= 13) return 'th';
              switch (n % 10) { case 1: return 'st'; case 2: return 'nd'; case 3: return 'rd'; default: return 'th'; }
            };
            return `${wd}, ${mo} ${day}${ord(day)}, ${yr}`;
          })()}
        </div>
      )}
      {expired && expiredHref && expiredCta && (
        <a href={expiredHref} className="countdown-cta">{expiredCta} →</a>
      )}
    </div>
  );
};

Object.assign(window, { SubpageHero, Countdown });
