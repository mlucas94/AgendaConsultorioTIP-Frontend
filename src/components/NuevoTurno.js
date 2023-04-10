import React, { useState, useEffect } from 'react';
import { agendarTurno, buscarPacienteLike } from './Api.js';
import Form from "react-bootstrap/Form";
import AsyncSelect from 'react-select/async'


    const NuevoTurno = () => {

        const [turnoData, setTurnoData] = useState({
            fecha: null,
            horaInicio: null,
            horaFin: null,
            tipo: "Sin asignar",
            paciente: null 
        });

        useEffect(() => {
        }, [])

        const handleAgendarTurno = () => {
            agendarTurno(turnoData)
                .then(
                    data => {
                        console.log(data)
                    }
                )
                .catch( 
                    error => {
                        console.log(error)
                    }
                )
        };

        const handleInputPaciente = (input) => {
            return buscarPacienteLike({dni: input})
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
            const paciente = e.value
            setTurnoData({...turnoData,
                paciente: paciente || null
            })
        }

        const seleccionarFecha = (e) => {
            const fecha = e.target.value
            setTurnoData({
                ...turnoData,
                fecha: fecha || null
            })
        }

        const seleccionarHoraInicio = (e) => {
            const hora = e.target.value
            setTurnoData({
                ...turnoData,
                horaInicio: hora || null
            })
        }

        const seleccionarHoraFin = (e) => {
            const hora = e.target.value
            setTurnoData({
                ...turnoData,
                horaFin: hora || null
            })
        }

        const seleccionarTipo = (e) => {
            const tipoTurno = e.target.value
            setTurnoData( {
                ...turnoData,
                tipo: tipoTurno || null
            })
        }

        return (
                <Form>
                    <Form.Group controlId="fechaTurno">
                        <Form.Label>Fecha</Form.Label>
                        <Form.Control type="date" placeholder="Seleccione una fecha" onChange={seleccionarFecha} />
                    </Form.Group>
                    <Form.Group controlId="inicioTurno">
                        <Form.Label>Horario Inicio</Form.Label>
                        <Form.Control type="time" onChange={seleccionarHoraInicio}/>
                    </Form.Group>
                    <Form.Group controlId="finTurno">
                        <Form.Label>Horario Fin</Form.Label>
                        <Form.Control type="time" onChange={seleccionarHoraFin}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Tipo</Form.Label>
                        <Form.Control type="text" onChange={seleccionarTipo}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Paciente</Form.Label>
                        <AsyncSelect
                        value={turnoData.paciente}
                        onChange={seleccionarPaciente}
                        loadOptions={handleInputPaciente}
                        />
                    </Form.Group>
                    
                    
                        <button variant="primary" onClick={handleAgendarTurno}>
                            Enviar  
                        </button>
                </Form>                 
        )

    }

export default NuevoTurno;
