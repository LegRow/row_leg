document.addEventListener('turbolinks:load', function () {
  const messageInput = document.querySelector('.messageinput')
  const messagesubmit = document.querySelector('.messagesubmit')

  if (messageInput) {
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