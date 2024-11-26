// import React, { Component } from "react";
// import { Table, Button, Form, Container, Row, Col,Alert } from "react-bootstrap";
// import "./update.css";

// export default class Update extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       allMealDetails: [],
//       filteredMeal: null,
//       error: null,
//       successMessage: null,
//       searchId: "",
//       errors: {},
//     };
//   }

//   componentDidMount() {
//     this.fetchAllMealDetails();
//   }

//   fetchAllMealDetails = () => {
//     fetch(`http://localhost:8080/mealdetails/findbyuserId/${this.props.userId}`)
//       .then((response) => response.json())
//       .then((data) => {
//         this.setState({
//           allMealDetails: data,
//           filteredMeal: null,
//           error: null,
//         });
//       })
//       .catch(() => {
//         this.setState({ error: "Error fetching meal details." });
//       });
//   };

//   //Find the MealDetails By Id

//   fetchMealDetailsById = () => {
//     const { searchId, allMealDetails } = this.state;
//     if (!searchId) {
//       this.setState({
//         error: "Please enter a Meal ID to search.",
//         filteredMeal: null,
//       });
//       return;
//     }

//     const filteredMeal = allMealDetails.find(
//       (meal) => meal.mealId === parseInt(searchId, 10)
//     );
//     if (filteredMeal) {
//       this.setState({ filteredMeal, error: null });
//     } else {
//       this.setState({
//         error: "No meal details found for this Meal ID.",
//         filteredMeal: null,
//       });
//     }
//   };

//   handleSearchChange = (e) => {
//     this.setState({ searchId: e.target.value, error: null });
//   };

//   handleShowAllMeals = () => {
//     this.setState({ filteredMeal: null, searchId: "", error: null });
//   };

//   handleInputChange = (e) => {
//     const { name, value } = e.target;
//     this.setState((prevState) => ({
//       filteredMeal: {
//         ...prevState.filteredMeal,
//         [name]: value,
//       },
//       errors: { ...prevState.errors, [name]: "" },
//     }));
//   };

//   //Delete the Details

//   handleDeleteMeal = () => {
//     const { filteredMeal } = this.state;
//     if (!filteredMeal) {
//       this.setState({ error: "No meal selected for deletion." });
//       return;
//     }
  
//     fetch(`http://localhost:8080/mealdetails/delete?userId=${filteredMeal.userid}&mealId=${filteredMeal.mealId}`, {
//       method: "DELETE",
//     })
//       .then((response) => {
//         if (response.ok) {
//           this.setState({
//             successMessage: "Meal deleted successfully.",
//             error: null,
//             filteredMeal: null,
//             searchId: "",
//           });
//           this.fetchAllMealDetails(); // Update the All Meal Details
//           setTimeout(() => this.setState({ successMessage: null }), 5000); // Clear Success message after 5 seconds
//         } else {
//           return response.text().then((message) => {
//             throw new Error(message);
//           });
//         }
//       })
//       .catch((error) => {
//         console.error(error);
//         this.setState({ error: error.message || "Error deleting meal.", successMessage: null });
//       });
//   };
  

//   handleUpdateMeal = () => {
//     if (!this.validateForm()) {
//       return;
//     }
  
//     const { filteredMeal } = this.state;
  
//     fetch(`http://localhost:8080/mealdetails/update`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(filteredMeal),
//     })
//       .then((response) => {
//         if (response.ok) {
//           return response.text(); // text message from backend
//         } else {
//           return response.text().then((message) => {
//             throw new Error(message); // Handle error messages from backend
//           });
//         }
//       })
//       .then((message) => {
//         this.setState({
//           successMessage: message, // Set successMessage to the returned text
//           error: null,
//           filteredMeal: null,
//           searchId: "",
//         });
//         this.fetchAllMealDetails(); // Refresh meal details list
  
//         setTimeout(() => this.setState({ successMessage: null }), 5000); // Hide notification after 3 seconds
//       })
//       .catch((error) => {
//         console.error(error);
//         this.setState({ error: error.message || "Error updating meal details.", successMessage: null });
//       });
//   };  


//   validateForm = () => {
//     const { filteredMeal } = this.state;
//     const errors = {};

//     if (filteredMeal.quantity <= 0) errors.quantity = "Quantity must be greater than 0.";
//     if (filteredMeal.calories < 0) errors.calories = "Calories cannot be negative.";
//     if (filteredMeal.protein < 0) errors.protein = "Protein cannot be negative.";
//     if (filteredMeal.carbs < 0) errors.carbs = "Carbohydrates cannot be negative.";
//     if (filteredMeal.vitamins < 0) errors.vitamins = "Vitamins cannot be negative.";

