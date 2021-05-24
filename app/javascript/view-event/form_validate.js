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

    const inputArr = [email, name, age, tel, bankAccount, password, password2];
    // 檢查欄位是否填寫
    const checkRequired = function (inputArr) {
      inputArr.forEach((input) => {
        if (input.value === "") {
          input.parentElement.className = "field error";
          input.nextElementSibling.textContent = `${input.parentElement.firstElementChild.textContent}不能為空`;
        } else {
          input.parentElement.className = "field success";
        }
      });
    };

    // 檢查長度
    const checkLength = function (input, min) {
      if (input.value.length < min) {
        input.parentElement.className = "field error";
        input.nextElementSibling.textContent = `${input.parentElement.firstElementChild.textContent}不能小於${min}碼`;
      } else {
        input.parentElement.className = "field success";
      }
    };

    signupBtn.addEventListener("click", (e) => {
      checkRequired(inputArr);

      checkLength(tel, 10);
      checkLength(bankAccount, 10);
      checkLength(password, 6);
      console.log(4);

      const checkError = inputArr.map(function (input) {
        return input.parentElement.classList.contains("error");
      });

      console.log(checkError);
      if (checkError.includes(true)) {
        e.preventDefault();
      }
      // if (2 === 2) {
      //   e.preventDefault();
      //   console.log("阻擋");
      //   return false;
      // }
      // const anyError = inputArr.forEach
      // if ()
      // if ()
    });
  }
});
