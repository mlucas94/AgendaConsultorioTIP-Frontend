import { Alert, Col, Collapse, Form, FormCheck, FormControl, FormLabel, FormSelect, Row } from "react-bootstrap"
import { getPaciente, buscarPacienteLike, guardarFormulario, guardarRespuestas, getFormulario } from "./Api"
import { useEffect, useState } from "react"
import Select from 'react-select'
import "./css/Botones.css"
import AsyncSelect from 'react-select/async'
import Swal from "sweetalert2"
import { useParams } from "react-router-dom"

const FormularioTemplate = () => {

    const [formularioJson, setFormularioJson] = useState("")

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

    useEffect(() => {
        getFormulario(id)
        .then((response) => {
            const stringResponse = response.form
            setFormularioJson(stringResponse)
            construirFormulario(stringResponse)
            })
    },[])



    // useEffect(() => {
    //     //console.log(formularioJson)
    //     construirFormulario();
    // },[formularioJson])

    const [respuestaData, setRespuestaData] = useState({})

    const handleInputRespuestaText = (e) => {
        setRespuestaData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value
        }))
    }

    const handleInputRespuestaCheck = (e) => {
        setRespuestaData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value
        }))
    }

    const handleInputMultiselect = (e) => {
        let opcionesElegidas = []
        let selectTarget;
        e.map((opcionSeleccionada) => {
            opcionesElegidas.push(opcionSeleccionada.value)
            selectTarget = opcionSeleccionada.idSelect
        })
        if(opcionesElegidas.length > 0)
        setRespuestaData((prevData) => ({
            ...prevData,
            [selectTarget]: opcionesElegidas.join(';')
        }))
    }

    const handleSubmitRespuestas = (e) => {
        e.preventDefault()
        const stringRespuestas = JSON.stringify(respuestaData);
        guardarRespuestas(stringRespuestas)
        .then((response) => Swal.fire({title:"Se guardaron las respuestas correctamente"}))
        .catch((error) => Swal.fire({title:error.message}))
    }

    const construirFormulario = (backendResponse) => {
        const formulario = JSON.parse(backendResponse);
        
        const resultado = <div>
            <h3>{formulario.titulo}</h3>
            <Form name={formulario.titulo} onSubmit={handleSubmitRespuestas}>
                {Object.keys(formulario.preguntas).map((preguntaKey) => {
                    const pregunta = formulario.preguntas[preguntaKey]
                    if(pregunta.tipo === 'text') {
                        return (
                            <div key={preguntaKey} className="mb-2">
                            <FormLabel>{pregunta.pregunta_nombre + (pregunta.obligatoria ? "*" : "") }</FormLabel>
                            <FormControl name={preguntaKey} required={pregunta.obligatoria} onChange={handleInputRespuestaText}/>
                            <span id={preguntaKey + '-validacion'}></span>
                        </div>
                    )
                    }
                    if(pregunta.tipo === 'radio') {
                        return <div key={preguntaKey} className="mb-2">
                            <FormLabel>{pregunta.pregunta_nombre + (pregunta.obligatoria ? "*" : "")}</FormLabel>
                            <FormCheck
                                className="mx-4"
                                inline
                                type="radio"
                                name={preguntaKey}
                                label="Si"
                                value="Si"
                                onChange={handleInputRespuestaCheck}
                            />
                            <FormCheck
                                inline
                                type="radio"
                                name={preguntaKey}
                                label="No"
                                value="No"
                                onChange={handleInputRespuestaCheck}
                            />
                            <span id={preguntaKey + '-validacion'}></span>
                        </div>
                    }
                    if(pregunta.tipo === 'multiselect'){
                        let optionsArray = []
                        pregunta.lista_opciones.map((opcion) => {
                            optionsArray.push({value: opcion, label: opcion, idSelect: preguntaKey})
                        })
                        return <div key={preguntaKey} className="mb-2">
                                <FormLabel>{pregunta.pregunta_nombre + (pregunta.obligatoria ? "*" : "")}</FormLabel>
                                <Select name={preguntaKey} options={optionsArray} isMulti required={pregunta.obligatoria} onChange={handleInputMultiselect} />
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