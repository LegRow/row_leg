document.addEventListener("turbolinks:load", () => {
  const signupForm = document.querySelector("#signup-form");

  if (signupForm) {
    const email = document.querySelector(".email");
    const name = document.querySelector(".name");
    const age = document.querySelector(".age");
    const tel = document.querySelector(".tel");
    const bankAccount = document.querySelector(".bank-account");
    const password = document.querySelector(".password");
    const password2 = document.querySelector(".password2");
    const signupBtn = document.querySelector(".btn");
    const male = document.querySelector("#user_gender_male");
    const female = document.querySelector("#user_gender_female");
    const agree = document.querySelector("#agree");
    const inputArr = [email, name, age, tel, bankAccount, password, password2];

    const showSuccess = function (input) {
      input.parentElement.className = "field success";
    };
    const showError = function (input) {
      input.parentElement.className = "field error";
    };
    // 檢查空欄
    const checkRequired = function (inputArr) {
      inputArr.forEach((input) => {
        if (input.value === "") {
          showError(input);
          input.nextElementSibling.textContent = `${input.parentElement.firstElementChild.textContent}不能為空`;
        } else {
          showSuccess(input);
        }
      });
    };

    // 檢查信箱格式
    function checkEmail(input) {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (re.test(input.value.trim())) {
        showSuccess(input);
      } else {
        showError(input);
        input.nextElementSibling.textContent = "信箱格式錯誤";
      }
    }

    // 檢查電話 帳戶長度與是否為數字
    const checkLength = function (input) {
      if (input.value.length !== 10) {
        showError(input);
        input.nextElementSibling.textContent = `${input.parentElement.firstElementChild.textContent}必須為10碼`;
      } else if (!/^[0-9]+$/.test(input.value)) {
        showError(input);
        input.nextElementSibling.textContent = `${input.parentElement.firstElementChild.textContent}必須為數字`;
      } else {
        showSuccess(input);
      }
    };

    // 檢查密碼長度
    const checkPasswordLength = function (input) {
      if (input.value.length < 6) {
        showError(input);
        input.nextElementSibling.textContent = "密碼必須至少6碼";
      }
    };

    // 檢查密碼是否一致
    const checkPasswordMath = function (input1, input2) {
      if (input1.value !== input2.value) {
        showError(input2);
        input2.nextElementSibling.textContent = "密碼不一致";
      }
    };

    //  檢查checkbox
    const checkBoxGender = function (option1, option2) {
      if ((option1.checked === false) & (option2.checked === false)) {
        option1.parentElement.lastElementChild.textContent = "請選擇性別";
        option1.parentElement.lastElementChild.style.visibility = "visible";
      } else {
        option1.parentElement.lastElementChild.style.visibility = "hidden";
      }
    };

    const checkBoxAgree = function (option) {
      if (option.checked === false) {
        alert("請勾選已詳細閱讀");
      }
    };

    signupBtn.addEventListener("click", (e) => {
      checkRequired(inputArr);

      checkEmail(email);

      checkLength(tel);
      checkLength(bankAccount);

      checkPasswordLength(password);
      checkPasswordLength(password2);
      checkPasswordMath(password, password2);

      checkBoxGender(male, female);
      checkBoxAgree(agree);

      const hasError = inputArr.map(function (input) {
        return input.parentElement.classList.contains("error");
      });

      if (hasError.includes(true)) {
        e.preventDefault();
      }
    });
  }
});