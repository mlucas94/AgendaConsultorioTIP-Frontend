import React, { useState, useEffect } from 'react';
import { Link, useLocation, useParams } from "react-router-dom"
import { getFormulariosCompletadosTurno } from './Api.js';
import Table from 'react-bootstrap/Table'
import { format } from 'date-fns'
import './css/Botones.css';
import Swal from 'sweetalert2';

const ListaFormulariosCompletosTurno = () => {

    const [listaFormulariosCompletos, setListaFormulariosCompletos] = useState([])

    let { idTurno } = useParams();

    //TODO: En vez de param mandarlo como un attributo de elemento html y renderizarlo sobre la misma vista de turno para rellenar abajo

    useEffect(() => {
        recuperarFormulariosCompletos()
    }, [])

    const recuperarFormulariosCompletos = () => {
        getFormulariosCompletadosTurno(idTurno)
        .then((respuesta) => {
            setListaFormulariosCompletos(respuesta)
        })
        .catch((error) => {
            Swal.fire({title:error.message})
        })
    }


    
    return (
        <div className='container'>
            <h1>Formularios completados</h1>
            <div>
            <div>
                <Link to={{pathname: `/turno/${idTurno}`}} type="button" className="btn-primario" style={{ textDecoration: 'none' }}> Volver a turno </Link>      
            </div>
            <br/>
            <Table bordered>
                <thead>
                    {/* meter en un css el text align a th */}
                    <th style={{textAlign: 'center'}}>Titulo</th>
                    <th style={{textAlign: 'center'}}>Acciones</th>
                </thead>
                <tbody>
            {
                listaFormulariosCompletos.map((formulario) =>
                    <tr>
                        <td align='center'>{formulario.titulo}</td> 
                        <td align='center'>
                        <Link to={{pathname: `/formulario_completo_turno/${formulario.id}/${idTurno}`}} type="button" className="btn-primario" style={{ textDecoration: 'none' }}> Ver </Link>
                        </td>
                    </tr>
                )}
                </tbody>
            </Table>
            </div>

        </div>
    )
}

export default ListaFormulariosCompletosTurno;
