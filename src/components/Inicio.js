import { Col, Row } from "react-bootstrap"

const Inicio = () => {


    return (
        <div>
            <Row>
                <h3>SALUDO</h3>
            </Row>
            <Row>
                <button btn-danger>Proximo turno prioritario: fecha, paciente / No hay turno prioritario</button>
            </Row>
            <Row>
                <Col>
                    <label>Proximos turnos</label>
                    <div>
                        Proximos 5 turnos
                    </div>
                </Col>
                <Col>
                    <div>
                        
                    </div>
                </Col>
            </Row>

        </div>
    )
}

export default Inicio