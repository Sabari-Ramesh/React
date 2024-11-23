import React, { Component } from "react";
import { Table, Container } from "react-bootstrap";

export default class UserWithMealDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      noUser: false
    };
  }

  componentDidMount() {
    fetch("http://localhost:8080/userdetails/userwithmealsdetails")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ users: data, noUser: data.length === 0 });
      })
      .catch((error) => console.log("Error in fetching", error));
  }

  render() {
    return (
      <Container className="mt-5">
        <h3 className="text-center">User With Meal Details</h3>
        <Table responsive striped bordered hover className="mt-4">
          <thead>
            <tr>
              <th className="text-center">User Id</th>
              <th className="text-center">User Name</th>
            </tr>
          </thead>
          <tbody>
            {this.state.users.length > 0 ? (
              this.state.users.map((user, index) => (
                <tr key={index}>
                  <td className="text-center">{user.userId}</td>
                  <td className="text-center">{user.userName}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="text-center">
                  No Details Available
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Container>
    );
  }
}
