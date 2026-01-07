export function initHeaderActive() {
  const navLinks = document.querySelectorAll('.nav__link');
  
  if (!navLinks.length) {
    return;
  }

  const currentPath = window.location.pathname;
  const currentPage = currentPath.split('/').pop() || 'index.html';
  const currentHash = window.location.hash;

  navLinks.forEach(link => {
    link.classList.remove('active');
  });

  navLinks.forEach(link => {
    const linkPage = link.getAttribute('data-page');
    const linkHref = link.getAttribute('href');

    if (linkHref && linkHref.includes('.html')) {
      if (linkHref.includes(currentPage)) {
        link.classList.add('active');
      }
    } else if (linkHref && linkHref.startsWith('#')) {
      if (currentPage === 'index.html' || currentPage === '') {
        if (currentHash && currentHash === linkHref) {
          link.classList.add('active');
        }
      }
    }
  });

  if (currentPage === 'index.html' || currentPage === '') {
    updateActiveOnScroll(navLinks);
  }
}

function updateActiveOnScroll(navLinks) {
  const sections = [];
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      const sectionId = href.replace('#', '');
      const section = document.getElementById(sectionId);
      if (section) {
        sections.push({ link, section });
      }
    }
  });

  if (!sections.length) return;

  function checkActiveSection() {
    const scrollPosition = window.scrollY + window.innerHeight / 2;

    let activeSection = null;

    sections.forEach(({ section }) => {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
        activeSection = section;
      }
    });

    sections.forEach(({ link, section }) => {
      if (section === activeSection) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  window.addEventListener('scroll', checkActiveSection);
  checkActiveSection();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHeaderActive);
} else {
  initHeaderActive();
}

