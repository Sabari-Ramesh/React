import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import { UserContext } from "../Login/LoginSelector";
//import {UserContext} from "../contexts/UserProvider "
import { Button, Alert, Form } from "react-bootstrap";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default class MealGraph extends Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);
    this.state = {
      selectedPeriod: "Day", // Default period selection
      mealData: [],
      chartData: null,
      chartOptions: null,
      error: null,
    };
  }

  componentDidMount() {
    this.fetchMealData(); // Fetch meal data when the component mounts
  }

  fetchMealData = () => {
    const userId = this.context?.userId; // Get userId from context
    if (!userId) {
      this.setState({ error: "User ID is not available" });
      return;
    }

    fetch(`http://localhost:8080/mealdetails/findbyuserId/${userId}`)
      .then((response) => {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          return response.json();
        } else {
          return response.text(); // Handle non-JSON responses
        }
      })
      .then((data) => {
        if (typeof data === "string" && data === "No Details Available") {
          this.setState({
            error: "No Sufficient details Available to Generate the Graph",
          });
        } else {
          this.setState(
            { mealData: data, error: null },
            this.generateChartData // Generate chart data on successful fetch
          );
        }
      })
      .catch((error) => {
        this.setState({ error: error.message });
      });
  };

  // Aggregating meal data based on selected period (Day, Week, Month, Year)
  aggregateDataByPeriod = (meals, period) => {
    let aggregatedData = {};

    meals.forEach((meal) => {
      const date = new Date(meal.mealDate);
      let periodKey;

      // Group meals based on selected period
      switch (period) {
        case "Day":
          periodKey = date.toISOString().split("T")[0]; // Group by exact date
          break;
        case "Week":
          const startOfWeek = new Date(
            date.setDate(date.getDate() - date.getDay())
          ); // Start of the week
          periodKey = startOfWeek.toISOString().split("T")[0]; // Group by week start
          break;
        case "Month":
          periodKey = `${date.getFullYear()}-${date.getMonth() + 1}`; // Group by month
          break;
        case "Year":
          periodKey = `${date.getFullYear()}`; // Group by year
          break;
        default:
          periodKey = date.toISOString().split("T")[0]; // Default to Day
      }

      // Aggregate the nutritional values
      if (!aggregatedData[periodKey]) {
        aggregatedData[periodKey] = {
          calories: 0,
          protein: 0,
          carbs: 0,
          vitamins: 0,
        };
      }

      aggregatedData[periodKey].calories += meal.calories;
      aggregatedData[periodKey].protein += meal.protein;
      aggregatedData[periodKey].carbs += meal.carbs;
      aggregatedData[periodKey].vitamins += meal.vitamins;
    });

    return aggregatedData;
  };

  // Generate the chart data based on selected period
  generateChartData = () => {
    const { mealData, selectedPeriod } = this.state;
    const aggregatedData = this.aggregateDataByPeriod(mealData, selectedPeriod);
    const labels = Object.keys(aggregatedData);
    const calories = labels.map((label) => aggregatedData[label].calories);
    const protein = labels.map((label) => aggregatedData[label].protein);
    const carbs = labels.map((label) => aggregatedData[label].carbs);
    const vitamins = labels.map((label) => aggregatedData[label].vitamins);

    const chartData = {
      labels,
      datasets: [
        {
          label: "Calories",
          data: calories,
          borderColor: "rgba(255, 165, 0, 1)",
          fill: false,
        },
        {
          label: "Protein",
          data: protein,
          borderColor: "rgba(0, 128, 0, 1)",
          fill: false,
        },
        {
          label: "Carbs",
          data: carbs,
          borderColor: "rgba(0, 0, 255, 1)",
          fill: false,
        },
        {
          label: "Vitamins",
          data: vitamins,
          borderColor: "rgba(128, 0, 128, 1)",
          fill: false,
        },
      ],
    };

    const chartOptions = {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: "top",
        },
        title: {
          display: true,
          text: `Nutritional Data Aggregated by ${selectedPeriod}`,
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: "Time Period", // Label for X-axis
          },
        },
        y: {
          title: {
            display: true,
            text: "Sum of Nutritional Values", // Label for Y-axis
          },
        },
      },
    };

    this.setState({ chartData, chartOptions });
  };

  // Handle period change
  handlePeriodChange = (event) => {
    this.setState({ selectedPeriod: event.target.value });
  };

  // Handle button click to generate chart after period change
  handleGenerateClick = () => {
    this.generateChartData();
  };

  render() {
    const { chartData, chartOptions, error, selectedPeriod } = this.state;

    return (
      <div>
        <div className="d-flex align-items-center mb-3">
          <Form.Select
            value={selectedPeriod}
            onChange={this.handlePeriodChange}
            className="me-2"
            style={{ width: "200px", backgroundColor: "white", color: "black" }}
          >
            <option value="Day">Day</option>
            <option value="Week">Week</option>
            <option value="Month">Month</option>
            <option value="Year">Year</option>
          </Form.Select>

          <Button
            onClick={this.handleGenerateClick} // Call generate chart data
            className="btn btn-primary"
            style={{ height: "40px" }}
          >
            Generate Graph
          </Button>
        </div>

        {/* Display error if there's any */}
        {error && <Alert variant="danger">{error}</Alert>}

        {/* Render chart if data is available */}
        {chartData && <Line data={chartData} options={chartOptions} />}
      </div>
    );
  }
}
