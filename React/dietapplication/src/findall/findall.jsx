import react, { Component } from "react";
import { Table } from "react-bootstrap";

class FindAll extends Component{
  constructor(props){
    super(props);
    this.state={
      meals :[
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
          foodName: " Vegetables and Rice",
          quantity: 250, 
          calories: 400,
          protein: 8, 
          carbohydrates: 60, 
          vitamins: 2.0,
        },
      ]
    }
  }

  render(){
    return(
      <div className="table-responsive">
        <h2 className="text-center">Meal Details</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Meal Id</th>
              <th>User Id</th>
              <th>Meal Type</th>
              <th>Meal Date</th>
              <th>Meal Name</th>
              <th>Quantity</th>
              <th>Calories</th>
              <th>Protein</th>
              <th>Carbohydrates</th>
              <th>Vitamins</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.meals.map((meal)=>(
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
              ))
            }
          </tbody>
        </Table>
      </div>
    )
  }


}

export default FindAll;