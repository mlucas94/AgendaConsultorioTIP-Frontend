import { useState, useEffect } from "react"
import AsyncSelect from 'react-select/async'
import { buscarPacienteLike, getPaciente, getArchivosPaciente, cargarArchivo, eliminarArchivo } from "./Api"
import { Collapse } from "react-bootstrap"
import Swal from "sweetalert2"
import ArchivosPaginados from "./ArchivosPaginados"

const BuscadorPacientes = () => {
    
    const [dniONombre, setDniONombre] = useState("")
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

    const [paginaArchivos, setPaginaArchivos] = useState ({
        numeroPagina: 0,
        orderBy: "fechaCarga",
        ascendingOrder: false,
        pacienteId: null,
    })

    const [paginacion, setPaginacion] = useState ({
        first: null,
        last: null,
        totalPages: null
    })

    useEffect(() => {
        if(paginaArchivos.pacienteId !== null) {
            traerArchivosPaginadosPaciente(paginaArchivos)
        }
    }, [paginaArchivos])

    const [archivos, setArchivos] = useState ([]);

    const [archivoNuevo, setArchivoNuevo] = useState (null)

    const handleFileChange = (e) => {
        setArchivoNuevo(e.target.files[0])
    }

    const handleSubirArchivo = (e) => {
        e.preventDefault()
        if(archivoNuevo !== null) {
            cargarArchivo(archivoNuevo, paciente.id)
            .then(data => {
                traerArchivosPaginadosPaciente(paginaArchivos)
            })
        }
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
                setPaginaArchivos({
                    ...paginaArchivos,
                    pacienteId: data.id
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

    const traerArchivosPaginadosPaciente = () => {
        getArchivosPaciente(paginaArchivos)
        .then(
            data => {
                setArchivos(data.archivos)
                setPaginacion({
                    first: data.primera,
                    last: data.ultima,
                    totalPages: data.cantidadPaginas
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
            telefono: null
        })
    }

    const handleEliminarArchivo = (id) => {
        eliminarArchivo(id).then(
            data => {
                traerArchivosPaginadosPaciente()
            }
        )
    }

    const handleCambiarPagina = (nroPagina) => {
        setPaginaArchivos({...paginaArchivos, numeroPagina: nroPagina})
    }

    const handleIrAPrimero = () => {
        setPaginaArchivos({...paginaArchivos, numeroPagina: 0})
    }

    const handleIrAUltimo = () => {
        console.log(paginacion)
        setPaginaArchivos({...paginaArchivos, numeroPagina: paginacion.totalPages-1})
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
                    <button className="btn btn-primary" onClick={handleLimpiarPaciente}>Limpiar busqueda</button>
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
                                </tbody>
                            </table>
                        </div>
                        <h4>Historia Clinica</h4>
                        <div className="px-2 py-2 col-md-10" id="archivos-paciente">
                            <ArchivosPaginados 
                            handleClickEliminar={handleEliminarArchivo} 
                            handleClickPagina={handleCambiarPagina} 
                            handleClickPrimero={handleIrAPrimero} 
                            handleClickUltimo={handleIrAUltimo}
                            paginacion={paginacion} 
                            archivos={archivos} 
                            numeroPagina={paginaArchivos.numeroPagina} />
                            <br/>
                            <div>
                                        <h6>Carga de archivos</h6>
                                <input type ="file" onChange={handleFileChange}/>
                                <button className="btn btn-primary" type="submit" onClick={handleSubirArchivo}>Guardar Archivo</button>
                            </div>
                        </div>
                    </div>
                </Collapse>
            </div>
        </div>
    )
    

}

export default BuscadorPacientes