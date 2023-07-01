import React, { useState, useEffect } from 'react';
import { Link, useLocation, useParams } from "react-router-dom"
import { getTurnos } from './Api.js';
import Table from 'react-bootstrap/Table'
import { format } from 'date-fns'
import './css/Botones.css';

const ListaTurnos = () => {

    const [listaFormulariosCompletos, setListaFormulariosCompletos] = useState([])

    useEffect(() => {
        getFormularios();
    }, [])

    const getFormularios = () => {
        getFormulariosCompletos()
            .then(
                data => {
                    setListaFormulariosCompletos(
                        data
                    )
                }
            )
            
    }
    
    return (
        <div className='container'>
            <h1>Turnos</h1>
            <Link to={{pathname: `/calendario`}} type="button" className="btn-primario" style={{ textDecoration: 'none' }}> Nuevo turno </Link>
            <div>
            <br/>
            <Table bordered>
                <thead>
                    {/* meter en un css el text align a th */}
                    <th style={{textAlign: 'center'}}>Tipo de turno</th>
                    <th style={{textAlign: 'center'}}>Paciente</th>
                    <th style={{textAlign: 'center'}}>Hora de inicio</th>
                    <th style={{textAlign: 'center'}}>Acciones</th>
                </thead>
                <tbody>
            {
                listaFormulariosCompletos.map((formulario) =>
                    <tr>
                        <td align='center'>{formulario.titulo}</td> 
                        <td align='center'>{formulario.pacienteId}</td> 
                        {/* <td align='center'>{formulario.tipo}</td> */}
                        <td align='center'>
                        <Link to={{pathname: `/formulario/${formulario.id}`}} type="button" className="btn-primario" style={{ textDecoration: 'none' }}> Ver </Link>
                        </td>
                    </tr>
                )}
                </tbody>
            </Table>
            </div>

        </div>
    )
}

export default ListaTurnos;
