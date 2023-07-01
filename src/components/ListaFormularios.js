import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom"
import { getListaFormularios } from './Api.js';
import Table from 'react-bootstrap/Table'
import { format } from 'date-fns'
import './css/Botones.css';

const ListaFormularios = () => {

    const [listaFormularios, setListaFormularios] = useState([])

    useEffect(() => {
        getFormularios();
    }, [])

    const getFormularios = () => {
        getListaFormularios()
        .then(
            data => {
                setListaFormularios(
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
                    <th style={{textAlign: 'center'}}>Id</th>
                    <th style={{textAlign: 'center'}}>Acciones</th>
                </thead>
                <tbody>
            {
                listaFormularios.map((formulario) =>
                    <tr>
                        <td align='center'>{formulario.id}</td> 
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

export default ListaFormularios;
