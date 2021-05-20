document.addEventListener("turbolinks:load", () => {
  const mobileBtn = document.querySelector(".mobile-btn");
  const mobileMenu = document.querySelector(".mobile-menu");
  let menuOpen = false;
  mobileBtn.addEventListener("click", () => {
    if (!menuOpen) {
      mobileBtn.classList.add("open");
      menuOpen = true;
      mobileMenu.className = "mobile-menu menu-active";
    } else {
      mobileBtn.classList.remove("open");
      menuOpen = false;
      mobileMenu.className = "mobile-menu menu-default";
    }
  });
});
