/* Lofi-Desk OS Landing JS
   - Theme toggle (dark/light) + saved preference
   - Smooth anchor scroll
   - Navbar style on scroll
   - Scroll reveal animations
   - Current year
*/

(function () {
  "use strict";

  const root = document.documentElement;

  // ===== Year
  const yearEl = document.getElementById("yearNow");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ===== Theme
  const themeToggle = document.getElementById("themeToggle");

  function getTheme() {
    return root.getAttribute("data-theme") || "dark";
  }

  function setTheme(next) {
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch (e) {}
    updateThemeIcon(next);
  }

  function updateThemeIcon(theme) {
    if (!themeToggle) return;
    const icon = themeToggle.querySelector("i");
    if (!icon) return;

    // If dark: show sun (means click -> light)
    if (theme === "dark") {
      icon.className = "fa-solid fa-sun";
      themeToggle.setAttribute("aria-label", "Ubah ke tema terang");
    } else {
      icon.className = "fa-solid fa-moon";
      themeToggle.setAttribute("aria-label", "Ubah ke tema gelap");
    }
  }

  if (themeToggle) {
    updateThemeIcon(getTheme());
    themeToggle.addEventListener("click", () => {
      const current = getTheme();
      setTheme(current === "dark" ? "light" : "dark");
    });
  }

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
      // Bootstrap collapse safely (if available)
      try {
        const collapse = bootstrap.Collapse.getOrCreateInstance(navMenu);
        collapse.hide();
      } catch (err) {
        navMenu.classList.remove("show");
      }
    }
  });

  // ===== Navbar scroll effect
  const topNav = document.getElementById("topNav");
  function onScroll() {
    if (!topNav) return;
    const y = window.scrollY || 0;
    if (y > 10) topNav.style.transform = "translateY(0)";
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

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
    // fallback: show all
    items.forEach((el) => el.classList.add("is-visible"));
  }
})();
