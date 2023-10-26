
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Login from './components/Login'
import Signup from './components/Signup'
import Home from "./components/Home";
import Navbar from "./components/Navbar";

import "./style/main.scss"
import "./style/navbar.scss"
import "./style/home.scss"
import "./style/task-card.scss"

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element= { <Home/> }/>
          <Route path='/login' element={ <Login/> }/>
          <Route path='/signUp' element={ <Signup/> }/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
