// import React, { Component } from "react";
// import { Form, Button, Table, Row, Col, Container } from "react-bootstrap";

// export default class QuantityRange extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       min: "",
//       max: "",
//       error: { min: "", max: "" },
//       meals: null, // Start with `meals` as `null` to detect the initial state
//     };
//   }

//   // Function to validate min and max fields
//   validateMin = (value) => {
//     if (value === "") return "Min field is required.";
//     if (value < 0) return "Min value cannot be negative.";
//     return "";
//   };

//   validateMax = (value) => {
//     if (value === "") return "Max field is required.";
//     if (value < 0) return "Max value cannot be negative.";
//     return "";
//   };

//   // Handle Min field change
//   handleMinChange = (e) => {
//     const value = e.target.value;
//     this.setState((prevState) => ({
//       min: value,
//       error: { ...prevState.error, min: this.validateMin(value) },
//     }));
//   };

//   // Handle Max field change
//   handleMaxChange = (e) => {
//     const value = e.target.value;
//     this.setState((prevState) => ({
//       max: value,
//       error: { ...prevState.error, max: this.validateMax(value) },
//     }));
//   };

//   // Fetch meals on form submission
//   handleSubmit = (e) => {
//     e.preventDefault();
//     const { min, max } = this.state;

//     // Validate fields
//     const minError = this.validateMin(min);
//     const maxError = this.validateMax(max);
//     if (minError || maxError || parseFloat(min) >= parseFloat(max)) {
//       this.setState({
//         error: {
//           min: minError,
//           max:
//             maxError ||
//             (parseFloat(min) >= parseFloat(max)
//               ? "Min value must be less than Max value."
//               : ""),
//         },
//       });
//       return;
//     }

//     // Fetch meals based on quantity range and user ID
//     fetch(
//       `http://localhost:8080/mealdetails/quantityRange?min=${min}&max=${max}&userId=${this.props.userId}`
//     )
//       .then((response) => response.json())
//       .then((data) => {
//         // Ensure meals is always an array or empty
//         this.setState({ meals: Array.isArray(data) ? data : [] });
//       })
//       .catch((error) => {
//         console.log("Error in Fetching Data", error);
//         this.setState({ meals: [] }); // Fallback to empty array on error
//       });
//   };

//   render() {
//     const { min, max, error, meals } = this.state;

//     return (
//       <Container>
//         <h3 className="text-center">Meal Quantity Range</h3>
//         <Form onSubmit={this.handleSubmit}>
//           <Row className="mt-4">
//             <Col>
//               <Form.Group controlId="formMin">
//                 <Form.Label>Min Quantity</Form.Label>
//                 <Form.Control
//                   type="number"
//                   value={min}
//                   onChange={this.handleMinChange}
//                   placeholder="Enter min quantity"
//                   isInvalid={!!error.min}
//                 />
//                 <Form.Control.Feedback type="invalid">
//                   {error.min}
//                 </Form.Control.Feedback>
//               </Form.Group>
//             </Col>
//             <Col>
//               <Form.Group controlId="formMax">
//                 <Form.Label>Max Quantity</Form.Label>
//                 <Form.Control
//                   type="number"
//                   value={max}
//                   onChange={this.handleMaxChange}
//                   placeholder="Enter max quantity"
//                   isInvalid={!!error.max}
//                 />
//                 <Form.Control.Feedback type="invalid">
//                   {error.max}
//                 </Form.Control.Feedback>
//               </Form.Group>
//             </Col>
//           </Row>

//           <Button variant="primary" type="submit" className="my-4">
//             Submit
//           </Button>
//         </Form>

