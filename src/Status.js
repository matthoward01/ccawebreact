import React, { Fragment, useEffect, useState } from "react";
import { Table, Modal, Button } from "react-bootstrap";
import { variables } from "./Variable";
import StatusSnippet from "./StatusSnippet";

const Status = ({ isStatusModalVisible, handleStatusModalCancel }) => {
  const [hsProgramList, setHsProgramList] = useState([]);
  const [ssProgramList, setSsProgramList] = useState([]);

  useEffect(() => {
    const statusInterval = setInterval(() => {
      getHsPrograms();
      getSsPrograms();
    }, 2000);
    return () => clearInterval(statusInterval);
  }, []);

  useEffect(() => {
    getHsPrograms();
    getSsPrograms();
  }, []);

  function getHsPrograms() {
    //setHsProgramList([]);
    fetch(variables.API_CCA + "ProgramsHS")
      .then((response) => {
        //console.log("resp", response);
        return response.json();
      })
      .then((dbData) => {
        //console.log("StatusHS", dbData);
        setHsProgramList(dbData);
      });
  }

  function getSsPrograms() {
    //setSsProgramList([]);
    fetch(variables.API_CCASS + "ProgramsSS")
      .then((response) => {
        //console.log("resp", response);
        return response.json();
      })
      .then((dbData) => {
        //console.log("StatusSS", dbData);
        setSsProgramList(dbData);
      });
  }

  const uniqueHsProgramsMap = new Map(
    hsProgramList.map((pos) => [pos.Program, pos])
  );
  const uniqueHsPrograms = [...uniqueHsProgramsMap.values()];

  const uniqueSsProgramsMap = new Map(
    ssProgramList.map((pos) => [pos.Program, pos])
  );
  const uniqueSsPrograms = [...uniqueSsProgramsMap.values()];

  return (
    <Modal
      size="lg"
      show={isStatusModalVisible}
      onHide={handleStatusModalCancel}
      backdrop={true}
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Status</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <table width="100%">
          <tbody>
            <tr>
              <td style={{ verticalAlign: "top" }}>
                {uniqueSsPrograms.map((ssProgram) => (
                  <Fragment>
                    <b>{ssProgram.Program}</b>
                    <Table>
                      <tbody>
                        <tr>
                          <td>
                            <ul>
                              <StatusSnippet
                                status="Not Done"
                                program={ssProgram}
                                programList={ssProgramList}
                              />
                              <StatusSnippet
                                status="Approved"
                                program={ssProgram}
                                programList={ssProgramList}
                              />
                              <StatusSnippet
                                status="Waiting for Approval"
                                program={ssProgram}
                                programList={ssProgramList}
                              />
                              <StatusSnippet
                                status="Questions"
                                program={ssProgram}
                                programList={ssProgramList}
                              />                              
                              <StatusSnippet
                                status="Awaiting Corrections"
                                program={ssProgram}
                                programList={ssProgramList}
                              />
                              <StatusSnippet
                                status="Rejected"
                                program={ssProgram}
                                programList={ssProgramList}
                              />
                              <li>
                                Total:{" "}
                                <b>
                                  {ssProgramList.filter(
                                    (l) => l.Program === ssProgram.Program
                                  ).length * 2}
                                </b>
                                <ul>
                                  <li>
                                    Front Labels:{" "}
                                    <b>
                                      {
                                        ssProgramList.filter(
                                          (l) => l.Program === ssProgram.Program
                                        ).length
                                      }
                                    </b>
                                  </li>
                                  <li>
                                    Back Labels:{" "}
                                    <b>
                                      {
                                        ssProgramList.filter(
                                          (l) => l.Program === ssProgram.Program
                                        ).length
                                      }
                                    </b>
                                  </li>
                                </ul>
                              </li>
                            </ul>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </Fragment>
                ))}
              </td>
              <td style={{ verticalAlign: "top" }}>
                {uniqueHsPrograms.map((hsProgram) => (
                  <Fragment>
                    <b>{hsProgram.Program}</b>
                    <Table>
                      <tbody>
                        <tr>
                          <td>
                            <ul>
                              <StatusSnippet
                                status="Not Done"
                                program={hsProgram}
                                programList={hsProgramList}
                              />
                              <StatusSnippet
                                status="Approved"
                                program={hsProgram}
                                programList={hsProgramList}
                              />
                              <StatusSnippet
                                status="Waiting for Approval"
                                program={hsProgram}
                                programList={hsProgramList}
                              />
                              <StatusSnippet
                                status="Questions"
                                program={hsProgram}
                                programList={hsProgramList}
                              />
                              <StatusSnippet
                                status="Awaiting Corrections"
                                program={hsProgram}
                                programList={hsProgramList}
                              />
                              <StatusSnippet
                                status="Rejected"
                                program={hsProgram}
                                programList={hsProgramList}
                              />
                              <li>
                                Total:{" "}
                                <b>
                                  {hsProgramList.filter(
                                    (l) => l.Program === hsProgram.Program
                                  ).length * 2}
                                </b>
                                <ul>
                                  <li>
                                    Front Labels:{" "}
                                    <b>
                                      {
                                        hsProgramList.filter(
                                          (l) => l.Program === hsProgram.Program
                                        ).length
                                      }
                                    </b>
                                  </li>
                                  <li>
                                    Back Labels:{" "}
                                    <b>
                                      {
                                        hsProgramList.filter(
                                          (l) => l.Program === hsProgram.Program
                                        ).length
                                      }
                                    </b>
                                  </li>
                                </ul>
                              </li>
                            </ul>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </Fragment>
                ))}
              </td>
            </tr>
          </tbody>
        </table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleStatusModalCancel}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Status;
