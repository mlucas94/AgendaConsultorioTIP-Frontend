import { useState } from "react"
import BuscadorPacientes from "./BuscadorPacientes"
import { Link } from "react-router-dom"
import { Col, Row } from "react-bootstrap"
import './css/Botones.css';

const PacientesMain = () => {
    
    const [proximosTurnos, setProximosTurnos] = useState([])
    const [proximoPacientePrioritario, setProximoPacientePrioritario] = useState(null)

    return (
        <div className="p-3">
            <h3>Buscador de pacientes</h3>
            <hr/>
            <Row className="p-2">
                <Col md={8}>
                    <BuscadorPacientes/>
                </Col>
                <Col md={4}>
                    <Link className="btn btn-primario" to="/nuevo_paciente">Agendar paciente</Link>
                </Col>
            </Row>
            <Row className="py-2 px-3">
            </Row>
        </div>
    )    
}

export default PacientesMain;