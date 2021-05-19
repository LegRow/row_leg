// document.addEventListener("turbolinks:load", () => {
//   const hamburgerBtn = document.querySelector(".hamburger-button button");
//   const mobileMenu = document.querySelector(".mobile-menu");

//   hamburgerBtn.addEventListener("click", () => {
//     mobileMenu.classList.toggle("hidden");
//   });
// });
document.addEventListener("turbolinks:load", () => {
  const mobileBtn = document.querySelector(".mobile-btn");
  const mobileMenu = document.querySelector(".mobile-menu");
  let menuOpen = false;
  mobileBtn.addEventListener("click", () => {
    if (!menuOpen) {
      mobileBtn.classList.add("open");
      menuOpen = true;
      mobileMenu.classList.remove("hidden");
    } else {
      mobileBtn.classList.remove("open");
      menuOpen = false;
      mobileMenu.classList.add("hidden");
    }
  });
});
