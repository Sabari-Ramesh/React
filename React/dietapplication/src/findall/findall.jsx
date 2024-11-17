import React from "react";
import { Table } from "react-bootstrap";

export function FindAll() {
  const meals = [
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
  ];
  return (
    <div className="table-responsive">
      <h2 className="text-center">Meal Details</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Meal Id</th>
            <th>User Id</th>
            <th>Meal Type</th>
            <th>Meal Date</th>
            <th>Food Name</th>
            <th>Quantity</th>
            <th>Calories</th>
            <th>Protein</th>
            <th>Carbohydates</th>
            <th>Vitamins</th>
          </tr>
        </thead>
        <tbody>
          {meals.map((meal) => (
            <tr  key={meal.id}>
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
    </div>
  );
}
