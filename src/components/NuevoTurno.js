import React, { useState, useEffect } from 'react';
import { agendarTurno, buscarPacienteLike } from './Api.js';
import Form from "react-bootstrap/Form";
import AsyncSelect from 'react-select/async'


    const NuevoTurno = () => {

        const [turnoData, setTurnoData] = useState({
            fechaInicio: null,
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

                    }
                )
                .catch( 
                    error => {

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

        const seleccionarPaciente = (selected) => {
            setTurnoData({...turnoData,
                paciente: selected || null
            })
        }

        return (
                <Form>
                    <Form.Group controlId="fechaTurno">
                        <Form.Label>Fecha</Form.Label>
                        <Form.Control type="date" placeholder="Seleccione una fecha" />
                    </Form.Group>
                    <Form.Group controlId="inicioTurno">
                        <Form.Label>Horario Inicio</Form.Label>
                        <Form.Control type="time"></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="finTurno">
                        <Form.Label>Horario Fin</Form.Label>
                        <Form.Control type="time"></Form.Control>
                    </Form.Group>
                    <AsyncSelect
                    value={turnoData.paciente}
                    onChange={seleccionarPaciente}
                    loadOptions={handleInputPaciente}
                    />
                    
                    
                        <button variant="primary" type="submit">
                            Enviar  
                        </button>
                </Form>                 
        )

    }

export default NuevoTurno;
