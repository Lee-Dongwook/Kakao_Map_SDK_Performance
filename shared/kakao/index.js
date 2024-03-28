const KakaoMap = {
  initMap: function () {
    return new Promise((resolve, reject) => {
      window.kakao.maps.load(() => {
        resolve();
      });
    });
  },
  createMap: function (mapContainer, options) {
    return new window.kakao.maps.Map(mapContainer, options);
  },
  getCurrentPosition: function () {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            resolve({ latitude, longitude });
          },
          (error) => {
            reject(error);
          }
        );
      } else {
        reject(new Error("Geolocation is not supported."));
      }
    });
  },
};

export default KakaoMap;
