import React from "react";
import { useState } from "react";
import {
  Dropdown,
  Table,
  DropdownButton,
  Modal,
  Button,
} from "react-bootstrap";
import { variables } from "./Variable";
import JobInfoHS from "./JobInfoHS";
import JobInfoSS from "./JobInfoSS";

const Content = ({
  search,
  type,
  getData,
  data,
  statusValue,
  programValue,
}) => {
  /* const [statusValue, setStatusValue] = useState("all");
  const [programValue, setProgramValue] = useState("all");
  const [type, setType] = useState(
    JSON.parse(localStorage.getItem("type")) || "Hard Surface"
  ); */
  //const [jobData, setJobData] = useState([]);
  const [isJobModalVisible, setIsJobModalVisible] = useState(false);

  const [jobId, setJobId] = useState("");
  const [sorting, setSorting] = useState("Sample_ID");
  const [sortDirection, setSortDirection] = useState(true);

  const handleStatusChange = (newStatus) => {
    //console.log(newStatus);

    var splitResponse = newStatus.split(",");
    var Status_Type = splitResponse[0];
    var Sample_ID = splitResponse[1];
    var New_Status = splitResponse[2];
    /* console.log(
      `Status Type: ${Status_Type}, Sample ID: ${Sample_ID}, New Status: ${New_Status}`
    ); */
    var api = variables.API_CCA + "JobHS/Status";
    if (type !== "Hard Surface") {
      api = variables.API_CCASS + "JobSS/Status";
    }
    fetch(api, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Status_Type,
        Sample_ID,
        New_Status,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          //alert(result);
          getData();
          scrollToElement(Sample_ID);
        },
        (error) => {
          alert("Failed");
        }
      );
  };

  const scrollToElement = (scrollId) => {
    const container = document.getElementById(scrollId);
    container.scrollIntoView({ behavior: "smooth" });
  };

  function sortingBy(sortChoice) {
    if (sortChoice === "sampleid") {
      sorting === "Sample_ID"
        ? setSortDirection(!sortDirection)
        : setSortDirection(true);
      setSorting("Sample_ID");
    }
    if (sortChoice === "flplate") {
      sorting === "Face_Label_Plate"
        ? setSortDirection(!sortDirection)
        : setSortDirection(true);
      setSorting("Face_Label_Plate");
    }
    if (sortChoice === "blplate") {
      sorting === "Back_Label_Plate"
        ? setSortDirection(!sortDirection)
        : setSortDirection(true);
      setSorting("Back_Label_Plate");
    }
    if (sortChoice === "style") {
      sorting === "Sample_Name"
        ? setSortDirection(!sortDirection)
        : setSortDirection(true);
      setSorting("Sample_Name");
    }
    if (sortChoice === "flstatus") {
      sorting === "Status_FL"
        ? setSortDirection(!sortDirection)
        : setSortDirection(true);
      setSorting("Status_FL");
    }
    if (sortChoice === "blstatus") {
      sorting === "Status"
        ? setSortDirection(!sortDirection)
        : setSortDirection(true);
      setSorting("Status");
    }
  }

  function statusColoring(currentStatus) {
    var color = "";

    if (currentStatus === "Approved") {
      color = "success";
    }
    if (currentStatus === "Waiting for Approval") {
      color = "warning";
    }
    if (currentStatus === "Rejected") {
      color = "danger";
    }
    if (currentStatus === "Questions") {
      color = "info";
    }
    return color;
  }

  const showJobModal = (id) => {
    //console.log("Passed ID:" + id);
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
      <Table bordered hover>
        <thead>
          <tr>
            <th onClick={() => sortingBy("sampleid")}>Sample ID</th>
            <th onClick={() => sortingBy("flplate")}>FL Plate</th>
            <th onClick={() => sortingBy("blplate")}>BL Plate</th>
            <th onClick={() => sortingBy("style")}>Style</th>
            <th>FL Template</th>
            <th>BL Template</th>
            <th onClick={() => sortingBy("flstatus")}>FL Status</th>
            <th onClick={() => sortingBy("blstatus")}>BL Status</th>
          </tr>
        </thead>
        <tbody>
          {data
            .sort(
              sortDirection
                ? (a, b) => a[sorting].localeCompare(b[sorting])
                : (a, b) => b[sorting].localeCompare(a[sorting])
            )
            .filter((statusFilter) =>
              statusValue !== "all"
                ? statusFilter.Status.toString().toLowerCase() ===
                  statusValue.toLowerCase()
                : statusFilter
            )
            .filter((programFilter) =>
              programValue !== "all"
                ? programFilter.Program.toString().toLowerCase() ===
                  programValue.toLowerCase()
                : programFilter
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
              <tr key={data.Sample_ID} id={data.Sample_ID}>
                <td
                  onClick={() =>
                    showJobModal(data.Sample_ID + "," + data.Program)
                  }
                >
                  {data.Sample_ID}
                </td>
                <td
                  onClick={() =>
                    showJobModal(data.Sample_ID + "," + data.Program)
                  }
                >
                  {data.Face_Label_Plate}
                </td>
                <td
                  onClick={() =>
                    showJobModal(data.Sample_ID + "," + data.Program)
                  }
                >
                  {data.Back_Label_Plate}
                </td>
                <td
                  onClick={() =>
                    showJobModal(data.Sample_ID + "," + data.Program)
                  }
                >
                  {data.Sample_Name + " - " + data.Feeler}
                </td>
                <td
                  onClick={() =>
                    showJobModal(data.Sample_ID + "," + data.Program)
                  }
                >
                  {data.Art_Type_FL}
                </td>
                <td
                  onClick={() =>
                    showJobModal(data.Sample_ID + "," + data.Program)
                  }
                >
                  {data.Art_Type_BL}
                </td>
                <td>
                  <DropdownButton
                    variant={statusColoring(data.Status_FL)}
                    title={data.Status_FL}
                    onSelect={handleStatusChange}
                  >
                    <Dropdown.Item
                      eventKey={["fl", data.Sample_ID, "Approved"]}
                    >
                      Approved
                    </Dropdown.Item>
                    <Dropdown.Item
                      eventKey={["fl", data.Sample_ID, "Waiting for Approval"]}
                    >
                      Waiting for Approval
                    </Dropdown.Item>
                    <Dropdown.Item
                      eventKey={["fl", data.Sample_ID, "Questions"]}
                    >
                      Questions
                    </Dropdown.Item>
                    <Dropdown.Item
                      eventKey={["fl", data.Sample_ID, "Rejected"]}
                    >
                      Rejected
                    </Dropdown.Item>
                  </DropdownButton>
                </td>
                <td>
                  <DropdownButton
                    variant={statusColoring(data.Status)}
                    title={data.Status}
                    onSelect={handleStatusChange}
                  >
                    <Dropdown.Item
                      eventKey={["bl", data.Sample_ID, "Approved"]}
                    >
                      Approved
                    </Dropdown.Item>
                    <Dropdown.Item
                      eventKey={["bl", data.Sample_ID, "Waiting for Approval"]}
                    >
                      Waiting for Approval
                    </Dropdown.Item>
                    <Dropdown.Item
                      eventKey={["bl", data.Sample_ID, "Questions"]}
                    >
                      Questions
                    </Dropdown.Item>
                    <Dropdown.Item
                      eventKey={["bl", data.Sample_ID, "Rejected"]}
                    >
                      Rejected
                    </Dropdown.Item>
                  </DropdownButton>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <Modal
        size="lg"
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
            <JobInfoSS
              handleJobModalCancel={handleJobModalCancel}
              type={type}
              id={jobId}
            />
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
