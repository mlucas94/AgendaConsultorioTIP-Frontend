import React, { useState, useEffect } from 'react';
import { agendarTurno, buscarPacienteLike } from './Api.js';
import Form from "react-bootstrap/Form";
import { format } from 'date-fns'
import Alert from "react-bootstrap/Alert"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Swal from 'sweetalert2';
import { Button, Table } from 'react-bootstrap';

    const NuevoTurnoFecha = (props) => {

        const [horariosData, setHorariosData] = useState(
            [
                {horaInicio: '13:00', horaFin:'13:00'},
                {horaInicio: '13:00', horaFin:'13:00'},
                {horaInicio: '13:00', horaFin:'13:00'},
                {horaInicio: '13:00', horaFin:'13:00'},
                {horaInicio: '13:00', horaFin:'13:00'},
                {horaInicio: '13:00', horaFin:'13:00'},
                {horaInicio: '13:00', horaFin:'13:00'},
                {horaInicio: '13:00', horaFin:'13:00'},
                {horaInicio: '13:00', horaFin:'13:00'},
            ]
        )

        const [turnoData, setTurnoData] = useState({
            fecha: props.fecha,
            tipo: "Sin asignar",
            paciente: {value: null, label: "Ingrese dni del paciente"},
        });

        return (
            <div className="container">
                <h4>Horarios Disponibles</h4>
                <h5>{props.fecha}</h5>
                <div>
                    {horariosData.map((horario) =>
                    <Row style={{ textAlign:'center'}}>
                        <Col>
                            <Button style={{backgroundColor:'teal', borderColor:'teal'}}>{horario.horaInicio}</Button>
                        </Col>
                    </Row>
                    )}
                </div>

                

                <div>
                    <Row style={{ textAlign:'center'}}>
                        <Col><Button style={{backgroundColor:'teal'}}>07:30</Button></Col>
                        <Col><Button>08:00</Button></Col>
                        <Col><Button>9:00</Button></Col>
                    </Row>
                    <Row>
                        <Col>08:30</Col>
                        <Col>09:00</Col>
                        <Col>09:00</Col>
                    </Row>
                    <Row>
                        <Col>09:30</Col>
                        <Col>10:00</Col>
                    </Row>
                </div>
            </div>
        )
    }

export default NuevoTurnoFecha