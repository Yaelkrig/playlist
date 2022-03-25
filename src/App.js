import './App.css';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import SignUp from './components/SignUp/SignUp';
import Header from './components/Header/Header';
import About from './components/About/About';
import SideBar from './components/SideBar/SideBar';
console.log('app');
const App = () => (
  <Router className="App">
    <Header />
    <SideBar />
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/Login" element={<Login />} />
      <Route exact path="/SignUp" element={<SignUp />} />
    </Routes>
    <About />
  </Router>
)



export default App;
