import Main from "./projectComponents/main";
import "bootstrap/dist/css/bootstrap.min.css";
import UserLogin from "./Login/userLogin";
import LoginSelector from "./Login/LoginSelector";

function App() {
  return (
    <div className="App">
      {/* <Main></Main> */}
      <LoginSelector />
      {/* <UserLogin /> */}
    </div>
  );
}

export default App;

