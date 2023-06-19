import React, { useState, useEffect } from 'react';
import { turnoById, getArchivosTurno, cargarArchivoTurno, desasociarArchivoTurno } from './Api.js';
import { Link, useParams } from 'react-router-dom';
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

    let { id } = useParams();


    useEffect(() => {
        getTurnoData();
    }, [])

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
            <Link to={{pathname: `/archivos_paciente_turno/${id}`}} className="btn btn-primary" >Ver archivos</Link>

            
    	</div>
    )

}

export default Turno;
