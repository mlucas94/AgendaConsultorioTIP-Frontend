import React, { useState, useEffect } from 'react';
import { agendarTurno, buscarPacienteLike, buscarHorariosDeDia } from './Api.js';
import Form from "react-bootstrap/Form";
import { format } from 'date-fns'
import Alert from "react-bootstrap/Alert"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Swal from 'sweetalert2';
import { Button, Table } from 'react-bootstrap';
import './css/NuevoTurnoFecha.css'
import { useNavigate } from 'react-router-dom';
import AsyncSelect from 'react-select/async';

    const NuevoTurnoFecha = (props) => {

        const navigate = useNavigate;
        
        const [horariosOpcionesData, setHorariosOpcionesData] = useState([])
            
            const [turnoData, setTurnoData] = useState({
                fecha: props.fecha,
                tipo: props.tipo ? props.tipo : 'REGULAR',
                paciente: {value: null, label: "Ingrese dni del paciente"},
            });
            
            const [alertaTipo, setAlertaTipo] = useState(null)
            
            useEffect(() => {
                getHorarios()
            }, [])

        const getHorarios = () => {
            buscarHorariosDeDia(props.fecha, turnoData.tipo || props.tipo)
                .then(
                    data=> {
                        setHorariosOpcionesData(data)
                    }
                )
        }
            
        const elementListaHorarios = () => {
            const horarios = horariosOpcionesData
            const largoFila = 3
            const listaFilas = Math.ceil(horarios.length/largoFila)   
            let result = []
            for (let index = 0; index < listaFilas; index++) {
                const horariosParaFila = horarios.slice(index*largoFila, (index*largoFila)+largoFila)
                let resultRow = []
                horariosParaFila.forEach(horario => {
                    resultRow.push(
                    <Col className='centerText' >
                        {
                            horario.disponible ? 
                        <Button className='disponible' onClick={() => { handleElegirHorario(horario.horaInicio, horario.horaFin)} }>
                            { horario.horaInicio }
                        </Button> :
                        <Button className='ocupado'>
                        { horario.horaInicio }
                    </Button>

                        }
                    </Col>)
                })
                result.push(<Row className='horariosRow'>{resultRow}</Row>)
            }
            return <div>{result}</div>
        }

        const handleElegirHorario = (horarioElegido, horarioElegidoFin) => {
            Swal.fire({
                title: '¿Quiere guardar el nuevo turno?',
                            showCancelButton: true,
                            confirmButtonText: 'Confirmar',
                            cancelButtonText: 'Cancelar',
                            allowOutsideClick: false,
                            icon: 'warning'
            }).then ((result) => {
                if(result.isConfirmed) {
                    handleAgendarTurno(horarioElegido, horarioElegidoFin)
                }
            })
        }

        const handleAgendarTurno = (horarioElegido, horarioElegidoFin) => {
            let tipoTurno = turnoData.tipo;
            const turnoAgendar = {
                fecha: turnoData.fecha,
                horaInicio: horarioElegido,
                horaFin: horarioElegidoFin,
                tipo: tipoTurno,
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
                                let confirmedFunction = props.closeFunction;
                                confirmedFunction()
                            } else {
                                window.location='/'
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

        const seleccionarTipo = (e) => {
            const tipoTurno = e.target.value
            setTurnoData( {
                ...turnoData,
                tipo: tipoTurno || null
            })
            buscarHorariosDeDia(props.fecha, tipoTurno)
                .then(
                    data=> {
                        setHorariosOpcionesData(data)
                    }
                )
        }

        return (
            <div className="container">
                <h2 className='centerText'>Nuevo Turno</h2>
                <Row className="centerText">
                    <Col>
                        <h5>Horarios Disponibles</h5>
                    </Col>
                    <Col>
                        <h5>{props.fecha}</h5>
                    </Col>
                </Row>
                <Row>
                    <Col className="m-2">
                        <Form.Label>Tipo de turno</Form.Label>
                        <Form.Select onChange={seleccionarTipo}>
                            <option value='REGULAR' label='REGULAR'></option>
                            <option value='PRIORITARIO' label='PRIORITARIO'></option>
                            <option value='SOBRETURNO' label='SOBRETURNO'></option>
                        </Form.Select>
                    </Col>
                </Row>
                <Row>
                    <Col className="m-3">
                    <Form.Label>Paciente</Form.Label>
                        <AsyncSelect
                        name="paciente-select"
                        required="Por favor elija un paciente"
                        error="NOT VALID"
                        onChange={seleccionarPaciente}
                        loadOptions={handleInputPaciente}
                        value={{label: turnoData.paciente.label}}
                        />
                    </Col>
                </Row>
                <div>
                    {elementListaHorarios()}
                </div>
                

                <div hidden>
                    <Row style={{ textAlign:'center'}}>
                        <Col><Button style={{backgroundColor:'teal'}}>07:30</Button></Col>
                        <Col><Button style={{backgroundColor:'teal'}}>07:30</Button></Col>
                        <Col><Button style={{backgroundColor:'teal'}}>07:30</Button></Col>
                    </Row>
                    <Row style={{ textAlign:'center'}}>
                    <Col><Button style={{backgroundColor:'teal'}}>07:30</Button></Col>
                    <Col><Button style={{backgroundColor:'teal'}}>07:30</Button></Col>
                    <Col><Button style={{backgroundColor:'teal'}}>07:30</Button></Col>
                    </Row>
                    <Row style={{ textAlign:'center'}}>
                    <Col><Button style={{backgroundColor:'teal'}}>07:30</Button></Col>
                    <Col><Button style={{backgroundColor:'teal'}}>07:30</Button></Col>
                    </Row>
                </div>
            </div>
        )
    }

export default NuevoTurnoFecha