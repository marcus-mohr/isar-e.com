const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');
const navLinks = document.querySelectorAll('.site-nav a');
const animatedElements = document.querySelectorAll('[data-animate]');
const yearElement = document.getElementById('year');
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const whatsappDirect = document.getElementById('whatsapp-direct');
const whatsappForm = document.getElementById('whatsapp-form');
const whatsappFloating = document.querySelector('.whatsapp-float');

document.documentElement.classList.add('js-enabled');

const contactEmail = 'info@isar-e.com';
const whatsappNumber = '491753494594';

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

const getFormMessage = () => {
  if (!contactForm) return '';
  const formData = new FormData(contactForm);
  const lines = [
    'Solicitação de avaliação técnica - ISAR Engenharia',
    '',
    `Nome: ${formData.get('Nome') || ''}`,
    `Empresa: ${formData.get('Empresa') || ''}`,
    `Cargo: ${formData.get('Cargo') || ''}`,
    `E-mail: ${formData.get('E-mail') || ''}`,
    `WhatsApp: ${formData.get('WhatsApp') || ''}`,
    `Cidade/Estado: ${formData.get('Cidade/Estado') || ''}`,
    `Tipo de projeto: ${formData.get('Tipo de projeto') || ''}`,
    '',
    'Desafio técnico:',
    formData.get('Desafio técnico') || ''
  ];

  return lines.join('\n');
};

const getWhatsappHref = (message = 'Olá, gostaria de falar com a ISAR Engenharia.') =>
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

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!contactForm.reportValidity()) return;

    const subject = 'Solicitação de avaliação técnica - ISAR Engenharia';
    const body = getFormMessage();
    window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    if (formStatus) {
      formStatus.textContent = 'Mensagem preparada no seu aplicativo de e-mail.';
    }
  });
}

if (whatsappDirect) {
  whatsappDirect.href = getWhatsappHref();
}

if (whatsappFloating) {
  whatsappFloating.href = getWhatsappHref();
}

if (whatsappForm) {
  whatsappForm.addEventListener('click', () => {
    const message = contactForm && contactForm.checkValidity()
      ? getFormMessage()
      : 'Olá, gostaria de falar com a ISAR Engenharia.';

    window.open(getWhatsappHref(message), '_blank', 'noopener');
  });
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
