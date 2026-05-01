/* ABNØRMAAL — Cookie consent
   Plain JS, no framework deps. Runs on every page.
   Loads Meta Pixel + TikTok Pixel only after marketing consent. */

(function () {
  "use strict";

  var CONSENT_KEY = "cookieConsent";
  var CONSENT_VERSION = "1.0";
  var META_PIXEL_ID = "2343728842655218";
  var TIKTOK_PIXEL_ID = "D7Q9KP3C77U9TECLE5H0";

  /* ---------- pixel loaders (idempotent) ---------- */
  function loadMetaPixel() {
    if (window.fbq) return;
    !function (f, b, e, v, n, t, s) {
      if (f.fbq) return;n = f.fbq = function () {n.callMethod ?
        n.callMethod.apply(n, arguments) : n.queue.push(arguments);};
      if (!f._fbq) f._fbq = n;n.push = n;n.loaded = !0;n.version = "2.0";
      n.queue = [];t = b.createElement(e);t.async = !0;
      t.src = v;s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    }(window, document, "script",
    "https://connect.facebook.net/en_US/fbevents.js");
    window.fbq("init", META_PIXEL_ID);
    window.fbq("track", "PageView");
    // If we're on tickets.html, fire ViewContent now (page-load already happened)
    if (document.body && document.body.getAttribute("data-screen-label") === "Tickets page") {
      window.fbq("track", "ViewContent", { content_category: "tickets" });
    }
  }

  function loadTikTokPixel() {
    if (window.ttq && window.ttq.loaded) return;
    !function (w, d, t) {
      w.TiktokAnalyticsObject = t;var ttq = w[t] = w[t] || [];ttq.methods = ["page", "track", "identify", "instances", "debug", "on", "off", "once", "ready", "alias", "group", "enableCookie", "disableCookie", "holdConsent", "revokeConsent", "grantConsent"];ttq.setAndDefer = function (t, e) {t[e] = function () {t.push([e].concat(Array.prototype.slice.call(arguments, 0)));};};for (var i = 0; i < ttq.methods.length; i++) ttq.setAndDefer(ttq, ttq.methods[i]);ttq.instance = function (t) {for (var e = ttq._i[t] || [], n = 0; n < ttq.methods.length; n++) ttq.setAndDefer(e, ttq.methods[n]);return e;};ttq.load = function (e, n) {var r = "https://analytics.tiktok.com/i18n/pixel/events.js",o = n && n.partner;ttq._i = ttq._i || {};ttq._i[e] = [];ttq._i[e]._u = r;ttq._t = ttq._t || {};ttq._t[e] = +new Date();ttq._o = ttq._o || {};ttq._o[e] = n || {};n = document.createElement("script");n.type = "text/javascript";n.async = !0;n.src = r + "?sdkid=" + e + "&lib=" + t;e = document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n, e);};
      ttq.load(TIKTOK_PIXEL_ID);
      ttq.page();
    }(window, document, "ttq");
    window.ttq.loaded = true;
    if (document.body && document.body.getAttribute("data-screen-label") === "Tickets page") {
      window.ttq.track("ViewContent", { content_category: "tickets" });
    }
  }

  /* ---------- state ---------- */
  function readConsent() {
    try {
      var raw = localStorage.getItem(CONSENT_KEY);
      if (!raw) return null;
      var parsed = JSON.parse(raw);
      if (parsed.version !== CONSENT_VERSION) return null;
      return parsed;
    } catch (_) { return null; }
  }

  function writeConsent(state) {
    var payload = {
      version: CONSENT_VERSION,
      essential: true,
      analytics: !!state.analytics,
      marketing: !!state.marketing,
      timestamp: new Date().toISOString()
    };
    try { localStorage.setItem(CONSENT_KEY, JSON.stringify(payload)); } catch (_) {}
    return payload;
  }

  function applyConsent(state) {
    if (state && state.marketing) {
      loadMetaPixel();
      loadTikTokPixel();
    }
    // GTM is loaded directly in <head>; analytics tag inside GTM should respect
    // dataLayer consent state. We push a signal so GTM tags can gate themselves.
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "consent_update",
      cookie_consent: {
        analytics: !!(state && state.analytics),
        marketing: !!(state && state.marketing)
      }
    });
  }

  /* ---------- styles (scoped, injected once) ---------- */
  var STYLES = '' +
  '.abn-cc, .abn-cc * { box-sizing: border-box; }' +
  '.abn-cc-banner {' +
  '  position: fixed; left: 0; right: 0; bottom: 0;' +
  '  background: #2A004E; color: #fff;' +
  '  z-index: 9998;' +
  '  padding: 24px 28px;' +
  '  border-top: 1px solid rgba(255,255,255,0.12);' +
  '  font-family: "Lenia Sans", system-ui, -apple-system, "Segoe UI", sans-serif;' +
  '  box-shadow: 0 -20px 60px rgba(0,0,0,0.35);' +
  '  animation: abn-cc-slide-up 280ms cubic-bezier(0.2,0.8,0.2,1);' +
  '}' +
  '@keyframes abn-cc-slide-up { from { transform: translateY(100%); } to { transform: translateY(0); } }' +
  '.abn-cc-banner-inner {' +
  '  max-width: 1280px; margin: 0 auto;' +
  '  display: grid; grid-template-columns: 1fr auto; gap: 28px; align-items: center;' +
  '}' +
  '.abn-cc-text h2 {' +
  '  font-family: "SquidBoy", "Lenia Sans", system-ui, sans-serif;' +
  '  font-weight: 400; font-size: 24px; letter-spacing: 0;' +
  '  margin: 0 0 8px; color: #fff;' +
  '}' +
  '.abn-cc-text p {' +
  '  margin: 0; font-size: 14px; line-height: 1.55;' +
  '  color: rgba(255,255,255,0.86);' +
  '  max-width: 64ch;' +
  '}' +
  '.abn-cc-text p a { color: #fff; text-decoration: underline; text-underline-offset: 2px; }' +
  '.abn-cc-actions {' +
  '  display: flex; align-items: center; gap: 12px; flex-wrap: nowrap;' +
  '}' +
  '.abn-cc-btn {' +
  '  font-family: inherit;' +
  '  font-size: 12px; font-weight: 700;' +
  '  letter-spacing: 0.16em; text-transform: uppercase;' +
  '  padding: 14px 22px;' +
  '  border-radius: 6px;' +
  '  border: 1px solid transparent;' +
  '  cursor: pointer;' +
  '  white-space: nowrap;' +
  '  transition: background 180ms, color 180ms, border-color 180ms, transform 120ms;' +
  '}' +
  '.abn-cc-btn:active { transform: translateY(1px); }' +
  '.abn-cc-btn:focus-visible { outline: 2px solid #fff; outline-offset: 3px; }' +
  '.abn-cc-btn--primary { background: #D62700; color: #fff; border-color: #D62700; }' +
  '.abn-cc-btn--primary:hover { background: #E04300; border-color: #E04300; }' +
  '.abn-cc-btn--secondary { background: transparent; color: #fff; border-color: rgba(255,255,255,0.55); }' +
  '.abn-cc-btn--secondary:hover { border-color: #fff; background: rgba(255,255,255,0.06); }' +
  '.abn-cc-btn--link {' +
  '  background: none; border: none; padding: 14px 8px;' +
  '  text-decoration: underline; text-underline-offset: 3px;' +
  '  color: rgba(255,255,255,0.86);' +
  '}' +
  '.abn-cc-btn--link:hover { color: #fff; }' +

  /* modal scrim */
  '.abn-cc-scrim {' +
  '  position: fixed; inset: 0;' +
  '  background: rgba(0,0,0,0.65);' +
  '  z-index: 9998;' +
  '  display: flex; align-items: center; justify-content: center;' +
  '  padding: 24px;' +
  '  animation: abn-cc-fade-in 200ms ease-out;' +
  '}' +
  '@keyframes abn-cc-fade-in { from { opacity: 0; } to { opacity: 1; } }' +

  '.abn-cc-modal {' +
  '  background: #2A004E; color: #fff;' +
  '  width: 100%; max-width: 560px;' +
  '  max-height: 88vh; overflow-y: auto;' +
  '  border-radius: 8px;' +
  '  border: 1px solid rgba(255,255,255,0.14);' +
  '  font-family: "Lenia Sans", system-ui, -apple-system, "Segoe UI", sans-serif;' +
  '  position: relative;' +
  '  animation: abn-cc-pop 220ms cubic-bezier(0.2,0.8,0.2,1);' +
  '}' +
  '@keyframes abn-cc-pop { from { transform: scale(0.96); opacity: 0; } to { transform: scale(1); opacity: 1; } }' +
  '.abn-cc-modal-head {' +
  '  display: flex; align-items: flex-start; justify-content: space-between;' +
  '  padding: 28px 28px 16px; gap: 12px;' +
  '  border-bottom: 1px solid rgba(255,255,255,0.12);' +
  '}' +
  '.abn-cc-modal-head h2 {' +
  '  font-family: "SquidBoy", "Lenia Sans", system-ui, sans-serif;' +
  '  font-weight: 400; font-size: 28px; letter-spacing: 0;' +
  '  margin: 0; color: #fff;' +
  '}' +
  '.abn-cc-modal-close {' +
  '  background: none; border: none; color: rgba(255,255,255,0.7);' +
  '  font-size: 22px; line-height: 1; cursor: pointer;' +
  '  padding: 4px 8px;' +
  '  border-radius: 4px;' +
  '}' +
  '.abn-cc-modal-close:hover { color: #fff; }' +
  '.abn-cc-modal-close:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }' +

  '.abn-cc-modal-body { padding: 8px 28px 24px; }' +
  '.abn-cc-row {' +
  '  display: flex; gap: 16px; padding: 18px 0;' +
  '  border-bottom: 1px solid rgba(255,255,255,0.10);' +
  '}' +
  '.abn-cc-row:last-of-type { border-bottom: none; }' +
  '.abn-cc-row-text { flex: 1; }' +
  '.abn-cc-row-title {' +
  '  font-weight: 700; font-size: 14px;' +
  '  letter-spacing: 0.04em; text-transform: uppercase;' +
  '  margin: 0 0 6px; color: #fff;' +
  '}' +
  '.abn-cc-row-desc {' +
  '  margin: 0; font-size: 13px; line-height: 1.55;' +
  '  color: rgba(255,255,255,0.72);' +
  '}' +
  /* toggle */
  '.abn-cc-toggle {' +
  '  flex-shrink: 0; align-self: flex-start;' +
  '  position: relative; display: inline-block;' +
  '  width: 44px; height: 24px;' +
  '}' +
  '.abn-cc-toggle input { opacity: 0; width: 0; height: 0; }' +
  '.abn-cc-toggle-slider {' +
  '  position: absolute; inset: 0;' +
  '  background: rgba(255,255,255,0.20);' +
  '  border-radius: 24px;' +
  '  transition: background 180ms;' +
  '  cursor: pointer;' +
  '}' +
  '.abn-cc-toggle-slider::before {' +
  '  content: ""; position: absolute;' +
  '  height: 18px; width: 18px;' +
  '  left: 3px; top: 3px;' +
  '  background: #fff;' +
  '  border-radius: 50%;' +
  '  transition: transform 180ms;' +
  '}' +
  '.abn-cc-toggle input:checked + .abn-cc-toggle-slider { background: #D62700; }' +
  '.abn-cc-toggle input:checked + .abn-cc-toggle-slider::before { transform: translateX(20px); }' +
  '.abn-cc-toggle input:disabled + .abn-cc-toggle-slider { background: rgba(255,255,255,0.30); cursor: not-allowed; opacity: 0.7; }' +
  '.abn-cc-toggle input:focus-visible + .abn-cc-toggle-slider { outline: 2px solid #fff; outline-offset: 2px; }' +

  '.abn-cc-modal-actions {' +
  '  display: flex; gap: 12px; padding: 20px 28px;' +
  '  border-top: 1px solid rgba(255,255,255,0.12);' +
  '  flex-wrap: wrap;' +
  '}' +
  '.abn-cc-modal-actions .abn-cc-btn { flex: 1; min-width: 140px; }' +

  /* mobile */
  '@media (max-width: 720px) {' +
  '  .abn-cc-banner { padding: 18px 18px; max-height: 50vh; overflow-y: auto; }' +
  '  .abn-cc-banner-inner { grid-template-columns: 1fr; gap: 18px; }' +
  '  .abn-cc-text h2 { font-size: 20px; }' +
  '  .abn-cc-actions { flex-direction: column; align-items: stretch; }' +
  '  .abn-cc-actions .abn-cc-btn { width: 100%; }' +
  '  .abn-cc-modal-head { padding: 22px 22px 14px; }' +
  '  .abn-cc-modal-head h2 { font-size: 22px; }' +
  '  .abn-cc-modal-body { padding: 4px 22px 18px; }' +
  '  .abn-cc-modal-actions { padding: 16px 22px; flex-direction: column; }' +
  '  .abn-cc-modal-actions .abn-cc-btn { width: 100%; }' +
  '}';

  function injectStyles() {
    if (document.getElementById("abn-cc-styles")) return;
    var s = document.createElement("style");
    s.id = "abn-cc-styles";
    s.textContent = STYLES;
    document.head.appendChild(s);
  }

  /* ---------- DOM helpers ---------- */
  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) for (var k in attrs) {
      if (k === "class") node.className = attrs[k];
      else if (k === "html") node.innerHTML = attrs[k];
      else if (k.indexOf("on") === 0) node.addEventListener(k.slice(2), attrs[k]);
      else node.setAttribute(k, attrs[k]);
    }
    if (children) {
      if (!Array.isArray(children)) children = [children];
      children.forEach(function (c) {
        if (c == null) return;
        node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
      });
    }
    return node;
  }

  /* ---------- banner ---------- */
  var bannerEl = null;
  function showBanner() {
    if (bannerEl) return;
    bannerEl = el("div", {
      class: "abn-cc abn-cc-banner",
      role: "dialog",
      "aria-label": "Cookie consent",
      "aria-live": "polite"
    }, [
      el("div", { class: "abn-cc-banner-inner" }, [
        el("div", { class: "abn-cc-text" }, [
          el("h2", null, "WE USE COOKIES."),
          el("p", { html: 'We use cookies to analyse traffic and improve your experience. Marketing cookies help us understand which of our ads brought you here. See our <a href="privacy.html">privacy policy</a>.' })
        ]),
        el("div", { class: "abn-cc-actions" }, [
          el("button", {
            class: "abn-cc-btn abn-cc-btn--link",
            type: "button",
            onclick: function () { hideBanner(); openModal(); }
          }, "Manage preferences"),
          el("button", {
            class: "abn-cc-btn abn-cc-btn--secondary",
            type: "button",
            onclick: function () {
              var s = writeConsent({ analytics: false, marketing: false });
              applyConsent(s);
              hideBanner();
            }
          }, "Reject all"),
          el("button", {
            class: "abn-cc-btn abn-cc-btn--primary",
            type: "button",
            onclick: function () {
              var s = writeConsent({ analytics: true, marketing: true });
              applyConsent(s);
              hideBanner();
            }
          }, "Accept all")
        ])
      ])
    ]);
    document.body.appendChild(bannerEl);
    // Focus first action for keyboard users
    setTimeout(function () {
      var first = bannerEl.querySelector(".abn-cc-btn--primary");
      if (first) first.focus();
    }, 50);
  }

  function hideBanner() {
    if (!bannerEl) return;
    bannerEl.remove();
    bannerEl = null;
  }

  /* ---------- modal ---------- */
  var modalEl = null;
  var lastFocused = null;
  function openModal() {
    if (modalEl) return;
    lastFocused = document.activeElement;
    var existing = readConsent() || { analytics: false, marketing: false };

    var analyticsToggle, marketingToggle;
    var dialog = el("div", {
      class: "abn-cc abn-cc-modal",
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": "abn-cc-modal-title"
    }, [
      el("div", { class: "abn-cc-modal-head" }, [
        el("h2", { id: "abn-cc-modal-title" }, "COOKIE PREFERENCES"),
        el("button", {
          class: "abn-cc-modal-close",
          type: "button",
          "aria-label": "Close",
          onclick: function () { closeModal(); if (!readConsent()) showBanner(); }
        }, "✕")
      ]),
      el("div", { class: "abn-cc-modal-body" }, [
        // Essential
        el("div", { class: "abn-cc-row" }, [
          el("div", { class: "abn-cc-row-text" }, [
            el("p", { class: "abn-cc-row-title" }, "Essential cookies"),
            el("p", { class: "abn-cc-row-desc" }, "Required for the site to function. Cannot be disabled.")
          ]),
          el("label", { class: "abn-cc-toggle", "aria-label": "Essential cookies (always on)" }, [
            (function () {
              var i = el("input", { type: "checkbox" });
              i.checked = true;
              i.disabled = true;
              return i;
            })(),
            el("span", { class: "abn-cc-toggle-slider" })
          ])
        ]),
        // Analytics
        el("div", { class: "abn-cc-row" }, [
          el("div", { class: "abn-cc-row-text" }, [
            el("p", { class: "abn-cc-row-title" }, "Analytics cookies"),
            el("p", { class: "abn-cc-row-desc" }, "Help us understand how visitors interact with the site. Includes Google Tag Manager.")
          ]),
          el("label", { class: "abn-cc-toggle" }, [
            (analyticsToggle = (function () {
              var i = el("input", { type: "checkbox", "aria-label": "Analytics cookies" });
              i.checked = !!existing.analytics;
              return i;
            })()),
            el("span", { class: "abn-cc-toggle-slider" })
          ])
        ]),
        // Marketing
        el("div", { class: "abn-cc-row" }, [
          el("div", { class: "abn-cc-row-text" }, [
            el("p", { class: "abn-cc-row-title" }, "Marketing cookies"),
            el("p", { class: "abn-cc-row-desc" }, "Allow us to track which ads brought you here. Includes Meta Pixel and TikTok Pixel.")
          ]),
          el("label", { class: "abn-cc-toggle" }, [
            (marketingToggle = (function () {
              var i = el("input", { type: "checkbox", "aria-label": "Marketing cookies" });
              i.checked = !!existing.marketing;
              return i;
            })()),
            el("span", { class: "abn-cc-toggle-slider" })
          ])
        ])
      ]),
      el("div", { class: "abn-cc-modal-actions" }, [
        el("button", {
          class: "abn-cc-btn abn-cc-btn--secondary",
          type: "button",
          onclick: function () {
            var s = writeConsent({ analytics: true, marketing: true });
            applyConsent(s);
            closeModal();
          }
        }, "Accept all"),
        el("button", {
          class: "abn-cc-btn abn-cc-btn--primary",
          type: "button",
          onclick: function () {
            var s = writeConsent({
              analytics: analyticsToggle.checked,
              marketing: marketingToggle.checked
            });
            applyConsent(s);
            closeModal();
          }
        }, "Save preferences")
      ])
    ]);

    modalEl = el("div", {
      class: "abn-cc abn-cc-scrim",
      onclick: function (e) {
        // Allow scrim click to close ONLY when reopening from footer (consent already exists)
        if (e.target === modalEl && readConsent()) {
          closeModal();
        }
      }
    }, [dialog]);

    document.body.appendChild(modalEl);
    document.body.style.overflow = "hidden";

    // focus trap
    setTimeout(function () {
      var focusables = dialog.querySelectorAll('button, input:not([disabled]), [href], [tabindex]:not([tabindex="-1"])');
      if (focusables.length) focusables[0].focus();
    }, 50);

    modalEl.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && readConsent()) {
        closeModal();
        return;
      }
      if (e.key !== "Tab") return;
      var focusables = dialog.querySelectorAll('button, input:not([disabled]), [href], [tabindex]:not([tabindex="-1"])');
      if (!focusables.length) return;
      var first = focusables[0];
      var last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
  }

  function closeModal() {
    if (!modalEl) return;
    modalEl.remove();
    modalEl = null;
    document.body.style.overflow = "";
    if (lastFocused && lastFocused.focus) try { lastFocused.focus(); } catch (_) {}
  }

  /* ---------- public API ---------- */
  window.AbnCookieConsent = {
    openSettings: function () {
      hideBanner();
      openModal();
    },
    getConsent: readConsent,
    reset: function () {
      try { localStorage.removeItem(CONSENT_KEY); } catch (_) {}
      hideBanner();
      closeModal();
      showBanner();
    }
  };

  /* ---------- footer link wiring ---------- */
  function wireFooterLink() {
    document.addEventListener("click", function (e) {
      var t = e.target;
      while (t && t !== document) {
        if (t.matches && t.matches("[data-cookie-settings]")) {
          e.preventDefault();
          window.AbnCookieConsent.openSettings();
          return;
        }
        t = t.parentNode;
      }
    });
  }

  /* ---------- bootstrap ---------- */
  function init() {
    injectStyles();
    wireFooterLink();
    var existing = readConsent();
    if (existing) {
      applyConsent(existing);
    } else {
      showBanner();
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
