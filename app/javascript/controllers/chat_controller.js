import { Context, Controller } from "stimulus";
import consumer from "../channels/consumer";

export default class extends Controller {
  static targets = [];

  connect() {
    const user_element = document.getElementById("messages");
    const room_id = Number(user_element.getAttribute("data-room-id"));
    const chatRoomState = document.getElementById("join-or-leave");
    const leaveRoom = document.getElementById('leave')
    leaveRoom.addEventListener('click', ()=> {
      fetch(`/rooms/${room_id}/tip_leave`)
    })
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
          // 狀態區
          const user = data.user_id;
          const userRoom = document.getElementById('messages');
          const me = userRoom.dataset.userId ;
          const otherName = data.user_name;
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
            // 音效功能先關
            // if (user != me) {
            //   console.log("123");
            //   dindong()
            // }
            const chatRoom = document.getElementById("messages");
            chatRoom.scrollTop = chatRoom.scrollHeight;
          } else if (data.type === "tip") {
            if (user != me) {
              chatRoomState.innerHTML = `${otherName} 已進入聊天室`;

            }
          } else if (data.type === "tip_leave") {
            if (user != me){
              chatRoomState.innerHTML = `<p class="animate-pulse bg-red-400 p-1 rounded-lg">${otherName} 已離開聊天室</p>`;
            }
          }
        }
      }
    )
  }
}


//放這邊 夥伴們看一下內容跟怎麼調用
const nonsensess = [
  "Rowleg提醒您:出門請戴好口罩。",
  "Rowleg提醒您:回家記得好好洗手。",
  "不要顧看這裡，看我們Demo!",
  "終於到了這一天了!",
  `<a href="https://astro.5xruby.tw/" target=_blank class="animate-pulse bg-green-400 p-1 rounded-lg">AD:ASTRO Camp 招生中!</a>`,
  "名言分享:遇事不決，量子力學。",
  `<a href="https://5xruby.tw/courses/code-for-girl" target=_blank class="animate-pulse bg-green-400 p-1 rounded-lg">AD:不是只有男生會寫程式。</a>`,
  `<a href="https://5xruby.tw/courses/react" target=_blank class="animate-pulse bg-green-400 p-1 rounded-lg">AD:學會React，年薪百萬。</a>`,
  `<a href="https://5xruby.tw/courses/vue-js" target=_blank class="animate-pulse bg-green-400 p-1 rounded-lg">AD:學會Vue，年薪百萬。</a>`,
  `<a href="https://5xruby.tw/courses/git" target=_blank class="animate-pulse bg-green-400 p-1 rounded-lg">AD:全台灣最強Git教學!</a>`,
  "名言分享:在哪裡跌倒，在哪裡躺下。",
  "猜猜誰說的:我還要去釣魚。",
  "猜猜誰說的:是說.....",
  "猜猜誰說的:現在感受不到，以後就知道了。",
  "猜猜誰說的:大家早安呀。",
  "猜猜誰說的:放下偶像包袱。",
  "猜猜誰說的:勇敢發問。",
  "這一組叫Row-Leg!",
  "這個特效其實很簡單。",
  "這行字打有反。",
  "我想看Demo員笑場!",
  "猜猜誰說的:不要看到英文就不看!",
  "學不會JS的人說的:學會React + Vue，人生過一半!",
  "名言分享:每當我閉眼，就會看不見。",
  "名言分享:感情路順遂，因為都沒人。",
  "名言分享:若是沒有勇氣，你還有氧氣。",
]

function myNonsense() {
  const randomNumber = Math.floor( Math.random() * (nonsensess.length));
  document.getElementById("join-or-leave").innerHTML = nonsensess[randomNumber]
}
// 音效功能先關
// function dindong() {
//   const dindong = new Audio('/assets/inroom.mp3')
//   dindong.play()
// }
