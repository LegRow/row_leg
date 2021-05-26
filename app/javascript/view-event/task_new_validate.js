import TwCitySelector from "tw-city-selector";
import flatpickr from 'flatpickr'
import 'flatpickr/dist/flatpickr.min.css'
import "flatpickr/dist/themes/confetti.css"


document.addEventListener("turbolinks:load", () => {
  const newTaskForm = document.querySelector("#new_task");
  
  flatpickr("#thePickerStart", {
    altInput: true, //讓日期數字呈現方式較佳 ex:月份用英文方式呈現等
    enableTime: true,
    dateFormat: "Y-m-d H:i",
    minDate: "today"
  })
  flatpickr("#thePickerEnd", {
    altInput: true,
    enableTime: true,
    dateFormat: "Y-m-d H:i",
    minDate: "today",
    onClose: function(selectedDates, dateStr, instance) {
      console.log(selectedDates, dateStr)
    }
  })

  const taskStart = document.querySelector('#thePickerStart')
  taskStart.setAttribute("name", "task[task_end]")
  console.log(taskStart);

  const taskEnd = document.querySelector("#thePickerEnd")
  taskEnd.setAttribute("name", "task[task_at]")
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
    const addressCity = document.querySelector("#task_address_city")
    const addressDistrict = document.querySelector("#task_address_district")
    const street = document.querySelector("#task_address_street");
    const twCitySelectorError = document.querySelector(".city-selector-error")
    const store = document.querySelector("#task_store_name")
    const reward = document.querySelector('#task_reward')
    const taskNewBtn = document.querySelector(".btn");

    const startYear = document.querySelector('#task_task_at_1i')
    const startMonth = document.querySelector("#task_task_at_2i")
    const startDay = document.querySelector("#task_task_at_3i")
    const startHr = document.querySelector("#task_task_at_4i")
    const startMin = document.querySelector("#task_task_at_5i")
    
    const endYear = document.querySelector("#task_task_end_1i")
    const endMonth = document.querySelector("#task_task_end_2i")
    const endDay = document.querySelector("#task_task_end_3i")
    const endHr = document.querySelector("#task_task_end_4i")
    const endMin = document.querySelector("#task_task_end_5i")
    
    
    

    const timeValidate = function () {

    }

    const inputArr = [brief, desc, street, store]
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
      // e.preventDefault();
      // const endTime = endYear.value + endMonth.value + endDay.value + endHr.value + endMin.value
      // const startTime = startYear.value + startMonth.value +startDay.value + startHr.value + startMin.value
      // console.log(county.value, district.value);
      addressCity.value = county.value;
      addressDistrict.value = district.value;
      const startTime = new Date(+startYear.value, +startMonth.value-1, +startDay.value, +startHr.value, +startMin.value) 
      const endTime = new Date(+endYear.value, +endMonth.value-1, +endDay.value, +endHr.value, +endMin.value);
      console.log(startTime)
      console.log(endTime);
      const diffHr = Math.floor((endTime - startTime)/1000 /60 / 60);
      // reward.value = diffHr * 200;
      const nowTime = new Date();
      console.log((startTime - nowTime)/1000 /60 /60);
      if ((startTime - nowTime)/1000 /60 /60 <3) {
        console.log('發布時間要在起始時間3小時前')
      }
      // checkRequired(inputArr);
      // console.log(reward.value);
      // checkCitySelector(county, district);
      // console.log(taskStart.value)
    });
  }
});
