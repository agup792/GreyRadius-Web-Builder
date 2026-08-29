/**
 * GreyRadius Consulting — Main JS
 * WordPress migration: All behaviours are vanilla JS + AlpineJS
 * AlpineJS handles: mobile menu, FAQ accordion, dropdown toggles
 * This file handles: scroll nav, reveal animations, method flow
 */

(function () {
  'use strict';

  document.querySelectorAll('.nav-main, .mobile-menu__nav').forEach(function (nav) {
    const searchLinks = nav.querySelectorAll('a[href="/search.html"]');
    searchLinks.forEach(function (link, index) {
      if (index > 0) link.remove();
    });
  });

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

  /* ---- Mobile Menu Accordion ---- */
  const mobileNav = document.querySelector('.mobile-menu__nav');
  if (mobileNav) {
    const chevronSVG = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>';
    mobileNav.querySelectorAll('.mobile-menu__item').forEach(function(item) {
      var sub = item.nextElementSibling;
      if (!sub || !sub.classList.contains('mobile-menu__sub')) return;
      var chevron = document.createElement('span');
      chevron.className = 'mobile-menu__chevron';
      chevron.innerHTML = chevronSVG;
      item.appendChild(chevron);
      item.addEventListener('click', function(e) {
        e.preventDefault();
        var isOpen = item.classList.contains('mobile-menu__item--open');
        mobileNav.querySelectorAll('.mobile-menu__item--open').forEach(function(el) {
          el.classList.remove('mobile-menu__item--open');
          var s = el.nextElementSibling;
          if (s && s.classList.contains('mobile-menu__sub')) s.classList.remove('mobile-menu__sub--open');
        });
        if (!isOpen) {
          item.classList.add('mobile-menu__item--open');
          sub.classList.add('mobile-menu__sub--open');
        }
      });
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

  /* ---- Contact form submission ---- */
  const contactForms = document.querySelectorAll('form[data-form="contact"]');
  contactForms.forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var btn = form.querySelector('[type="submit"]');
      var origText = btn ? btn.textContent : '';
      var existingMsg = form.querySelector('.form-status-msg');
      if (existingMsg) existingMsg.remove();

      if (btn) {
        btn.textContent = 'Sending…';
        btn.disabled = true;
      }

      var formData = new FormData(form);
      var body = {};
      formData.forEach(function (val, key) { body[key] = val; });

      fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
        .then(function (res) { return res.json().then(function (data) { return { ok: res.ok, data: data }; }); })
        .then(function (result) {
          var msg = document.createElement('div');
          msg.className = 'form-status-msg';
          if (result.ok && result.data.ok) {
            msg.style.cssText = 'background:#dcfce7;color:#166534;padding:1rem 1.25rem;border-radius:8px;margin-top:1rem;font-weight:600;font-size:0.9375rem;';
            msg.textContent = 'Thank you — a partner will be in touch within 24 hours.';
            form.reset();
          } else {
            var errors = (result.data && result.data.errors) ? result.data.errors.join(' ') : 'Something went wrong. Please try again or email us directly.';
            msg.style.cssText = 'background:#fee2e2;color:#991b1b;padding:1rem 1.25rem;border-radius:8px;margin-top:1rem;font-weight:600;font-size:0.9375rem;';
            msg.textContent = errors;
          }
          form.appendChild(msg);
          setTimeout(function () { msg.remove(); }, 8000);
        })
        .catch(function () {
          var msg = document.createElement('div');
          msg.className = 'form-status-msg';
          msg.style.cssText = 'background:#fee2e2;color:#991b1b;padding:1rem 1.25rem;border-radius:8px;margin-top:1rem;font-weight:600;font-size:0.9375rem;';
          msg.textContent = 'Network error — please try again or email hello@greyradius.com directly.';
          form.appendChild(msg);
          setTimeout(function () { msg.remove(); }, 8000);
        })
        .finally(function () {
          if (btn) {
            btn.textContent = origText;
            btn.disabled = false;
          }
        });
    });
  });

  /* ---- Contextual content discovery ---- */
  const currentPath = window.location.pathname;
  const isDetailPage =
    /^\/(case-studies|insights|market-entry|services)\/.+\.html$/.test(currentPath) ||
    /^\/industries\/[^/]+\.html$/.test(currentPath);
  const isNewsletterIssue = currentPath.startsWith('/insights/newsletters/');
  const hasRelatedSection = document.querySelector(
    '.related-content, .related-grid, [aria-label*="Related"], [aria-labelledby*="related"]'
  );

  if (isDetailPage && !isNewsletterIssue && !hasRelatedSection) {
    fetch('/data/search-index.json')
      .then(function (response) {
        if (!response.ok) throw new Error('Content index unavailable');
        return response.json();
      })
      .then(function (items) {
        const current = items.find(function (item) { return item.url === currentPath; });
        if (!current) return;

        const currentWords = (current.title + ' ' + current.description)
          .toLowerCase()
          .split(/[^a-z0-9]+/)
          .filter(function (word) { return word.length > 4; });
        const currentWordSet = new Set(currentWords);

        const related = items
          .filter(function (item) {
            return item.url !== current.url &&
              !['Page', 'About', 'Newsletter'].includes(item.type);
          })
          .map(function (item) {
            let score = item.type === current.type ? 1 : 3;
            (item.industries || []).forEach(function (label) {
              if ((current.industries || []).includes(label)) score += 6;
            });
            (item.geographies || []).forEach(function (label) {
              if ((current.geographies || []).includes(label)) score += 5;
            });
            (item.title || '').toLowerCase().split(/[^a-z0-9]+/).forEach(function (word) {
              if (word.length > 4 && currentWordSet.has(word)) score += 1;
            });
            return { item: item, score: score };
          })
          .filter(function (entry) { return entry.score >= 5; })
          .sort(function (a, b) {
            return b.score - a.score || a.item.title.localeCompare(b.item.title);
          })
          .slice(0, 3);

        if (!related.length) return;

        const section = document.createElement('section');
        section.className = 'discovery-related';
        section.setAttribute('aria-labelledby', 'discovery-related-heading');
        const cards = related.map(function (entry) {
          const item = entry.item;
          return '<a class="discovery-related__card" href="' + item.url + '">' +
            '<span class="discovery-related__type">' + item.type + '</span>' +
            '<h3>' + item.title + '</h3>' +
            '<span class="discovery-related__link">Explore this topic &rarr;</span>' +
          '</a>';
        }).join('');
        section.innerHTML =
          '<div class="container">' +
            '<div class="discovery-related__header">' +
              '<div><p class="text-caption text-orange">Continue exploring</p>' +
              '<h2 id="discovery-related-heading">Related GreyRadius research and client work</h2></div>' +
              '<a href="/search.html" class="discovery-related__browse">Search the full library &rarr;</a>' +
            '</div>' +
            '<div class="discovery-related__grid">' + cards + '</div>' +
          '</div>';

        const footer = document.querySelector('.site-footer');
        if (footer) footer.parentNode.insertBefore(section, footer);
      })
      .catch(function () {
        // Related discovery is progressive enhancement; the page remains usable.
      });
  }

})();

