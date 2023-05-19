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
    	<div className="container p-4">
            <h2>Datos del turno</h2>
            <hr/>
            <div className='row p-3'>
                <div className='col-4'>
    		        <h4> Tipo de turno: {turnoData.tipo} </h4>
                </div>
                <div className='col-4'>
                    <h4> Paciente: { turnoData.pacienteId } </h4>
                </div>
            </div>
            <div class="row p-3">
                <h5 class="col-md-4 control-label">Fecha turno: {turnoData.fecha}</h5>
                <h5 for="horaInicio" class="col-md-4 control-label">Hora inicio: {turnoData.horaInicio}</h5>
                <h5 for="horaFin" class="col-md-4 control-label">Hora fin: {turnoData.horaFin}</h5>
            </div>
    	</div>
    )

}

export default Turno;
