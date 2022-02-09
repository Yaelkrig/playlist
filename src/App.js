import './App.css';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import SignUp from './components/SignUp/SignUp';

const App = () => (
  <Router className="App">
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/Login" element={<Login />} />
      <Route exact path="/SignUp" element={<SignUp />} />
    </Routes>
  </Router>
)



export default App;
