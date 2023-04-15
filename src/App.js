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
import ListaTurnos from './components/ListaTurnos'
import NuevoTurno from './components/NuevoTurno'

const App = () => {
  return (
    <Router>
      <div>
      <Routes>
        <Route path="/turno/:id" element={ <Turno/> }/>
        <Route path="/turnos" element={ <ListaTurnos/> } />
        <Route path="/*" element={ <ListaTurnos/> }/>
        <Route path="/nuevo_turno" element={ <NuevoTurno/> }/>
      </Routes>
      </div>
    </Router>
  ) 
}

export default App;
