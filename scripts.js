// scripts.js - animacje: reveal on scroll, logo pop, banner parallax, active nav
(function() {
  // Helpers
  const $ = sel => Array.from(document.querySelectorAll(sel));
  const one = sel => document.querySelector(sel);

  // 1) Body initial subtle entrance
  document.documentElement.classList.add('js-enabled');
  document.body.classList.add('animate-ready');

  // 2) Logo pop on load
  function logoPop() {
    const logo = one('.logo-img');
    if (!logo) return;
    // Add tiny delay so user sees effect after load
    setTimeout(() => {
      logo.classList.add('logo-pop');
    }, 120);
  }

  // 3) Set active nav link by path (robust)
  function setActiveNav() {
    const links = $('.main-nav .nav-link');
    const raw = location.pathname.split('/').pop() || 'index.html';
    const path = raw === '' ? 'index.html' : raw;
    links.forEach(link => {
      const href = link.getAttribute('href') || '';
      const file = href.split('/').pop();
      link.classList.toggle('active', file === path);
    });
  }

  // 4) Reveal on scroll (IntersectionObserver)
  function setupRevealOnScroll() {
    const revealNodes = [
      ...$('.hero'),
      ...$('.card'),
      ...$('.figure-img'),
      ...$('.banner-img')
    ].filter(Boolean);

    revealNodes.forEach(n => n.classList.add('reveal'));

    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries, obs) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('in-view');
            // once visible, unobserve to save perf
            obs.unobserve(e.target);
          }
        });
      }, { root: null, rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

      revealNodes.forEach(n => io.observe(n));
    } else {
      // fallback: simple timeout reveal
      revealNodes.forEach((n, i) => setTimeout(() => n.classList.add('in-view'), 140 * i));
    }
  }

  // 5) Banner parallax effect (lightweight)
  function setupBannerParallax() {
    const banner = one('.banner-img');
    if (!banner) return;
    let latestScroll = 0;
    let ticking = false;

    function onScroll() {
      latestScroll = window.scrollY || window.pageYOffset;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // choose multiplier - small for subtle effect
          const translate = Math.max(Math.min(latestScroll * 0.12, 80), -20);
          // Use transform translate3d for better perf
          banner.style.transform = `translate3d(0, ${translate}px, 0)`;
          ticking = false;
        });
        ticking = true;
      }
    }

    // start with small transform so it looks dynamic on load
    banner.style.willChange = 'transform';
    window.addEventListener('scroll', onScroll, { passive: true });
    // call once to set initial position
    onScroll();
  }

  // 6) Init
  function init() {
    logoPop();
    setActiveNav();
    setupRevealOnScroll();
    setupBannerParallax();

    // mark body loaded for initial fade-in
    window.setTimeout(() => {
      document.body.classList.add('loaded');
      // remove "animate-ready" class later optionally
      document.body.classList.remove('animate-ready');
    }, 80);
  }

  // 7) DOM ready & load handling
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Optional: simple smooth scroll for same-page anchors
  document.addEventListener('click', function(e) {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const href = a.getAttribute('href');
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

})();
