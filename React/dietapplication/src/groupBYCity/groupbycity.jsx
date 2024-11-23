import React, { Component } from "react"
import {  Table,  Container } from "react-bootstrap";

export default class GroupByCity extends Component{
    constructor(props) {
      super(props)
    
      this.state = {
        users:[],
        noUsers:false
      }
    }

    componentDidMount(){
        fetch("http://localhost:8080/userdetails/groupBycity")
        .then((response)=>response.json())
        .then((data)=>{
            this.setState({users:data,noUsers:data.length===0});
        }).catch((error)=>console.log("Error In Fetching",error));
    };

    render(){
        return(
           <Container className="mt-5">
             <h3 className="text-center">Group Users By City</h3>
            <Table responsive striped bordered hover className="mt-5">
                <thead>
                    <tr>
                        <th className="text-center">City Name</th>
                        <th className="text-center">User Count</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.users.length > 0  ?(
                        this.state.users.map((user,index)=>(
                            <tr key={index}>
                            <td className="text-center">{user.cityName}</td>
                            <td className="text-center">{user.userCount}</td>
                            </tr>
                        ))
                    ):(
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


