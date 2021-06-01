import { Context, Controller } from "stimulus";
import consumer from "../channels/consumer";

export default class extends Controller {
  static targets = [];

  connect() {
    const user_element = document.getElementById("messages");
    const room_id = Number(user_element.getAttribute("data-room-id"));
    // 這邊開始加工 監聽輸入框 做什麼還是先放received(data)處理
    const messageinput = document.querySelector('.messageinput')
    messageinput.addEventListener("input", (e)=>{
      fetch (`/rooms/${room_id}/tip`)
    })
    messageinput.addEventListener("click", (e)=>{
      fetch (`/rooms/${room_id}/tip`)
    })

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
        disconnected() {
        },
        received(data) {
          // 這一區塊處理聊天室收到資訊怎麼處理 一開始只有設定對話 後來需求事件 所以將後端打來的資訊分為兩種 message及tip, 應該可以再多設定一個方法(區塊)專門處理事件.研究中
          if (data.type === 'message') {
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
          }else if(data.type === 'tip'){
            const showTypingPlace = document.querySelector('.typing_tip')
            const messageinput = document.querySelector('.messageinput')
            const whoTyping = document.getElementById('messageController')
            // 因為這是抓自己螢幕上的current_user所以取名me
            const me = whoTyping.dataset.currentUser
            // 這個是抓傳送事件的人是誰 data在這就是指那個事件
            const who = data.user_id
            if (me != who) {
            //未觸發前 沒事
            //鍵盤觸發後 其實先清除timeout 及觸發"打字ing" 當keyup 啟動"靜悄悄"
            //之後狀態就一直是靜悄悄了 除非再碰鍵盤
              let timer, cleantimeout = 5000;
              messageinput.addEventListener('keypress', ifKeypress())
              messageinput.addEventListener('keyup', ifKeyup())
              function ifKeypress(e) {
                window.clearTimeout(timer);
                showTypingPlace.innerHTML = "正在打字"
              }
              function ifKeyup(e) {
                timer = window.setTimeout(()=>{
                showTypingPlace.innerHTML = "現在靜悄悄"
                }, cleantimeout)
              }
            }
          }
        }
      }
    )
  }
}
