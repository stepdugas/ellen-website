// SERVICES CAROUSEL (home)
(function () {
  const track = document.getElementById('servicesTrack');
  if (!track) return;

  const dotsEl = document.getElementById('servicesDots');
  const cards = Array.from(track.querySelectorAll('.service-card'));
  if (!cards.length) return;

  function cardWidth() {
    const styles = getComputedStyle(track);
    const gap = parseFloat(styles.columnGap || styles.gap) || 16;
    return cards[0].offsetWidth + gap;
  }

  // Build dots
  dotsEl.innerHTML = '';
  cards.forEach((_, i) => {
    const d = document.createElement('span');
    d.className = 'dot' + (i === 0 ? ' active' : '');
    d.dataset.index = i;
    d.addEventListener('click', () => scrollToIndex(i));
    dotsEl.appendChild(d);
  });

  const prev = document.querySelector('.svc-prev');
  const next = document.querySelector('.svc-next');

  function getIndexFromScroll() {
    return Math.round(track.scrollLeft / cardWidth());
  }

  function scrollToIndex(i) {
    const clamped = Math.max(0, Math.min(cards.length - 1, i));
    track.scrollTo({ left: clamped * cardWidth(), behavior: 'smooth' });
    updateDots(clamped);
  }

  prev?.addEventListener('click', (e) => {
    e.preventDefault();
    scrollToIndex(getIndexFromScroll() - 1);
  });

  next?.addEventListener('click', (e) => {
    e.preventDefault();
    scrollToIndex(getIndexFromScroll() + 1);
  });

  let rafId = null;
  track.addEventListener('scroll', () => {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => updateDots(getIndexFromScroll()));
  }, { passive: true });

  function updateDots(i) {
    dotsEl.querySelectorAll('.dot').forEach((el, idx) => {
      el.classList.toggle('active', idx === i);
      el.setAttribute('aria-selected', idx === i ? 'true' : 'false');
    });
  }
})();


// Mobile Menu Toggle + site-wide nav behaviors
document.addEventListener('DOMContentLoaded', function () {
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('.nav-menu');

  // Toggle mobile menu open/close
  if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener('click', function () {
      navMenu.classList.toggle('active');
    });
  }

  // Close mobile menu when clicking on any link
  document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', function () {
      navMenu?.classList.remove('active');
    });
  });

  // Smooth scrolling for on-page anchors only (hrefs that start with "#")
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    });
  });

  // Header shadow on scroll
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (header) {
      header.style.boxShadow = (scrollTop > 100)
        ? '0 2px 10px rgba(0,0,0,0.1)'
        : '0 2px 5px rgba(0,0,0,0.1)';
    }
  });

  // Mobile dropdowns: label navigates, caret toggles submenu
  const isMobile = () => window.innerWidth <= 768;

  document.querySelectorAll('.has-dropdown > a').forEach(link => {
    const submenu = link.nextElementSibling; // <ul.dropdown-menu>
    if (!submenu) return;

    // Insert dedicated caret button after the link
    const toggle = document.createElement('button');
    toggle.className = 'submenu-toggle';
    toggle.type = 'button';
    toggle.setAttribute('aria-label', 'Toggle submenu');
    toggle.setAttribute('aria-expanded', 'false');
    link.insertAdjacentElement('afterend', toggle);

    toggle.addEventListener('click', (e) => {
      if (!isMobile()) return;
      e.preventDefault();
      e.stopPropagation();

      // Close others
      document.querySelectorAll('.dropdown-menu.show').forEach(m => {
        if (m !== submenu) m.classList.remove('show');
      });
      document.querySelectorAll('.submenu-toggle[aria-expanded="true"]').forEach(b => {
        if (b !== toggle) b.setAttribute('aria-expanded', 'false');
      });

      const nowOpen = !submenu.classList.contains('show');
      submenu.classList.toggle('show', nowOpen);
      toggle.setAttribute('aria-expanded', String(nowOpen));
    });
  });

  // Close dropdowns when tapping outside (single handler)
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.has-dropdown')) {
      document.querySelectorAll('.dropdown-menu.show').forEach(m => m.classList.remove('show'));
      document.querySelectorAll('.submenu-toggle[aria-expanded="true"]').forEach(b => b.setAttribute('aria-expanded', 'false'));
    }
  });
});