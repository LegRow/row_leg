document.addEventListener('turbolinks:load', () => {

  // 以下是店家的位置 (要 show 在應徵者的頁面)
  const maparea = document.getElementById("maparea");
  const option = {
    zoom: 8,
    center: {lat: -34.397, lng: 150.644},
  }; 

  // 以下是 employee 的即時位置（要 show 在雇主的頁面）
  const employeeMap = document.getElementById("employee");
  const employeeMapOption = {
    zoom: 14,
    center: {lat: 25.009571560497424, lng: 121.46213302250602}, // 這邊之後也要填入店家位置
  };

  window.initMap = function() {
    // 以下是店家位置
    new google.maps.Map(maparea, option);

    // trigger google map current position, once succeed then trigger succeed function
    navigator.geolocation.getCurrentPosition(succeed, fail)

    function succeed(position) {
      const latitude  = position.coords.latitude;
      const longitude = position.coords.longitude;
      employeeLocation = [latitude, longitude]

      // 以下是 employee 的位置
      let markerLocations = [
        [25.009571560497424, 121.46213302250602], // 店家位置
        employeeLocation // employee 位置（這就是要依照我的位置改變）
       ];
      
      drawEmployeeAndStoreMarkers(markerLocations)
    }

    function fail() {
      console.log("error!")
    }

    function drawEmployeeAndStoreMarkers (markerLocations) {
      const employeeLocationMap = new google.maps.Map(employeeMap, employeeMapOption);
      for(let i  = 0;  i < markerLocations.length; i++) {
        new google.maps.Marker({
          position: new google.maps.LatLng(markerLocations[i][0], markerLocations[i][1]),
          map: employeeLocationMap,
        });
        console.log(markerLocations)
      }
    }

    console.log("testing")
    // // 每隔 30 秒更新一次位置
    // setInterval(function(e) {
    //   if (employeeLocation) {
    //     markerLocations.setPosition(loc) // This will move the marker to the new location
    //   };
    // }, 30000)

  }

  // setInterval(initMap, 30000)

})
