import { Alert, Col, Collapse, Form, FormCheck, FormControl, FormLabel, FormSelect, Row } from "react-bootstrap"
import { getPaciente, buscarPacienteLike, guardarRespuestas, getFormulario } from "./Api"
import { useEffect, useState } from "react"
import Select from 'react-select'
import "./css/Botones.css"
import AsyncSelect from 'react-select/async'
import Swal from "sweetalert2"
import { useParams } from "react-router-dom"

const FormularioTemplate = () => {

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
        id: null
    })

    let { id } = useParams();

    //Respuesta
    const [respuestaData, setRespuestaData] = useState({
        pacienteId: null,
        idFormulario: id,
        respuestas: []
    })

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

    useEffect(() => {
        console.log("USE EFFECT")
        const idDelPaciente = paciente.id
        console.log(paciente.id)
        console.log(idDelPaciente)
        if(paciente.id !== null) {
            setRespuestaData((prevData) => ({
                idFormulario: prevData.idFormulario,
                respuestas: prevData.respuestas,
                pacienteId: idDelPaciente
            }))
        }
    },[paciente])

    const handleInputRespuestaText = (e) => {
        console.log(respuestaData)
        const idNuevaRespuesta = e.target.name;
        const textoRespuesta = e.target.value;

        const indexReemplazar = respuestaData.respuestas.findIndex(respuesta => respuesta.idPregunta === idNuevaRespuesta)

        if(indexReemplazar !== -1) {
            let respuestasReemplazo = respuestaData.respuestas;
            respuestasReemplazo[indexReemplazar] = {idPregunta:idNuevaRespuesta, respuestaNombre: textoRespuesta};
            setRespuestaData((prevState) => ({
                ...prevState,
                respuestas: respuestasReemplazo
            }));
        } else {
            let respuestasReemplazo = respuestaData.respuestas;
            respuestasReemplazo.push({idPregunta:idNuevaRespuesta, respuestaNombre: textoRespuesta})
            setRespuestaData((prevState) => ({
                ...prevState,
                respuestas: respuestasReemplazo
            }));
        }
    }

    const handleInputRespuestaCheck = (e) => {
        const idNuevaRespuesta = e.target.name;
        const textoRespuesta = e.target.value;

        const indexReemplazar = respuestaData.respuestas.findIndex(respuesta => respuesta.idPregunta === idNuevaRespuesta)

        if(indexReemplazar !== -1) {
            let respuestasReemplazo = respuestaData.respuestas;
            respuestasReemplazo[indexReemplazar] = {idPregunta:idNuevaRespuesta, respuestaNombre: textoRespuesta};
            setRespuestaData((prevState) => ({
                ...prevState,
                respuestas: respuestasReemplazo
            }));
        } else {
            let respuestasReemplazo = respuestaData.respuestas;
            respuestasReemplazo.push({idPregunta:idNuevaRespuesta, respuestaNombre: textoRespuesta})
            setRespuestaData((prevState) => ({
                ...prevState,
                respuestas: respuestasReemplazo
            }));
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
            const idNuevaRespuesta = selectTarget;
            const textoRespuesta = opcionesElegidas;
    
            const indexReemplazar = respuestaData.respuestas.findIndex(respuesta => respuesta.idPregunta === idNuevaRespuesta)
    
            if(indexReemplazar !== -1) {
                let respuestasReemplazo = respuestaData.respuestas;
                respuestasReemplazo[indexReemplazar] = {idPregunta:idNuevaRespuesta, respuestaNombre: textoRespuesta};
                setRespuestaData((prevState) => ({
                    ...prevState,
                    respuestas: respuestasReemplazo
                }));
            } else {
                let respuestasReemplazo = respuestaData.respuestas;
                respuestasReemplazo.push({idPregunta:idNuevaRespuesta, respuestaNombre: textoRespuesta})
                setRespuestaData((prevState) => ({
                    ...prevState,
                    respuestas: respuestasReemplazo
                }));
            }
        }


        // setRespuestaData((prevData) => ({
        //     ...prevData,
        //     [selectTarget]: opcionesElegidas.join('; ')
        // }))
    }

    const handleSubmitRespuestas = (e) => {
        e.preventDefault()
            // const stringRespuestas = JSON.stringify(respuestaData);
            // guardarRespuestas(stringRespuestas)
            // .then((response) => Swal.fire({title:"Se guardaron las respuestas correctamente"}))
            // .catch((error) => Swal.fire({title:error.message}))
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
                    <h5>Seleccionar Paciente</h5>
                </Row>
                <Row className="py-2">
                    <Col>
                        <AsyncSelect
                        name="paciente-select"
                        required="Por favor elija un paciente"
                        error="NOT VALID"
                        onChange={seleccionarPaciente}
                        loadOptions={handleInputPaciente}
                        placeholder={"Ingrese dni o nombre de paciente"}
                        />
                    </Col>
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
                console.log("ID PACIENTE")
                console.log(data.id)
                setPaciente({
                    nombre: data.nombre,
                    dni: data.dni,
                    edad: data.edad,
                    obraSocial: data.obraSocial,
                    plan: data.plan,
                    email: data.email,
                    telefono: data.telefono,
                    id: data.id
                })
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