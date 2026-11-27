(() => {
  const root = document.documentElement;
  const themeKey = 'vintflow.theme.v1';
  const styleKey = 'vintflow.style-studio.v1';
  const chrome = {light: '#f4f1e9', dark: '#171b19', galaxy: '#1c1824'};

  function apply() {
    let theme = 'dark';
    let preferences = {};
    try {
      const saved = localStorage.getItem(themeKey);
      if (Object.hasOwn(chrome, saved)) theme = saved;
      preferences = JSON.parse(localStorage.getItem(styleKey)) || {};
    } catch {}
    root.dataset.theme = theme;
    root.dataset.vfMotion = ['off', 'minimal'].includes(preferences.motion) ? preferences.motion : 'signature';
    root.dataset.vfAtmosphere = preferences.atmosphere === 'quiet' ? 'quiet' : 'signature';
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = chrome[theme];
  }

  apply();
  window.addEventListener('pageshow', apply);
  window.addEventListener('storage', event => {
    if (!event.key || [themeKey, styleKey].includes(event.key)) apply();
  });
})();

document.addEventListener('DOMContentLoaded', () => {
  const menu = document.querySelector('.vf-guide .vf-mobile-menu');
  if (!menu) return;
  const closeOutside = event => {
    if (menu.open && !menu.contains(event.target)) menu.open = false;
  };
  document.addEventListener('pointerdown', closeOutside);
  document.addEventListener('focusin', closeOutside);
  menu.addEventListener('keydown', event => {
    if (menu.open && event.key === 'Escape') {
      event.preventDefault();
      menu.open = false;
      menu.querySelector('summary').focus();
    }
  });
});