// Newsletter signup — posts to HubSpot Forms API (no iframe, no branding)
function grNewsletterSubmit(e, form) {
  e.preventDefault();
  var emailInput = form.querySelector('[name=email]');
  var email = emailInput ? emailInput.value.trim() : '';
  if (!email) { return; }
  var msg = form.querySelector('.gr-nl-msg');
  var btn = form.querySelector('[type=submit]');
  var origText = btn ? btn.innerHTML : 'Subscribe &rarr;';
  if (btn) { btn.disabled = true; btn.textContent = 'Sending\u2026'; }
  fetch('https://api.hsforms.com/submissions/v3/integration/submit/21337745/8fb2e137-9ca1-4c6e-8152-63225d37d47a', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      fields: [{ objectTypeId: '0-1', name: 'email', value: email }],
      context: { pageUri: window.location.href, pageName: document.title }
    })
  }).then(function (r) {
    if (msg) {
      msg.style.display = 'block';
      if (r.ok) {
        msg.style.color = '#2a7a4e';
        msg.textContent = "You\u2019re in. Watch your inbox for the first brief.";
        if (emailInput) { emailInput.value = ''; }
      } else {
        msg.style.color = '#c0392b';
        msg.textContent = 'Something went wrong \u2013 please try again.';
      }
    }
  }).catch(function () {
    if (msg) { msg.style.display = 'block'; msg.style.color = '#c0392b'; msg.textContent = 'Could not connect \u2013 please try again.'; }
  }).finally(function () {
    if (btn) { btn.disabled = false; btn.innerHTML = origText; }
  });
}
