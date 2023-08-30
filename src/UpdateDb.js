import React from "react";
import { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { variables } from "./Variable";

const UpdateDb = ({
  isUpdateDbModalVisible,
  setIsUpdateDbModalVisible,
  type,
}) => {
  const [xlsFileName, setXlsFileName] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCanada, setIsCanada] = useState(false);
  const [program, setProgram] = useState("");
  const handleUpdateDbModalCancel = () => {
    setIsUpdateDbModalVisible(false);
  };

  const handleSubmit = () => {
    setIsProcessing(true);    
    console.log(isCanada)
    if (type === "Hard Surface") {
      fetch(variables.API_CCA + "UpdateHS", {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          program,
          xlsFileName,
          isCanada,
        }),
      })
        .then((res) => res.json())
        .then(
          (result) => {
            //alert(result);
            handleUpdateDbModalCancel();
            setIsProcessing(false);
          },
          (error) => {
            alert("Failed");
            setIsProcessing(false);
          }
        );
    } else {
      fetch(variables.API_CCASS + "UpdateSS", {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          program,
          xlsFileName,
          isCanada,
        }),
      })
        .then((res) => res.json())
        .then(
          (result) => {
            //alert(result);
            handleUpdateDbModalCancel();
            setIsProcessing(false);
          },
          (error) => {
            alert("Failed");
            setIsProcessing(false);
          }
        );
    }
  };

  const handleCanadaClick = () => {
    setIsCanada(!isCanada);
  }

  return (
    <Modal
      size="lg"
      show={isUpdateDbModalVisible}
      onHide={handleUpdateDbModalCancel}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>{isCanada ? "Update Canada " + type + " Database" : "Update " + type + " Database"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isProcessing ? (
          <Form>
            <Form.Label>Program Name</Form.Label>
            <Form.Control
              id="program"
              type="text"
              placeholder="Program Name"
              className="me-2"
              aria-label="Program"
              value={program}
              onChange={(e) => setProgram(e.target.value)}
            />
            <Form.Label>Path to Spreadsheet</Form.Label>
            <Form.Control
              id="fileName"
              type="text"
              placeholder="Path to Xlsx File"
              className="me-2"
              aria-label="Filename"
              value={xlsFileName}
              onChange={(e) => setXlsFileName(e.target.value)}
            />
            <Form.Check
        type="switch"
        id="custom-switch"
        label="Is Canada"
        checked={isCanada}
        /* onChange={(e) => setIsCanada(e.target.value)} */
        onClick={handleCanadaClick}
      />
          </Form>
        ) : (
          <h1>Upload Processing...Don't Close...</h1>
        )}
      </Modal.Body>
      {!isProcessing && program.length > 0 && xlsFileName.length > 0 ? (
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleSubmit}>
            Update
          </Button>
        </Modal.Footer>
      ) : (
        <></>
      )}
    </Modal>
  );
};

export default UpdateDb;
