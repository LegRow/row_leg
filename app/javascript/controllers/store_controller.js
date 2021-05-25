import { Controller } from "stimulus";
export default class extends Controller {
  static targets = ["output"];

  connect() {
    let store_map;
    let marker;
    const maparea = document.getElementById("maparea");
    const lat = Number(maparea.dataset.lat);
    const lng = Number(maparea.dataset.lng);
    console.log(lat)
    console.log(lng)
    store_map = new google.maps.Map(maparea, {
      center: { lat: lat, lng: lng },
      zoom: 16,
    });
    marker = new google.maps.Marker({
      position: { lat: lat, lng: lng },
      map: store_map,
    });
  }
}
