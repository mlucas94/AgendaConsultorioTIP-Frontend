import React, { useState, useEffect } from 'react';
import { Link, useLocation, useParams } from "react-router-dom"
import { getFormulariosCompletados } from './Api.js';
import Table from 'react-bootstrap/Table'
import { format } from 'date-fns'
import './css/Botones.css';
import Swal from 'sweetalert2';

const ListaFormulariosCompletos = () => {

    const [listaFormulariosCompletos, setListaFormulariosCompletos] = useState([])

    let { idPaciente } = useParams();

    useEffect(() => {
        getFormulariosCompletados(idPaciente)
        .then((respuesta) => {
            setListaFormulariosCompletos(respuesta)
        })
        .catch((error) => {
            Swal.fire({title:error.message})
        })
    }, [])

    const getFormularios = () => {
        // getFormulariosCompletos()
        //     .then(
        //         data => {
        //             setListaFormulariosCompletos(
        //                 data
        //             )
        //         }
        //     )
            
    }
    
    return (
        <div className='container'>
            <h1>Formularios completados</h1>
            <div>
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
                        <Link to={{pathname: `/formulario_completo/${formulario.id}/${idPaciente}`}} type="button" className="btn-primario" style={{ textDecoration: 'none' }}> Ver </Link>
                        </td>
                    </tr>
                )}
                </tbody>
            </Table>
            </div>

        </div>
    )
}

export default ListaFormulariosCompletos;
