import { useState, useEffect } from "react"
import { getRespuestasPaciente } from "./Api"
import { useParams } from "react-router-dom";

const FormularioPaciente = () => {

    const [respuestas, setRespuestas] = useState({});

    let { id } = useParams();

    useEffect(() => {
        recuperarRespuestas();
    },[]);

    const recuperarRespuestas = () => {
        getRespuestasPaciente(id)
        .then(data => {
            console.log(data.contenido);
            setRespuestas(JSON.parse(data.contenido));
        })
    }


    const tablaResultados = () => {
        if(respuestas != {}) {
            const campos = Object.keys(respuestas);
            return <div className="pt-3">
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>Campo</th>
                            <th>Respuesta</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        campos.map((campoNombre) => (
                            <tr campo={campoNombre} >
                                <td>{campoNombre.charAt(0).toUpperCase() + campoNombre.slice(1).split('_').join(' ')}</td>
                                <td>{respuestas[campoNombre]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
        </div>
        }

    }

    return (
        <div className="p-4">
            <h3>Formulario primera consulta clinica</h3>
            {
            respuestas !={} ?
            tablaResultados()
            : <div>Cargando</div>
            }
        </div>
    )
}

export default FormularioPaciente