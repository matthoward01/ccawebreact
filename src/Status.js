import React, { Fragment, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { variables } from "./Variable";
import StatusSnippet from "./StatusSnippet";

const Status = () => {
  const [hsProgramList, setHsProgramList] = useState([]);
  const [ssProgramList, setSsProgramList] = useState([]);

  useEffect(() => {
    getHsPrograms();
    getSsPrograms();
  }, []);

  function getHsPrograms() {
    setHsProgramList([]);
    fetch(variables.API_CCA + "ProgramsHS")
      .then((response) => {
        //console.log("resp", response);
        return response.json();
      })
      .then((dbData) => {
        //console.log("result", data);
        setHsProgramList(dbData);
      });
  }

  function getSsPrograms() {
    setSsProgramList([]);
    fetch(variables.API_CCASS + "ProgramsSS")
      .then((response) => {
        //console.log("resp", response);
        return response.json();
      })
      .then((dbData) => {
        //console.log("result", data);
        setSsProgramList(dbData);
      });
  }

  if (!hsProgramList.length || !ssProgramList.length) {
    return <h1>Loading...</h1>;
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
  );
};

export default Status;
