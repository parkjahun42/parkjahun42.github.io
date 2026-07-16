document.addEventListener("DOMContentLoaded", () => {
  const panel = document.getElementById("navbarNav");
  const toggle = document.querySelector('[data-nav-toggle="navbarNav"]');

  if (!panel || !toggle) return;

  panel.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      panel.classList.remove("show");
      toggle.classList.add("collapsed");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
});
