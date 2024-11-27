// import React, { Component } from "react";
// import { Form, Button, Container, Alert } from "react-bootstrap";

// export default class FindCalories extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       startDate: "",
//       endDate: "",
//       averageCalories: null,
//       error: { startDate: "", endDate: "" },
//     };
//   }

//   validateStartDate = (date) => {
//     const today = new Date().toISOString().split("T")[0];
//     if (!date) return "Start date is required.";
//     if (date > today) return "Start date cannot be in the future.";
//     return "";
//   };

//   validateEndDate = (date, startDate) => {
//     const today = new Date().toISOString().split("T")[0];
//     if (!date) return "End date is required.";
//     if (date > today) return "End date cannot be in the future.";
//     if (startDate && date <= startDate) return "End date must be after start date.";
//     return "";
//   };

//   handleStartDateChange = (e) => {
//     const startDate = e.target.value;
//     this.setState((prevState) => ({
//       startDate,
//       error: {
//         ...prevState.error,
//         startDate: this.validateStartDate(startDate),
//         endDate: this.validateEndDate(prevState.endDate, startDate),
//       },
//     }));
//   };

//   handleEndDateChange = (e) => {
//     const endDate = e.target.value;
//     this.setState((prevState) => ({
//       endDate,
//       error: {
//         ...prevState.error,
//         endDate: this.validateEndDate(endDate, prevState.startDate),
//       },
//     }));
//   };

//   handleSubmit = (e) => {
//     e.preventDefault();
//     const { startDate, endDate } = this.state;

//     // Revalidate before submission
//     const startDateError = this.validateStartDate(startDate);
//     const endDateError = this.validateEndDate(endDate, startDate);
//     if (startDateError || endDateError) {
//       this.setState({ error: { startDate: startDateError, endDate: endDateError } });
//       return;
//     }

//     // Fetch average calories from API
//     fetch(`http://localhost:8080/mealdetails/aggregate?startDate=${startDate}&endDate=${endDate}&userId=${this.props.userId}`)
//       .then((response) => response.text())
//       .then((data) => {
//         this.setState({ averageCalories: data });
//       })
//       .catch((error) => {
//         console.error("Error fetching average calories:", error);
//       });
//   };

//   render() {
//     const { startDate, endDate, averageCalories, error } = this.state;

//     return (
//       <Container>
//         <h3 className="text-center mt-3">Find Average Calories</h3>
//         <Form onSubmit={this.handleSubmit}>
//           <Form.Group controlId="startDate">
//             <Form.Label>Start Date</Form.Label>
//             <Form.Control
//               type="date"
//               value={startDate}
//               onChange={this.handleStartDateChange}
//               isInvalid={!!error.startDate}
//             />
//             <Form.Control.Feedback type="invalid">{error.startDate}</Form.Control.Feedback>
//           </Form.Group>

//           <Form.Group controlId="endDate" className="mt-3">
//             <Form.Label>End Date</Form.Label>
//             <Form.Control
//               type="date"
//               value={endDate}
//               onChange={this.handleEndDateChange}
//               isInvalid={!!error.endDate}
//             />
//             <Form.Control.Feedback type="invalid">{error.endDate}</Form.Control.Feedback>
//           </Form.Group>

//           <Button variant="primary" type="submit" className="mt-4">
//             Submit
//           </Button>
//         </Form>

//         {averageCalories && (
//           <Alert variant="success" className="mt-4">
//             Average Calories: {averageCalories}
//           </Alert>
//         )}
//       </Container>
//     );
//   }
// }

import React, { Component } from "react";
import { Form, Button, Container, Alert, Row, Col } from "react-bootstrap";
import { UserContext } from "../Login/LoginSelector";
//import UserContext from "../contexts/UserContext"

export default class FindCalories extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
      startDate: "",
      endDate: "",
      averageCalories: null,
      error: { startDate: "", endDate: "" },
      submitted: false,
    };
  }

  validateStartDate = (date) => {
    const today = new Date().toISOString().split("T")[0];
    if (!date) return "Start date is required.";
    if (date > today) return "Start date cannot be in the future.";
    return "";
  };

  validateEndDate = (date, startDate) => {
    const today = new Date().toISOString().split("T")[0];
    if (!date) return "End date is required.";
    if (date > today) return "End date cannot be in the future.";
    if (startDate && date <= startDate)
      return "End date must be after start date.";
    return "";
  };

  handleStartDateChange = (e) => {
    const startDate = e.target.value;
    this.setState((prevState) => ({
      startDate,
      error: {
        ...prevState.error,
        startDate: this.validateStartDate(startDate),
        endDate: this.validateEndDate(prevState.endDate, startDate),
      },
    }));
  };

  handleEndDateChange = (e) => {
    const endDate = e.target.value;
    this.setState((prevState) => ({
      endDate,
      error: {
        ...prevState.error,
        endDate: this.validateEndDate(endDate, prevState.startDate),
      },
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { startDate, endDate } = this.state;

    const startDateError = this.validateStartDate(startDate);
    const endDateError = this.validateEndDate(endDate, startDate);
    if (startDateError || endDateError) {
      this.setState({
        error: { startDate: startDateError, endDate: endDateError },
        submitted: true,
      });
      return;
    }
    const userId = this.context?.userId;

    fetch(
      `http://localhost:8080/mealdetails/aggregate?startDate=${startDate}&endDate=${endDate}&userId=${userId}`
    )
      .then((response) => response.text())
      .then((data) => {
        this.setState({ averageCalories: data, submitted: true });
      })
      .catch((error) => {
        console.error("Error fetching average calories:", error);
      });
  };

  render() {
    const { startDate, endDate, averageCalories, error, submitted } =
      this.state;

    return (
      <Container className="mt-4">
        <h3 className="text-center">Find Average Calories</h3>
        <Form onSubmit={this.handleSubmit}>
          <Row className="mt-4">
            <Col md={6}>
              <Form.Group controlId="startDate">
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  type="date"
                  value={startDate}
                  onChange={this.handleStartDateChange}
                  isInvalid={submitted && !!error.startDate}
                />
                <Form.Control.Feedback type="invalid">
                  {error.startDate}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="endDate">
                <Form.Label>End Date</Form.Label>
                <Form.Control
                  type="date"
                  value={endDate}
                  onChange={this.handleEndDateChange}
                  isInvalid={submitted && !!error.endDate}
                />
                <Form.Control.Feedback type="invalid">
                  {error.endDate}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Button variant="primary" type="submit" className="mt-4">
            Find Calorie
          </Button>
        </Form>

        {averageCalories && (
          <Alert variant="success" className="mt-4 text-center">
            {averageCalories}
          </Alert>
        )}
      </Container>
    );
  }
}
