import {Nav, Row, Col, NavLink} from 'react-bootstrap';
import "./css/BarraNavegacion.css"
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';



const BarraNavegacion = (props) => {

    
    const [tituloData, setTituloData] = useState('Inicio')

    const location = useLocation();
    
    useEffect(() => {
        mostrarTitulo();
    }, [location])

    const mostrarTitulo = () => {
        var titulo = window.location.pathname;
        titulo = titulo.replaceAll("_", " ").replace("/", "")
        titulo = titulo.charAt(0).toUpperCase() + titulo.slice(1)
        var finTitulo = titulo.indexOf('/')
        titulo = finTitulo != -1 ? titulo.slice(0, finTitulo) : titulo
        setTituloData(titulo ? titulo : 'Inicio')
    }

    const cerrarSesion = () => {
        sessionStorage.removeItem("currentUser")
        sessionStorage.removeItem("nombreUsuario")
    }

    return(

        <div>
            
            {
                (location.pathname ==="/" || location.pathname === "/profesional/registrarse" || location.pathname === "/profesional/login" ) ? null :

            
                <Nav
                    activeKey="/home"
                >
                    <div className='d-flex flex-column sidebar'>
                        <div>
                            <div className='sidebar-title'>
                                <h4>{tituloData}</h4>
                            </div>
                            <div className='sidebar-link'>
                                <NavLink className='sidebar-link-text' href="/">Inicio</NavLink>
                            </div>
                            <div className='sidebar-link'>
                            <NavLink className='sidebar-link-text' href="/calendario">Turnos</NavLink>
                            </div>
                            <div className='sidebar-link'>
                                <NavLink className='sidebar-link-text' href="/nuevo_paciente">Agendar Paciente</NavLink>
                            </div>
                            <div className='sidebar-link'>
                                <NavLink className='sidebar-link-text' href="/pacientes">Pacientes</NavLink>
                            </div>
                            <div className='sidebar-link'>
                                <NavLink className='sidebar-link-text' href="/formulario/">Crear Formulario</NavLink>
                            </div>
                            <div className='sidebar-link'>
                                <NavLink className='sidebar-link-text' href="/formulario_listado">Lista Formularios</NavLink>
                            </div>
                            <div className='sidebar-link'>
                                <NavLink className='sidebar-link-text' onClick={cerrarSesion} href="/profesional/login">Cerrar Sesion</NavLink>
                            </div>
                            
                        </div>
                    </div>
                </Nav>
            }
        </div>
        
    )

}

export default BarraNavegacion