//         {/* Display meal details table or message based on `meals` state */}
//         {meals !== null && (
//           <div className="mt-3">
//             {meals.length > 0 ? (
//               <>
//                 <h3>Meal Details</h3>
//                 <Table striped bordered hover>
//                   <thead>
//                     <tr>
//                       <th>Meal Id</th>
//                       <th>User Id</th>
//                       <th>Meal Type</th>
//                       <th>Date</th>
//                       <th>Food Name</th>
//                       <th>Quantity (g)</th>
//                       <th>Calories (g)</th>
//                       <th>Protein (g)</th>
//                       <th>Carbohydrates (g)</th>
//                       <th>Vitamins (g)</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {meals.map((meal) => (
//                       <tr key={meal.mealId}>
//                         <td>{meal.mealId}</td>
//                         <td>{meal.userid}</td>
//                         <td>{meal.meal}</td>
//                         <td>{meal.mealDate}</td>
//                         <td>{meal.foodName}</td>
//                         <td>{meal.quantity}</td>
//                         <td>{meal.calories}</td>
//                         <td>{meal.protein}</td>
//                         <td>{meal.carbs}</td>
//                         <td>{meal.vitamins}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </Table>
//               </>
//             ) : (
//               <h3>No Details Available</h3>
//             )}
//           </div>
//         )}
//       </Container>
//     );
//   }
// }

import React, { Component } from "react";
import { Form, Button, Table, Row, Col, Container } from "react-bootstrap";

export default class QuantityRange extends Component {
  constructor(props) {
    super(props);

    this.state = {
      min: "",
      max: "",
      error: { min: "", max: "" },
      meals: null, // Start with `meals` as `null` to detect the initial state
    };
  }

  // Function to validate min and max fields
  validateMin = (value) => {
    if (value === "") return "Min field is required.";
    if (value < 0) return "Min value cannot be negative.";
    return "";
  };

  validateMax = (value) => {
    if (value === "") return "Max field is required.";
    if (value < 0) return "Max value cannot be negative.";
    return "";
  };

  // Handle Min field change
  handleMinChange = (e) => {
    const value = e.target.value;
    this.setState((prevState) => ({
      min: value,
      error: { ...prevState.error, min: this.validateMin(value) },
    }));
  };

  // Handle Max field change
  handleMaxChange = (e) => {
    const value = e.target.value;
    this.setState((prevState) => ({
      max: value,
      error: { ...prevState.error, max: this.validateMax(value) },
    }));
  };

  // Fetch meals on form submission
  handleSubmit = (e) => {
    e.preventDefault();
    const { min, max } = this.state;

    // Validate fields
    const minError = this.validateMin(min);
    const maxError = this.validateMax(max);
    if (minError || maxError || parseFloat(min) >= parseFloat(max)) {
      this.setState({
        error: {
          min: minError,
          max:
            maxError ||
            (parseFloat(min) >= parseFloat(max)
              ? "Min value must be less than Max value."
              : ""),
        },
      });
      return;
    }

    // Fetch meals based on quantity range and user ID
    fetch(
      `http://localhost:8080/mealdetails/quantityRange?min=${min}&max=${max}&userId=${this.props.userId}`
    )
      .then((response) => response.json())
      .then((data) => {
        // Ensure meals is always an array or empty
        this.setState({ meals: Array.isArray(data) ? data : [] });
      })
      .catch((error) => {
        console.log("Error in Fetching Data", error);
        this.setState({ meals: [] }); // Fallback to empty array on error
      });
  };

  render() {
    const { min, max, error, meals } = this.state;

    return (
      <Container>
        <h3 className="text-center">Meal Quantity Range</h3>
        <Form onSubmit={this.handleSubmit}>
          <Row className="mt-4">
            <Col>
              <Form.Group controlId="formMin">
                <Form.Label>Min Quantity</Form.Label>
                <Form.Control
                  type="number"
                  value={min}
                  onChange={this.handleMinChange}
                  placeholder="Enter min quantity"
                  isInvalid={!!error.min}
                />
                <Form.Control.Feedback type="invalid">
                  {error.min}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formMax">
                <Form.Label>Max Quantity</Form.Label>
                <Form.Control
                  type="number"
                  value={max}
                  onChange={this.handleMaxChange}
                  placeholder="Enter max quantity"
                  isInvalid={!!error.max}
                />
                <Form.Control.Feedback type="invalid">
                  {error.max}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Button variant="primary" type="submit" className="my-4">
            Submit
          </Button>
        </Form>

        {/* Display meal details table or message based on `meals` state */}
        {meals !== null && (
          <div className="mt-3">
            <h3>Meal Details</h3>
            <Table striped bordered hover>
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
                {this.state.meals.length > 0 ? (
                  meals.map((meal) => (
                    <tr key={meal.mealId}>
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
        )}
      </Container>
    );
  }
}
