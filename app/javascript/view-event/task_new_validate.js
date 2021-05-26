import TwCitySelector from "tw-city-selector";
document.addEventListener("turbolinks:load", () => {
  const newTaskForm = document.querySelector("#new_task");
  if (newTaskForm) {
    new TwCitySelector({
      el: ".city-selector-set",
      elCounty: ".county", // 在 el 裡查找 element
      elDistrict: ".district", // 在 el 裡查找 element
      elZipcode: ".zipcode", // 在 el 裡查找 element
      countyValue: '台北市',
      only: [
        '台北市'
      ]
    });

    const brief = document.querySelector("#task_brief_description");
    const desc = document.querySelector("#task_description");
    const county = document.querySelector(".county");
    const district = document.querySelector(".district");
    const street = document.querySelector("#task_address_street");
    const twCitySelectorError = document.querySelector(".city-selector-error")
    const store = document.querySelector("#task_store_name")
    const reward = document.querySelector('#task_reward')
    const taskNewBtn = document.querySelector(".btn");

    const inputArr = [brief, desc, street, store]
    county.setAttribute("id", "county");
    district.setAttribute("id", "district");
    console.log(newTaskForm, county.value, district.value);
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
        twCitySelectorError.style.color = "red";
        twCitySelectorError.style.visibility = "visible";
      } else twCitySelectorError.style.visibility = "hidden"
    }

    taskNewBtn.addEventListener("click", (e) => {
      e.preventDefault();
      console.log(county.value, district.value);
      checkRequired(inputArr);
      console.log(reward.value);
      checkCitySelector(county, district);
    });
  }
});
