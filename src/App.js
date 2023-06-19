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
import PacientesMain from './components/PacientesMain';
import ArchivosPaginados from './components/ArchivosPaginados';
import ArchivosPaginadosTurno from './components/ArchivosPaginadosTurno';
import './components/css/AppExtra.css';

const App = () => {
  return (
    <Router>
      <div className=''>
        <Row>
          <Col md={2} className='columna-nav'>
            <BarraNavegacion/>
          </Col>
          <Col md={10} className='columna-main'>
                <Routes>
                  <Route path="/nuevo_paciente" element={<AgendarPaciente/>}/>
                  <Route path="/turno/:id" element={ <Turno/> }/>
                  <Route path="/turnos" element={ <ListaTurnos/> } />
                  <Route path="/*" element={ <ListaTurnos/> }/>
                  <Route path="/nuevo_turno" element={ <NuevoTurno/> }/>
                  <Route path="/calendario" element={ <Calendario/>}/>
                  <Route path="/pacientes" element={ <PacientesMain/>}/>
                  <Route path="/archivos_paciente/:id" element={<ArchivosPaginados/>}/>
                  <Route path="/archivos_paciente_turno/:id" element={<ArchivosPaginadosTurno/>}/>
                </Routes>
          </Col>
        </Row>
      </div>

    </Router>
  ) 
}

export default App;
