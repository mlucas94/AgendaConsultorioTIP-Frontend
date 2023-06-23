import { useEffect, useState } from "react";
import { descargarArchivo } from "./Api";
import { Col } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { getArchivosPaciente, cargarArchivo, eliminarArchivo } from "./Api";
import Swal from "sweetalert2"
import './css/Botones.css';
import { mostrarAlertaCarga, cerrarAlertaCarga } from "./FuncionesGenerales";

const ArchivosPaginados = (props) => {

    let { id } = useParams();

    const [paginaArchivos, setPaginaArchivos] = useState ({
        numeroPagina: 0,
        orderBy: "fechaCarga",
        ascendingOrder: false,
        pacienteId: id,
    })

    const [paginacion, setPaginacion] = useState ({
        first: null,
        last: null,
        totalPages: null
    })

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

    useEffect(() => {
        traerArchivosPaginadosPaciente(paginaArchivos)
    }, [paginaArchivos])

    const [archivos, setArchivos] = useState ([]);

    const [archivoNuevo, setArchivoNuevo] = useState (null)

    const handleFileChange = (e) => {
        setArchivoNuevo(e.target.files[0])
    }

    const handleSubirArchivo = (e) => {
        e.preventDefault()
        if(archivoNuevo !== null) {
            mostrarAlertaCarga();
            cargarArchivo(archivoNuevo, id)
            .then(data => {
                cerrarAlertaCarga()
                traerArchivosPaginadosPaciente(paginaArchivos)
            })
            .catch(error => {
                cerrarAlertaCarga()
                Swal.fire({title: error.message});
            })
        }
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

    const handleIrAPrimero = () => {
        setPaginaArchivos({...paginaArchivos, numeroPagina: 0})
    }

    const handleIrAUltimo = () => {
        setPaginaArchivos({...paginaArchivos, numeroPagina: paginacion.totalPages-1})
    }

    const handleCambiarPagina = (nroPagina) => {
        setPaginaArchivos({...paginaArchivos, numeroPagina: nroPagina})
    }

    return (

        <div className="row p-4">
            {archivos && (archivos.length > 0) ?    
                <div>
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                            <th style={{textAlign: 'center'}}>Fecha de carga</th>
                            <th style={{textAlign: 'center'}}>Nombre</th>
                            <th style={{textAlign: 'center'}}>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {archivos.map(archivo => (
                                <tr align="center" key={"archivo-id-" +archivo.id}>
                                    <td>{archivo.fechaCarga}</td>
                                    <td>{archivo.nombreArchivo}</td>
                                    <td>
                                        <button className="btn-primario" onClick={(e) => handleDescargarArchivo(archivo.id, archivo.nombreArchivo)}>Descargar</button> 
                                        <button className="btn btn-danger" onClick={(e)=> handleEliminarArchivo(archivo.id)}>Eliminar</button>
                                    </td>
                                </tr>  
                            ))}
                        </tbody>
                    </table>
                   
                    </div>
                        : <table className="table table-stripped table-bordered"><tbody><tr align="center"><td>No se encontraron archivos asociados</td></tr></tbody></table> }

                    {paginacion.first === paginacion.last ? 
                        <h6>Actualmente mostrando la unica pagina disponible</h6>
                        : 
                        <div className="row">
                            <Col md={3}><button onClick={handleIrAPrimero} className={' btn-' + (paginacion.first ? "secundario \" disabled" : "primario")  } >Primera</button></Col>
                            <Col md={3}><button onClick={(e) => handleCambiarPagina(paginaArchivos.numeroPagina - 1)} className={' btn-' + (paginacion.first ? "secundario \" disabled" : "primario")  } >Anterior</button></Col>
                            <Col md={3}><button onClick={(e) => handleCambiarPagina(paginaArchivos.numeroPagina + 1)} className={' btn-' + (paginacion.last ? "secundario \" disabled" : "primario")  } >Siguiente</button></Col>
                            <Col md={3}><button onClick={handleIrAUltimo} className={' btn-' + (paginacion.last ? "secundario \" disabled" : "primario")  } >Ultima</button></Col>
                        </div>
                    }
            <br/>
            <div className="pt-4">
                        <h6>Carga de archivos</h6>
                <input type ="file" onChange={handleFileChange}/>
                <button className=" btn-primario" type="submit" onClick={handleSubirArchivo}>Guardar Archivo</button>
            </div>
            <div className="pt-3">
                <Link to={{pathname: `/pacientes`}} state={id}  className=" btn-primario" style={{ textDecoration: 'none' }}>Volver a paciente</Link>
            </div>
        </div>


)

}

export default ArchivosPaginados
