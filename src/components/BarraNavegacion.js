import Container from 'react-bootstrap/Container';
import {Nav, Row, Col} from 'react-bootstrap';
import "./css/BarraNavegacion.css"



const BarraNavegacion = (props) => {
    
    const mostrarTitulo = () => {
        var titulo = window.location.pathname;
        titulo = titulo.replace("_", " ").replace("/", "")
        titulo = titulo.charAt(0).toUpperCase() + titulo.slice(1)
        console.log(titulo)
        return titulo ? titulo : "Inicio"
    }

    return(

        <div>

        <Nav
        activeKey="/home"
        >
        <div className='d-flex flex-column sidebar'>

            <div className='sidebar-title'>
                <h4>{mostrarTitulo()}</h4>
            </div>

        <div className='pt-2'>
            <Nav.Link href="/" className="bg-secondary text-white">
                <div className="ps-2">Inicio</div>
            </Nav.Link>
        </div>

        <div className='p-2 '>
            <Nav.Link href="/calendario">Turnos</Nav.Link>
            </div>
            <div className='p-2'>
            <Nav.Link href="/">Pacientes</Nav.Link>
            </div>
            </div>
        </Nav>
        </div>
        
    )

}

export default BarraNavegacion