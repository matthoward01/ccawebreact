import React from "react";
import { Table } from "react-bootstrap";

const Status = () => {
  return (
    <table>
      <tbody>
        <tr>
          <td>
            Soft Surface
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
          </td>
          <td>
            Hard Surface
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
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Status;
