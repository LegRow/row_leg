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
        console.log(markerLocations[0], markerLocations[1]);
        console.log(123);
        // const line = new google.maps.Polyline({
        //   path: [
        //     { lat: markerLocations[0][0], lng: markerLocations[0][1] },
        //     { lat: markerLocations[1][0], lng: markerLocations[1][1] },
        //   ],
        //   map: employeeLocationMap,
        // });
        // 使用directionAPI 計算兩點距離與所需時間
        let directionsService = new google.maps.DirectionsService();
        // 使用directionsRenderer實體 將兩點距離渲染到地圖上
        let directionsRenderer = new google.maps.DirectionsRenderer();
        directionsRenderer.setMap(employeeLocationMap);
        // 設定路徑
        const route = {
          origin: {
            lat: markerLocations[1][0],
            lng: markerLocations[1][1],
          },
          destination: {
            lat: markerLocations[0][0],
            lng: markerLocations[0][1],
          },
          travelMode: "WALKING",
          // provideRouteAlternatives: true,
        };

        directionsService.route(route, function (response, status) {
          if (status !== "OK") {
            window.alert("Directions request failed due to " + status);
            return;
          } else {
            console.log(response);
            console.log(response.routes); //得到一個array 裡面有一個object 這個object的legs key裡有很多資訊 如距離 要花多少時間等等
            directionsRenderer.setDirections(response); // Add route to the map
            const directionsData = response.routes[0].legs[0]; // Get data about the mapped route
            console.log(directionsData);
            const icons = {
              start: new google.maps.MarkerImage(
                "https://image.flaticon.com/icons/png/512/287/287224.png",
                new google.maps.Size(45, 45)
              ),
              end: new google.maps.MarkerImage(
                "https://image.flaticon.com/icons/png/512/287/287226.png",
                new google.maps.Size(45, 45)
              ),
            };
            makeMarker(
              directionsData.start_location,
              icons.start,
              employeeLocationMap
            );
            makeMarker(
              directionsData.end_location,
              icons.end,
              employeeLocationMap
            );

            function makeMarker(position, icon, map) {
              new google.maps.Marker({
                position: position,
                icon: icon,
                map: map,
              });
            }

            // if (!directionsData) {
            //   window.alert("Directions request failed");
            //   return;
            // } else {
            //   document.getElementById("msg").innerHTML +=
            //     " Driving distance is " +
            //     directionsData.distance.text +
            //     " (" +
            //     directionsData.duration.text +
            //     ").";
            // }
          }
        });
      }
    }
  }
}

//  var leg = response.routes[0].legs[0];
//  makeMarker(leg.start_location, icons.start, "title", map);
//  makeMarker(leg.end_location, icons.end, "title", map);

// function makeMarker(position, icon, title, map) {
//      new google.maps.Marker({
//        position: position,
//        map: map,
//        icon: icon,
//        title: title,
//      });
//    }

//  var icons = {
//    start: new google.maps.MarkerImage(
//      // URL
//      "http://maps.google.com/mapfiles/ms/micons/blue.png",
//      // (width,height)
//      new google.maps.Size(44, 32),
//      // The origin point (x,y)
//      new google.maps.Point(0, 0),
//      // The anchor point (x,y)
//      new google.maps.Point(22, 32)
//    ),
//    end: new google.maps.MarkerImage(
//      // URL
//      "http://maps.google.com/mapfiles/ms/micons/green.png",
//      // (width,height)
//      new google.maps.Size(44, 32),
//      // The origin point (x,y)
//      new google.maps.Point(0, 0),
//      // The anchor point (x,y)
//      new google.maps.Point(22, 32)
//    ),
//  };
