import React, { useEffect } from "react";
import SearchInput from "./components/searchInput";
import { initMap } from "@kakao/map";

function App() {
  useEffect(() => {
    initMap();
  }, []);
  return (
    <div>
      <h1>지도 검색</h1>
      <SearchInput />
      <div id="map" style={{ width: "500px", height: "400px" }}></div>
    </div>
  );
}

export default App;
