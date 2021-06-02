document.addEventListener('turbolinks:load', function () {
  const messageInput = document.querySelector('.messageinput')
  if (messageInput) {
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