document.addEventListener("DOMContentLoaded", () => {
  const taskOpenBtn = document.querySelectorAll("#inf-open");

  taskOpenBtn.forEach((el) =>
    el.addEventListener("click", (e) => {
      e.target.previousElementSibling.classList.toggle("task-desc-spec");

      if (e.target.textContent === "展開") e.target.textContent = "收合";
      else e.target.textContent = "展開";
    })
  );
});
