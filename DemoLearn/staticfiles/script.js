document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.querySelector(".home_nav_toggle");
  const navLinks = document.querySelector(".home_page_nav-links");

  // Navbar toggle
  toggleBtn.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    toggleBtn.innerHTML = navLinks.classList.contains("open")
      ? "&times;"
      : "&#9776;";
  });

  // Dropdown toggle for mobile
  const dropdownParents = document.querySelectorAll(
    ".home_page_nav-links > li > a"
  );

  dropdownParents.forEach((link) => {
    link.addEventListener("click", (e) => {
      // Only activate on mobile width
      if (window.innerWidth <= 900) {
        const submenu = link.nextElementSibling;
        if (submenu && submenu.classList.contains("cources_menu")) {
          e.preventDefault(); // prevent page jump
          submenu.classList.toggle("submenu-open");
        }
      }
    });
  });
});

const slider = document.querySelector(".slider");

function activate(e) {
  const items = document.querySelectorAll(".item");
  e.target.matches(".next") && slider.append(items[0]);
  e.target.matches(".prev") && slider.prepend(items[items.length - 1]);
}

document.addEventListener("click", activate, false);

//delete detail script
function openModal() {
  document.getElementById("confirmationModal").style.display = "flex";
}

function closeModal() {
  document.getElementById("confirmationModal").style.display = "none";
}

function confirmDelete() {
  document.getElementById("delete_stu_detail").submit();
}
