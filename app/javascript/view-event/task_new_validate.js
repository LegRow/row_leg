import TwCitySelector from "tw-city-selector";

document.addEventListener("turbolinks:load", () => {
  const newTaskForm = document.querySelector("#new_task");
  const editTaskForm = document.querySelector(".edit_task");
  if (newTaskForm || editTaskForm) {
    // TwCitySelector 產生台灣市區下拉選單
    new TwCitySelector({
      el: ".city-selector-set",
      elCounty: ".county",
      elDistrict: ".district",
      elZipcode: ".zipcode",
      countyValue: "台北市",
      only: ["台北市"],
    });
    
    const county = document.querySelector(".county");
    const district = document.querySelector(".district");

    const brief = document.querySelector("#task_brief_description");
    const desc = document.querySelector("#task_description");
    const addressCity = document.querySelector("#task_address_city");
    const addressDistrict = document.querySelector("#task_address_district");
    const street = document.querySelector("#task_address_street");
    const twCitySelectorError = document.querySelector(".city-selector-error");
    const store = document.querySelector("#task_store_name");
    const reward = document.querySelector("#task_reward");
    const taskBehalf = document.querySelector("#task_behalf");
    const taskNewBtn = document.querySelector(".btn");
    // 錯誤訊息
    const rewaedErrorMessage = document.querySelector(".field .reward-message");
    const startMessage = document.querySelector(".start-message");
    const endMessage = document.querySelector(".end-message");

    const startYear = document.querySelector("#task_task_at_1i");
    const startMonth = document.querySelector("#task_task_at_2i");
    const startDay = document.querySelector("#task_task_at_3i");
    const startHr = document.querySelector("#task_task_at_4i");
    const startMin = document.querySelector("#task_task_at_5i");

    const endYear = document.querySelector("#task_task_end_1i");
    const endMonth = document.querySelector("#task_task_end_2i");
    const endDay = document.querySelector("#task_task_end_3i");
    const endHr = document.querySelector("#task_task_end_4i");
    const endMin = document.querySelector("#task_task_end_5i");

    const inputArr = [brief, desc, street, store];
    const showSuccess = function (input) {
      input.parentElement.className = "field success";
    };
    const showError = function (input) {
      input.parentElement.className = "field error";
    };

    const checkRequired = function (inputArr) {
      inputArr.forEach((input) => {
        if (input.value === "") {
          showError(input);
        } else {
          showSuccess(input);
        }
      });
    };

    const checkCitySelector = function (input1, input2) {
      if (input1.value === "" || input2.value === "") {
        twCitySelectorError.style.color = "#dc2626";
        twCitySelectorError.style.visibility = "visible";
      } else twCitySelectorError.style.visibility = "hidden";
    };

    const checkReward = function (input, diffHr) {
      if (input.value < diffHr * 200) {
        showError(input);
        input.value = diffHr * 200;
        rewaedErrorMessage.textContent = `酬勞需大於${diffHr * 200}`;
        taskBehalf.style.border = "none";
      } else {
        showSuccess(input);
      }
    };

    const checkStartTime = function (startTime, nowTime) {
      if ((startTime - nowTime) / 1000 / 60 / 60 < 3) {
        startMessage.classList.add("error");
      } else {
        startMessage.classList.remove("error");
      }
    };

    const checkEndTime = function (endTime, startTime) {
      if ((endTime - startTime) / 1000 / 60 / 60 < 1) {
        endMessage.classList.add("error");
      } else {
        endMessage.classList.remove("error");
      }
    };

    taskNewBtn.addEventListener("click", (e) => {
      addressCity.value = county.value;
      addressDistrict.value = district.value;

      const nowTime = new Date();
      const startTime = new Date(
        +startYear.value,
        +startMonth.value - 1,
        +startDay.value,
        +startHr.value,
        +startMin.value
      );
      const endTime = new Date(
        +endYear.value,
        +endMonth.value - 1,
        +endDay.value,
        +endHr.value,
        +endMin.value
      );
      const diffHr = Math.round((endTime - startTime) / 1000 / 60 / 60);

      checkRequired(inputArr);
      checkCitySelector(county, district);
      checkReward(reward, diffHr);
      checkStartTime(startTime, nowTime);
      checkEndTime(endTime, startTime);

      const hasError = [reward, ...inputArr].map(function (input) {
        return input.parentElement.classList.contains("error");
      });

      if (hasError.includes(true)) {
        e.preventDefault();
      } else if (county.value === "" || district.value === "") {
        e.preventDefault();
      } else if (
        startMessage.classList.contains("error") ||
        endMessage.classList.contains("error")
      ) {
        e.preventDefault();
      }
    });
  }
});