//     const foodNameRegex = /^[A-Za-z\s]+$/;
//     if (!foodNameRegex.test(filteredMeal.foodName)) {
//       errors.foodName = "Food name must contain only alphabets.";
//     }

//     const currentDate = new Date().toISOString().split("T")[0];
//     if (filteredMeal.mealDate > currentDate) {
//       errors.mealDate = "Meal date cannot be in the future.";
//     }

//     if (Object.keys(errors).length > 0) {
//       this.setState({ errors });
//       return false;
//     }
//     return true;
//   };


//   render() {
//     const { allMealDetails, filteredMeal, error, successMessage, searchId, errors } = this.state;

//     return (
//       <Container className="mt-4">
//         <h2 className="text-center mb-3">Meal Details</h2>

//         {error && <Alert variant="danger">{error}</Alert>}
//         {successMessage && (
//           <div className="notification">
//             {successMessage}
//           </div>
//         )}

//         <Row className="mb-3">
//           <Col md={4}>
//             <Form.Control
//               type="text"
//               placeholder="Enter Meal ID to search"
//               value={searchId}
//               onChange={this.handleSearchChange}
//             />
//           </Col>
//           <Col md={3}>
//             <Button variant="primary" onClick={this.fetchMealDetailsById}>
//               Search By Meal Id
//             </Button>
//           </Col>
//           <Col md={3}>
//             <Button variant="primary" onClick={this.handleShowAllMeals}>
//               Show All Meal Details
//             </Button>
//           </Col>
//         </Row>

//         <Table striped bordered hover responsive>
//           <thead>
//             <tr>
//               <th>Meal ID</th>
//               <th>Meal Type</th>
//               <th>Date</th>
//               <th>Food Name</th>
//               <th>Quantity (grams)</th>
//               <th>Calories</th>
//               <th>Protein (grams)</th>
//               <th>Carbohydrates (grams)</th>
//               <th>Vitamins (mg)</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredMeal ? (
//               <tr key={filteredMeal.mealId}>
//                 <td>{filteredMeal.mealId}</td>
//                 <td>{filteredMeal.meal}</td>
//                 <td>{filteredMeal.mealDate}</td>
//                 <td>{filteredMeal.foodName}</td>
//                 <td>{filteredMeal.quantity}</td>
//                 <td>{filteredMeal.calories}</td>
//                 <td>{filteredMeal.protein}</td>
//                 <td>{filteredMeal.carbs}</td>
//                 <td>{filteredMeal.vitamins}</td>
//               </tr>
//             ) : allMealDetails.length > 0 ? (
//               allMealDetails.map((detail) => (
//                 <tr key={detail.mealId}>
//                   <td>{detail.mealId}</td>
//                   <td>{detail.meal}</td>
//                   <td>{detail.mealDate}</td>
//                   <td>{detail.foodName}</td>
//                   <td>{detail.quantity}</td>
//                   <td>{detail.calories}</td>
//                   <td>{detail.protein}</td>
//                   <td>{detail.carbs}</td>
//                   <td>{detail.vitamins}</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="9">No meal details available.</td>
//               </tr>
//             )}
//           </tbody>
//         </Table>

//         {filteredMeal && (
//           <Form className="mt-4">
//             <h3>Update Meal Details</h3>
//             <Row className="mb-3">
//                <Col md={6}>
//                  <Form.Group controlId="meal">
//                    <Form.Label>Meal Type</Form.Label>
//                    <Form.Control
//                     as="select"
//                     name="meal"
//                     value={filteredMeal.meal}
//                     onChange={this.handleInputChange}
//                   >
//                     <option value="Snack">Snack</option>
//                     <option value="Breakfast">Breakfast</option>
//                     <option value="Dinner">Dinner</option>
//                     <option value="Lunch">Lunch</option>
//                   </Form.Control>
//                 </Form.Group>
//               </Col>
//               <Col md={6}>
//                 <Form.Group controlId="mealDate">
//                   <Form.Label>Meal Date</Form.Label>
//                   <Form.Control
//                     type="date"
//                     name="mealDate"
//                     value={filteredMeal.mealDate}
//                     onChange={this.handleInputChange}
//                   />
//                   {errors.mealDate && (
//                     <Form.Text className="text-danger">{errors.mealDate}</Form.Text>
//                   )}
//                 </Form.Group>
//               </Col>
//             </Row>

