import React, { Component } from "react";
import { Button, Table, Form, Container, Row, Col } from "react-bootstrap";

class FindById extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchId: "",
      meal: null,
      errorMessage: "",
      noResults: false,
    };
  }

  // Search By Meal Id
  handleSearch = () => {
    const { searchId } = this.state;

    // Validate input
    if (searchId === "") {
      this.setState({
        errorMessage: "Please Enter a Valid Numeric Value",
        noResults: false,
      });
      return;
    } // Validate input
    if(searchId<0){
      this.setState({
        errorMessage: "Search Id Should not be negative",
        noResults: false,
      });
      return;
    }


    // Fetch data from API
    fetch(`http://localhost:8080/mealdetails/fetchByid/${searchId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Meal not found");
        }
        return response.json();
      })
      .then((data) => {
        this.setState({ meal: data, errorMessage: "", noResults: false });
      })
      .catch((error) => {
        console.error("Error in fetching", error);
        this.setState({ meal: null, errorMessage: "", noResults: true });
      });
  };

  render() {
    const { searchId, meal, errorMessage, noResults } = this.state;
    return (
      <Container>
        <h1 className="text-center my-4">Meal Details</h1>
        <Row className="mb-4">
          <Col xs={12} md={4}>
            <Form.Control
              type="number"
              placeholder="Enter the Meal Id"
              value={searchId}
              onChange={(e) => this.setState({ searchId: e.target.value })}
            />
            {errorMessage && (
              <Form.Text className="text-danger">{errorMessage}</Form.Text>
            )}
          </Col>
          <Col xs="auto">
            <Button variant="primary" onClick={this.handleSearch}>
              Search By Meal Id
            </Button>
          </Col>
        </Row>

        <div className="mt-5">
          {meal ? (
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
                  <th>Date Created</th>
                  <th>Date Updated</th>
                </tr>
              </thead>
              <tbody>
                <tr>
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
                  <td>{meal.dateCreated}</td>
                  <td>{meal.lastUpdate}</td>
                </tr>
              </tbody>
            </Table>
          ) : noResults ? (
            <p className="text-center">No Meal Details Available</p>
          ) : null}
        </div>
      </Container>
    );
  }
}

export default FindById;
