const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const primaryNav = document.querySelector('.primary-nav');
const roleTabs = [...document.querySelectorAll('.role-tab')];
const rolePanels = [...document.querySelectorAll('.role-panel')];
const workTabs = [...document.querySelectorAll('.work-tab')];
const workPanels = [...document.querySelectorAll('.work-panel')];
const lightbox = document.querySelector('#lightbox');
const videoModal = document.querySelector('#video-modal');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 8);
});

menuToggle.addEventListener('click', () => {
  const isOpen = primaryNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

primaryNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    primaryNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

function activateRole(tab) {
  const roleName = tab.dataset.role;

  roleTabs.forEach((item) => {
    const isActive = item === tab;
    item.classList.toggle('active', isActive);
    item.setAttribute('aria-selected', String(isActive));
    item.tabIndex = isActive ? 0 : -1;
  });

  rolePanels.forEach((panel) => {
    const isActive = panel.id === `panel-${roleName}`;
    panel.classList.toggle('active', isActive);
    panel.hidden = !isActive;
  });
}

roleTabs.forEach((tab, index) => {
  tab.addEventListener('click', () => activateRole(tab));
  tab.addEventListener('keydown', (event) => {
    if (!['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();

    let nextIndex = index;
    if (['ArrowDown', 'ArrowRight'].includes(event.key)) nextIndex = (index + 1) % roleTabs.length;
    if (['ArrowUp', 'ArrowLeft'].includes(event.key)) nextIndex = (index - 1 + roleTabs.length) % roleTabs.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = roleTabs.length - 1;

    activateRole(roleTabs[nextIndex]);
    roleTabs[nextIndex].focus();
  });
});

workTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const category = tab.dataset.work;
    workTabs.forEach((item) => {
      const isActive = item === tab;
      item.classList.toggle('active', isActive);
      item.setAttribute('aria-selected', String(isActive));
    });
    workPanels.forEach((panel) => {
      const isActive = panel.dataset.workPanel === category;
      panel.classList.toggle('active', isActive);
      panel.hidden = !isActive;
      if (isActive) revealVisibleItems(panel);
    });
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

function revealVisibleItems(scope = document) {
  scope.querySelectorAll('.reveal:not(.is-visible)').forEach((item) => revealObserver.observe(item));
}
revealVisibleItems();

document.querySelectorAll('.design-card').forEach((card) => {
  card.addEventListener('click', () => {
    lightbox.querySelector('img').src = card.dataset.lightbox;
    lightbox.querySelector('p').textContent = card.dataset.caption;
    lightbox.showModal();
    document.body.classList.add('dialog-open');
  });
});

function closeDialog(dialog) {
  if (dialog.open) dialog.close();
  document.body.classList.remove('dialog-open');
}

document.querySelectorAll('.lightbox-close').forEach((button) => {
  button.addEventListener('click', () => closeDialog(button.closest('dialog')));
});

[lightbox, videoModal].forEach((dialog) => {
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) closeDialog(dialog);
  });
  dialog.addEventListener('close', () => document.body.classList.remove('dialog-open'));
});

document.querySelectorAll('.video-demo-button').forEach((button) => {
  button.addEventListener('click', () => {
    videoModal.showModal();
    document.body.classList.add('dialog-open');
  });
});

document.querySelectorAll('[data-placeholder-link]').forEach((link) => {
  link.addEventListener('click', (event) => {
    if (link.getAttribute('href') === '#') {
      event.preventDefault();
      window.alert('Replace this placeholder link with your published Google Sheet, demo, or project URL.');
    }
  });
});

document.querySelector('#current-year').textContent = new Date().getFullYear();
