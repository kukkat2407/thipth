// Back-to-top button: show after scrolling 200px, click scrolls to top
const backToTopBtn = document.querySelector('.back-to-top');
if (backToTopBtn) {
  window.addEventListener('scroll', () => {
    backToTopBtn.classList.toggle('visible', window.scrollY > 200);
  }, { passive: true });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Scroll-reveal: fade + slide elements into view
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll(
  '.cs-header, .cs-section, .cs-overview, .cs-disclaimer, .cs-more'
).forEach((el, i) => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// Stagger the "More case studies" cards
document.querySelectorAll('.cs-more-card').forEach((card, i) => {
  card.classList.add('reveal', 'reveal-stagger');
  card.style.transitionDelay = `${i * 60}ms`;
  revealObserver.observe(card);
});
