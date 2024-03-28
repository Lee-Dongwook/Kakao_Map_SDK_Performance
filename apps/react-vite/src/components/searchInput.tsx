import React, { useState, type ChangeEvent } from "react";

const SearchInput = () => {
  const [input, setInput] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (input === "서울") {
      window.updateMapCenter();
    } else if (input === "부산") {
      window.updateMapCenter();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={input} onChange={handleChange} />
      <button type="submit">검색</button>
    </form>
  );
};

export default SearchInput;
