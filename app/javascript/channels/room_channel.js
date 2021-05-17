import consumer from "./consumer"

document.addEventListener('turbolinks:load', () => {

  const user_element = document.getElementById('messages')
  const room_id = user_element.getAttribute('data-room-id');

  consumer.subscriptions.create({ channel: "RoomChannel", room_id: room_id }, {
    connected() {
      const messageContainer = document.getElementById('messages')
      messageContainer.innerHTML = messageContainer.innerHTML
    },

    disconnected() {

    },

    received(data) {
      const user_element = document.getElementById('messages')
      const user_id = Number(user_element.getAttribute('data-user-id'));

      let html;
      if (user_id === data.message.user_id) {
        html = data.mine
      } else {
        html = data.theirs
      }

      const messageContainer = document.getElementById('messages')
      messageContainer.innerHTML = messageContainer.innerHTML + html
    }
  });

})

