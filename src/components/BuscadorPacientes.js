import { useState, useEffect } from "react"
import AsyncSelect from 'react-select/async'
import { buscarPacienteLike, getPaciente, proximoTurnoPaciente } from "./Api"
import { Col, Collapse, Row } from "react-bootstrap"
import Swal from "sweetalert2"
import ArchivosPaginados from "./ArchivosPaginados"
import { Link } from "react-router-dom"
import './css/Botones.css'

const BuscadorPacientes = (props) => {
    
    const [dniONombre, setDniONombre] = ""
    const [paciente, setPaciente] = useState({
        nombre: "",
        dni: null,
        edad: null,
        obraSocial: "",
        plan: "",
        email: "",
        telefono: null,
        id: null
    })
    const [proximoTurno, setProximoTurno] = useState({
        idTurno: null,
        fechaTurno: null,
    })

    useEffect(() => {
        if(props.pacienteId !== "") {
            seleccionarPacienteProp()
        }
    },[])

    useEffect(() => {
        if(paciente.id !== null) {
            getProximoTurno()
        }
    },[paciente])

    const getProximoTurno = () => {
        proximoTurnoPaciente(paciente.id)
        .then(
            data => {
                if(data) {
                    setProximoTurno({
                        idTurno: data.id,
                        fechaTurno: data.horarioInicio
                    }
                    )
                }
            }
        )
    }

    const seleccionarPacienteProp = () => {
        getPaciente(props.pacienteId)
        .then(
            data => {
                setPaciente({
                    nombre: data.nombre,
                    dni: data.dni,
                    edad: data.edad,
                    obraSocial: data.obraSocial,
                    plan: data.plan,
                    email: data.email,
                    telefono: data.telefono,
                    id: data.id
                })
            }
        )
        .catch(
            error=> {
                Swal.fire({
                    title: 'Usuario no encontrado'
                })
            }
        )
    }

    const handleInputPaciente = (input) => {
        return buscarPacienteLike({dniONombre: input})
        .then(
            data => {
                return data.map((t) => ({value: t.id, label: t.nombre}))        
            }
        )
        .catch(
            error=> {
            }
        )
    }

    const seleccionarPaciente = (e) => {
        const pacienteId = e.value
        getPaciente(pacienteId)
        .then(
            data => {
                setPaciente({
                    nombre: data.nombre,
                    dni: data.dni,
                    edad: data.edad,
                    obraSocial: data.obraSocial,
                    plan: data.plan,
                    email: data.email,
                    telefono: data.telefono,
                    id: data.id
                })
            }
        )
        .catch(
            error=> {
                Swal.fire({
                    title: 'Usuario no encontrado'
                })
            }
        )
    }

    const handleLimpiarPaciente = () => {
        setPaciente( {
            nombre: "",
            dni: null,
            edad: null,
            obraSocial: "",
            plan: "",
            email: "",
            telefono: null,
            id: null
        })
    }

    return (
        <div>
            <div className="row px-2 py-1 ">
                <div className="col-md-5">
                <AsyncSelect
                    name="paciente-select"
                    required="Por favor elija un paciente"
                    error="NOT VALID"
                    onChange={seleccionarPaciente}
                    loadOptions={handleInputPaciente}
                    placeholder={"Ingrese dni o nombre de paciente"}
                    value={{label: dniONombre}}
                    />
                </div>
                <div className="col-md-5" >
                    <button className=" btn-primario" onClick={handleLimpiarPaciente}>Limpiar busqueda</button>
                </div>
                <Collapse in={paciente.nombre.length > 0} >
                    <div className="row">
                        <div className="px-2 py-2 col-md-10">
                            <hr/>
                        <h4>Detalle del paciente</h4>
                            <table className="table table-bordered table-striped    ">
                                <tbody>
                                    <tr>
                                        <td><h6>Nombre</h6></td>
                                        <td>{paciente.nombre}</td>
                                    </tr>
                                    <tr>
                                        <td><h6>DNI</h6></td>
                                        <td>{paciente.dni}</td>
                                    </tr>
                                    <tr>
                                        <td><h6>Telefono</h6></td>
                                        <td>{paciente.telefono}</td>
                                    </tr>
                                    <tr>
                                        <td><h6>Email</h6></td>
                                        <td>{paciente.email}</td>
                                    </tr>
                                    <tr>
                                        <td><h6>Cobertura</h6></td>
                                        <td>{paciente.obraSocial ? paciente.obraSocial + " - " + paciente.plan : "No se encontro informacion de cobertura medica"}</td>
                                    </tr>
                                    <tr>
                                        <td><h6>Proximo Turno</h6></td>
                                        <td>
                                        {proximoTurno.idTurno ?
                                            <Row>
                                                <Col className="inline">
                                                    <div>{proximoTurno.fechaTurno}</div>
                                                </Col>
                                                <Col>
                                                    <Link to={{pathname: `/turno/${proximoTurno.idTurno}`}} className="btn-primario" style={{ textDecoration: 'none' }}>Ir al turno</Link>
                                                </Col>
                                            </Row>
                                            : <div>No hay turnos agendados para el paciente</div>}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <h4>Historia Clinica</h4>
                        <div className="px-2 py-2 col-md-10" id="archivos-paciente">
                            <Link to={{pathname: `/archivos_paciente/${paciente.id}`}} className="btn-primario" style={{ textDecoration: 'none' }} >VER ARCHIVOS</Link>
                        </div>
                        <div className="px-2 py-2 col-md-10" id="formularios-paciente">
                        <Link to={{ pathname: `/formulario_listado` }} state={paciente.id} className="btn-primario" style={{ textDecoration: 'none' }} >VER FORMULARIOS</Link>
                        </div>
                    </div>
                </Collapse>
            </div>
        </div>
    )
    

}

export default BuscadorPacientes