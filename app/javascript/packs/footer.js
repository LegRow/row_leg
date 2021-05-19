document.addEventListener("turbolinks:load", () => {
    
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
