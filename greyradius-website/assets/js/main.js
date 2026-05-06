/**
 * GreyRadius Consulting — Main JS
 * WordPress migration: All behaviours are vanilla JS + AlpineJS
 * AlpineJS handles: mobile menu, FAQ accordion, dropdown toggles
 * This file handles: scroll nav, reveal animations, method flow
 */

(function () {
  'use strict';

  /* ---- Sticky Navigation ---- */
  const topNav = document.querySelector('.top-nav');
  if (topNav) {
    const heroEl = document.querySelector('.hero-block');
    function updateNav() {
      const scrollY = window.scrollY;
      const threshold = heroEl ? heroEl.offsetHeight * 0.3 : 80;
      if (scrollY > threshold) {
        topNav.classList.add('top-nav--solid');
        topNav.classList.remove('top-nav--transparent');
      } else {
        topNav.classList.remove('top-nav--solid');
        topNav.classList.add('top-nav--transparent');
      }
    }
    window.addEventListener('scroll', updateNav, { passive: true });
    updateNav();
  }

  /* ---- Scroll Reveal Animations ---- */
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach(el => observer.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('visible'));
  }

  /* ---- Method Flow Step Animation ---- */
  const methodFlow = document.querySelector('.method-flow');
  const methodSteps = document.querySelectorAll('.method-step');
  if (methodFlow && methodSteps.length && 'IntersectionObserver' in window) {
    const flowObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            methodFlow.classList.add('animated');
            methodSteps.forEach((step, i) => {
              setTimeout(() => step.classList.add('visible'), i * 150);
            });
            flowObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    flowObserver.observe(methodFlow);
  } else {
    methodSteps.forEach(step => step.classList.add('visible'));
  }

  /* ---- Stat Counter Animation ---- */
  function animateCounter(el) {
    const text = el.textContent.trim();
    const match = text.match(/^(\d+(?:\.\d+)?)(.*)/);
    if (!match) return;
    const target = parseFloat(match[1]);
    const suffix = match[2] || '';
    const duration = 1200;
    const startTime = performance.now();
    function step(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);
      el.textContent = current + suffix;
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target + suffix;
    }
    requestAnimationFrame(step);
  }

  const statNumbers = document.querySelectorAll('.stat-strip__number');
  if (statNumbers.length && 'IntersectionObserver' in window) {
    const statObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            statObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    statNumbers.forEach(el => statObserver.observe(el));
  }

  /* ---- Mobile Menu (AlpineJS augmented) ---- */
  // Primary menu control is via Alpine x-data on the body or nav
  // This is the fallback for any page without Alpine
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const overlay = document.querySelector('.mobile-menu-overlay');
  const closeBtn = document.querySelector('.mobile-menu__close');
  if (hamburger && mobileMenu && overlay) {
    function openMenu() {
      mobileMenu.classList.add('mobile-menu--open');
      overlay.classList.add('mobile-menu-overlay--visible');
      document.body.style.overflow = 'hidden';
    }
    function closeMenu() {
      mobileMenu.classList.remove('mobile-menu--open');
      overlay.classList.remove('mobile-menu-overlay--visible');
      document.body.style.overflow = '';
    }
    hamburger.addEventListener('click', openMenu);
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });
  }

  /* ---- Location Pin Toggle (About page) ---- */
  const locationPins = document.querySelectorAll('.map-pin');
  const locationCards = document.querySelectorAll('.map-location-card');
  if (locationPins.length) {
    locationPins.forEach((pin, i) => {
      pin.addEventListener('click', () => {
        locationCards.forEach((c, j) => {
          c.style.display = (i === j && c.style.display !== 'block') ? 'block' : 'none';
        });
      });
    });
  }

  /* ---- External form submission placeholder ---- */
  const contactForms = document.querySelectorAll('form[data-form]');
  contactForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('[type="submit"]');
      const orig = btn ? btn.textContent : '';
      if (btn) btn.textContent = 'Sending…';
      setTimeout(() => {
        if (btn) btn.textContent = orig;
        const success = document.createElement('div');
        success.className = 'form-success';
        success.style.cssText = 'background:#dcfce7;color:#166534;padding:1rem;border-radius:8px;margin-top:1rem;font-weight:600;';
        success.textContent = "Thank you — a partner will be in touch within 24 hours.";
        form.appendChild(success);
        form.reset();
        setTimeout(() => success.remove(), 6000);
      }, 800);
    });
  });

})();
