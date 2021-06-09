import { Context, Controller } from "stimulus";
import consumer from "../channels/consumer";

export default class extends Controller {
  static targets = [];

  connect() {
    const user_element = document.getElementById("messages");
    const room_id = Number(user_element.getAttribute("data-room-id"));
    const chatRoomState = document.getElementById("join-or-leave");
    const leaveRoom = document.getElementById('leave')
    consumer.subscriptions.create(
      { channel: "RoomChannel", room_id: room_id },
      {
        connected() {
          fetch(`/rooms/${room_id}/tip`)
          const chatRoom = document.getElementById("messages");
          chatRoom.scrollTop = chatRoom.scrollHeight;
        },
        disconnected() {
        },
        received(data) {
          if (data.type === "message") {
            const user_element = document.getElementById("messages");
            const user_id = Number(user_element.getAttribute("data-user-id"));

            let html;
            if (user_id === data.message.user_id) {
              html = data.mine;
            } else {
              html = data.theirs;
            }

            const messageContainer = document.getElementById("messages");
            messageContainer.innerHTML = messageContainer.innerHTML + html;
            myNonsense()
            const chatRoom = document.getElementById("messages");
            chatRoom.scrollTop = chatRoom.scrollHeight;
            // 假設從"後端"打回來 不是message  data.type都是加工來的 看send_message_job跟 rooms_controller
          } else if (data.type === "tip") {
            const user = data.user_id;
            const userRoom = document.getElementById('messages');
            const me = userRoom.dataset.userId ;
            const otherName = data.user_name;
            if (user != me) {
              chatRoomState.innerHTML = `${otherName} 飄洋過海來看你`;
            }
          }
        }
      }
    )
  }
}



const nonsensess = [
  "出門請戴好口罩。",
  "回家記得好好洗手。",
  "不要顧看這裡，看我們Demo!",
  "終於到了這一天了!",
  "ASTRO Camp 招生中!",
  "想台詞很辛苦...",
  "遇事不決，量子力學。",
  "分享，訂閱，按讚。",
  "學會React，年薪百萬。",
  "學會Vue，年薪百萬。",
  "在哪裡跌倒，在哪裡躺下。",
  "愛釣魚的孩子不會變壞!",
  "是說.....",
  "現在感受不到，以後就知道了。",
  "大家早安呀。",
  "放下偶像包袱。",
  "勇敢發問。",
  "這一組叫Row-Leg!",
  "這個特效其實很簡單。",
  "這行字打有反。",
  "我想知道Demo員會不會笑場?",
  "不要看到英文就不看!",
  "學會React + Vue，人生過一半!",
  "每當我閉眼，就會看不見。",
  "感情路順遂，因為都沒人。",
  "若是沒有勇氣，你還有氧氣。",
  "在給我五分鐘。",
]

function myNonsense() {
  const randomNumber = Math.floor( Math.random() * (nonsensess.length));
  document.getElementById("join-or-leave").innerHTML = nonsensess[randomNumber]
}
