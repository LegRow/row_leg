import consumer from "./consumer"

consumer.subscriptions.create({ channel: "RoomChannel", room_id: 2 }, {
  connected() {
    console.log("connected.....")
    // Called when the subscription is ready for use on the server
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
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

    // console.log(html) 除錯器
    const messageContainer = document.getElementById('messages')
    messageContainer.innerHTML = messageContainer.innerHTML + html
  }
});
