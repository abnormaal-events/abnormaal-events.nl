/* Tweaks for Abnormaal site */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "ochre",
  "mode": "light",
  "squid": "surgical",
  "marquee": "on"
}/*EDITMODE-END*/;

const SiteTweaks = () => {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => {
    document.body.dataset.accent = tweaks.accent;
    document.body.dataset.mode = tweaks.mode;
    document.body.dataset.squid = tweaks.squid;
    document.body.dataset.marquee = tweaks.marquee;
  }, [tweaks]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection title="Accent">
        <TweakRadio
          value={tweaks.accent}
          onChange={v => setTweak('accent', v)}
          options={[
            { value: 'ochre', label: 'Ochre' },
            { value: 'amethyst', label: 'Amethyst' },
            { value: 'indigo', label: 'Indigo' },
          ]}
        />
      </TweakSection>
      <TweakSection title="Surface mode">
        <TweakRadio
          value={tweaks.mode}
          onChange={v => setTweak('mode', v)}
          options={[
            { value: 'light', label: 'Snow' },
            { value: 'dark', label: 'After-hours' },
          ]}
        />
      </TweakSection>
      <TweakSection title="SquidBoy density">
        <TweakRadio
          value={tweaks.squid}
          onChange={v => setTweak('squid', v)}
          options={[
            { value: 'off', label: 'Off' },
            { value: 'surgical', label: 'Surgical' },
          ]}
        />
      </TweakSection>
      <TweakSection title="Marquee">
        <TweakRadio
          value={tweaks.marquee}
          onChange={v => setTweak('marquee', v)}
          options={[
            { value: 'on', label: 'On' },
            { value: 'off', label: 'Off' },
          ]}
        />
      </TweakSection>
    </TweaksPanel>
  );
};

window.SiteTweaks = SiteTweaks;
