import { useEffect, useState } from "react";
import { descargarArchivo } from "./Api";
import { Col } from "react-bootstrap";

const ArchivosPaginados = (props) => {

    const handleDescargarArchivo = (id, nombreArchivo) => {
        descargarArchivo(id, nombreArchivo)
        .then( data => {
            const filename = nombreArchivo;
            const blob = new Blob([data], { type: data.type });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
        })
    }

    return (

        <div>
            {props.archivos && (props.archivos.length > 0) ?    
                <div>
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                            <th style={{textAlign: 'center'}}>Fecha de carga</th>
                            <th style={{textAlign: 'center'}}>Nombre</th>
                            <th style={{textAlign: 'center'}}>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.archivos.map(archivo => (
                                <tr align="center" key={"archivo-id-" +archivo.id}>
                                    <td>{archivo.fechaCarga}</td>
                                    <td>{archivo.nombreArchivo}</td>
                                    <td>
                                        <button className="btn btn-primary" onClick={(e) => handleDescargarArchivo(archivo.id, archivo.nombreArchivo)}>Descargar</button> 
                                        <button className="btn btn-danger" onClick={(e)=> props.handleClickEliminar(archivo.id)}>Eliminar</button>
                                    </td>
                                </tr>  
                            ))}
                        </tbody>
                    </table>
                    {props.paginacion.first === props.paginacion.last ? 
                        <h6>Actualmente mostrando la unica pagina disponible</h6>
                        : 
                        <div className="row">
                            <Col md={3}><button onClick={props.handleClickPrimero} className={'btn btn-' + (props.paginacion.first ? "secondary\" disabled" : "primary")  } >Primera</button></Col>
                            <Col md={3}><button onClick={(e) => props.handleClickPagina(props.numeroPagina - 1)} className={'btn btn-' + (props.paginacion.first ? "secondary\" disabled" : "primary")  } >Anterior</button></Col>
                            <Col md={3}><button onClick={(e) => props.handleClickPagina(props.numeroPagina + 1)} className={'btn btn-' + (props.paginacion.last ? "secondary\" disabled" : "primary")  } >Siguiente</button></Col>
                            <Col md={3}><button onClick={props.handleClickUltimo} className={'btn btn-' + (props.paginacion.last ? "secondary\" disabled" : "primary")  } >Ultima</button></Col>
                        </div>
                    }
                    </div>
                        : <table className="table table-stripped table-bordered"><tbody><tr align="center"><td>No se encontraron archivos asociados</td></tr></tbody></table> }
        </div>


)

}

export default ArchivosPaginados
