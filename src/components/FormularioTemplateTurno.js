import { Alert, Col, Collapse, Form, FormCheck, FormControl, FormLabel, FormSelect, Row } from "react-bootstrap"
import { guardarRespuestasTurno, getFormulario } from "./Api"
import { useEffect, useState } from "react"
import Select from 'react-select'
import "./css/Botones.css"
import AsyncSelect from 'react-select/async'
import Swal from "sweetalert2"
import { Link, useParams } from "react-router-dom"
import { useLocation } from 'react-router-dom';

const FormularioTemplateTurno = (props) => {

    const { idTurno, idFormulario } = useParams();

    const idDelTurno = idTurno;
    const idDelFormulario = idFormulario

    const [formulario, setFormulario] = useState({
        id: null,
        titulo: "",
        preguntas: []
    })

    const [respuestasData, setRespuestasData] = useState([])

    useEffect(() => {
        getFormulario(idFormulario)
        .then((response) => {
            setFormulario(response)
            })
    },[])

    useEffect(() => {
        construirFormulario()
    },[formulario])

    const handleInputRespuestaText = (e) => {
        console.log(respuestasData)
        const idNuevaRespuesta = e.target.name;
        const textoRespuesta = e.target.value;

        const indexReemplazar = respuestasData.findIndex(respuesta => respuesta.idPregunta === idNuevaRespuesta)

        if(indexReemplazar !== -1) {
            let respuestasReemplazo = respuestasData;
            respuestasReemplazo[indexReemplazar] = {idPregunta:idNuevaRespuesta, respuestaNombre: textoRespuesta};
            setRespuestasData(respuestasReemplazo);
        } else {
            let respuestasReemplazo = respuestasData;
            respuestasReemplazo.push({idPregunta:idNuevaRespuesta, respuestaNombre: textoRespuesta})
            setRespuestasData(respuestasReemplazo);
        }
    }

    const handleInputRespuestaCheck = (e) => {
        const idNuevaRespuesta = e.target.name;
        const textoRespuesta = e.target.value;

        const indexReemplazar = respuestasData.findIndex(respuesta => respuesta.idPregunta === idNuevaRespuesta)

        if(indexReemplazar !== -1) {
            let respuestasReemplazo = respuestasData;
            respuestasReemplazo[indexReemplazar] = {idPregunta:idNuevaRespuesta, respuestaNombre: textoRespuesta};
            setRespuestasData(respuestasReemplazo);
        } else {
            let respuestasReemplazo = respuestasData;
            respuestasReemplazo.push({idPregunta:idNuevaRespuesta, respuestaNombre: textoRespuesta})
            setRespuestasData(respuestasReemplazo);
        }
    }

    const handleInputMultiselect = (e) => {
        console.log(e)
        let opcionesElegidas = []
        let selectTarget;
        e.map((opcionSeleccionada) => {
            opcionesElegidas.push(opcionSeleccionada.value)
            selectTarget = opcionSeleccionada.idSelect
        })
        if(opcionesElegidas.length > 0) {
            const idNuevaRespuesta = selectTarget
            const textoRespuesta = opcionesElegidas.join("; ");
    
            const indexReemplazar = respuestasData.findIndex(respuesta => respuesta.idPregunta === idNuevaRespuesta)
    
            if(indexReemplazar !== -1) {
                let respuestasReemplazo = respuestasData;
                respuestasReemplazo[indexReemplazar] = {idPregunta:idNuevaRespuesta, respuestaNombre: textoRespuesta};
                setRespuestasData(respuestasReemplazo);
            } else {
                let respuestasReemplazo = respuestasData;
                respuestasReemplazo.push({idPregunta:idNuevaRespuesta, respuestaNombre: textoRespuesta})
                setRespuestasData(respuestasReemplazo);
            }
        }
    }

    const handleSubmitRespuestas = (e) => {
        e.preventDefault()
            const objetoRespuestas = {idTurno: idDelTurno, idFormulario: idFormulario, nuevasRespuestas: respuestasData }
            console.log(objetoRespuestas)
            guardarRespuestasTurno(objetoRespuestas)
                .then((response) => Swal.fire ({
                    title: 'Se guardaron las respuestas',
                    showCancelButton: true,
                    confirmButtonText: 'Volver al turno',
                    cancelButtonText: 'Volver a inicio',
                    allowOutsideClick: false,
                    icon: 'success'
                }).then ((result) => {
                    if(result.isConfirmed) {
                        window.location='/turno/' + idDelTurno
                    } else {
                        window.location='/'
                    }
                }))
                .catch((error) => Swal.fire({title:error.message}))
    }

    const construirFormulario = () => {   

        const resultado = <div>
            <h3>{formulario.titulo}</h3>
            <Form name={formulario.titulo} onSubmit={handleSubmitRespuestas}>
                {formulario.preguntas.map((pregunta) => {
                    if(pregunta.tipo === 'TEXT') {
                        return (
                            <div key={pregunta.id} className="mb-2">
                            <FormLabel>{pregunta.preguntaNombre + (pregunta.obligatoria ? "*" : "") }</FormLabel>
                            <FormControl name={pregunta.id} required={pregunta.obligatoria} onChange={handleInputRespuestaText}/>
                            <span id={pregunta.id + '-validacion'}></span>
                        </div>
                    )
                    }
                    if(pregunta.tipo === 'RADIO') {
                        return <div key={pregunta.id} className="mb-2">
                            <FormLabel>{pregunta.preguntaNombre + (pregunta.obligatoria ? "*" : "")}</FormLabel>
                            <FormCheck
                                className="mx-4"
                                inline
                                type="radio"
                                name={pregunta.id}
                                label="Si"
                                value="Si"
                                onChange={handleInputRespuestaCheck}
                            />
                            <FormCheck
                                inline
                                type="radio"
                                name={pregunta.id}
                                label="No"
                                value="No"
                                onChange={handleInputRespuestaCheck}
                            />
                            <span id={pregunta.id + '-validacion'}></span>
                        </div>
                    }
                    if(pregunta.tipo === 'MULTISELECT'){
                        let optionsArray = [];
                        const opcionesDeMultiselect = pregunta.opciones.split(';');
                        opcionesDeMultiselect.map((opcion) => {
                            optionsArray.push({value: opcion, label: opcion, idSelect: pregunta.id})
                        })
                        return <div key={pregunta.id} className="mb-2">
                                <FormLabel>{pregunta.preguntaNombre + (pregunta.obligatoria ? "*" : "")}</FormLabel>
                                <Select name={pregunta.id} options={optionsArray} isMulti required={pregunta.obligatoria} onChange={handleInputMultiselect} />
                        </div>
                    }
                })}
                <Row className="pt-4">
                    <Col>
                        <button className="btn-primario">Enviar Respuestas</button>
                    </Col>
                </Row>
                <Row className="py-3">
                    <Col>
                    <Link to={{ pathname: `/formularios_turno/${idTurno}` }} className=" btn-primario" style={{ textDecoration: 'none' }}>Volver a formularios</Link>
                    </Col>
                </Row>
            </Form>
        </div>

        setFormularioHecho(resultado);
        return;
    }

    const [formularioHecho, setFormularioHecho] = useState(null)

    return (
        <div className="p-3 container">
            <h2>Vista de formulario</h2>
            <hr/>
            <div className="">
                <div>
                    {formularioHecho ? formularioHecho : ""}
                </div>
            </div>
        </div>
    )


}

export default FormularioTemplateTurno