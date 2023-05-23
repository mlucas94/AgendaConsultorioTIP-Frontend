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
import { Col, Row } from 'react-bootstrap';
import AgendarPaciente from './components/AgendarPaciente';
import PacientesMain from './components/PacientesMain'
import Inicio from './components/Inicio';

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
                  <Route path="/nuevo_paciente" element={<AgendarPaciente/>}/>
                  <Route path="/turno/:id" element={ <Turno/> }/>
                  <Route path="/turnos" element={ <ListaTurnos/> } />
                  <Route path="/*" element={ <ListaTurnos/> }/>
                  <Route path="/nuevo_turno" element={ <NuevoTurno/> }/>
                  <Route path="/calendario" element={ <Calendario/>}/>
                  <Route path="/paciente" element={ <PacientesMain/>}/>
                  <Route path="/inicio" element={ <Inicio/> }/>
                </Routes>
          </Col>
        </Row>
      </div>

    </Router>
  ) 
}

export default App;
