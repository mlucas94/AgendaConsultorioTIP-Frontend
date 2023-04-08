import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTurnos } from './Api.js';

const ListaTurnos = () => {
    const [listaTurnosData, setListaTurnosData] = useState([])

    useEffect(() => {
        getTurnosData();
    }, [])

    const getTurnosData = () => {
        getTurnos()
            .then(
                data => {
                    setListaTurnosData(
                        data
                    )
                }
            )
            
    }
    
    return (
        <div className='container'>
            <h1>Turnos</h1>
            {
                listaTurnosData.map((turno) =>
                    <div className="d-flex justify-content-center pt-2">
                         <Link to={{pathname: `/turno/${turno.id}`}} type="button" className="btn btn-primary"> {turno.tipo} - {turno.paciente.nombre} </Link>
                    </div>
                )}
        </div>
    )
}

export default ListaTurnos;
