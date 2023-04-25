import Container from 'react-bootstrap/Container';
import {Nav, Row, Col} from 'react-bootstrap';
import "./css/BarraNavegacion.css"


const BarraNavegacion = (props) => {
    
    return(

        <Container fluid>




        <Nav
        activeKey="/home"
        onSelect={selectedKey => alert(`selected ${selectedKey}`)}
        >
        <div className='d-flex flex-column'>

        <div className='p-2'>
            <Nav.Link href="/">Inicio</Nav.Link>
        </div>

        <div className='p-2 '>
            <Nav.Link eventKey="link-1">Turnos</Nav.Link>
            </div>
            <div className='p-2'>
            <Nav.Link eventKey="link-2">Pacientes</Nav.Link>
            </div>
            </div>
        </Nav>
        </Container>
        
    )

}

export default BarraNavegacion