import React, { useState, useEffect } from 'react';
import { turnoById } from './Api.js';
import { useParams } from 'react-router-dom';

const Turno = (props) => {
    const [turnoData, setTurnoData] = useState({
    	fechaInicio: "",
        horaInicio: "",
        horaFin: "",
        tipo: "Sin asignar",
        pacienteId: null

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
                    pacienteId: data.paciente.nombre,

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
    	<div className="container">
    		<h1>Turno</h1>
    		<h3> {turnoData.tipo} </h3>
            <h4> Paciente: { turnoData.pacienteId } </h4>

            <div class="row">
                <h5 class="col-md-2 control-label">Fecha turno:</h5>
                <div class="col-md-2">
                    <h5 id="fecha"> {turnoData.fecha} </h5>
                </div>
                <h5 for="horaInicio" class="col-md-2 control-label">Hora inicio:</h5>
                <div class="col-md-2">
                    <h5 id="horaInicio"> {turnoData.horaInicio} </h5>
                </div>
                <h5 for="horaFin" class="col-md-2 control-label">Hora fin:</h5>
                <div class="col-md-2">
                    <h5 id="horaFin"> {turnoData.horaFin} </h5>
                </div>
            </div>
    	</div>
    )

}

export default Turno;
