import { ChangeEvent, useState, useCallback } from "react";
import TripKakao from "./components/Kakao";
import { debounce } from "./hook/debounce";

function App() {
  const [searchKeyword, setSearchKeyword] = useState("");

  const printValue = useCallback(
    debounce((value: any) => console.log(value), 500),
    []
  );

  const handleSearchKeyword = (e: ChangeEvent<HTMLInputElement>) => {
    printValue(e.target.value);
    setSearchKeyword(e.target.value);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.container}>지도 검색</h1>
      <input style={styles.input} onChange={handleSearchKeyword} />
      <TripKakao searchKeyword={searchKeyword} />
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "600px",
    margin: "auto",
    textAlign: "center",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    fontSize: "24px",
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    marginBottom: "20px",
    boxSizing: "border-box",
  },
};

export default App;
