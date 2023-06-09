import { useState, useEffect } from "react"
import AsyncSelect from 'react-select/async'
import { buscarPacienteLike, getPaciente, getArchivosPaciente, descargarArchivo, cargarArchivo, eliminarArchivo } from "./Api"
import { Collapse } from "react-bootstrap"
import Swal from "sweetalert2"

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
        pacienteId: null
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
                setArchivos(data)
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

    const handleDescargarArchivo = (id, nombreArchivo) => {
        descargarArchivo(id, nombreArchivo)
        .then( data => {
            const filename = nombreArchivo;
            const blob = new Blob([data], { type: data.type });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
        })
    }

    const handleEliminarArchivo = (id) => {
        eliminarArchivo(id).then(
            data => {
                traerArchivosPaginadosPaciente()
            }
        )
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
                            <table class="table table-bordered table-striped    ">
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
                        <div className="px-2 py-2 col-md-10" id="archivos-paciente">
                        
                            {archivos.length > 0 ?    
                            <table className="table table-bordered table-striped">
                                <thead>
                                    <th style={{textAlign: 'center'}}>Fecha de carga</th>
                                    <th style={{textAlign: 'center'}}>Nombre</th>
                                    <th style={{textAlign: 'center'}}>Acciones</th>
                                </thead>
                                <tbody>
                                    {archivos.map(archivo => (
                                        <tr align="center">
                                            <td>{archivo.fechaCarga}</td>
                                            <td>{archivo.nombreArchivo}</td>
                                            <td>
                                                <button className="btn btn-primary" onClick={(e) => handleDescargarArchivo(archivo.id, archivo.nombreArchivo)}>Descargar</button> 
                                                <button className="btn btn-danger" onClick={(e)=> handleEliminarArchivo(archivo.id)}>Eliminar</button>
                                            </td>
                                        </tr>  
                                    ))}
                                </tbody>
                            </table>
                                    : <table className="table table-stripped table-bordered"><tbody><tr align="center"><td>No se encontraron archivos asociados</td></tr></tbody></table> }
                            <div>
                            <br/>
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