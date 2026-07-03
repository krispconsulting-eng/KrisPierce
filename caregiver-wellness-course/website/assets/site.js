// Shared site behaviour: mobile nav toggle + placeholder form handling.
// Forms here are front-end only until the n8n/Notion backend described in
// CAREGIVER-WELLNESS-COURSE-ARCHITECTURE.md is wired up (see TODOs below).

document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  document.querySelectorAll('form[data-placeholder-form]').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      // TODO: replace with a real POST to the n8n webhook that creates the
      // Participant/Sponsor record in Notion (see architecture doc §8).
      form.style.display = 'none';
      const successId = form.getAttribute('data-success-target');
      const success = successId ? document.getElementById(successId) : form.nextElementSibling;
      if (success) success.classList.add('visible');
      success && success.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  });
});
