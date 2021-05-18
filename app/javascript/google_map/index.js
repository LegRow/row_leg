document.addEventListener('turbolinks:load', () => {

  // 以下是店家的位置 (要 show 在應徵者的頁面)
  const maparea = document.getElementById("maparea");
  const option = {
    zoom: 8,
    center: {lat: -34.397, lng: 150.644},
  }; 

  // 以下是 employee 的即時位置（要 show 在雇主的頁面）
  const employee_map = document.getElementById("employee");
  const employee_map_option = {
    zoom: 14,
    center: {lat: 25.03, lng: 121.30},
  };
  // const marker = new google.maps.Marker({
  //   position: {lat: 100.397, lng: 150.644},
  //   map: employee_location_map,
  // });

  window.initMap = function() {
    // 以下是店家位置
    new google.maps.Map(maparea, option);

    // 以下是 employee 的位置
    const employee_location_map = new google.maps.Map(employee_map, employee_map_option);
    const markerlocations = [
      [25.03, 120.30], // 店家位置
      [24.03, 121.30], // employee 位置
     ];
    for(i  = 0;  i < markerlocations.length; i++) {
      const marker = new google.maps.Marker({
        position: new google.maps.LatLng(markerlocations[i][0], markerlocations[i][1]),
        map: employee_location_map,
      });
    }
  }

  initMap()

})
