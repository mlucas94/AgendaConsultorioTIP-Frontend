import React, { useState, useEffect } from 'react';
import { agendarTurno, buscarPacienteLike } from './Api.js';
import Form from "react-bootstrap/Form";
import AsyncSelect from 'react-select/async'
import { useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import Alert from "react-bootstrap/Alert"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Swal from 'sweetalert2';


    const NuevoTurno = (props) => {

        const [turnoData, setTurnoData] = useState({
            fecha: props.fecha,
            horaInicio: null,
            horaFin: null,
            tipo: "Sin asignar",
            paciente: {value: null, label: "Ingrese dni del paciente"},
        });

        //Validaciones state
        const [alertaFecha, setAlertaFecha] = useState(null)
        const [alertaHora, setAlertaHora] = useState(null)
        const [alertaTipo, setAlertaTipo] = useState(null)

        useEffect(() => {
        }, [])

        const navigate = useNavigate()
        
        const todayDate = format(new Date(), 'yyyy-MM-dd');

        const handleAgendarTurno = (e) => {
            e.preventDefault()
            var valido =  alertaFecha === null && alertaHora === null && alertaTipo === null;
            if(!valido) {
                Swal.fire( 'Datos no validos', 'Hay campos con errores', 'warning' )
                return
            }
            const turnoAgendar = {
                fecha: turnoData.fecha,
                horaInicio: turnoData.horaInicio,
                horaFin: turnoData.horaFin,
                tipo: turnoData.tipo,
                paciente: turnoData.paciente.value,
            }
            agendarTurno(turnoAgendar)
                .then(
                    data => {
                        if (typeof data === "string") {
                            Swal.fire ({
                                title: 'Datos no validos para turno',
                                text: data,
                                icon: 'error'
                            })
                            return
                        }
                        Swal.fire ({
                            title: 'Agendado con exito!',
                            text: '¿Desea agendar un nuevo turno?',
                            showCancelButton: true,
                            confirmButtonText: 'Nuevo turno',
                            cancelButtonText: 'Volver a inicio',
                            allowOutsideClick: false,
                            icon: 'success'
                        }).then ((result) => {
                            if(result.isConfirmed) {
                                e.target.reset()
                                setTurnoData({...turnoData,
                                paciente: {value: null, label: "Ingrese dni del paciente"}})
                            } else {
                                navigate('/')
                            }
                        })
                    }
                )
                .catch( 
                    error => {
                        Swal.fire({
                            title: "Error de conexión",
                            text: "No se pudo guardar el turno.",
                            icon: 'error',
                            confirmButtonText: 'Aceptar'
                        })
                    }
                )
        };

        const handleInputPaciente = (input) => {
            return buscarPacienteLike({dniONombre: input})
            .then(
                data => {
                    return data.map((t) => ({value: t.id, label: t.nombre}))        
                }
            )
            .catch(
                error=> {
                    // Swal.fire({
                    //     title: "Error de conexión",
                    //     text: "No se pudieron recuperar los datos de pacientes.",
                    //     icon: 'error',
                    //     confirmButtonText: 'Aceptar'
                    // })
                }
            )
        }

        const seleccionarPaciente = (e) => {
            const paciente = e
            setTurnoData({...turnoData,
                paciente: paciente || null
            })
        }

        const seleccionarFecha = (e) => {
            const fecha = e.target.value
            setAlertaFecha(null);
            if (fecha.length > 10) {
                setAlertaFecha("Fecha incorrecta, asegurese de no haber ingresado digitos de mas.")
            }
            const fechaDate = new Date(fecha)
            const fechaHoy = new Date()
            fechaHoy.setUTCHours(0,0,0,0);
            if(fechaDate < fechaHoy) {
                setAlertaFecha("La fecha del turno debe ser posterior al dia de la fecha.")
            }
            setTurnoData({
                ...turnoData,
                fecha: fecha || null
            })
        }

        const seleccionarHoraInicio = (e) => {
            const hora = e.target.value
            setAlertaHora(null)
            if(turnoData.horaFin && hora >= turnoData.horaFin) {
                setAlertaHora("La hora de inicio debe ser anterior a la hora de fin del turno.")
            }
            setTurnoData({
                ...turnoData,
                horaInicio: hora || null
            })
        }

        const seleccionarHoraFin = (e) => {
            const hora = e.target.value
            setAlertaHora(null)
            if(turnoData.horaInicio && hora <= turnoData.horaInicio) {
                setAlertaHora("La hora de fin del turno debe ser posterior a la hora de inicio.")
            }
            setTurnoData({
                ...turnoData,
                horaFin: hora || null
            })
        }

        const seleccionarTipo = (e) => {
            const tipoTurno = e.target.value.trim()
            setAlertaTipo(null)
            if(tipoTurno === "") {
                setAlertaTipo("Debe ingresar un tipo de turno.")
            }
            setTurnoData( {
                ...turnoData,
                tipo: tipoTurno || null
            })
        }

        return (
                <Form onSubmit={handleAgendarTurno}>
                    <Form.Group controlId="fechaTurno">
                        <Form.Label>Fecha</Form.Label>
                        <Form.Control required name="fecha-form" value={turnoData.fecha} min={todayDate} type="date" placeholder="Seleccione una fecha" onChange={seleccionarFecha} />
                    </Form.Group>
                        { alertaFecha ? 
                            <Alert variant='danger' name="fecha-no-valida-alerta">{alertaFecha}</Alert> : null}
                    <Row>
                    <Col>
                    <Form.Group controlId="inicioTurno">
                        <Form.Label>Horario Inicio</Form.Label>
                        <Form.Control required type="time" onChange={seleccionarHoraInicio}/>
                    </Form.Group>
                    </Col>
                    <Col>
                    <Form.Group controlId="finTurno">
                        <Form.Label>Horario Fin</Form.Label>
                        <Form.Control required type="time" onChange={seleccionarHoraFin}/>
                    </Form.Group>
                    </Col>
                    </Row>
                    { alertaHora ?
                        <Alert variant='danger' name="hora-no-valida-alerta">{alertaHora}</Alert> : null }
                    <Form.Group>
                        <Form.Label>Tipo</Form.Label>
                        <Form.Control required type="text" onChange={seleccionarTipo}/>
                    </Form.Group>
                    { alertaTipo ?
                        <Alert variant='danger' name="tipo-no-valido-alerta">{alertaTipo}</Alert> : null }
                    <Form.Group>
                        <Form.Label>Paciente</Form.Label>
                        <AsyncSelect
                        name="paciente-select"
                        required="Por favor elija un paciente"
                        error="NOT VALID"
                        onChange={seleccionarPaciente}
                        loadOptions={handleInputPaciente}
                        value={{label: turnoData.paciente.label}}
                        />
                    </Form.Group>
                        <button variant="primary">
                            Guardar  
                        </button>
                </Form>                 
        )
    }

export default NuevoTurno;
