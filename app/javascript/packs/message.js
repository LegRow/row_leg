document.addEventListener('turbolinks:load', function () {
  const messageInput = document.querySelector('.messageinput')
  const messagesubmit = document.querySelector('.messagesubmit')
  messagesubmit.addEventListener('click', function() {
    if (messageInput.value == "" ) {
      this.disabled = true;
    }
  })
  messageInput.addEventListener('click', function () {
    messagesubmit.disabled = false;
  })
})