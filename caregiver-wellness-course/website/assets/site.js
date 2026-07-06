// Shared site behaviour: mobile nav toggle, scroll-reveal, and form intake.
// Forms POST to the n8n webhook described in
// CAREGIVER-WELLNESS-COURSE-ARCHITECTURE.md §8, which creates the matching
// Participant/Sponsor record in Notion.
//
// Scroll-reveal follows the "enhance an already-visible default" rule:
// every .reveal element is visible by default in the CSS. This script only
// adds the temporary hidden state, so content never disappears if JS fails
// to run (headless renderers, slow connections, disabled JS).

const INTAKE_WEBHOOK_URL = 'https://scn2a-krispierce.app.n8n.cloud/webhook/caregiver-course-intake';

document.addEventListener('DOMContentLoaded', () => {
  // Prefills the waitlist form's path dropdown when arriving from a link
  // like index.html?path=self-pay#waitlist (e.g. the app's post-report
  // join gate), so the handoff from the assessment feels connected rather
  // than dropping the caregiver back at a blank form.
  const pathParam = new URLSearchParams(window.location.search).get('path');
  const pathSelect = document.getElementById('wl-path');
  if (pathParam && pathSelect && [...pathSelect.options].some((o) => o.value === pathParam)) {
    pathSelect.value = pathParam;
  }

  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  document.querySelectorAll('form[data-intake-form]').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      const errorEl = form.querySelector('.form-error');
      if (errorEl) errorEl.remove();
      if (submitBtn) submitBtn.disabled = true;

      const payload = { formType: form.getAttribute('data-form-type') };
      new FormData(form).forEach((value, key) => { payload[key] = value; });

      fetch(INTAKE_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
        .then((res) => { if (!res.ok) throw new Error('Request failed'); })
        .then(() => {
          form.style.display = 'none';
          const successId = form.getAttribute('data-success-target');
          const success = successId ? document.getElementById(successId) : form.nextElementSibling;
          if (success) success.classList.add('visible');
          success && success.scrollIntoView({ behavior: 'smooth', block: 'center' });
        })
        .catch(() => {
          if (submitBtn) submitBtn.disabled = false;
          const p = document.createElement('p');
          p.className = 'form-error';
          p.textContent = "Something went wrong sending that. Please try again, or email us directly.";
          form.appendChild(p);
        });
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
