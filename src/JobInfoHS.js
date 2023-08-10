import React, { Fragment } from "react";
import { Modal } from "react-bootstrap";
import { variables } from "./Variable";
import { useEffect, useState } from "react";

const JobInfo = ({ type, id }) => {
  const [jobData, setJobData] = useState([]);
  //console.log(id);
  useEffect(() => {
    if (type === "Hard Surface") {
      console.log(variables.API_CCA_Job + id);
      fetch(variables.API_CCA_Job + id)
        .then((response) => {
          //console.log("resp", response);
          return response.json();
        })
        .then((dbData) => {
          //console.log("result", data);
          //setJobData(dbData);
          setJobData(dbData);
          //console.log(dbData);
        });
    } else {
      console.log(variables.API_CCA_Job + id);
      fetch(variables.API_CCASS_Job + id)
        .then((response) => {
          //console.log("resp", response);
          return response.json();
        })
        .then((dbData) => {
          //console.log("result", data);
          setJobData(dbData);
        });
    }
  }, [id]);

  if (!jobData.length) {
    return <h1>Loading...</h1>;
  }

  return (
    <Fragment>
      {jobData[0].Change === "" ? (
        <></>
      ) : (
        <Fragment>
          <p>Changes:</p>
          <hr />
          {jobData[0].Change}
          <hr />
        </Fragment>
      )}
      <p>Job Details:</p>
      <ul>
        <li>Sample ID: {" " + jobData[0].Sample_ID}</li>
        <li>Division: {" " + jobData[0].Division_List}</li>
        <li>Style Name: {" " + jobData[0].Sample_Name}</li>
        <li>Color: {" " + jobData[0].Merch_Color_Name}</li>
        <li>Size Name: {" " + jobData[0].Size_Name}</li>
        <li>
          Width:
          {" " + jobData[0].Width} {jobData[0].Width_Measurement}
        </li>
        <li>
          Length:
          {" " + jobData[0].Length} {jobData[0].Length_Measurement}
        </li>
        <li>Roomscene Name: {jobData[0].Roomscene}</li>
      </ul>
      <p>Logos Used:</p>
      <ul>
        {jobData.map((job) => {
          return (
            <Fragment>
              <li>{job.Division_Label_Name}</li>
            </Fragment>
          );
        })}
      </ul>
    </Fragment>
  );
};

export default JobInfo;