//             <Row className="mb-3">
//               <Col md={6}>
//                 <Form.Group controlId="foodName">
//                   <Form.Label>Food Name</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="foodName"
//                     value={filteredMeal.foodName}
//                     onChange={this.handleInputChange}
//                   />
//                   {errors.foodName && (
//                     <Form.Text className="text-danger">{errors.foodName}</Form.Text>
//                   )}
//                 </Form.Group>
//               </Col>
//               <Col md={6}>
//                 <Form.Group controlId="quantity">
//                   <Form.Label>Quantity (grams)</Form.Label>
//                   <Form.Control
//                     type="number"
//                     name="quantity"
//                     value={filteredMeal.quantity}
//                     onChange={this.handleInputChange}
//                   />
//                   {errors.quantity && (
//                     <Form.Text className="text-danger">{errors.quantity}</Form.Text>
//                   )}
//                 </Form.Group>
//               </Col>
//             </Row>

//             <Row className="mb-3">
//               <Col md={6}>
//                 <Form.Group controlId="calories">
//                   <Form.Label>Calories</Form.Label>
//                   <Form.Control
//                     type="number"
//                     name="calories"
//                     value={filteredMeal.calories}
//                     onChange={this.handleInputChange}
//                   />
//                   {errors.calories && (
//                     <Form.Text className="text-danger">{errors.calories}</Form.Text>
//                   )}
//                 </Form.Group>
//               </Col>
//               <Col md={6}>
//                 <Form.Group controlId="protein">
//                   <Form.Label>Protein (grams)</Form.Label>
//                   <Form.Control
//                     type="number"
//                     name="protein"
//                     value={filteredMeal.protein}
//                     onChange={this.handleInputChange}
//                   />
//                   {errors.protein && (
//                     <Form.Text className="text-danger">{errors.protein}</Form.Text>
//                   )}
//                 </Form.Group>
//               </Col>
//             </Row>

//             <Row className="mb-3">
//               <Col md={6}>
//                 <Form.Group controlId="carbs">
//                   <Form.Label>Carbohydrates (grams)</Form.Label>
//                   <Form.Control
//                     type="number"
//                     name="carbs"
//                     value={filteredMeal.carbs}
//                     onChange={this.handleInputChange}
//                   />
//                   {errors.carbs && (
//                     <Form.Text className="text-danger">{errors.carbs}</Form.Text>
//                   )}
//                 </Form.Group>
//               </Col>
//               <Col md={6}>
//                 <Form.Group controlId="vitamins">
//                   <Form.Label>Vitamins (mg)</Form.Label>
//                   <Form.Control
//                     type="number"
//                     name="vitamins"
//                     value={filteredMeal.vitamins}
//                     onChange={this.handleInputChange}
//                   />
//                   {errors.vitamins && (
//                     <Form.Text className="text-danger">{errors.vitamins}</Form.Text>
//                   )}
//                 </Form.Group>
//               </Col>
//             </Row>
//             <Button variant="primary" onClick={this.handleUpdateMeal}>
//               Update Meal
//             </Button>

//             <Button variant="danger" onClick={this.handleDeleteMeal}>
//               Delete Meal
//             </Button>
//           </Form>
//         )}
//       </Container>
//     );
//   }
// }


//---------------------------------------------------------------------------------------------------------------

//React Context

import React, { Component } from "react";
import { Table, Button, Form, Container, Row, Col, Alert } from "react-bootstrap";
import { UserContext } from "../Login/LoginSelector"; 
import "./update.css";

export default class Update extends Component {
  static contextType = UserContext; 
  constructor(props) {
    super(props);
    this.state = {
      allMealDetails: [],
      filteredMeal: null,
      error: null,
      successMessage: null,
      searchId: "",
      errors: {},
    };
  }

  componentDidMount() {
    this.fetchAllMealDetails();
  }

