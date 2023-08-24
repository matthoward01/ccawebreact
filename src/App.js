import "./App.css";
import Header from "./Header";
import Navigation from "./Navigation";
import Content from "./Content";
import { useState, useEffect } from "react";
import { variables } from "./Variable";
import UpdateDb from "./UpdateDb";
import Status from "./Status";

function App() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [statusValue, setStatusValue] = useState("all");
  const [programValue, setProgramValue] = useState("all");
  const [isStatusModalVisible, setIsStatusModalVisible] = useState(false);
  const [isUpdateDbModalVisible, setIsUpdateDbModalVisible] = useState(false);
  const [type, setType] = useState(
    JSON.parse(localStorage.getItem("type")) || "Hard Surface"
  );

  useEffect(() => {
    getData();
  }, [type]);

  function getData() {
    if (type === "Hard Surface") {
      setData([]);
      fetch(variables.API_CCA + "TableHS")
        .then((response) => {
          //console.log("resp", response);
          return response.json();
        })
        .then((dbData) => {
          console.log("TableHS", dbData);
          setData(dbData);
        });
    } else {
      setData([]);
      fetch(variables.API_CCASS + "TableSS")
        .then((response) => {
          //console.log("resp", response);
          return response.json();
        })
        .then((dbData) => {
          console.log("TableSS", dbData);
          setData(dbData);
        });
    }
  }

  const showStatusModal = () => {
    setIsStatusModalVisible(true);
  };

  const handleChange = (val) => {
    setStatusValue(val);
  };

  const handleProgramFilter = (val) => {
    setProgramValue(val);
  };

  const handleStatusModalCancel = () => {
    setIsStatusModalVisible(false);
  };

  const handleTypeChange = (typeChoice) => {
    typeChoice === "Hard Surface" ? setType(typeChoice) : setType(typeChoice);
    localStorage.setItem("type", JSON.stringify(typeChoice));
  };

  const showUpdateDbModal = () => {
    setIsUpdateDbModalVisible(true);
  };

  const uniqueProgramMap = new Map(data.map((pos) => [pos.Program, pos]));
  const uniqueProgram = [...uniqueProgramMap.values()];

  return (
    <div className="App">
      <Header />
      <Navigation
        search={search}
        setSearch={setSearch}
        showStatusModal={showStatusModal}
        type={type}
        handleTypeChange={handleTypeChange}
        statusValue={statusValue}
        handleChange={handleChange}
        programValue={programValue}
        handleProgramFilter={handleProgramFilter}
        uniqueProgram={uniqueProgram}
        showUpdateDbModal={showUpdateDbModal}
      />
      <Content
        search={search}
        setStatusValue={setStatusValue}
        setProgramValue={setProgramValue}
        setType={setType}
        type={type}
        getData={getData}
        data={data}
        statusValue={statusValue}
        programValue={programValue}
      />
      <Status
        isStatusModalVisible={isStatusModalVisible}
        handleStatusModalCancel={handleStatusModalCancel}
      />
      <UpdateDb
        isUpdateDbModalVisible={isUpdateDbModalVisible}
        setIsUpdateDbModalVisible={setIsUpdateDbModalVisible}
        type={type}
      />
    </div>
  );
}

export default App;
