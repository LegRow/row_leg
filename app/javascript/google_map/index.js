document.addEventListener('turbolinks:load', () => {

  const maparea = document.getElementById("maparea");
  const option = {
    zoom: 8,
    center: {lat: -34.397, lng: 150.644},
  };

  window.initMap = function() {
    mapdisplay = new google.maps.Map(maparea, option);
  }

  initMap()

})
