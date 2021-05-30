document.addEventListener("turbolinks:load", () => {
  const taskList = document.querySelector(".task-list");
  if (taskList) {
    const taskstateAll = document.querySelectorAll(".task-state");
    taskstateAll.forEach((taskstate) => {
      if (taskstate.dataset.state === "pending") {
        taskstate.textContent = "請先付款，任務才可發佈成功";
      } else if (
        taskstate.dataset.state === "employer_paid" ||
        taskstate.dataset.state === "employer_confirmed"
      ) {
        taskstate.textContent = "等待應徵者中...";
      } else if (taskstate.dataset.state === "employee_paid") {
        taskstate.textContent = "任務進行中";
      } else if (taskstate.dataset.state === "deal") {
        taskstate.textContent = "任務結束";
      }
    });
  }
});
