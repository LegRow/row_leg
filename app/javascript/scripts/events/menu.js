document.addEventListener("turbolinks:load", function () {
  document.querySelectorAll(".menu-item").forEach((item) => {
    const itemHref = item.querySelector(".menu-link").getAttribute("href");

    if (location.href.match(itemHref)) {
      item.classList.add("menu-active");
    }
  });
});
