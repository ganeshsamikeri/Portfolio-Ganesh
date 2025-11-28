// ----------------------------------------------------------
// main.js — mobile menu, active nav, scroll reveal, contact form
// ----------------------------------------------------------

document.addEventListener('DOMContentLoaded', function () {

  // ----------------------------
  // MOBILE MENU TOGGLE
  // ----------------------------
  const mobileBtn = document.getElementById('mobile-btn') || document.querySelector('.mobile-btn');
  const nav = document.querySelector('.nav');

  let navOpen = false;

  if (mobileBtn) {
    mobileBtn.addEventListener('click', () => {
      navOpen = !navOpen;
      nav.classList.toggle("open");
    });
  }

  // Close mobile menu when clicking a nav link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove("open");
      navOpen = false;
    });
  });

  // ----------------------------
  // ACTIVE NAVIGATION HIGHLIGHT
  // ----------------------------
  (function markActive() {
    const path = window.location.pathname.split('/').pop() || 'index.html';

    document.querySelectorAll('.nav-link').forEach(link => {
      const href = link.getAttribute('href');
      link.classList.toggle('active', href === path || (href === 'index.html' && path === ''));
    });
  })();

  // -------------------------------------
  // SCROLL REVEAL — INTERSECTION OBSERVER
  // -------------------------------------
  const revealItems = document.querySelectorAll('.section, .card, .project-card, .cert-card, .resume-section');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealItems.forEach(el => observer.observe(el));
  }

  // -------------------------------------
  // SCROLL REVEAL (Fallback + Card Anim)
  // -------------------------------------
  const projectCards = document.querySelectorAll(".project-card");
  const certCards = document.querySelectorAll(".cert-card");

  function revealOnScroll() {
    const triggerBottom = window.innerHeight * 0.85;

    // Sections & general reveal items
    revealItems.forEach(el => {
      if (el.getBoundingClientRect().top < triggerBottom) {
        el.classList.add("reveal");
      }
    });

    // Project cards
    projectCards.forEach(card => {
      if (card.getBoundingClientRect().top < triggerBottom) {
        card.classList.add("show");
      }
    });

    // Certification cards
    certCards.forEach(card => {
      if (card.getBoundingClientRect().top < triggerBottom) {
        card.classList.add("show");
      }
    });
  }

  window.addEventListener("scroll", revealOnScroll);
  window.addEventListener("load", revealOnScroll);

  // ------------------------------
  // CONTACT FORM (mailto)
  // ------------------------------
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      const { name, email, message } = contactForm;

      if (!name.value || !email.value || !message.value) {
        alert('Please fill all fields.');
        return;
      }

      const mailto = `mailto:ganeshsamikeri@gmail.com?subject=Message from ${encodeURIComponent(name.value)}&body=${encodeURIComponent(message.value + "\n\nFrom: " + name.value + " <" + email.value + ">")}`;

      window.location.href = mailto;
    });
  }

});
