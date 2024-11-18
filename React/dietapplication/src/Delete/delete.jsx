import React, { Component } from "react";

class DeleteDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meals: [
        {
          id: 1,
          userId: 101,
          mealType: "Breakfast",
          mealDate: "2024-11-17",
          foodName: "Oatmeal",
          quantity: 100, // grams
          calories: 150,
          protein: 5, // grams
          carbohydrates: 27, // grams
          vitamins: 0.5, // mg
        },
        {
          id: 2,
          userId: 102,
          mealType: "Lunch",
          mealDate: "2024-11-17",
          foodName: "Grilled Chicken Salad",
          quantity: 200, // grams
          calories: 350,
          protein: 30, // grams
          carbohydrates: 10, // grams
          vitamins: 1.2, // mg
        },
        {
          id: 3,
          userId: 103,
          mealType: "Snack",
          mealDate: "2024-11-17",
          foodName: "Apple",
          quantity: 150, // grams
          calories: 95,
          protein: 0.5, // grams
          carbohydrates: 25, // grams
          vitamins: 0.7, // mg
        },
        {
          id: 4,
          userId: 104,
          mealType: "Dinner",
          mealDate: "2024-11-17",
          foodName: "Steamed Vegetables and Rice",
          quantity: 250, // grams
          calories: 400,
          protein: 8, // grams
          carbohydrates: 60, // grams
          vitamins: 2.0, // mg
        },
      ],
    };
  }

  handleDelete = (id) => {
    const deletedMeal = this.state.meals.find((meal) => meal.id === id);
    console.log("Deleted Meal:", deletedMeal);

    const updatedMeals = this.state.meals.filter((meal) => meal.id !== id);
    this.setState({ meals: updatedMeals });
  };

  render() {
    return (
      <div>
        <h2>Meal List</h2>
        {this.state.meals.map((meal) => (
          <div
            key={meal.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <p>
              <strong>User ID:</strong> {meal.userId}
            </p>
            <p>
              <strong>Meal Type:</strong> {meal.mealType}
            </p>
            <p>
              <strong>Meal Date:</strong> {meal.mealDate}
            </p>
            <p>
              <strong>Food Name:</strong> {meal.foodName}
            </p>
            <p>
              <strong>Quantity:</strong> {meal.quantity} grams
            </p>
            <p>
              <strong>Calories:</strong> {meal.calories}
            </p>
            <p>
              <strong>Protein:</strong> {meal.protein} grams
            </p>
            <p>
              <strong>Carbohydrates:</strong> {meal.carbohydrates} grams
            </p>
            <p>
              <strong>Vitamins:</strong> {meal.vitamins} mg
            </p>
            <button
              onClick={() => this.handleDelete(meal.id)}
              style={{
                backgroundColor: "#ff6666",
                color: "white",
                padding: "5px 10px",
                border: "none",
                borderRadius: "5px",
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    );
  }
}

export default DeleteDetails;
