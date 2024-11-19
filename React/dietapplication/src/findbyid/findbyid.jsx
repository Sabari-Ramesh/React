import React, { Component } from "react";
import { Button, Table, Form, Container, Row, Col } from "react-bootstrap";

const data = {
  meals: [
    {
      id: 1,
      userId: 101,
      mealType: "Breakfast",
      mealDate: "2024-11-17",
      foodName: "meal",
      quantity: 100,
      calories: 150,
      protein: 5,
      carbohydrates: 27,
      vitamins: 0.5,
    },
    {
      id: 2,
      userId: 102,
      mealType: "Lunch",
      mealDate: "2024-11-17",
      foodName: "Grilled Chicken",
      quantity: 200,
      calories: 350,
      protein: 30,
      carbohydrates: 10,
      vitamins: 1.2,
    },
    {
      id: 3,
      userId: 103,
      mealType: "Snack",
      mealDate: "2024-11-17",
      foodName: "Apple",
      quantity: 150,
      calories: 95,
      protein: 0.5,
      carbohydrates: 25,
      vitamins: 0.7,
    },
    {
      id: 4,
      userId: 104,
      mealType: "Dinner",
      mealDate: "2024-11-17",
      foodName: "Vegetables and Rice",
      quantity: 250,
      calories: 400,
      protein: 8,
      carbohydrates: 60,
      vitamins: 2.0,
    },
  ],
};

class FindById extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchId: "",
      filteredMeals: data.meals,
      errorMessage:""
    };
  }

  //Search By Id

  handleSearch = () => {
  
    if(isNaN(this.state.searchId) || (this.state.searchId.trim()==="")){
      this.setState({errorMessage:"Please Enter a Valid numeric Value"})
    }else{



    const meal = data.meals.find(
      (meal) => meal.id === Number(this.state.searchId)
    );
    if (meal) {
      this.setState({ filteredMeals: [meal],errorMessage:"" });
    } else {
      this.setState({ filteredMeals: [],errorMessage:"" });
    }
  }
  };

  //Show All Details

  showAll = () => {
    this.setState({ filteredMeals: data.meals });
  };

  render() {
    const { searchId, filteredMeals,errorMessage } = this.state;
    return (
      <Container>
        <h1 className="text-center my-4">Meal Details</h1>
        <Row className="mb=4">
          <Col xs={12} md={4}>
            <Form.Control
              type="number"
              placeholder="Enter the Meal Id"
              value={searchId}
              onChange={(e) => this.setState({ searchId: e.target.value })}
            ></Form.Control>
            {errorMessage && (<Form.Text className="text-danger">{errorMessage}</Form.Text>)}
          </Col>
          <Col xs="auto">
            <Button variant="primary" onClick={this.handleSearch}>
              Search By Meal Id
            </Button>
          </Col>
          <Col xs="auto">
            <Button variant="primary" onClick={this.showAll}>
              Show All Meals
            </Button>
          </Col>
        </Row>

        <div className="mt-5">
          {filteredMeals.length > 0 ? (
            <Table responsive striped bordered hover>
              <thead>
                <tr>
                  <th>Meal Id</th>
                  <th>User Id</th>
                  <th>Meal Type</th>
                  <th>Date</th>
                  <th>Food Name</th>
                  <th>Quantity (g)</th>
                  <th>Calories (g)</th>
                  <th>Protein (g)</th>
                  <th>Carbohydrates (g)</th>
                  <th>Vitamins (g)</th>
                </tr>
              </thead>
              <tbody>
                {filteredMeals.map((meal) => (
                  <tr key={meal.id}>
                    <td>{meal.id}</td>
                    <td>{meal.userId}</td>
                    <td>{meal.mealType}</td>
                    <td>{meal.mealDate}</td>
                    <td>{meal.foodName}</td>
                    <td>{meal.quantity}</td>
                    <td>{meal.calories}</td>
                    <td>{meal.protein}</td>
                    <td>{meal.carbohydrates}</td>
                    <td>{meal.vitamins}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p className="text-center">No Meal Details Available</p>
          )}
        </div>
      </Container>
    );
  }
}

export default FindById;
