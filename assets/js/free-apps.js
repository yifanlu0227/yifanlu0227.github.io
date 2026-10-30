'use strict';
(() => {
  const tray = document.querySelector('.free-apps');
  if (!tray) return;
  const apps = [...tray.querySelectorAll('.free-app-link')];
  if (!apps.length) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let inView = false;
  let next = 0;
  let timer = null;

  function stop() {
    window.clearTimeout(timer);
    timer = null;
  }
  function canAnimate() {
    return inView && !document.hidden && !reducedMotion.matches
      && !tray.matches(':hover') && !tray.contains(document.activeElement);
  }
  function schedule(delay = 6000) {
    stop();
    if (canAnimate()) timer = window.setTimeout(hop, delay);
  }
  function hop() {
    timer = null;
    if (!canAnimate()) return;
    apps[next].classList.add('is-bouncing');
    next = (next + 1) % apps.length;
    // Leave a long quiet interval between individual hops and between rounds.
    schedule(next === 0 ? 12000 : 6500);
  }

  for (const app of apps) {
    app.addEventListener('animationend', () => app.classList.remove('is-bouncing'));
  }
  tray.addEventListener('pointerenter', stop);
  tray.addEventListener('pointerleave', () => schedule());
  tray.addEventListener('focusin', stop);
  tray.addEventListener('focusout', event => {
    if (!tray.contains(event.relatedTarget)) schedule();
  });
  document.addEventListener('visibilitychange', () => schedule());
  reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches) {
      for (const app of apps) app.classList.remove('is-bouncing');
    }
    schedule();
  });
  const observer = new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting;
    schedule();
  }, { threshold: .25 });
  observer.observe(tray);
})();
