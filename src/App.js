import logo from './logo.svg';
import './App.css';
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useHistory,
  NavLink,
    Redirect
} from "react-router-dom";
import Turno from './components/Turno';

const App = () => {
  return (
    <Router>
      <div>
      <Routes>
        <Route path="/turno" element={ <Turno/> }/>
        <Route path="/*" element={ <Turno/> }/>
      </Routes>
      </div>
    </Router>
  ) 
}

export default App;
