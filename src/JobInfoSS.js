import React, { Fragment } from "react";
import { Modal } from "react-bootstrap";
import { variables } from "./Variable";
import { useEffect, useState } from "react";
import JobChangeSS from "./JobChangeSS";

const JobInfoSS = ({ handleJobModalCancel, id }) => {
  const [jobData, setJobData] = useState([]);
  const [isChangeModalVisible, setIsChangeModalVisible] = useState(false);
  const [changeId, setChangeId] = useState("");
  const [changeData, setChangeData] = useState("");
  //console.log(id);
  useEffect(() => {
    //console.log(variables.API_CCASS_Job + id);
    fetch(variables.API_CCASS + "JobSS/" + id)
      .then((response) => {
        //console.log("resp", response);
        return response.json();
      })
      .then((dbData) => {
        //console.log("JobSS", dbData);
        //setJobData(dbData);
        setJobData(dbData);
      });
  }, [id]);
  const showChangeModal = (id) => {
    //console.log("Passed ID:" + id);
    setChangeId(id);
    setIsChangeModalVisible(true);
  };
  const handleChangeModalCancel = () => {
    setIsChangeModalVisible(false);
  };

  if (!jobData.length) {
    return <h1>Loading...</h1>;
  }
  const uniqueLogoMap = new Map(
    jobData.map((pos) => [pos.Division_Label_Name, pos])
  );
  const uniqueLogos = [...uniqueLogoMap.values()];
  const uniqueColorsMap = new Map(
    jobData
      .sort((a, b) =>
        a["Color_Sequence"]
          .padStart(2, "0")
          .localeCompare(b["Color_Sequence"].padStart(2, "0"))
      )
      .map((pos) => [pos.Merch_Color_Name, pos])
  );
  const uniqueColors = [...uniqueColorsMap.values()];
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
        <li>Color: {" " + jobData[0].Feeler}</li>
        <li>Size Name: {" " + jobData[0].Size_Name}</li>
        <li>Roomscene Name: {jobData[0].Roomscene}</li>
      </ul>
      <p>Logos Used:</p>
      <ul>
        {uniqueLogos.map((job) => {
          return (
            <Fragment>
              <li>{job.Division_Label_Name}</li>
            </Fragment>
          );
        })}
      </ul>
      <p>
        Color List: <b>{" (" + uniqueColors.length + ")"}</b>
      </p>
      <ul>
        {uniqueColors.map((job) => {
          return (
            <Fragment>
              <li>
                {job.Merch_Color_Name === jobData[0].Feeler ? (
                  <b>{job.Merch_Color_Name}</b>
                ) : (
                  job.Merch_Color_Name
                )}
              </li>
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
          <JobChangeSS
            setChangeData={setChangeData}
            handleJobModalCancel={handleJobModalCancel}
            handleChangeModalCancel={handleChangeModalCancel}
            Sample_ID={jobData[0].Sample_ID}
            jobData={jobData}
          />
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default JobInfoSS;
