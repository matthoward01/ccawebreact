import React from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import {
  Button,
  ButtonGroup,
  Dropdown,
  ToggleButton,
  DropdownButton,
  ToggleButtonGroup,
} from "react-bootstrap";

const Navigation = ({
  search,
  setSearch,
  showStatusModal,
  type,
  handleTypeChange,
  statusValue,
  handleChange,
  programValue,
  handleProgramFilter,
  uniqueProgram,
  showUpdateDbModal,
}) => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary" sticky="top">
      <Container fluid>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="m-auto my-2 my-lg-0">
            <div>
              <Button variant="outline-secondary" onClick={showStatusModal}>
                Status
              </Button>
              <DropdownButton
                as={ButtonGroup}
                variant="outline-secondary"
                align="start"
                title={type}
                onSelect={handleTypeChange}
              >
                <Dropdown.Item eventKey="Hard Surface">
                  Hard Surface
                </Dropdown.Item>
                <Dropdown.Item eventKey="Soft Surface">
                  Soft Surface
                </Dropdown.Item>
              </DropdownButton>
              <ToggleButtonGroup
                type="radio"
                name="options"
                defaultValue={statusValue}
                onChange={handleChange}
              >
                <ToggleButton
                  id="tbg-btn-1"
                  variant="outline-secondary"
                  value="all"
                >
                  Show All
                </ToggleButton>
                <ToggleButton
                  id="tbg-btn-2"
                  variant="outline-secondary"
                  value="Approved"
                >
                  Approval
                </ToggleButton>
                <ToggleButton
                  id="tbg-btn-3"
                  variant="outline-secondary"
                  value="Waiting for Approval"
                >
                  Waiting for Approval
                </ToggleButton>
                <ToggleButton
                  id="tbg-btn-4"
                  variant="outline-secondary"
                  value="Questions"
                >
                  Question
                </ToggleButton>
                <ToggleButton
                  id="tbg-btn-5"
                  variant="outline-secondary"
                  value="Rejected"
                >
                  Rejection
                </ToggleButton>
                <ToggleButton
                  id="tbg-btn-6"
                  variant="outline-secondary"
                  value="Not Done"
                >
                  Not Done
                </ToggleButton>
              </ToggleButtonGroup>
              <DropdownButton
                as={ButtonGroup}
                variant="outline-secondary"
                align="start"
                title={programValue === "all" ? "All Programs" : programValue}
                onSelect={handleProgramFilter}
              >
                <Dropdown.Item eventKey="all">All Programs</Dropdown.Item>
                {uniqueProgram.map((prog) => {
                  return (
                    <Dropdown.Item eventKey={prog.Program}>
                      {prog.Program}
                    </Dropdown.Item>
                  );
                })}
              </DropdownButton>
              <Button variant="outline-secondary" onClick={showUpdateDbModal}>
                Update Db
              </Button>
            </div>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              id="search"
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
