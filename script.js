// Mobile Menu Toggle
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
              const headerOffset = 80; // Account for fixed header
              const elementPosition = targetSection.getBoundingClientRect().top;
              const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
              
              window.scrollTo({
                  top: offsetPosition,
                  behavior: 'smooth'
              });
          }
      });
  });
  
  // Add scroll effect to header
  const header = document.querySelector('.site-header');
  let lastScrollTop = 0;
  
  window.addEventListener('scroll', function() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      if (scrollTop > 100) {
          header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
      } else {
          header.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
      }
      
      lastScrollTop = scrollTop;
  });
  
  // Dropdown menu functionality for mobile and keyboard accessibility
  const dropdownToggles = document.querySelectorAll('.has-dropdown > a');
  
  dropdownToggles.forEach(toggle => {
      // Prevent default on dropdown parent links on mobile
      toggle.addEventListener('click', function(e) {
          if (window.innerWidth <= 768) {
              e.preventDefault();
              const dropdown = this.nextElementSibling;
              const isOpen = dropdown.classList.contains('show');
              
              // Close all other dropdowns
              document.querySelectorAll('.dropdown-menu').forEach(menu => {
                  menu.classList.remove('show');
              });
              
              // Toggle current dropdown
              if (!isOpen) {
                  dropdown.classList.add('show');
              }
          }
      });
  });
  
  // Close dropdowns when clicking outside
  document.addEventListener('click', function(e) {
      if (!e.target.closest('.has-dropdown')) {
          document.querySelectorAll('.dropdown-menu').forEach(menu => {
              menu.classList.remove('show');
          });
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