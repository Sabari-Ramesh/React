import React, { Component } from "react";
import { Table } from "react-bootstrap";
export default class FindAll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meals: []
    };
  }

  componentDidMount() {
    fetch("http://localhost:8080/mealdetails/findAll")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ meals: data });
      })
      .catch((error) => console.error("Error fetching data:", error));
  }

  render() {
    return (
      <div className="table-responsive">
        <h2 className="text-center">All Meal Details</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Meal ID</th>
              <th>User ID</th>
              <th>Meal Type</th>
              <th>Meal Date</th>
              <th>Food Name</th>
              <th>Quantity (g)</th>
              <th>Calories (g)</th>
              <th>Protein (g)</th>
              <th>Carbohydrates (g)</th>
              <th>Vitamins (g)</th>
            </tr>
          </thead>
          <tbody>
            {this.state.meals && this.state.meals.length > 0 ? (
              this.state.meals.map((meal) => (
                <tr key={meal.id}>
                <td>{meal.mealId}</td>
                <td>{meal.userid}</td>
                <td>{meal.meal}</td>
                <td>{meal.mealDate}</td>
                <td>{meal.foodName}</td>
                <td>{meal.quantity}</td>
                <td>{meal.calories}</td>
                <td>{meal.protein}</td>
                <td>{meal.carbs}</td>
                <td>{meal.vitamins}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="text-center">
                  No Details Available
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    );
  }
}
