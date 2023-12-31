import React, { Fragment } from "react";
import { variables } from "./Variable";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";

const JobChangeSS = ({
  setChangeData,
  handleJobModalCancel,
  handleChangeModalCancel,
  Sample_ID,
  Program,
  jobData,
}) => {
  const [change, setChange] = useState(jobData[0].Change);
  //console.log(id);

  const handleSubmit = () => {
    //console.log(`ID: ${Sample_ID}, Change: ${change}`);

    fetch(variables.API_CCASS + "JobSS/Change", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Sample_ID,
        change,
        Program,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          //alert(result);
          setChangeData(change);
          handleChangeModalCancel();
          handleJobModalCancel();
        },
        (error) => {
          alert("Failed");
        }
      );
  };

  return (
    <Fragment>
      <Fragment>
        <Form>
          <Form.Group>
            <Form.Label>Changes:</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              onChange={(e) => setChange(e.target.value)}
            >
              {jobData[0].Change}
            </Form.Control>
          </Form.Group>
          <Button
            variant="outline-secondary"
            type="button"
            onClick={() => handleSubmit()}
          >
            Submit Changes
          </Button>
        </Form>
      </Fragment>
    </Fragment>
  );
};

export default JobChangeSS;
