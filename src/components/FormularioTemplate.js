import { Alert, Col, Collapse, Form, FormCheck, FormControl, FormLabel, FormSelect, Row } from "react-bootstrap"
import { getPaciente, buscarPacienteLike, guardarRespuestas, getFormulario } from "./Api"
import { useEffect, useState } from "react"
import Select from 'react-select'
import "./css/Botones.css"
import AsyncSelect from 'react-select/async'
import Swal from "sweetalert2"
import { useParams } from "react-router-dom"
import { useLocation } from 'react-router-dom';

const FormularioTemplate = (props) => {

    const location = useLocation();
    const idDelPaciente = location.state;

    const [formulario, setFormulario] = useState({
        id: null,
        titulo: "",
        preguntas: []
    })

    const [dniONombre, setDniONombre] = ""
    const [paciente, setPaciente] = useState({
        nombre: "",
        dni: null,
        edad: null,
        obraSocial: "",
        plan: "",
        email: "",
        telefono: null,
        pacienteId: null
    })

    let { id } = useParams();

    //let { pacienteId } = props.pacienteId

    //Respuesta
    // const [respuestaData, setRespuestaData] = useState({
    //     pacienteId: null,
    //     respuestas: []
    // })

    const [respuestasData, setRespuestasData] = useState([])

    const [idPaciente, setIdPaciente] = useState(idDelPaciente)

    useEffect(() => {
        getFormulario(id)
        .then((response) => {
            //const stringResponse = response.form
            setFormulario(response)
            //construirFormulario(response)
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
            // const stringRespuestas = JSON.stringify(respuestaData);
            console.log(idPaciente)
            const objetoRespuestas = {idPaciente: idPaciente, idFormulario: id, nuevasRespuestas: respuestasData }
            console.log(objetoRespuestas)
            
            guardarRespuestas(objetoRespuestas)
                .then((response) => Swal.fire ({
                    title: 'Se guardaron las respuestas',
                    showCancelButton: true,
                    confirmButtonText: 'Formularios completados',
                    cancelButtonText: 'Volver a inicio',
                    allowOutsideClick: false,
                    icon: 'success'
                }).then ((result) => {
                    if(result.isConfirmed) {
                        window.location='/pacientes'
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
            </Form>
        </div>

        setFormularioHecho(resultado);
        return;
    }

    const [formularioHecho, setFormularioHecho] = useState(null)

    const handleInputPaciente = (input) => {
        return buscarPacienteLike({dniONombre: input})
        .then(
            data => {
                return data.map((t) => ({value: t.id, label: t.nombre}))        
            }
        )
        .catch(
            error=> {
            }
        )
    }

    const seleccionarPaciente = (e) => {
        const pacienteId = e.value
        getPaciente(pacienteId)
        .then(
            data => {
                console.log("ID DEL PACIENTE")
                console.log(pacienteId);
                //setIdPaciente(pacienteId);
                // setPaciente({
                //     nombre: data.nombre,
                //     dni: data.dni,
                //     edad: data.edad,
                //     obraSocial: data.obraSocial,
                //     plan: data.plan,
                //     email: data.email,
                //     telefono: data.telefono,
                //     pacienteId: data.id
                // })
            }
        )
        .catch(
            error=> {
                Swal.fire({
                    title: 'Fallo al traer datos de usuario'
                })
            }
        )
    }

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

export default FormularioTemplate