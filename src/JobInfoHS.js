import React, { Fragment } from "react";
import { Modal } from "react-bootstrap";
import { variables } from "./Variable";
import { useEffect, useState } from "react";
import JobChangeHS from "./JobChangeHS";

const JobInfoHS = ({ handleJobModalCancel, id }) => {
  const [jobData, setJobData] = useState([]);
  const [isChangeModalVisible, setIsChangeModalVisible] = useState(false);
  const [changeId, setChangeId] = useState("");
  const [changeData, setChangeData] = useState("");
  //console.log(id);
  useEffect(() => {
    //console.log(variables.API_CCA  + "JobHS/" + id);
    fetch(variables.API_CCA + "JobHS/" + id)
      .then((response) => {
        //console.log("resp", response);
        return response.json();
      })
      .then((dbData) => {
        console.log("JobHS", dbData);
        //setJobData(dbData);
        setJobData(dbData);
      });
  }, [id]);
  const showChangeModal = (id) => {
    console.log("Passed ID:" + id);
    setChangeId(id);
    setIsChangeModalVisible(true);
  };
  const handleChangeModalCancel = () => {
    setIsChangeModalVisible(false);
  };

  if (!jobData.length) {
    return <h1>Loading...</h1>;
  }

  return (
    <Fragment>
      {jobData[0].Change === "" ? (
        <></>
      ) : (
        <Fragment>
          <div onDoubleClick={() => showChangeModal()}>
            <p>Changes:</p>
            <ul>
              <li>{jobData[0].Change}</li>
            </ul>
          </div>
        </Fragment>
      )}
      <p onDoubleClick={() => showChangeModal()}>Job Details:</p>
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

      <Modal
        show={isChangeModalVisible}
        onHide={handleChangeModalCancel}
        backdrop={true}
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Job Change Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <JobChangeHS
            setChangeData={setChangeData}
            handleJobModalCancel={handleJobModalCancel}
            handleChangeModalCancel={handleChangeModalCancel}
            Sample_ID={jobData[0].Sample_ID}
            Program={jobData[0].Program}
            jobData={jobData}
          />
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default JobInfoHS;
