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
import Calendario from './components/Calendario'
import BarraNavegacion from './components/BarraNavegacion';
import Login from './components/Login';
import { Col, Row } from 'react-bootstrap';

const App = () => {
  return (
    <Router>
      <div>
        <Row>
          <Col md={2}>
            <BarraNavegacion/>
          </Col>
          <Col md={10}>
                <Routes>
                  <Route path="/profesional/login" element={ <Login/> }/>
                  <Route path="/turno/:id" element={ <Turno/> }/>
                  <Route path="/turnos" element={ <ListaTurnos/> } />
                  <Route path="/*" element={ <ListaTurnos/> }/>
                  <Route path="/nuevo_turno" element={ <NuevoTurno/> }/>
                  <Route path="/calendario" element={ <Calendario/>}/>
                </Routes>
          </Col>
        </Row>
      </div>

    </Router>
  ) 
}

export default App;
