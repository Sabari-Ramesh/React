import React, { Component } from "react";
import { Table } from "react-bootstrap";

export default class FindAllUsers extends Component {
 constructor(props) {
   super(props)
 
   this.state = {
      users:[]
   }
 }


  componentDidMount() {
    fetch("http://localhost:8080/userdetails/findall")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ users: data });
      })
      .catch((error) => console.error("Error in fetching", error));
  };

render(){
  return(
    <div className="table-responsive">
      <h2 className="text-center">All User Details</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>User Id</th>
            <th>User Name</th>
            <th>Email Id</th>
            <th>Password</th>
            <th>Gender</th>
            <th>Date of Birth</th>
            <th>Mobile Number</th>
            <th>City</th>
            <th>Date Created</th>
          </tr>
        </thead>
        <tbody>
          {this.state.users && this.state.users.length>0 ?(
            this.state.users.map((user)=>(
              <tr key={user.userId}>
                <td>{user.userId}</td>
                <td>{user.userName}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>{user.gender}</td>
                <td>{user.dob}</td>
                <td>{user.mobileNumber}</td>
                <td>{user.city}</td>
                <td>{user.dateCreated}</td>
              </tr>
            ))
          ):(
            <tr>
              <td colSpan="10" className="text-center">
                No Details Available..
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

};


