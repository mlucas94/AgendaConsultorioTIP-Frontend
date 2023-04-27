import Container from 'react-bootstrap/Container';
import {Nav, Row, Col, NavLink} from 'react-bootstrap';
import "./css/BarraNavegacion.css"
import { Link } from 'react-router-dom';
import { useEffect } from 'react';



const BarraNavegacion = (props) => {
    
    const mostrarTitulo = () => {
        var titulo = window.location.pathname;
        titulo = titulo.replace("_", " ").replace("/", "")
        titulo = titulo.charAt(0).toUpperCase() + titulo.slice(1)
        console.log(titulo)
        return titulo ? titulo : "Inicio"
    }

    return(

        <div container-fluid sidebarColumn>

            <Nav
                activeKey="/home"
            >
                <div className='d-flex flex-column sidebar'>
                    <div>
                        <div className='sidebar-title'>
                            <h4>{mostrarTitulo()}</h4>
                        </div>
                        <div className='sidebar-link'>
                            <NavLink className='sidebar-link-text' href="/">Inicio</NavLink>
                        </div>
                        <div className='sidebar-link'>
                        <NavLink className='sidebar-link-text' href="/calendario">Turnos</NavLink>
                        </div>
                        <div className='sidebar-link'>
                            <NavLink className='sidebar-link-text' href="/">Pacientes</NavLink>
                        </div>
                    </div>
                </div>
            </Nav>
        </div>
        
    )

}

export default BarraNavegacion