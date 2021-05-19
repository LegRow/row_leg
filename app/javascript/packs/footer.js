document.addEventListener('turbolinks:load', () => {

  const JsContact = document.getElementById("js-contact");
  const MyForm = document.getElementById("myFrom");
  const Xbutton = document.getElementById("xbutton");
  const Confirm = ocument.getElementById("confirm");



    

document.getElementById("js-contact").addEventListener('onclick',(e)=> {
      e.preventDefault()
      
document.getElementById("myFrom").style.display = "block";
console.log("hi")
  })

  function closeForm() {
  document.getElementById("myForm").style.display = "none";
  }

  function closeSearch() {
  document.getElementById("myForm").style.display = "none";
  }
})
