import React, { Fragment, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { variables } from "./Variable";

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
  return (
    <table>
      <tbody>
        <tr>
          <td style={{verticalAlign: 'top'}}>
            {ssProgramList.map((ssProgram) => (
              <Fragment>
                <b>{ssProgram.Program}</b>
                <Table>
                  <tbody>
                    <tr>
                      <td>
                        <ul>
                          <li>
                            Approved:
                            <ul>
                              <li>Front Labels</li>
                              <li>Back Labels</li>
                            </ul>
                          </li>
                          <li>
                            Waiting for Approval:
                            <ul>
                              <li>Front Labels</li>
                              <li>Back Labels</li>
                            </ul>
                          </li>
                          <li>
                            Questions:
                            <ul>
                              <li>Front Labels</li>
                              <li>Back Labels</li>
                            </ul>
                          </li>
                          <li>
                            Rejected:
                            <ul>
                              <li>Front Labels</li>
                              <li>Back Labels</li>
                            </ul>
                          </li>
                          <li>
                            Total:
                            <ul>
                              <li>Front Labels</li>
                              <li>Back Labels</li>
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
          <td style={{verticalAlign: 'top'}}>
            {hsProgramList.map((hsProgram) => (
              <Fragment>
                <b>{hsProgram.Program}</b>
                <Table>
                  <tbody>
                    <tr>
                      <td>
                        <ul>
                          <li>
                            Approved:
                            <ul>
                              <li>Front Labels</li>
                              <li>Back Labels</li>
                            </ul>
                          </li>
                          <li>
                            Waiting for Approval:
                            <ul>
                              <li>Front Labels</li>
                              <li>Back Labels</li>
                            </ul>
                          </li>
                          <li>
                            Questions:
                            <ul>
                              <li>Front Labels</li>
                              <li>Back Labels</li>
                            </ul>
                          </li>
                          <li>
                            Rejected:
                            <ul>
                              <li>Front Labels</li>
                              <li>Back Labels</li>
                            </ul>
                          </li>
                          <li>
                            Total:
                            <ul>
                              <li>Front Labels</li>
                              <li>Back Labels</li>
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
