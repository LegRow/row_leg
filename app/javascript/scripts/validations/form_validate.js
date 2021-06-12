document.addEventListener("turbolinks:load", () => {
  const signupForm = document.querySelector("#signup-form");

  if (signupForm) {
    const email = document.querySelector(".email");
    const name = document.querySelector(".name");
    const tel = document.querySelector(".tel");
    const bankAccount = document.querySelector(".bank-account");
    const password = document.querySelector(".password");
    const password2 = document.querySelector(".password2");
    const signupBtn = document.querySelector(".btn");
    const agree = document.querySelector("#agree");
    const inputArr = [email, name, tel, bankAccount, password, password2];
    const showModalBtn = document.querySelector(".show-modal-btn");
    const closeModalBtn = document.querySelector(".close-modal-btn");
    const term = document.querySelector(".term-containerer");
    const overlay = document.querySelector(".overlay");

    // 同意條款pop up
    showModalBtn.addEventListener("click", (e) => {
      e.preventDefault();
      term.classList.remove("term-hidden");
      overlay.classList.remove("term-hidden");
    });

    closeModalBtn.addEventListener("click", () => {
      term.classList.add("term-hidden");
      overlay.classList.add("term-hidden");
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !term.classList.contains("term-hidden")) {
        term.classList.add("term-hidden");
        overlay.classList.add("term-hidden");
      }
    });

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

    const checkPasswordLength = function (input) {
      if (input.value.length < 6) {
        showError(input);
        input.nextElementSibling.textContent = "密碼必須至少6碼";
      }
    };

    const checkPasswordMath = function (input1, input2) {
      if (input1.value !== input2.value) {
        showError(input2);
        input2.nextElementSibling.textContent = "密碼不一致";
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

      checkBoxAgree(agree);

      const hasError = inputArr.map(function (input) {
        return input.parentElement.classList.contains("error");
      });

      if (hasError.includes(true)) {
        e.preventDefault();
      }
      inputArr[0].focus();
    });
  }
});
