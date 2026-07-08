const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');
const navLinks = document.querySelectorAll('.site-nav a');
const animatedElements = document.querySelectorAll('[data-animate]');
const yearElement = document.getElementById('year');
const whatsappDirect = document.getElementById('whatsapp-direct');
const whatsappFloating = document.querySelector('.whatsapp-float');

document.documentElement.classList.add('js-enabled');

const whatsappNumber = '5547999938013';
const whatsappMessage = 'Olá, gostaria de falar com a ISAR Engenharia sobre um desafio industrial.';

const closeMenu = () => {
  if (!menuToggle || !siteNav) return;
  menuToggle.classList.remove('is-active');
  menuToggle.setAttribute('aria-expanded', 'false');
  siteNav.classList.remove('open');
};

const updateHeaderState = () => {
  if (!header) return;
  header.classList.toggle('is-scrolled', window.scrollY > 8);
};

const getWhatsappHref = (message = whatsappMessage) =>
  `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

if (menuToggle && siteNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('open');
    menuToggle.classList.toggle('is-active', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('click', (event) => {
    if (!siteNav.classList.contains('open')) return;
    const clickedInsideMenu = siteNav.contains(event.target);
    const clickedToggle = menuToggle.contains(event.target);

    if (!clickedInsideMenu && !clickedToggle) {
      closeMenu();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 920) closeMenu();
  });
}

animatedElements.forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index * 35, 240)}ms`;
});

const revealInitialViewport = () => {
  animatedElements.forEach((element) => {
    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.96 && rect.bottom > 0) {
      element.classList.add('is-visible');
    }
  });
};

revealInitialViewport();

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -8% 0px'
    }
  );

  animatedElements.forEach((element) => observer.observe(element));
} else {
  animatedElements.forEach((element) => element.classList.add('is-visible'));
}

if (whatsappDirect) {
  whatsappDirect.href = getWhatsappHref();
}

if (whatsappFloating) {
  whatsappFloating.href = getWhatsappHref();
}

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

updateHeaderState();
window.addEventListener(
  'scroll',
  () => {
    updateHeaderState();
    revealInitialViewport();
  },
  { passive: true }
);
window.addEventListener('resize', revealInitialViewport);
