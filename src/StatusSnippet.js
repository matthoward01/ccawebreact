import React from "react";

const StatusSnippet = ({ status, program, programList }) => {
  return programList.filter(
    (l) => l.Status === status && l.Program === program.Program
  ).length +
    programList.filter(
      (l) => l.Status_FL === status && l.Program === program.Program
    ).length >
    0 ? (
    <li>
      {status}:{" "}
      <b>
        {programList.filter(
          (l) => l.Status === status && l.Program === program.Program
        ).length +
          programList.filter(
            (l) => l.Status_FL === status && l.Program === program.Program
          ).length}
      </b>
      <ul>
        <li>
          Front Labels:{" "}
          <b>
            {
              programList.filter(
                (l) => l.Status_FL === status && l.Program === program.Program
              ).length
            }
          </b>
        </li>
        <li>
          Back Labels:{" "}
          <b>
            {
              programList.filter(
                (l) => l.Status === status && l.Program === program.Program
              ).length
            }
          </b>
        </li>
      </ul>
    </li>
  ) : (
    <></>
  );
};

export default StatusSnippet;
