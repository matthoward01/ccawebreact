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
  const handleUpdateDbModalCancel = () => {
    setIsUpdateDbModalVisible(false);
  };

  const handleSubmit = () => {
    setIsProcessing(true)
    if (type === "Hard Surface") {
      fetch(variables.API_CCA + "UpdateHS", {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          xlsFileName,
        }),
      })
        .then((res) => res.json())
        .then(
          (result) => {
            //alert(result);
            handleUpdateDbModalCancel();
            setIsProcessing(false)
          },
          (error) => {
            alert("Failed");
            setIsProcessing(false)
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
          xlsFileName,
        }),
      })
        .then((res) => res.json())
        .then(
          (result) => {
            //alert(result);
            handleUpdateDbModalCancel();
            setIsProcessing(false)
          },
          (error) => {
            alert("Failed");
            setIsProcessing(false)
          }
        );
    }
  };

  return (
    <Modal
      size="lg"
      show={isUpdateDbModalVisible}
      onHide={handleUpdateDbModalCancel}
      backdrop="Static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Update {type} Database</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isProcessing ? (
          <Form className="d-flex">
            <Form.Control
              id="fileName"
              type="text"
              placeholder="Path to Xls File"
              className="me-2"
              aria-label="Filename"
              value={xlsFileName}
              onChange={(e) => setXlsFileName(e.target.value)}
            />
          </Form>
        ) : (
          <h1>Upload Processing...Don't Close...</h1>
        )}
      </Modal.Body>
      {!isProcessing ? (
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
