import React, { Fragment } from "react";
import { Modal } from "react-bootstrap";
import { variables } from "./Variable";
import { useEffect, useState } from "react";

const JobChangeSS = ({ type, id }) => {
  const [changeData, setChangeData] = useState([]);
  //console.log(id);
  useEffect(() => {
    if (type === "Soft Surface") {
      console.log(variables.API_CCA_JobSS + id);
      fetch(variables.API_CCA_JobSS + id)
        .then((response) => {
          //console.log("resp", response);
          return response.json();
        })
        .then((dbData) => {
          //console.log("result", data);
          //setChangeData(dbData);
          setChangeData(dbData);
          //console.log(dbData);
        });
    }
  }, [id]);

  if (!changeData.length) {
    return <h1>Loading...</h1>;
  }

  return (
    <Fragment>
      {changeData[0].Change === "" ? (
        <></>
      ) : (
        <Fragment>
          <p>Changes:</p>
          <hr />
          {changeData[0].Change}
          <hr />
        </Fragment>
      )}
    </Fragment>
  );
};

export default JobChangeSS;
