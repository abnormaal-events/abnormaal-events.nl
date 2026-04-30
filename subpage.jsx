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
          {new Date(target).toLocaleString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).toLowerCase()}
        </div>
      )}
      {expired && expiredHref && expiredCta && (
        <a href={expiredHref} className="countdown-cta">{expiredCta} →</a>
      )}
    </div>
  );
};

Object.assign(window, { SubpageHero, Countdown });
