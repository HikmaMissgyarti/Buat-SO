/* Lofi-Desk OS Landing JS
   - Smooth anchor scroll
   - Close navbar collapse on mobile click
   - Scroll reveal animations
   - Current year
*/

(function () {
  "use strict";

  // ===== Year
  const yearEl = document.getElementById("yearNow");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ===== Smooth scroll for internal links
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;

    const href = a.getAttribute("href");
    if (!href || href === "#") return;

    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });

    // close navbar collapse on mobile after click
    const navMenu = document.getElementById("navMenu");
    if (navMenu && navMenu.classList.contains("show")) {
      try {
        const collapse = bootstrap.Collapse.getOrCreateInstance(navMenu);
        collapse.hide();
      } catch (err) {
        navMenu.classList.remove("show");
      }
    }
  });

  // ===== Reveal animations
  const items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && items.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    items.forEach((el) => io.observe(el));
  } else {
    items.forEach((el) => el.classList.add("is-visible"));
  }
})();
