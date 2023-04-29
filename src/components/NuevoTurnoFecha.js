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

    const NuevoTurnoFecha = (props) => {

        const navigate = useNavigate;
        
        const [horariosOpcionesData, setHorariosOpcionesData] = useState(buscarHorariosDeDia(props.fecha, 0))
        
        const [horariosData, setHorariosData] = useState(
            [
                {horaInicio: '09:00', horaFin:'10:00'},
                {horaInicio: '10:00', horaFin:'11:00'},
                {horaInicio: '11:00', horaFin:'12:00'},
                {horaInicio: '12:00', horaFin:'13:00'},
                {horaInicio: '13:00', horaFin:'14:00'},
                {horaInicio: '14:00', horaFin:'15:00'},
                {horaInicio: '15:00', horaFin:'16:00'},
                {horaInicio: '16:00', horaFin:'17:00'},
                {horaInicio: '17:00', horaFin:'18:00'},
            ]
            )

        const [horariosData2, setHorariosData2] = useState(
            [
                {horaInicio: '09:00', horaFin:'09:30'},
                {horaInicio: '09:30', horaFin:'10:00'},
                {horaInicio: '10:00', horaFin:'10:30'},
                {horaInicio: '10:30', horaFin:'11:00'},
                {horaInicio: '11:00', horaFin:'11:30'},
                {horaInicio: '11:30', horaFin:'12:00'},
                {horaInicio: '12:00', horaFin:'12:30'},
                {horaInicio: '12:30', horaFin:'13:00'},
                {horaInicio: '13:00', horaFin:'13:30'},
                {horaInicio: '13:30', horaFin:'14:00'},
                {horaInicio: '14:00', horaFin:'14:30'},
                {horaInicio: '14:30', horaFin:'15:00'},
                {horaInicio: '15:00', horaFin:'15:30'},
                {horaInicio: '15:30', horaFin:'16:00'},
                {horaInicio: '16:00', horaFin:'16:30'},
                {horaInicio: '16:30', horaFin:'17:00'},
                {horaInicio: '17:00', horaFin:'17:30'},
                {horaInicio: '17:30', horaFin:'18:00'},
            ]
            )
            
            const [turnoData, setTurnoData] = useState({
                fecha: props.fecha,
                tipo: props.tipo ? props.tipo : '0',
                paciente: {value: null, label: "Ingrese dni del paciente"},
            });
            
            const [alertaTipo, setAlertaTipo] = useState(null)
            
            useEffect(() => {
            }, [])
            
        const elementListaHorarios = (horariosSeleccionados) => {
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
                    <Button onClick={() => { handleElegirHorario(horario.horaInicio, horario.horaFin)} }>
                        { horario.horaInicio }
                    </Button>
                    </Col>)
                })
                result.push(<Row className='horariosRow'>{resultRow}</Row>)
            }
            return <div>{result}</div>
        }

        const handleElegirHorario = (horarioElegido, horarioElegidoFin) => {
            //Validaciones
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
            const turnoAgendar = {
                fecha: turnoData.fecha,
                horaInicio: horarioElegido,
                horaFin: horarioElegidoFin,
                tipo: 'PRIORITARIO',
                paciente: 1,
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
            console.log(tipoTurno)
            setAlertaTipo(null)
            if(tipoTurno === "") {
                setAlertaTipo("Debe ingresar un tipo de turno.")
            }
            setTurnoData( {
                ...turnoData,
                tipo: tipoTurno || null
            })
            setHorariosOpcionesData(buscarHorariosDeDia(props.fecha, tipoTurno))
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
                    <Col className="m-3">
                        <Form.Label>Tipo de turno</Form.Label>
                        <Form.Select onChange={seleccionarTipo}>
                            <option value='0' label='REGULAR'></option>
                            <option value='1' label='PRIORITARIO'></option>
                            <option value='2' label='SOBRETURNO'></option>
                        </Form.Select>
                    </Col>
                </Row>
                <div>
                    {elementListaHorarios(horariosData)}
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