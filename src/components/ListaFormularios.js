import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom"
import { getListaFormularios } from './Api.js';
import Table from 'react-bootstrap/Table'
import './css/Botones.css';
import { useLocation } from 'react-router-dom';

const ListaFormularios = () => {

    const location = useLocation();
    const idDelPaciente = location.state;

    const [listaFormularios, setListaFormularios] = useState([])

    const pacienteId = idDelPaciente;

    useEffect(() => {
        getFormularios();
    }, [])

    const getFormularios = () => {
        getListaFormularios()
        .then(
            data => {
                console.log(data)
                setListaFormularios(
                    data
                )
            }
        )
            
    }
    
    return (
        <div className='container'>
            <h1>Formularios disponibles</h1>
            <Link to={{pathname: `/formulario`}} type="button" className="btn-primario" style={{ textDecoration: 'none' }}> Crear nuevo </Link>
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
                        <td align='center'>{formulario.titulo}</td> 
                        {/* <td align='center'>{formulario.tipo}</td> */}
                        <td align='center'>
                        <Link to={{ pathname: `/formulario/${formulario.id}` }} state={pacienteId} type="button" className="btn-primario" style={{ textDecoration: 'none' }}> Ver </Link>
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
