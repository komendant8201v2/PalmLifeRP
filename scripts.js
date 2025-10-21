// Skrypt podświetlający aktualny link w menu
document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll("nav a");
  const current = location.pathname.split("/").pop();

  links.forEach(link => {
    if (link.getAttribute("href") === current) {
      link.classList.add("active");
    }
  });
});
