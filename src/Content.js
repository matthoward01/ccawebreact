import React from "react";
import { useState, useEffect } from "react";
import {
  Dropdown,
  Table,
  DropdownButton,
  ButtonGroup,
  Modal,
  Button,
} from "react-bootstrap";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import { variables } from "./Variable";
import JobInfoHS from "./JobInfoHS";
import JobInfoSS from "./JobInfoSS";

const Content = ({ search }) => {
  const [data, setData] = useState([]);
  const [value, setValue] = useState("all");
  const [type, setType] = useState("Hard Surface");
  //const [jobData, setJobData] = useState([]);
  const [isJobModalVisible, setIsJobModalVisible] = useState(false);
  const [jobId, setJobId] = useState("");

  useEffect(() => {
    if (type === "Hard Surface") {
      fetch(variables.API_CCA)
        .then((response) => {
          //console.log("resp", response);
          return response.json();
        })
        .then((dbData) => {
          //console.log("result", data);
          setData(dbData);
        });
    } else {
      fetch(variables.API_CCASS)
        .then((response) => {
          //console.log("resp", response);
          return response.json();
        })
        .then((dbData) => {
          //console.log("result", data);
          setData(dbData);
        });
    }
  }, [type]);

  const handleTypeChange = (type) => {
    type === "Hard Surface" ? setType(type) : setType(type);
  };
  const handleChange = (val) => {
    setValue(val);
  };

  function statusColoring(currentStatus) {
    var color = "";

    if (currentStatus === "Approved") {
      color = "green";
    }
    if (currentStatus === "Waiting for Approval") {
      color = "yellow";
    }
    if (currentStatus === "Rejected") {
      color = "red";
    }
    if (currentStatus === "Questions") {
      color = "lightblue";
    }
    return color;
  }

  const showJobModal = (id) => {
    console.log("Passed ID:" + id);
    setJobId(id);
    setIsJobModalVisible(true);
  };

  const handleJobModalCancel = () => {
    setIsJobModalVisible(false);
  };

  if (!data.length) {
    return <h1>Loading...</h1>;
  }
  return (
    <main>
      <div>
        <DropdownButton
          as={ButtonGroup}
          variant="outline-secondary"
          align="start"
          title={type}
          onSelect={handleTypeChange}
        >
          <Dropdown.Item eventKey="Hard Surface">Hard Surface</Dropdown.Item>
          <Dropdown.Item eventKey="Soft Surface">Soft Surface</Dropdown.Item>
        </DropdownButton>
        <ToggleButtonGroup
          type="radio"
          name="options"
          defaultValue={value}
          onChange={handleChange}
        >
          <ToggleButton id="tbg-btn-1" variant="outline-secondary" value="all">
            Show All
          </ToggleButton>
          <ToggleButton
            id="tbg-btn-2"
            variant="outline-secondary"
            value="Approved"
          >
            Approval
          </ToggleButton>
          <ToggleButton
            id="tbg-btn-3"
            variant="outline-secondary"
            value="Waiting for Approval"
          >
            Waiting for Approval
          </ToggleButton>
          <ToggleButton
            id="tbg-btn-4"
            variant="outline-secondary"
            value="Questions"
          >
            Question
          </ToggleButton>
          <ToggleButton
            id="tbg-btn-5"
            variant="outline-secondary"
            value="Rejected"
          >
            Rejection
          </ToggleButton>
        </ToggleButtonGroup>
      </div>

      <Table bordered hover>
        <thead>
          <tr>
            <th>Sample ID</th>
            <th>FL Plate</th>
            <th>BL Plate</th>
            <th>Style</th>
            <th>FL Template</th>
            <th>BL Template</th>
            <th>FL Status</th>
            <th>BL Status</th>
          </tr>
        </thead>
        <tbody>
          {data
            .filter((statusFilter) =>
              value !== "all"
                ? statusFilter.Status.toString().toLowerCase() ===
                  value.toLowerCase()
                : statusFilter
            )
            .filter((filteredData) =>
              (
                filteredData.Sample_ID.toString().toLowerCase() +
                " " +
                filteredData.Face_Label_Plate.toString().toLowerCase() +
                " " +
                filteredData.Back_Label_Plate.toString().toLowerCase() +
                " " +
                filteredData.Sample_Name.toString().toLowerCase() +
                " " +
                filteredData.Art_Type_FL.toString().toLowerCase() +
                " " +
                filteredData.Art_Type_BL.toString().toLowerCase() +
                " " +
                filteredData.Status_FL.toString().toLowerCase() +
                " " +
                filteredData.Status.toString().toLowerCase()
              ).includes(search.toLowerCase())
            )
            .map((data) => (
              <tr
                key={data.Sample_ID}
                onClick={() =>
                  showJobModal(
                    data.Sample_ID + "," + data.Manufacturer_Product_Color_ID
                  )
                }
              >
                <td>{data.Sample_ID}</td>
                <td>{data.Face_Label_Plate}</td>
                <td>{data.Back_Label_Plate}</td>
                <td>{data.Sample_Name}</td>
                <td>{data.Art_Type_FL}</td>
                <td>{data.Art_Type_BL}</td>
                <td style={{ backgroundColor: statusColoring(data.Status_FL) }}>
                  {data.Status_FL}
                </td>
                <td style={{ backgroundColor: statusColoring(data.Status) }}>
                  {data.Status}
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <Modal
        show={isJobModalVisible}
        onHide={handleJobModalCancel}
        backdrop={true}
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Job Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {type === "Hard Surface" ? (
            <JobInfoHS
              handleJobModalCancel={handleJobModalCancel}
              type={type}
              id={jobId}
            />
          ) : (
            <JobInfoSS type={type} id={jobId} />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleJobModalCancel}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </main>
  );
};

export default Content;
