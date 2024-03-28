function initMap() {
  const mapContainer = document.getElementById("map");
  const mapOption = {
    center: new kakao.maps.LatLng(37.566535, 126.9779692),
    level: 3,
  };

  const map = new kakao.maps.Map(mapContainer, mapOption);

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      const locPosition = new kakao.maps.LatLng(lat, lng);
      map.setCenter(locPosition);
    });
  }
}

function updateMapCenter(lat, lng) {
  const newPos = new kakao.maps.LatLng(lat, lng);
  map.setCenter(newPos);
}

window.onload = initMap;
window.updateMapCenter = updateMapCenter;
