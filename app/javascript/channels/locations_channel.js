import consumer from "./consumer"

document.addEventListener('turbolinks:load', () => {

  const task = document.querySelector('section[class~="task-show-container"]');

  // 進到 task show 頁面才可以得到 task 的 id，會比對後端打過來的 employee_id，一致才更新位置資訊（預設 employee 開啟 task 的 show 頁面就傳遞一次位置資訊給 employer）
  if (task) {

    // document.getElementById("report_location").addEventListener('onclick', () => {
    //   console.log("testing")
    // });

    const employee_id = task.dataset.employeeId
    const employer_id = task.dataset.employerId
  
    // 要寫一個確定 employee 跟 employer match 的判斷

    // employer is the subscriber and employee broadcast location to employer
    // the following means consumer (employer) subscribes the channel of employee
    const locationChannel = consumer.subscriptions.create({ channel: "LocationsChannel", employee_id: employee_id }, {
      
      connected() {
        // Called when the subscription is ready for use on the server
        console.log("監看 employee 中")
      },
  
      disconnected() {
        // Called when the subscription has been terminated by the server
      },
  
      received(data) {
        console.log("==============================")
        console.log("==============================")
        console.log(data)
        // Called when there's incoming data on the websocket for this channel
        // console.log(data)
      }
    });
    
  }

})
