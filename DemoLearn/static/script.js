/* ============================================================
   🎓 SCHOOL MANAGEMENT SYSTEM — SCRIPT.JS (MODERNIZED)
   ============================================================ */

/* ─── Mobile Navigation Toggle ──────────────────────────── */
(function () {
  const toggleBtn     = document.querySelector(".toggle_btn");
  const toggleBtnIcon = document.querySelector(".toggle_btn i");
  const dropdownMenu  = document.querySelector(".dropdown_menu");

  if (toggleBtn && toggleBtnIcon && dropdownMenu) {
    toggleBtn.addEventListener("click", () => {
      const isOpen = dropdownMenu.classList.toggle("open");
      toggleBtnIcon.className = isOpen
        ? "fa-solid fa-xmark"
        : "fa-solid fa-bars";
    });

    // Close on outside click
    document.addEventListener("click", (e) => {
      if (!toggleBtn.contains(e.target) && !dropdownMenu.contains(e.target)) {
        dropdownMenu.classList.remove("open");
        toggleBtnIcon.className = "fa-solid fa-bars";
      }
    });
  }
})();

/* ─── Home Page Slider ───────────────────────────────────── */
(function () {
  const slides      = document.querySelectorAll(".home_page_slide");
  const controls    = document.querySelectorAll(".home_page_slider-controls span");
  const progressBar = document.querySelector(".home_page_progress-bar");

  if (!slides.length) return;

  let currentIndex = 0;
  let autoPlayTimer;

  function showSlide(n) {
    slides.forEach((slide, i) => slide.classList.toggle("active", i === n));
    controls.forEach((dot, i) => dot.classList.toggle("active", i === n));

    if (progressBar) {
      progressBar.style.transition = "none";
      progressBar.style.width = "0%";
      // Force reflow then animate
      void progressBar.offsetWidth;
      progressBar.style.transition = "width 5s linear";
      progressBar.style.width = "100%";
    }
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  }

  function startAutoPlay() {
    clearInterval(autoPlayTimer);
    autoPlayTimer = setInterval(nextSlide, 5000);
  }

  controls.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      currentIndex = i;
      showSlide(currentIndex);
      startAutoPlay(); // reset timer on manual nav
    });
  });

  showSlide(currentIndex);
  startAutoPlay();
})();

/* ─── Scroll-triggered Reveal (IntersectionObserver) ──────
   Applies to: .more_container_outer, .event_section_body, .about_us_home
   ─────────────────────────────────────────────────────────── */
(function () {
  const revealSelectors = [
    ".more_container_outer",
    ".event_section_body",
    ".about_us_home",
  ];

  const observerOptions = { threshold: 0.2 };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const el = entry.target;
      if (entry.isIntersecting) {
        requestAnimationFrame(() => {
          el.classList.add("visible");
          el.classList.remove("hidden");
        });
      } else {
        requestAnimationFrame(() => {
          el.classList.remove("visible");
          el.classList.add("hidden");
        });
      }
    });
  }, observerOptions);

  document.addEventListener("DOMContentLoaded", () => {
    revealSelectors.forEach((selector) => {
      const el = document.querySelector(selector);
      if (el) observer.observe(el);
    });
  });
})();

/* ─── Sticky Navbar (home page) ─────────────────────────── */
(function () {
  const navbar = document.querySelector(".home_page_navbar");
  if (!navbar) return;

  const onScroll = () => {
    navbar.classList.toggle("scrolled", window.scrollY > 40);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
})();

/* ─── Delete Confirmation Modal ──────────────────────────── */
let _currentDeleteFormId = null;

function openModal(formId) {
  _currentDeleteFormId = formId;
  const modal = document.getElementById("confirmationModal");
  if (modal) {
    modal.style.display = "flex";
    // Trap focus inside modal
    modal.querySelector("button, [href], [tabindex]")?.focus();
  }
}

function closeModal() {
  _currentDeleteFormId = null;
  const modal = document.getElementById("confirmationModal");
  if (modal) modal.style.display = "none";
}

function confirmDelete() {
  if (_currentDeleteFormId) {
    const form = document.getElementById(_currentDeleteFormId);
    if (form) form.submit();
  }
  closeModal();
}

// Close modal on backdrop click
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("confirmationModal");
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });

    // Close on Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.style.display === "flex") {
        closeModal();
      }
    });
  }
});

/* ─── Alert Auto-dismiss ─────────────────────────────────── */
document.addEventListener("DOMContentLoaded", () => {
  const alerts = document.querySelectorAll(".alert_error");
  alerts.forEach((alert) => {
    // Auto-hide after 6s
    setTimeout(() => {
      alert.style.transition = "opacity 0.5s ease, transform 0.5s ease";
      alert.style.opacity = "0";
      alert.style.transform = "translateY(-8px)";
      setTimeout(() => alert.remove(), 500);
    }, 6000);

    // Manual close
    const closeBtn = alert.querySelector(".closebtn");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        alert.style.transition = "opacity 0.3s ease";
        alert.style.opacity = "0";
        setTimeout(() => alert.remove(), 300);
      });
    }
  });
});

/* ─── Mobile Submenu Toggle (courses) ───────────────────── */
document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".home_nav_toggle");
  const navLinks  = document.querySelector(".home_page_nav-links");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
      const icon = navToggle.querySelector("i");
      if (icon) {
        icon.className = navLinks.classList.contains("open")
          ? "fa-solid fa-xmark"
          : "fa-solid fa-bars";
      }
    });

    // Submenu toggles on mobile
    const submenuParents = navLinks.querySelectorAll("li");
    submenuParents.forEach((li) => {
      const submenu = li.querySelector(".cources_menu");
      if (!submenu) return;
      li.addEventListener("click", (e) => {
        if (window.innerWidth <= 900) {
          e.stopPropagation();
          submenu.classList.toggle("submenu-open");
        }
      });
    });
  }
});
