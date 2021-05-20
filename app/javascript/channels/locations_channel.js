import consumer from "./consumer"

document.addEventListener('turbolinks:load', () => {

  const task = document.querySelector('section[class~="task-show-container"]');

  // 進到 task show 頁面才可以得到 task 的 id，才做接下來的事情（預設 employee 開啟 task 的 show 頁面就傳遞一次位置資訊給 employer）
  if (task) {

    // 獲得此 task 之 employee_id
    employee_id = task.dataset.employeeId

    consumer.subscriptions.create({ channel: "LocationsChannel" }, {
      
      connected() {
        // Called when the subscription is ready for use on the server
        console.log("雇主您好，應徵者進入任務詳情頁面！")
      },
  
      disconnected() {
        // Called when the subscription has been terminated by the server
      },
  
      received(data) {
        // Called when there's incoming data on the websocket for this channel
        // 只接收此任務 employee 的位置，其他 employee 排除
        if (data['id'] === $('#map').data('id')) { // You may want to check whether you are dealing with the right map
  		if (data['latitude']) { // Don't bother updating the data if there is no latitude
  			$('#map').data(data); // Overwrite the data attributes with the latest data. Make sure the data matches what you are expecting in the map.
  		};
  	}
  	  }

    });
  }
});
