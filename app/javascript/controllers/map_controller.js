import { Controller } from "stimulus";
import consumer from "../channels/consumer";

export default class extends Controller {
  static targets = [];
  connect() {
    const task = document.querySelector(
      'section[class~="task-show-container"]'
    );
    const employeeId = task.dataset.employeeId;
    const employerId = task.dataset.employerId;
    const currentUser = task.dataset.currentUser;
    const employeeMap = document.getElementById("employee");
    const storeLatitude = Number(employeeMap.dataset.lat);
    const storeLongitude = Number(employeeMap.dataset.lng);
    const employeeMapOption = {
      // 地圖初始化設定：位置與縮放
      zoom: 14,
      center: { lat: storeLatitude, lng: storeLongitude }, // 這邊之後也要填入店家位置
    };
    const locationChannel = consumer.subscriptions.create(
      { channel: "LocationsChannel", employeeId: employeeId },
      {
        connected() {
          // Called when the subscription is ready for use on the server
        },
        disconnected() {
          // Called when the subscription has been terminated by the server
        },
        received(data) {
          // Called when there's incoming data on the websocket for this channel
          // 只有 employer 可以 receive 後更新位置
          const sentBy = data["location"]["sentBy"];
          const receivedBy = data["location"]["shouldBeReceivedBy"];
          const employeeLocation = data["location"]["employeeLocation"];
          if (currentUser === employerId) {
            let markerLocations = [
              [storeLatitude, storeLongitude], // 店家位置
              employeeLocation, // employee 位置（這就是要依照我的位置改變）
            ];
            drawEmployeeAndStoreMarkers(markerLocations);
            console.log(employeeLocation);
          }
        },
        speak(data) {
          this.perform("speak", { location: data });
        },
      }
    );
    // 頁面如果是雇主，就只能收到應徵者的位置資訊；頁面如果是應徵者，就能打位置資訊給雇主，而且能更新位置在自己的頁面
    if (currentUser === employeeId) {
      console.log("employee 近來嘍");
      const reportLocation = document.getElementById("report_location");
      reportLocation.addEventListener("click", (e) => {
        e.preventDefault();
        // call google map
        navigator.geolocation.getCurrentPosition(succeed, fail);
        function succeed(position) {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          const employeeLocation = [latitude, longitude];
          // 以下是 employee 的位置
          let markerLocations = [
            [storeLatitude, storeLongitude], // 店家位置
            employeeLocation, // employee 位置（這就是要依照我的位置改變）
          ];
          drawEmployeeAndStoreMarkers(markerLocations);
          // 如果不是此受僱者的雇主，就不傳位置資訊，但此使用者還是可以更新自己的位置
          locationChannel.speak({
            employeeLocation: employeeLocation,
            sentBy: employeeId,
            shouldBeReceivedBy: employerId,
          });
        }
        function fail() {
          console.log("error!");
        }
      });
    } else if (currentUser === employerId) {
      console.log("employer 近來嘍");
      // call google map
      let markerLocations = [
        [storeLatitude, storeLongitude], // 店家位置
      ];
      drawEmployeeAndStoreMarkers(markerLocations);
    } else {
      console.log("看熱鬧的 近來摟");
      let markerLocations = [
        [storeLatitude, storeLongitude]
      ];
      drawEmployeeAndStoreMarkers(markerLocations);
    }
    function drawEmployeeAndStoreMarkers(markerLocations) {
      const employeeLocationMap = new google.maps.Map(
        employeeMap,
        employeeMapOption
      );

      const markers = [
        {
          img: "https://image.flaticon.com/icons/png/512/287/287224.png",
          content: "商店位置",
        },
        {
          img: "https://image.flaticon.com/icons/png/512/287/287226.png",
          content: "排隊員位置",
        },
      ];

      for (let i = 0; i < markerLocations.length; i++) {
        const marker = new google.maps.Marker({
          position: new google.maps.LatLng(
            markerLocations[i][0],
            markerLocations[i][1]
          ),
          map: employeeLocationMap,
          icon: {
            url: markers[i].img,
            scaledSize: new google.maps.Size(45, 45),
          },
          animation: google.maps.Animation.DROP,
        });

        const infowindow = new google.maps.InfoWindow({
          content: markers[i].content,
        });

        marker.addListener("click", () => {
          infowindow.open(employeeMap, marker);
        });
      }
    }
  }
}
