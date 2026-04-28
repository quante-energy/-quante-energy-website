document.addEventListener('DOMContentLoaded', function () {

    // 1. SELECT ALL TEAM CARDS
    const cards = document.querySelectorAll('.meet-card');

    // Stop if no cards found on this page
    if (!cards.length) return;

    // 2. INTERSECTION OBSERVER
    //    Fires when each card enters the viewport.
    //    Adds class "mt-visible" → CSS animates it.
    const observer = new IntersectionObserver(

        function (entries) {
            entries.forEach(function (entry) {

                // Card is now visible on screen
                if (entry.isIntersecting) {

                    // Add the visible class → triggers CSS fade+slide
                    entry.target.classList.add('mt-visible');

                    // Stop watching — animate only ONCE
                    observer.unobserve(entry.target);
                }

            });
        },

        {
            threshold : 0.12   // fire when 12% of card is visible
        }

    );

    // Start watching every card
    cards.forEach(function (card) {
        observer.observe(card);
    });

    // 3. CURSOR: grow CTA link on hover
    const cta = document.querySelector('.meet-cta');

    if (cta) {
        cta.addEventListener('mouseenter', function () {
            cta.style.letterSpacing = '0.22em';   // slightly widens text
        });
        cta.addEventListener('mouseleave', function () {
            cta.style.letterSpacing = '0.16em';   // back to normal
        });
    }


}); // end DOMContentLoaded


/* =============================================
   FOOTER — footer.js
   Add before </body> in your HTML:
   <script src="footer.js"></script>

   This file handles:
   1. Smooth scroll-in animation when footer enters viewport
   2. Active hover state feedback on social links
   3. Auto-update copyright year
   ============================================= */


/* ── 1. Auto-update Copyright Year ─────────────
   Finds any element with class "footer-year"
   and sets its text to the current year.
   In your HTML you can write:
   <span class="footer-year"></span>
   and it will auto-fill (e.g. "2025").
   ──────────────────────────────────────────── */
(function updateCopyrightYear() {
  const yearSpans = document.querySelectorAll('.footer-year');
  const currentYear = new Date().getFullYear();
  yearSpans.forEach(function (el) {
    el.textContent = currentYear;
  });
})();


/* ── 2. Scroll Fade-In Animation ────────────────
   When the footer scrolls into view, it fades
   up smoothly instead of just appearing.
   Uses IntersectionObserver (no jQuery needed).
   ──────────────────────────────────────────── */
(function initFooterReveal() {

  const footer = document.querySelector('.site-footer');
  if (!footer) return; // safety check

  // Set initial hidden state via inline style
  footer.style.opacity    = '0';
  footer.style.transform  = 'translateY(30px)';
  footer.style.transition = 'opacity 0.7s ease, transform 0.7s ease';

  // Create the observer
  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          // Footer is visible — animate it in
          footer.style.opacity   = '1';
          footer.style.transform = 'translateY(0)';
          observer.unobserve(footer); // run only once
        }
      });
    },
    { threshold: 0.1 } // trigger when 10% is visible
  );

  observer.observe(footer);

})();


/* ── 3. Social Icon Ripple Effect ───────────────
   Adds a subtle scale-pulse on click of
   each social link (tactile feedback).
   ──────────────────────────────────────────── */
(function initSocialRipple() {

  const socialLinks = document.querySelectorAll('.social-link');

  socialLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {

      // Quick scale pulse animation
      link.style.transform    = 'scale(0.88)';
      link.style.transition   = 'transform 0.1s ease';

      setTimeout(function () {
        link.style.transform  = 'scale(1)';
        link.style.transition = 'transform 0.2s ease, background-color 0.3s ease';
      }, 100);

    });
  });

})();


/* ── 4. Smooth Scroll for Anchor Links ──────────
   If any footer link points to a section on
   the same page (e.g. href="#contact"),
   this scrolls smoothly instead of jumping.
   ──────────────────────────────────────────── */
(function initSmoothScroll() {

  const footerLinks = document.querySelectorAll('.site-footer a[href^="#"]');

  footerLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      const targetId = link.getAttribute('href');
      if (targetId === '#') return; // skip empty hashes

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

})();