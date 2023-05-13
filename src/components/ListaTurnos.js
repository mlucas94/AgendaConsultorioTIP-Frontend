import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTurnos } from './Api.js';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table'
import { useLocation } from 'react-router-dom'
import { format } from 'date-fns'

const ListaTurnos = () => {

    const location = useLocation()

    const [listaTurnosData, setListaTurnosData] = useState([])

    useEffect(() => {
        getTurnosData();
    }, [])

    const getTurnosData = () => {
        getTurnos(location.state ? location.state.fecha : format(new Date(), 'yyyy-MM-dd'))
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
            <Link to={{pathname: `/calendario`}} type="button" className="btn btn-primary"> Nuevo turno </Link>
            <div>
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
                listaTurnosData.map((turno) =>
                    <tr>
                        {
                            //if dependiendo de prioridad de turno, resaltarlo con algun color
                            turno.tipo === 'PRIORITARIO' ?
                             <td className='bg-danger text-white' align='center'>{turno.tipo}</td> 
                             : <td align='center'>{turno.tipo}</td>
                        }
                        {/* <td align='center'>{turno.tipo}</td> */}
                        <td align='center'>{turno.paciente.nombre}</td>
                        <td align='center'>{turno.horarioInicio.substr(11, 5)}</td>
                        <td align='center'>
                        <Link to={{pathname: `/turno/${turno.id}`}} type="button" className="btn btn-primary"> Ver </Link>
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
