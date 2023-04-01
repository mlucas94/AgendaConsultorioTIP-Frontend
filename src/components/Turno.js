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

    let id = 1;

    useEffect(() => {
        getTurnoData();
    }, [])


    const getTurnoData = () => {
        turnoById(id)
            .then(
            data => {
                setTurnoData({...turnoData,
                    fecha: formatFecha(data.horarioInicio),
                    horaInicio: formatHora(data.horarioInicio),
                    horaFin: formatHora(data.horarioFin),
                    tipo: data.tipo,
                    pacienteId: data.pacienteId,

                })       
            })
            .catch(error => {
                setTurnoData({
                    ...turnoData,
                    tipo: "ERROR",
                })
            })
    }

    const formatFecha = (fechaArray) => {
        let fechaFormateada = fechaArray[0] + "-" + fechaArray[1] + "-" + fechaArray[2]
        return fechaFormateada
    }

    const formatHora = (horaArray) => {
        let horaFormateada = horaArray[3] + ":" + horaArray[4]
        return horaFormateada
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