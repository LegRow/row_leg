document.addEventListener("turbolinks:load", () => {
  const roomsContainer = document.querySelector(".chat-room-container");

  if (roomsContainer) {
    const roomsRole = document.querySelector(".chat-room-role");
    const roleBtns = document.querySelectorAll(".role-btn");
    const employeeRoom = document.querySelector(".employee-room");
    const employerRoom = document.querySelector(".employer-room");
    roomsRole.addEventListener("click", (e) => {
      const clicked = e.target.closest(".role-btn");
      if (!clicked) return;

      roleBtns.forEach((btn) => {
        btn.classList.remove("role-btn-active");
        clicked.classList.add("role-btn-active");
      });

      if (clicked.classList.contains("employee-btn")) {
        employeeRoom.style.display = "block";
        employerRoom.style.display = "none";
      } else if (clicked.classList.contains("employer-btn")) {
        employerRoom.style.display = "block";
        employeeRoom.style.display = "none";
      }
    });
  }
});
