document.addEventListener("turbolinks:load", () => {
  const taskList = document.querySelector(".task-list");
  const taskItem = document.querySelector(".task-item");

  if (taskList) {
    const allTaskstate = document.querySelectorAll(".task-state");
    allTaskstate.forEach((taskstate) => {
      if (taskstate.dataset.state === "pending") {
        taskstate.textContent = "請先付款，任務才可發佈成功";
        taskstate.style.background = "MediumOrchid";
      } else if (
        taskstate.dataset.state === "employer_paid" ||
        taskstate.dataset.state === "employer_confirmed"
      ) {
        taskstate.textContent = "等待應徵者中...";
        taskstate.style.background = "Crimson";
      } else if (taskstate.dataset.state === "employee_paid") {
        taskstate.textContent = "任務進行中";
        taskstate.style.background = "SteelBlue";
      } else if (taskstate.dataset.state === "deal") {
        taskstate.textContent = "任務結束";
        taskstate.style.background = "LightSlateGray";
      }
    });
  }
  if (taskList && !taskItem) {
    const h2 = document.createElement("h2");
    const newDiv = document.createElement("div");
    const footer = document.querySelector(".footer-container");

    footer.classList.add("fix-footer");
    h2.innerText = "查無任務";
    h2.classList.add("notfound-msg");
    taskList.classList.add("no-task");
    newDiv.classList.add("not-found");
    taskList.appendChild(h2);
    taskList.appendChild(newDiv);
  }
});
