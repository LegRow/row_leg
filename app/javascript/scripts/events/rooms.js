document.addEventListener("turbolinks:load", () => {
  const roomsContainer = document.querySelector(".chat-rooms-container");

  if (roomsContainer) {
    const roomsRole = document.querySelector(".chat-rooms-role");
    const roleBtns = document.querySelectorAll(".role-btn");
    const employeeRooms = document.querySelector(".employee-rooms");
    const employerRooms = document.querySelector(".employer-rooms");
    roomsRole.addEventListener("click", (e) => {
      const clicked = e.target.closest(".role-btn");
      if (!clicked) return;

      roleBtns.forEach((btn) => {
        btn.classList.remove("role-btn-active");
        clicked.classList.add("role-btn-active");
      });

      if (clicked.classList.contains("employee-btn")) {
        employeeRooms.style.display = "block";
        employerRooms.style.display = "none";
      } else if (clicked.classList.contains("employer-btn")) {
        employerRooms.style.display = "block";
        employeeRooms.style.display = "none";
      }
    });
  }
});
