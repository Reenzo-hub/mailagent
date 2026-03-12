/**
 * MailAgent Landing — app.js
 * Minimal JS: IntersectionObserver for scroll animations,
 * smooth anchor scrolling, and Telegram demo scroll reset.
 */

'use strict';

// ── Intersection Observer: animate elements on scroll ──────────────────────
(function initScrollAnimations() {
  const ANIMATED_CLASSES = [
    '.pain__card',
    '.how__step',
    '.persona-card',
    '.benefit',
    '.trust__guarantee',
  ];

  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = 'running';
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  ANIMATED_CLASSES.forEach((selector) => {
    document.querySelectorAll(selector).forEach((el) => {
      // Pause CSS animation until element enters viewport
      el.style.animationPlayState = 'paused';
      observer.observe(el);
    });
  });
})();

// ── Telegram demo: loop the scroll animation ───────────────────────────────
(function initDemoScroll() {
  const chat = document.querySelector('.tg-chat--scroll');
  if (!chat) return;

  chat.addEventListener('animationend', () => {
    // Brief pause at the bottom, then restart
    setTimeout(() => {
      chat.style.animation = 'none';
      // Force reflow
      void chat.offsetHeight;
      chat.style.animation = '';
    }, 1200);
  });
})();

// ── Smooth scroll for in-page anchors (for browsers that don't support CSS smooth-scroll) ──
(function initSmoothAnchors() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();
