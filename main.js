// Theme toggle — persists across pages via localStorage
(function () {
  const root = document.documentElement;
  const saved = localStorage.getItem('theme') || 'dark';
  root.setAttribute('data-theme', saved);

  const buttons = document.querySelectorAll('.theme-opt');
  if (!buttons.length) return;

  function syncActive() {
    const current = root.getAttribute('data-theme') || 'light';
    buttons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.themeVal === current);
    });
  }

  syncActive();

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      root.setAttribute('data-theme', btn.dataset.themeVal);
      localStorage.setItem('theme', btn.dataset.themeVal);
      syncActive();
    });
  });
}());

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

// Case study pages
document.querySelectorAll(
  '.cs-header, .cs-section, .cs-overview, .cs-disclaimer, .cs-more'
).forEach((el) => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// Stagger the "More case studies" cards
document.querySelectorAll('.cs-more-card').forEach((card, i) => {
  card.classList.add('reveal', 'reveal-stagger');
  card.style.transitionDelay = `${i * 60}ms`;
  revealObserver.observe(card);
});

// Index page — hero, sections, marquee
document.querySelectorAll(
  '.hero, .section, .marquee-heading, .marquee-wrap, .contact-card'
).forEach((el) => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// Index page — stagger project cards
document.querySelectorAll('.project-card').forEach((card, i) => {
  card.classList.add('reveal');
  card.style.transitionDelay = `${i * 60}ms`;
  revealObserver.observe(card);
});

// ─── Lightbox ────────────────────────────────────────────────
(function () {
  const targets = document.querySelectorAll('.cs-section img, .cs-hero-img');
  if (!targets.length) return;

  const overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');

  const lightImg = document.createElement('img');
  overlay.appendChild(lightImg);

  const closeBtn = document.createElement('button');
  closeBtn.className = 'lightbox-close';
  closeBtn.setAttribute('aria-label', 'Close');
  closeBtn.innerHTML = '&times;';
  overlay.appendChild(closeBtn);

  document.body.appendChild(overlay);

  function open(src, alt) {
    lightImg.src = src;
    lightImg.alt = alt || '';
    overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    overlay.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  targets.forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => open(img.src, img.alt));
  });

  closeBtn.addEventListener('click', e => { e.stopPropagation(); close(); });
  overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
}());

// ─── Case Study Nav ───────────────────────────────────────────
(function () {
  const nav = document.querySelector('.cs-nav');
  if (!nav) return;
  const h = nav.offsetHeight;
  document.body.style.paddingTop = h + 'px';
  document.documentElement.style.scrollPaddingTop = h + 'px';
}());

// ─── Site Nav ─────────────────────────────────────────────────
(function () {
  const nav = document.querySelector('.site-nav');
  if (!nav) return;

  const tabs = nav.querySelectorAll('.site-nav__tab');
  const navH = nav.offsetHeight;

  document.body.style.paddingTop = navH + 'px';
  document.documentElement.style.scrollPaddingTop = navH + 'px';

  function setActive(targetId) {
    tabs.forEach(t => t.classList.toggle('active', t.dataset.target === targetId));
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const id = tab.dataset.target;
      if (id === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  const sectionOrder = ['home', 'featured-works', 'experience', 'contact'];
  const visibleSet = new Set();

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        visibleSet.add(entry.target.id);
      } else {
        visibleSet.delete(entry.target.id);
      }
    });
    const active = sectionOrder.find(id => visibleSet.has(id));
    if (active) setActive(active);
  }, { threshold: 0, rootMargin: `-${navH}px 0px -50% 0px` });

  sectionOrder.forEach(id => {
    const el = document.getElementById(id);
    if (el) navObserver.observe(el);
  });

  window.addEventListener('scroll', () => {
    if (window.scrollY < 10) {
      setActive('home');
    } else if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 10) {
      setActive('contact');
    }
  }, { passive: true });
}());

// ─── Statistics count-up ──────────────────────────────────────
(function () {
  const values = document.querySelectorAll('.stat-value');
  if (!values.length) return;

  // Splits "10+" into prefix "", target 10, suffix "+".
  // Returns null for non-numeric values like "∞" so they're left alone.
  function parse(raw) {
    const m = raw.match(/^(\D*?)(\d[\d,.]*)(.*)$/);
    if (!m) return null;
    return {
      prefix: m[1],
      target: parseFloat(m[2].replace(/,/g, '')),
      suffix: m[3],
      decimals: (m[2].split('.')[1] || '').length
    };
  }

  const format = (n, p) =>
    p.prefix + n.toFixed(p.decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + p.suffix;

  const easeOut = t => 1 - Math.pow(1 - t, 3);

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const items = [];
  values.forEach(el => {
    const p = parse(el.textContent.trim());
    if (!p) return;
    items.push({ el, p });
    if (!reduce) el.textContent = format(0, p);
  });

  if (!items.length || reduce) return;

  function run(el, p) {
    const dur = 1600;
    const start = performance.now();
    (function frame(now) {
      const t = Math.min((now - start) / dur, 1);
      el.textContent = format(easeOut(t) * p.target, p);
      if (t < 1) requestAnimationFrame(frame);
    })(start);
  }

  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const item = items.find(i => i.el === entry.target);
      if (item) run(item.el, item.p);
      statObserver.unobserve(entry.target);
    });
  }, { threshold: 0.4 });

  items.forEach(i => statObserver.observe(i.el));
}());

// ─── Spotlight ────────────────────────────────────────────────
(function () {
  function move(x, y) {
    document.body.style.setProperty('--sx', x + 'px');
    document.body.style.setProperty('--sy', y + 'px');
  }

  document.addEventListener('mousemove', e => move(e.clientX, e.clientY));
  document.addEventListener('mouseleave', () => move(-300, -300));

  document.addEventListener('touchmove', e => {
    const t = e.touches[0];
    move(t.clientX, t.clientY);
  }, { passive: true });

  document.addEventListener('touchend', () => move(-300, -300));
}());
