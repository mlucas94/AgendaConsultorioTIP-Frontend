import React, { useState, useEffect } from 'react';
import { turnoById, cancelarTurno } from './Api.js';
import { Link, useParams } from 'react-router-dom';
import './css/Botones.css'
import { mostrarAlertaCarga, cerrarAlertaCarga } from './FuncionesGenerales.js';
import Swal from 'sweetalert2';

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
                    setTurnoData({
                        ...turnoData,
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

    const cancelarTurnoPorId = () => {
        Swal.fire({
            title: 'Cancelar turno',
            text: '¿Desea cancelar el turno actual?',
            showCancelButton: true,
            confirmButtonText: 'Si, cancelar',
            cancelButtonText: 'No, ignorar',
            allowOutsideClick: false,
            icon: 'warning'
        }).then((result) => {
            if (result.isConfirmed) {
                mostrarAlertaCarga();
                cancelarTurno(id)
                    .then(() => {
                        cerrarAlertaCarga();
                        Swal.fire ({
                            title: 'Turno cancelado con éxito',
                            icon: 'success'
                        })
                        window.location = '/'
                    }).catch( 
                        error => {
                            cerrarAlertaCarga();
                            Swal.fire({
                                title: "No se canceló el turno",
                                icon: 'error',
                                confirmButtonText: 'Aceptar'
                            })
                        }
                    )
            } else {
                return
            }
        })
    }

    return (
        <div className="container p-4">
            <h2>Datos del turno</h2>
            <hr />
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
            <Link to={{ pathname: `/archivos_paciente_turno/${id}` }} className="mx-2 btn-primario" style={{ textDecoration: 'none' }}>Ver archivos</Link>
            <Link to={{ pathname: `/formularios_turno/${id}` }} className="mx-2 btn-primario" style={{ textDecoration: 'none' }}>Responder Formulario</Link>
            <Link to={{ pathname: `/formularios_completos_turno/${id}` }} className="mx-2 btn-primario" style={{ textDecoration: 'none' }}>Formularios Completados</Link>
            <Link onClick={cancelarTurnoPorId} className="mx-2 btn-primario" style={{ textDecoration: 'none' }}>Cancelar turno</Link>
            <hr />
            <Link to={{ pathname: `/pacientes` }} state={turnoData.pacienteId} className="mx-2 btn-primario" style={{ textDecoration: 'none' }}>Ir a paciente</Link>


        </div>
    )

}

export default Turno;
