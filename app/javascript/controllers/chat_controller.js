
import { Controller } from "stimulus"
import consumer from "../channels/consumer"


export default class extends Controller {
  static targets = []

  connect() {
    // consumer.subscriptions.subscriptions.forEach((subscription) => {
    //   consumer.subscriptions.remove(subscription)
    // })

    const user_element = document.getElementById('messages');
    const room_id = Number(user_element.getAttribute('data-room-id'));

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
  }
}
