document.addEventListener('turbolinks:load', function () {
  if (document.querySelector('.messageinput')) {
    const messageInput = document.querySelector('.messageinput')
    const messagesubmit = document.querySelector('.messagesubmit')
    messagesubmit.addEventListener('click', function() {
    if (messageInput.value == "" ) {
      messagesubmit.disabled = true;
      }
    })
    messageInput.addEventListener('click', function () {
      messagesubmit.disabled = false;
    })
  }
})