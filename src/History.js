import React from "react";
import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { variables } from "./Variable";

const History = ({
  jobId,
  type,
  isJobModalVisible,
  setIsHistoryModalVisible,
  isHistoryModalVisible,
}) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    GetHistory();
  }, []);

  function GetHistory() {
    if (type === "Hard Surface") {
      setHistory([]);
      fetch(variables.API_CCA + "HistoryHS/" + jobId)
        .then((response) => {
          //console.log("resp", response);
          return response.json();
        })
        .then((dbData) => {
          console.log("HistoryHS", dbData);
          setHistory(dbData);
        });
    } else {
      setHistory([]);
      fetch(variables.API_CCASS + "HistorySS/" + jobId)
        .then((response) => {
          //console.log("resp", response);
          return response.json();
        })
        .then((dbData) => {
          console.log("HistorySS", dbData);
          setHistory(dbData);
        });
    }
  }

  const handleHistoryModalCancel = () => {
    setIsHistoryModalVisible(false);
  };

  if (!history.length) {
    return <h1>Loading...</h1>;
  }

  return (
    <Modal
      size="lg"
      show={isHistoryModalVisible}
      onHide={handleHistoryModalCancel}
      backdrop={true}
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>History</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {history.map((h) => (
          <li>
            {h.DateTime}: {h.Text} - {h.Type}
          </li>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleHistoryModalCancel}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default History;
