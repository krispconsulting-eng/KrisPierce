// Shared site behaviour: mobile nav toggle, scroll-reveal, and placeholder
// form handling. Forms are front-end only until the n8n/Notion backend
// described in CAREGIVER-WELLNESS-COURSE-ARCHITECTURE.md is wired up.
//
// Scroll-reveal follows the "enhance an already-visible default" rule:
// every .reveal element is visible by default in the CSS. This script only
// adds the temporary hidden state, so content never disappears if JS fails
// to run (headless renderers, slow connections, disabled JS).

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

  const revealables = document.querySelectorAll('.reveal, .reveal-stagger');
  if (revealables.length && 'IntersectionObserver' in window) {
    revealables.forEach((el) => el.classList.add('is-ready'));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    revealables.forEach((el) => observer.observe(el));

    // Safety net: a full-page screenshot tool, print view, or a scroll-jack
    // that never fires real intersection events would otherwise leave
    // below-the-fold content stuck at opacity:0 forever. Force everything
    // visible after a short delay so content is guaranteed to appear even
    // if nobody ever scrolls.
    window.setTimeout(() => {
      revealables.forEach((el) => el.classList.add('is-visible'));
    }, 1200);
  }
});