  fetchAllMealDetails = () => {
    const userId = this.context?.userId || this.context?.adminId; // Access userId from context
    fetch(`http://localhost:8080/mealdetails/findbyuserId/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          allMealDetails: data,
          filteredMeal: null,
          error: null,
        });
      })
      .catch(() => {
        this.setState({ error: "Error fetching meal details." });
      });
  };

  // Find the MealDetails By Id
  fetchMealDetailsById = () => {
    const { searchId, allMealDetails } = this.state;
    if (!searchId) {
      this.setState({
        error: "Please enter a Meal ID to search.",
        filteredMeal: null,
      });
      return;
    }

    const filteredMeal = allMealDetails.find(
      (meal) => meal.mealId === parseInt(searchId, 10)
    );
    if (filteredMeal) {
      this.setState({ filteredMeal, error: null });
    } else {
      this.setState({
        error: "No meal details found for this Meal ID.",
        filteredMeal: null,
      });
    }
  };

  handleSearchChange = (e) => {
    this.setState({ searchId: e.target.value, error: null });
  };

  handleShowAllMeals = () => {
    this.setState({ filteredMeal: null, searchId: "", error: null });
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      filteredMeal: {
        ...prevState.filteredMeal,
        [name]: value,
      },
      errors: { ...prevState.errors, [name]: "" },
    }));
  };

  // Delete the Meal Details
  handleDeleteMeal = () => {
    const { filteredMeal } = this.state;
    if (!filteredMeal) {
      this.setState({ error: "No meal selected for deletion." });
      return;
    }

    const userId = this.context?.userId || this.context?.adminId; // Access userId from context
    fetch(`http://localhost:8080/mealdetails/delete?userId=${userId}&mealId=${filteredMeal.mealId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          this.setState({
            successMessage: "Meal deleted successfully.",
            error: null,
            filteredMeal: null,
            searchId: "",
          });
          this.fetchAllMealDetails(); // Update the All Meal Details
          setTimeout(() => this.setState({ successMessage: null }), 5000); // Clear Success message after 5 seconds
        } else {
          return response.text().then((message) => {
            throw new Error(message);
          });
        }
      })
      .catch((error) => {
        console.error(error);
        this.setState({ error: error.message || "Error deleting meal.", successMessage: null });
      });
  };

  handleUpdateMeal = () => {
    if (!this.validateForm()) {
      return;
    }

    const { filteredMeal } = this.state;

    fetch(`http://localhost:8080/mealdetails/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(filteredMeal),
    })
      .then((response) => {
        if (response.ok) {
          return response.text(); // text message from backend
        } else {
          return response.text().then((message) => {
            throw new Error(message); // Handle error messages from backend
          });
        }
      })
      .then((message) => {
        this.setState({
          successMessage: message, // Set successMessage to the returned text
          error: null,
          filteredMeal: null,
          searchId: "",
        });
        this.fetchAllMealDetails(); // Refresh meal details list

        setTimeout(() => this.setState({ successMessage: null }), 5000); // Hide notification after 3 seconds
      })
      .catch((error) => {
        console.error(error);
        this.setState({ error: error.message || "Error updating meal details.", successMessage: null });
      });
  };

  validateForm = () => {
    const { filteredMeal } = this.state;
    const errors = {};

    if (filteredMeal.quantity <= 0) errors.quantity = "Quantity must be greater than 0.";
    if (filteredMeal.calories < 0) errors.calories = "Calories cannot be negative.";
    if (filteredMeal.protein < 0) errors.protein = "Protein cannot be negative.";
    if (filteredMeal.carbs < 0) errors.carbs = "Carbohydrates cannot be negative.";
    if (filteredMeal.vitamins < 0) errors.vitamins = "Vitamins cannot be negative.";

    const foodNameRegex = /^[A-Za-z\s]+$/;
    if (!foodNameRegex.test(filteredMeal.foodName)) {
      errors.foodName = "Food name must contain only alphabets.";
    }

    const currentDate = new Date().toISOString().split("T")[0];
    if (filteredMeal.mealDate > currentDate) {
      errors.mealDate = "Meal date cannot be in the future.";
    }

    if (Object.keys(errors).length > 0) {
      this.setState({ errors });
      return false;
    }
    return true;
  };

  render() {
    const { allMealDetails, filteredMeal, error, successMessage, searchId, errors } = this.state;

    return (
      <Container className="mt-4">
        <h2 className="text-center mb-3">Meal Details</h2>

        {error && <Alert variant="danger">{error}</Alert>}
        {successMessage && (
          <div className="notification">
            {successMessage}
          </div>
        )}

        <Row className="mb-3">
          <Col md={4}>
            <Form.Control
              type="text"
              placeholder="Enter Meal ID to search"
              value={searchId}
              onChange={this.handleSearchChange}
            />
          </Col>
          <Col md={3}>
            <Button variant="primary" onClick={this.fetchMealDetailsById}>
              Search By Meal Id
            </Button>
          </Col>
          <Col md={3}>
            <Button variant="primary" onClick={this.handleShowAllMeals}>
              Show All Meal Details
            </Button>
          </Col>
        </Row>

        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Meal ID</th>
              <th>Meal Type</th>
              <th>Date</th>
              <th>Food Name</th>
              <th>Quantity (grams)</th>
              <th>Calories</th>
              <th>Protein (grams)</th>
              <th>Carbohydrates (grams)</th>
              <th>Vitamins (mg)</th>
            </tr>
          </thead>
          <tbody>
            {filteredMeal ? (
              <tr key={filteredMeal.mealId}>
                <td>{filteredMeal.mealId}</td>
                <td>{filteredMeal.meal}</td>
                <td>{filteredMeal.mealDate}</td>
                <td>{filteredMeal.foodName}</td>
                <td>{filteredMeal.quantity}</td>
                <td>{filteredMeal.calories}</td>
                <td>{filteredMeal.protein}</td>
                <td>{filteredMeal.carbs}</td>
                <td>{filteredMeal.vitamins}</td>
              </tr>
            ) : allMealDetails.length > 0 ? (
              allMealDetails.map((detail) => (
                <tr key={detail.mealId}>
                  <td>{detail.mealId}</td>
                  <td>{detail.meal}</td>
                  <td>{detail.mealDate}</td>
                  <td>{detail.foodName}</td>
                  <td>{detail.quantity}</td>
                  <td>{detail.calories}</td>
                  <td>{detail.protein}</td>
                  <td>{detail.carbs}</td>
                  <td>{detail.vitamins}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9">No meal details available.</td>
              </tr>
            )}
          </tbody>
        </Table>

        {filteredMeal && (
          <Form className="mt-4">
            <h3>Update Meal Details</h3>
            <Row className="mb-3">
            <Col md={6}>
                  <Form.Group controlId="meal">
                    <Form.Label>Meal Type</Form.Label>
                    <Form.Control
                    as="select"
                    name="meal"
                    value={filteredMeal.meal}
                    onChange={this.handleInputChange}
                  >
                    <option value="Snack">Snack</option>
                    <option value="Breakfast">Breakfast</option>
                    <option value="Dinner">Dinner</option>
                    <option value="Lunch">Lunch</option>
                  </Form.Control>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group controlId="mealDate">
                  <Form.Label>Meal Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="mealDate"
                    value={filteredMeal.mealDate}
                    onChange={this.handleInputChange}
                    isInvalid={errors.mealDate}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.mealDate}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                 <Form.Group controlId="foodName">
                   <Form.Label>Food Name</Form.Label>
                   <Form.Control
                    type="text"
                    name="foodName"
                    value={filteredMeal.foodName}
                    onChange={this.handleInputChange}
                  />
                  {errors.foodName && (
                    <Form.Text className="text-danger">{errors.foodName}</Form.Text>
                  )}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="quantity">
                  <Form.Label>Quantity (grams)</Form.Label>
                  <Form.Control
                    type="number"
                    name="quantity"
                    value={filteredMeal.quantity}
                    onChange={this.handleInputChange}
                  />
                  {errors.quantity && (
                    <Form.Text className="text-danger">{errors.quantity}</Form.Text>
                  )}
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="calories">
                  <Form.Label>Calories</Form.Label>
                  <Form.Control
                    type="number"
                    name="calories"
                    value={filteredMeal.calories}
                    onChange={this.handleInputChange}
                  />
                  {errors.calories && (
                    <Form.Text className="text-danger">{errors.calories}</Form.Text>
                  )}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="protein">
                  <Form.Label>Protein (grams)</Form.Label>
                  <Form.Control
                    type="number"
                    name="protein"
                    value={filteredMeal.protein}
                    onChange={this.handleInputChange}
                  />
                  {errors.protein && (
                    <Form.Text className="text-danger">{errors.protein}</Form.Text>
                  )}
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="carbs">
                  <Form.Label>Carbohydrates (grams)</Form.Label>
                  <Form.Control
                    type="number"
                    name="carbs"
                    value={filteredMeal.carbs}
                    onChange={this.handleInputChange}
                  />
                  {errors.carbs && (
                    <Form.Text className="text-danger">{errors.carbs}</Form.Text>
                  )}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="vitamins">
                  <Form.Label>Vitamins (mg)</Form.Label>
                  <Form.Control
                    type="number"
                    name="vitamins"
                    value={filteredMeal.vitamins}
                    onChange={this.handleInputChange}
                  />
                  {errors.vitamins && (
                    <Form.Text className="text-danger">{errors.vitamins}</Form.Text>
                  )}
                </Form.Group>
              </Col>
            </Row>

            <Button variant="primary" onClick={this.handleUpdateMeal}>Update Meal</Button>
            <Button variant="danger" onClick={this.handleDeleteMeal}>Delete Meal</Button>
          </Form>
        )}
      </Container>
    );
  }
}


