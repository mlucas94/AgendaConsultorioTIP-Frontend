import React, { useState, useEffect } from 'react';
import { turnoById, getArchivosTurno, cargarArchivoTurno, desasociarArchivoTurno } from './Api.js';
import { useParams } from 'react-router-dom';
import ArchivosPaginados from './ArchivosPaginados.js';

const Turno = (props) => {
    const [turnoData, setTurnoData] = useState({
    	fechaInicio: "",
        horaInicio: "",
        horaFin: "",
        tipo: "Sin asignar",
        pacienteId: null,
        pacienteNombre: ""

    });

    const [paginacion, setPaginacion] = useState ({
        first: null,
        last: null,
        totalPages: null
    })

    let { id } = useParams();

    const [paginaArchivos, setPaginaArchivos] = useState ({
        numeroPagina: 0,
        orderBy: "fechaCarga",
        ascendingOrder: false,
        turnoId: id,
    })

    
    const [archivos, setArchivos] = useState ([]);

    useEffect(() => {
        getTurnoData();
        traerArchivosPaginadosTurno(paginaArchivos)
    }, [])

    const [archivoNuevo, setArchivoNuevo] = useState (null)

    const traerArchivosPaginadosTurno = () => {
        getArchivosTurno(paginaArchivos)
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

    const handleFileChange = (e) => {
        setArchivoNuevo(e.target.files[0])
    }

    const handleSubirArchivo = (e) => {
        e.preventDefault()
        if(archivoNuevo !== null) {
            cargarArchivoTurno(archivoNuevo, id)
            .then(data => {
                traerArchivosPaginadosTurno(paginaArchivos)
            })
        }
    }

    const handleEliminarArchivo = (archivoId) => {
        desasociarArchivoTurno(archivoId, id).then(
            data => {
                traerArchivosPaginadosTurno()
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
        setPaginaArchivos({...paginaArchivos, numeroPagina: paginacion.totalPages-1})
    }

    const getTurnoData = () => {
        turnoById(id)
            .then(
            data => {
                setTurnoData({...turnoData,
                    fecha: data.horarioInicio.substr(0, 10),
                    horaInicio: data.horarioInicio.substr(11, 5),
                    horaFin: data.horarioFin.substr(11, 5),
                    tipo: data.tipo,
                    pacienteNombre: data.paciente.nombre,
                    pacienteId: data.paciente.id

                })   
            })
            .catch(error => {
                setTurnoData({
                    ...turnoData,
                    tipo: "ERROR",
                })
            })
    }

    return (
        <div className="container p-4">
            <h2>Datos del turno</h2>
            <hr/>
            <div className="px-2 py-2 col-md-12">
                <table className="table table-bordered table-striped    ">
                    <tbody>
                        <tr>
                            <td><h5>Tipo de turno</h5></td>
                            <td><h6>{turnoData.tipo}</h6></td>
                        </tr>
                        <tr>
                            <td><h5>Nombre Paciente</h5></td>
                            <td><h6>{turnoData.pacienteNombre}</h6></td>
                        </tr>
                        <tr>
                            <td><h5>Fecha</h5></td>
                            <td><h6>{turnoData.fecha}</h6></td>
                        </tr>
                        <tr>
                            <td><h5>Hora de inicio</h5></td>
                            <td><h6>{turnoData.horaInicio}</h6></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <ArchivosPaginados
            handleClickEliminar={handleEliminarArchivo} 
            handleClickPagina={handleCambiarPagina} 
            handleClickPrimero={handleIrAPrimero} 
            handleClickUltimo={handleIrAUltimo}
            paginacion={paginacion} 
            archivos={archivos} 
            numeroPagina={paginaArchivos.numeroPagina}
            />
            <hr/>
            <div>
                <h6>Cargar nuevo archivo</h6>
                <input type ="file" onChange={handleFileChange}/>
                <button className="btn btn-primary" type="submit" onClick={handleSubirArchivo}>Guardar Archivo</button>
            </div>
    	</div>
    )

}

export default Turno;
