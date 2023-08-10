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

  const widths = jobData.Width.map((x) => x.Width);
  const uniqueWidths = [...new Set(widths)];

  return (
    <Fragment>
      <p>Job Details</p>
      <ul>
        <li>{jobData[0].Sample_ID}</li>
        {uniqueWidths.map((uw) => {
          return <li>{uw.Width}</li>;
        })}
      </ul>
      <ul>
        {jobData.map((job) => {
          return (
            <Fragment>
              <li>{job.Sample_ID}</li>
              <li>{job.Width}</li>
            </Fragment>
          );
        })}
      </ul>
      <p>Job Details End</p>
    </Fragment>
  );
};

export default JobInfo;
