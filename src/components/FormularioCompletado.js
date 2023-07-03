import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import { getRespuestasPaciente } from "./Api";

const FormularioCompletado = () => {

    const [tituloFormulario, setTituloFormulario] = useState("");

    const [respuestas, setRespuestas] = useState([]);

    const { idFormulario, idPaciente } = useParams();

    const recuperarRespuestas = () => {
        getRespuestasPaciente(idFormulario, idPaciente)
        .then(data => {
            console.log(data);
            setTituloFormulario(data.titulo);
            setRespuestas(data.preguntasRespondidas);
        })
    }

    useEffect(() => {
        recuperarRespuestas()
    }, [])


    const tablaResultados = () => {
        if(respuestas != []) {
            return <div className="pt-3">
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>Campo</th>
                            <th>Respuesta</th>
                            <th>Fecha</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        respuestas.map((respuesta) => (
                            <tr pregunta={respuesta.idPregunta} >
                                <td>{respuesta.preguntaNombre}</td>
                                <td>{respuesta.respuestaNombre}</td>
                                <td>{respuesta.fecha}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
        </div>
        }

    }

    return (
        <div className="p-4">
            <h3>{tituloFormulario}</h3>
            {
            respuestas !=[] ?
            tablaResultados()
            : <div>Cargando</div>
            }
        </div>
    )
}

export default FormularioCompletado