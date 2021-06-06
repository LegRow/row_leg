import { Context, Controller } from "stimulus";
import consumer from "../channels/consumer";

export default class extends Controller {
  static targets = [];

  connect() {
    const user_element = document.getElementById("messages");
    const room_id = Number(user_element.getAttribute("data-room-id"));
    // 這邊開始加工 監聽輸入框 做什麼還是先放received(data)處理
    const messageinput = document.querySelector(".messageinput");
    messageinput.addEventListener("input", () => {
      fetch(`/rooms/${room_id}/tip`);
    });
    consumer.subscriptions.create(
      { channel: "RoomChannel", room_id: room_id },
      {
        connected() {
          // 這邊加這個一樣利用這通道打回去 讓ActionCable廣播 同房間內可以收到通知
          // 可再作為其他用途,目前所帶資訊current_user.id 可以加工帶時間或帶任務狀況
          // fetch (`/rooms/${room_id}/tip`) 例如 對方連線了
          const chatRoom = document.getElementById("messages");
          chatRoom.scrollTop = chatRoom.scrollHeight;
        },
        disconnected() {},
        received(data) {
          // 這一區塊處理聊天室收到資訊怎麼處理 一開始只有設定對話 後來需求事件 所以將後端打來的資訊分為兩種 message及tip, 應該可以再多設定一個方法(區塊)專門處理事件.研究中
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
            const chatRoom = document.getElementById("messages");
            chatRoom.scrollTop = chatRoom.scrollHeight;
            // 假設從"後端"打回來 不是message  data.type都是加工來的 看send_message_job跟 rooms_controller
          } else if (data.type === "tip") {
            const showTypingPlace = document.querySelector(".typing_tip");
            const messageinput = document.querySelector(".messageinput");
            const whoTyping = document.getElementById("messageController");
            const opsiteName = document.querySelector(".message-opsite-name");
            // 因為這是抓自己螢幕上的current_user所以取名me
            const me = whoTyping.dataset.currentUser;
            // 這個是抓傳送事件的人是誰 data在這就是指那個事件
            const who = data.user_id;
            const donetyping = function () {
              showTypingPlace.style.color = "white";
              showTypingPlace.textContent = "對方無打字";
            };
            //需重寫
            // if (me != who) {
            //   let timerID;
            //   messageinput.addEventListener('keydown', () => {
            //     clearTimeout(timerID);
            //     showTypingPlace.style.color = 'gray';
            //     showTypingPlace.textContent = `${opsiteName.textContent}正在輸入...`;
            //   })
            //   messageinput.addEventListener('keyup', () => {
            //     clearTimeout(timerID);
            //     timerID = setTimeout(donetyping, 5000);
            //   })
            // }
          }
        },
      }
    );
  }
}
