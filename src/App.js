import "./App.css";
import Header from "./Header";
import Navigation from "./Navigation";
import Content from "./Content";
import { useState } from "react";

function App() {
  const [search, setSearch] = useState("");
  console.log(search);
  return (
    <div className="App">
      <Header />
      <Navigation search={search} setSearch={setSearch} />
      <Content search={search} />
    </div>
  );
}

export default App;
