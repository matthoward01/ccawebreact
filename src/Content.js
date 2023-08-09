import React from "react";
import { useState, useEffect } from "react";
import { Dropdown, Table, DropdownButton, ButtonGroup } from "react-bootstrap";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import { variables } from "./Variable";
import paginationFactory from "react-bootstrap-table2-paginator";

const Content = ({search}) => {
  const [data, setData] = useState([]);  
  const [value, setValue] = useState("all");
  const [type, setType] = useState("Hard Surface");
  
  useEffect(() => {
    if (type==="Hard Surface")
    {
    fetch(variables.API_CCA)
      .then((response) => {
        //console.log("resp", response);
        return response.json();
      })
      .then((dbData) => {
        //console.log("result", data);
        setData(dbData);

      });
    }
    else
    {
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
  },[type]);

  const handleTypeChange = (type) => {
    type === "Hard Surface" ? setType(type) : setType(type);
  };
  const handleChange = (val) => {
    setValue(val);
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

      <Table 
      striped bordered hover
      pagination={paginationFactory({ sizePerPage: 50 })}>
        <thead>
          <tr>
            <th>Sample ID</th>
            <th>Plate</th>
            <th>Style</th>
            <th>Template</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.filter(statusFilter => ((
            (value !== "all") ? statusFilter.Status.toString().toLowerCase() === value.toLowerCase() : statusFilter
          ))).filter(filteredData => ((
            filteredData.Sample_ID.toString().toLowerCase() + " " +
            filteredData.Back_Label_Plate.toString().toLowerCase() + " " +
            filteredData.Sample_Name.toString().toLowerCase() + " " +
            filteredData.Art_Type_BL.toString().toLowerCase() + " " +
            filteredData.Status.toString().toLowerCase()
            )).includes(search.toLowerCase())).map((data) => (
            <tr key={data.Sample_ID}>
              <td>{data.Sample_ID}</td>
              <td>{data.Back_Label_Plate}</td>
              <td>{data.Sample_Name}</td>
              <td>{data.Art_Type_BL}</td>
              <td>{data.Status}</td>              
            </tr>
          ))}
          {data.filter(statusFilter => ((
            (value !== "all") ? statusFilter.Status_FL.toString().toLowerCase() === value.toLowerCase() : statusFilter
          ))).filter(filteredData => ((
            filteredData.Sample_ID.toString().toLowerCase() + " " +
            filteredData.Face_Label_Plate.toString().toLowerCase() + " " +
            filteredData.Sample_Name.toString().toLowerCase() + " " +
            filteredData.Art_Type_FL.toString().toLowerCase() + " " +
            filteredData.Status_FL.toString().toLowerCase()
            )).includes(search.toLowerCase())).map((data) => (
            <tr key={data.Sample_ID}>
              <td>{data.Sample_ID}</td>
              <td>{data.Face_Label_Plate}</td>
              <td>{data.Sample_Name}</td>
              <td>{data.Art_Type_FL}</td>
              <td>{data.Status_FL}</td>              
            </tr>
          ))}
        </tbody>
      </Table>
    </main>
  );
};

export default Content;
