// SERVICES CAROUSEL (home)
(function () {
    const track = document.getElementById('servicesTrack');
    if (!track) return;
  
    const dotsEl = document.getElementById('servicesDots');
    const cards = Array.from(track.querySelectorAll('.service-card'));
    if (!cards.length) return;
  
    // Robust width calc: prefer columnGap (flex), fall back to gap, then 16
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
  
    // Compute current index from scroll position
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
  
    // Keep dots synced while the user swipes/scrolls
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
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    mobileMenuToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        navMenu.classList.remove('active');
      });
    });
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          const headerOffset = 80;
          const elementPosition = targetSection.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      });
    });
    
    // Add scroll effect to header
    const header = document.querySelector('.site-header');
    window.addEventListener('scroll', function() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      header.style.boxShadow = (scrollTop > 100)
        ? '0 2px 10px rgba(0,0,0,0.1)'
        : '0 2px 5px rgba(0,0,0,0.1)';
    });
    
    // Dropdown menu functionality for mobile and keyboard accessibility
    const dropdownToggles = document.querySelectorAll('.has-dropdown > a');
    dropdownToggles.forEach(toggle => {
      toggle.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          const dropdown = this.nextElementSibling;
          const isOpen = dropdown.classList.contains('show');
          document.querySelectorAll('.dropdown-menu').forEach(menu => menu.classList.remove('show'));
          if (!isOpen) dropdown.classList.add('show');
        }
      });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.has-dropdown')) {
        document.querySelectorAll('.dropdown-menu').forEach(menu => menu.classList.remove('show'));
      }
    });
    
    // Keyboard accessibility for dropdowns
    dropdownToggles.forEach(toggle => {
      toggle.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const dropdown = this.nextElementSibling;
          dropdown.classList.toggle('show');
        }
      });
    });
  });