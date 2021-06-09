document.addEventListener("turbolinks:load", function () {
  document.querySelectorAll(".sidebar").forEach((item) => {
    const itemHref = item.querySelector(".sidebar-link").getAttribute("href");

    if (location.href.match(itemHref)) {
      item.classList.add("sidebar-active");
    }
  });
});
