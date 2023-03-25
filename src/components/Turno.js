import React, { useState, useEffect } from 'react';
import { turnoById } from './Api.js';

const Turno = (props) => {
    const [turnoData, setTurnoData] = useState({
    	mensaje: "Sin mensaje",
    });

    let id = 1
/*
    useEffect(() => {
        getTurnoData();
    }, [])
*/

    const getTurnoData = () => {
        turnoById(id)
            .then(
            data => {
                setTurnoData({...turnoData,
                    mensaje: data.mensaje,
                })       
            })
            .catch(error => {
                setTurnoData({
                    ...turnoData,
                    mensaje: "ERROR",
                })
            })
    }


    return (
    	<div className="container">
    		<h1>Test</h1>
    		<h3> {turnoData.mensaje} </h3>
    			<button type="button" class="btn btn-primary" onClick={getTurnoData}> Enviar Request	 </button>
    	</div>
    )

}

export default Turno;