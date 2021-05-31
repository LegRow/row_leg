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
      let markerLocations = [[storeLatitude, storeLongitude]];
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

      if (markerLocations[1]) {
        // 使用directionAPI 計算兩點距離與所需時間
        let directionsService = new google.maps.DirectionsService();
        // 使用directionsRenderer 將兩點間路徑條渲染到地圖上
        let directionsRenderer = new google.maps.DirectionsRenderer({
          suppressMarkers: true,
        });
        directionsRenderer.setMap(employeeLocationMap);
        // 設定起點 目的地等option
        const route = {
          origin: {
            lat: markerLocations[1][0],
            lng: markerLocations[1][1],
          },
          destination: {
            lat: markerLocations[0][0],
            lng: markerLocations[0][1],
          },
          travelMode: "DRIVING",
        };
        // route request成功後會得到一個DirectionsResult跟status
        directionsService.route(route, function (result, status) {
          if (status !== "OK") {
            window.alert("Directions request failed due to " + status);
            return;
          } else {
            directionsRenderer.setDirections(result);
            // 這個object的legs屬性裡就是我們要的各種資料 如兩點距離、要花多少時間等等
            const directionsData = result.routes[0].legs[0];
            const distance = directionsData.distance.text;
            const duration = directionsData.duration.text;
            const mapProgress = document.querySelector("#map-progress");

            mapProgress.textContent = `距離目的地:${distance} 最快:${duration}後抵達`;
            window.setTimeout(() => (mapProgress.textContent = ""), 15000);
          }
        });
      }
    }
  }
}
