
import React, { Component } from 'react';
import { Button, Table, Form, Container, Row, Col } from "react-bootstrap";

class UserSearchByDate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: "",
      endDate: "",
      users: [],
      errorMessage: "",
      noUsers: false
    };
  }

  // Validate dates
  validateDates = () => {
    const { startDate, endDate } = this.state;
    const currentDate = new Date().toISOString().split("T")[0];

    if (!startDate || !endDate) {
      this.setState({ errorMessage: "Please enter both Start Date and End Date" });
      return false;
    }

    if (new Date(startDate) > new Date(endDate)) {
      this.setState({ errorMessage: "Start Date must be before End Date" });
      return false;
    }

    if (new Date(startDate) > new Date(currentDate) || new Date(endDate) > new Date(currentDate)) {
      this.setState({ errorMessage: "Dates cannot be in the future" });
      return false;
    }

    this.setState({ errorMessage: "" });
    return true;
  };

  // Handle search
  handleSearch = () => {
    if (this.validateDates()) {
      const { startDate, endDate } = this.state;

      fetch("http://localhost:8080/userdetails/birth-dates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ startDate, endDate })
      })
      .then(response => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then(data => {
        this.setState({
          users: data,
          noUsers: data.length === 0,
          errorMessage: data.length === 0 ? "No users found in this date range." : ""
        });
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        this.setState({ errorMessage: "Failed to fetch data." });
      });
    }
  };

  render() {
    const { startDate, endDate, users, errorMessage, noUsers } = this.state;
    return (
      <Container>
        <h1 className="text-center my-4">User Details by Date Range</h1>
        <Row className="mb-4">
          <Col xs={12} md={5}>
            <Form.Group controlId="startDate">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                value={startDate}
                onChange={(e) => this.setState({ startDate: e.target.value })}
              />
            </Form.Group>
          </Col>
          <Col xs={12} md={5}>
            <Form.Group controlId="endDate">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                value={endDate}
                onChange={(e) => this.setState({ endDate: e.target.value })}
              />
            </Form.Group>
          </Col>
          <Col xs="auto" className="d-flex align-items-end">
            <Button variant="primary" onClick={this.handleSearch}>Search</Button>
          </Col>
        </Row>
        {errorMessage && <p className="text-danger">{errorMessage}</p>}

        <div className="mt-5">
          {users.length > 0 ? (
            <Table responsive striped bordered hover>
              <thead>
                <tr>
                  <th>User Id</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Date of Birth</th>
                  <th>Phone</th>
                  <th>City</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.userId}>
                    <td>{user.userId}</td>
                    <td>{user.userName}</td>
                    <td>{user.email}</td>
                    <td>{user.dob}</td>
                    <td>{user.mobileNumber}</td>
                    <td>{user.city}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : noUsers ? (
            <p className="text-center">No users found in this date range.</p>
          ) : null}
        </div>
      </Container>
    );
  }
}

export default UserSearchByDate;
