import React from "react";
import { useState, useEffect } from "react";
import { Dropdown, Table, DropdownButton, ButtonGroup } from "react-bootstrap";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import { variables } from "./Variable";

const Content = () => {
  const fetchHSData = () => {
    fetch(variables.API_URL)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setHsData(data);
      });
  };
  useEffect(() => {
    fetchHSData();
  }, []);
  const [hsData, setHsData] = useState([
    {
      id: 1,
      plate: "123456",
      style: "ThisStyle",
      template: "HS18x24BL",
      status: "Approved",
    },
    {
      id: 2,
      plate: "654321",
      style: "ThatStyle",
      template: "HS18x24BL",
      status: "Rejected",
    },
  ]);
  const [ssData, setSsData] = useState([
    {
      id: 1,
      plate: "987654",
      style: "ThisStyleSS",
      template: "HS18x24BL",
      status: "Approved",
    },
    {
      id: 2,
      plate: "456789",
      style: "ThatStyleSS",
      template: "HS18x24BL",
      status: "Rejected",
    },
  ]);
  const [value, setValue] = useState("all");
  const [typeData, setTypeData] = useState(hsData);
  const [type, setType] = useState("Hard Surface");
  const handleTypeChange = (type) => {
    type === "Hard Surface" ? setTypeData(hsData) : setTypeData(ssData);
    type === "Hard Surface" ? setType(type) : setType(type);
  };
  const handleChange = (val) => {
    setValue(val);
  };

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
            Approvals Only
          </ToggleButton>
          <ToggleButton
            id="tbg-btn-3"
            variant="outline-secondary"
            value="Approved-Pending"
          >
            Approvals Pending Only
          </ToggleButton>
          <ToggleButton
            id="tbg-btn-4"
            variant="outline-secondary"
            value="Questions"
          >
            Questions Only
          </ToggleButton>
          <ToggleButton
            id="tbg-btn-5"
            variant="outline-secondary"
            value="Rejected"
          >
            Rejection Only
          </ToggleButton>
        </ToggleButtonGroup>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Plate</th>
            <th>Style</th>
            <th>Template</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {typeData.map((data) => (
            <tr key={data.id}>
              <td>{data.id}</td>
              <td>{data.plate}</td>
              <td>{data.style}</td>
              <td>{data.template}</td>
              <td>{data.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </main>
  );
};

export default Content;
