import { useEffect, useState } from "react"
import { Col, Collapse, Row, Table } from "react-bootstrap"
import { getLanding, getIdsTurnosDesplazados } from "./Api"
import { Link } from "react-router-dom"
import { formatEStoEN } from "./FuncionesGenerales"
import './css/Botones.css';

const LandingProfesional = (props) => {
    
    const [proximosTurnos, setProximosTurnos] = useState([])
    const [proximoPrioritario, setProximoPrioritario] = useState(null)
    const [cantTurnosHoy, setCantTurnosHoy] = useState(0)
    const [turnosDesplazados, setTurnosDesplazados] = useState([])

    useEffect(() => {
        console.log("Renderizando")
        getDatosLanding();
    }, [])

    useEffect(() => {
        if(proximoPrioritario !== null) {
            recuperarTurnosDesplazados();
        }   
    },[proximoPrioritario])

    const recuperarTurnosDesplazados = () =>{
        getIdsTurnosDesplazados(proximoPrioritario.id)
        .then((data) => {
            setTurnosDesplazados(data)
        })
    }

    const getDatosLanding = () => {
        getLanding()
        .then(
            data => {
                setProximosTurnos(data.proximosTurnos);
                setProximoPrioritario(data.proximoTurnoPrioritario);
                setCantTurnosHoy(data.cantidadTurnosDia);
            }
        )
    }

    const mostrarPrioritario = () => {
        if(turnosDesplazados.length > 0) {
            const proximaFecha = proximoPrioritario.horarioInicio.split(" ");
            const fechaSeleccionada = formatEStoEN(proximaFecha[0]);
            return <div>
                <Row className="bg-danger align-items-center" style={{ height: '50px',  borderRadius: "0.375rem"}}>
                    <Link to={{pathname: `/turnos`}} state={fechaSeleccionada} type="button" className=" text-white" style={{ textDecoration: 'none' }}> {'Su proximo turno prioritario se superpone con turnos previamente agendados. Puede modificarlos aqui'} </Link>
                </Row>
            </div>
        }
        if (proximoPrioritario) {
           return <div>
            <Row className="bg-danger align-items-center" style={{ height: '50px',  borderRadius: "0.375rem"}}>
                <Link to={{pathname:`/turno/${proximoPrioritario.id}`}} className="text-white">Tiene un turno prioritario programado.</Link>
            </Row></div>
        } 
        
        return
    }

    const mostrarCantTurnosHoy = () => {
            return <div className="py-2">
                <Row className="align-items-center" style={{ height: '50px', backgroundColor: "teal", borderRadius: "0.375rem" }}>
                    {cantTurnosHoy > 0 ?
                    <Link to={{pathname:`/turnos`}} className="text-white"> Hay {cantTurnosHoy} turnos agendados para hoy.</Link>
                    : <div className="text-white">No hay turnos para el dia de hoy</div>  }
                </Row>
            </div>
    }

    return (
        <div className='container'> 
            <h3 className="pt-4">Bienvenido/a, {sessionStorage.getItem('nombreUsuario')}</h3>
            <hr/>
            <div id='proximo-prioritario'>
                { mostrarPrioritario() } 
            </div>
            <div id='cantidad-turnos-hoy'>
                { mostrarCantTurnosHoy() }
            </div>
            <div id="navegacion-landing" className="py-2">
                <Row>
                    <Col className="text-center">
                        <Link to={{pathname:`/calendario`}} className="btn-primario" style={{ textDecoration: 'none' }}>Nuevo turno</Link>
                    </Col>
                    <Col className="text-center">
                        <Link to={{pathname:`/nuevo_paciente`}} className=" btn-primario" style={{ textDecoration: 'none' }}>Nuevo paciente</Link>
                    </Col>
                    <Col className="text-center">
                        <Link to={{pathname:`/pacientes`}} className=" btn-primario" style={{ textDecoration: 'none' }}>Buscar paciente</Link>
                    </Col>
                </Row>
            </div>
                {
                    proximosTurnos.length > 0 ? 
                    <div id='proximos-turnos' className="py-2">
                        <h4 className="py-2">Proximos turnos</h4>
                        <Table bordered>
                            <thead>
                                <th style={{textAlign: 'center'}}>Tipo de turno</th>
                                <th style={{textAlign: 'center'}}>Paciente</th>
                                <th style={{textAlign: 'center'}}>Hora de inicio</th>
                                <th style={{textAlign: 'center'}}>Acciones</th>
                            </thead>
                            <tbody>
                        {
                            proximosTurnos.map((turno) =>
                                <tr>
                                    {
                                        //if dependiendo de prioridad de turno, resaltarlo con algun color
                                        turno.tipo === 'PRIORITARIO' ?
                                        <td className='bg-danger text-white' align='center'>{turno.tipo}</td> 
                                        : <td align='center'>{turno.tipo}</td>
                                    }
                                    {/* <td align='center'>{turno.tipo}</td> */}
                                    <td align='center'>{turno.paciente.nombre}</td>
                                    <td align='center'>{turno.horarioInicio.substr(11, 5)}</td>
                                    <td align='center'>
                                    <Link to={{pathname: `/turno/${turno.id}`}} type="button" className="btn-primario" style={{ textDecoration: 'none' }}> Ver </Link>
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </Table>
                    </div>
                        : <h4 className="text-center pt-5">No se encontró ningún turno pendiente</h4>
                    }
        </div>
    )


}

export default LandingProfesional