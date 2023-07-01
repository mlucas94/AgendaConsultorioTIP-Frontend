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
import Registrar from './components/Registrar';
import { Col, Row } from 'react-bootstrap';
import AgendarPaciente from './components/AgendarPaciente';
import PacientesMain from './components/PacientesMain';
import ArchivosPaginados from './components/ArchivosPaginados';
import ArchivosPaginadosTurno from './components/ArchivosPaginadosTurno';
import './components/css/AppExtra.css';
import LandingProfesional from './components/LandingProfesional';
import FormularioIngresoClinico from './components/FormularioIngresoClinico';
import FormularioCompletado from './components/FormularioCompletado';
import Formulario from './components/Formulario';
import ListaFormularios from './components/ListaFormularios';
import FormularioTemplate from './components/FormularioTemplate';
import FormularioPaciente from './components/FormularioPaciente';

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
                  <Route path="/profesional/login" element={ <Login/> }/>
                  <Route path="/profesional/registrarse" element={ <Registrar/> }/>
                  <Route path="/nuevo_paciente" element={<AgendarPaciente/>}/>
                  <Route path="/turno/:id" element={ <Turno/> }/>
                  <Route path="/turnos" element={ <ListaTurnos/> } />
                  <Route path="/landing" element={ <LandingProfesional/> }/>
                  <Route path="/nuevo_turno" element={ <NuevoTurno/> }/>
                  <Route path="/calendario" element={ <Calendario/>}/>
                  <Route path="/pacientes" element={ <PacientesMain/>}/>
                  <Route path="/archivos_paciente/:id" element={<ArchivosPaginados/>}/>
                  <Route path="/archivos_paciente_turno/:id" element={<ArchivosPaginadosTurno/>}/>
                  <Route path="/formulario" element={<Formulario/>}/>
                  <Route path="/formulario_completo/:id" element={<FormularioCompletado/>}/>
                  <Route path="/formulario-2" element={<FormularioIngresoClinico/>}/>

                  <Route path="/formulario_listado" element={<ListaFormularios/>}/>
                  <Route path="/formulario/:id" element={<FormularioTemplate/>}/>
                  <Route path="/formulario_completado/:id" element={<FormularioPaciente/>}/>
                  <Route path="/paciente/formularios/:id" element={<ListaFormulariosCompletos/>}/>
                  
                  <Route path="/*" element={ <Login/> }/>
                </Routes>
          </Col>
        </Row>
      </div>

    </Router>
  ) 
}

export default App;
