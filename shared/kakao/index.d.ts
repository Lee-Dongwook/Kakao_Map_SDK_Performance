declare module "@kakao/map" {
  interface LatLng {
    latitude: number;
    longitude: number;
  }

  function initMap(): Promise<void>;
  function createMap(mapContainer: HTMLElement, options: any): any;
  function getCurrentPosition(): Promise<LatLng>;
}
