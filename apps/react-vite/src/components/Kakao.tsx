import { useState, useEffect, useRef, type MutableRefObject } from "react";

interface Marker {
  position: {
    lat: number;
    lng: number;
  };
  content: string;
}

declare global {
  interface Window {
    kakao: any;
  }
}

interface KakaoMapProps {
  width?: string;
  height?: string;
  searchKeyword?: string;
}

function KakaoMap({
  width = "400px",
  height = "calc(40vh)",
  searchKeyword,
}: KakaoMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [markers, setMarkers] = useState<Marker[]>([]);

  useEffect(() => {
    const initializeMap = (latitude, longitude) => {
      performance.mark("initMapStart");

      const container = document.getElementById("map");
      const defaultOptions = {
        center: new window.kakao.maps.LatLng(latitude, longitude),
        level: 3,
      };

      const options = searchKeyword ? { ...defaultOptions } : defaultOptions;
      const map = new window.kakao.maps.Map(container!, options);
      (mapRef as MutableRefObject<any>).current = map;

      performance.mark("initMapEnd");
      performance.measure("initMap", "initMapStart", "initMapEnd");

      const measure = performance.getEntriesByName("initMap");
      console.log(measure);

      window.kakao.maps.event.addListener(map, "dragstart", function () {
        performance.mark("dragstart");
      });

      window.kakao.maps.event.addListener(map, "dragend", function () {
        performance.mark("dragend");
        performance.measure("dragPerformance", "dragstart", "dragend");
      });

      const measureDrag = performance.getEntriesByName("dragPerformance")[0];
      console.log(measureDrag);

      window.kakao.maps.event.addListener(map, "zoom_changed", function () {});

      if (searchKeyword) {
        searchPlaces(map, searchKeyword);
      }
    };

    // 검색어를 적용하는 함수
    const searchPlaces = (map: any, keyword: string) => {
      const ps = new window.kakao.maps.services.Places();

      ps.keywordSearch(keyword, (data: any, status: any) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const bounds = new window.kakao.maps.LatLngBounds();
          const searchMarkers: Marker[] = [];

          for (let i = 0; i < data.length; i++) {
            disPlayMarker(map, data[i]);
            searchMarkers.push({
              position: {
                lat: data[i].y,
                lng: data[i].x,
              },
              content: data[i].place_name,
            });
            bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
          }
          setMarkers(searchMarkers);
          map.setBounds(bounds);
        }
      });
    };

    // 검색어 입력 시, Marker 표출
    const infoWindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });
    const disPlayMarker = (map: any, place: any) => {
      const marker = new window.kakao.maps.Marker({
        map: map,
        position: new window.kakao.maps.LatLng(place.y, place.x),
      });

      window.kakao.maps.event.addListener(marker, "click", function () {
        infoWindow.setContent(
          '<div style="padding:5px;font-size:12px;">' +
            place.place_name +
            "</div>"
        );
        infoWindow.open(map, marker);
      });

      const latitudeList: number[] = [];
      latitudeList.push(place.x, place.y);

      localStorage.setItem("latitude", JSON.stringify(latitudeList));
    };

    // 초기에 GPS를 이용한 렌더링
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          initializeMap(latitude, longitude);
        }
      );
    }
  }, [searchKeyword]);

  return (
    <div style={styles.container}>
      <div id="map" ref={mapRef} style={{ width: width, height: height }}></div>
      <div style={styles.sidebar}>
        <div style={styles.sidebarContent}>
          <div style={styles.title}>여행하실 장소들</div>
          <hr />
          <div style={styles.placeList}>
            {markers.slice(0, 6).map((marker, index) => (
              <div key={index} style={styles.placeItem}>
                <div style={styles.placeIndex}>{index + 1}.</div>
                <div style={styles.placeContent}>{marker.content}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
  },
  sidebar: {
    width: "300px",
    backgroundColor: "#f9f9f9",
    padding: "20px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
  },
  sidebarContent: {
    marginBottom: "20px",
  },
  title: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  placeList: {
    maxHeight: "300px",
    overflowY: "auto",
  },
  placeItem: {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
  },
  placeIndex: {
    marginRight: "10px",
    fontWeight: "bold",
  },
  placeContent: {
    flex: 1,
  },
};

export default KakaoMap;
