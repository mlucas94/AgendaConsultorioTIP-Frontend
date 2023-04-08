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
            pacienteId: null,  
        });
        const [pacientesData, setPacientesData] = useState({
            pacientes: {},
            seleccionado: null,
        })

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

        const handleInputPaciente = (e) => {
             //console.log(e)
            return buscarPacienteLike({dni: e})
            .then(
                data => {
                    // data.map((t) => ({value: t.id, label: t.nombre}))
                    // console.log(data.map((t) => ({value: t.id, label: t.nombre})))
                    console.log(data)
                    setPacientesData({...pacientesData,
                        pacientes: data.map(i=> ({label: i.nombre, value: i.id}))})
                        console.log(data.map(i=> ({label: i.nombre, value: i.id})))
                        
                }
            )
            .catch(
                error=> {

                }
            )
        }

        const seleccionarPaciente = (selected) => {
            setPacientesData({
                seleccionado: selected || null
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
                    value={pacientesData.seleccionado}
                    onChange={seleccionarPaciente}
                    loadOptions={handleInputPaciente}
                    options={pacientesData.pacientes}
                    />
                    
                    
                        <button variant="primary" type="submit">
                            Enviar
                        </button>
                </Form>
        )

    }

export default NuevoTurno;
