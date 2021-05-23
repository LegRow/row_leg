document.addEventListener("turbolinks:load", () => {
  // 漢堡選單控制
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

  const pageTopBtn = document.querySelector(".pagetop-btn");
  const show = function() {
    pageTopBtn.style.visibility = "visible";
    pageTopBtn.style.opacity = "1";
  };
  const hidden = function() {
    pageTopBtn.style.visibility = "hidden";
    pageTopBtn.style.opacity = "0";
  };

  window.addEventListener("scroll", () => {
    if (window.scrollY > 200) show();
    else hidden();
  });

  pageTopBtn.addEventListener("click", () => {
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  });

  // 動態navbar控制
  const navBar = document.querySelector(".nav-container");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 96) navBar.classList.add("sticky");
    else navBar.classList.remove("sticky");
  });
});