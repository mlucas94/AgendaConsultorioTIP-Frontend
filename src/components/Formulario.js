import { Alert, Col, Collapse, Form, FormCheck, FormControl, FormLabel, FormSelect, Row } from "react-bootstrap"
import { getPaciente, buscarPacienteLike, guardarFormulario } from "./Api"
import { useEffect, useState } from "react"
import Select from 'react-select'
import "./css/Botones.css"
import AsyncSelect from 'react-select/async'
import Swal from "sweetalert2"


const Formulario = () => {

    const [nuevaPregunta, setNuevaPregunta] = useState({
        pregunta_nombre: "",
        obligatoria: false,
        tipo: "text",
        lista_opciones: []
    });

    const [formulario, setFormulario] = useState({
        titulo: "",
        preguntas: []
    })   
    
    useEffect(() => {
        construirFormulario();
    },[formulario])

    
    const handleInputTitulo = (e) => {
        setFormulario({...formulario, titulo: e.target.value})
    }
    
    const handleAddPregunta = (e) => {
        e.preventDefault()
        //validar que nuevaPregunta este completa
        if (preguntaValida()) {
            //Lo guardo en el json para persistirlo
            setFormulario({...formulario, preguntas:{...formulario.preguntas, [nuevaPregunta.pregunta_nombre]: nuevaPregunta }})
            //Agrego un string vacio para que se guardar las preguntas no obligatorias que no tengan respuesta
            setRespuestaData({...respuestaData, [nuevaPregunta.pregunta_nombre]: ''})
            limpiarPregunta();
        } 
        
    }

    //State validaciones
    const [validacionNombrePregunta, setValidacionNombrePregunta] = useState(false);

    const [validacionMultiselectSinOpciones, setValidacionMultiselectSinOpciones] = useState(false);

    const [validacionNombreOpcionMultiselectVacia, setValidacionNombreOpcionMultiselectVacia] = useState(false);

    const preguntaValida = () => {
        if(nuevaPregunta.pregunta_nombre.trim() === "") {
            setValidacionNombrePregunta(true)
            return false;
        } else {
            setValidacionNombrePregunta(false)
        }
        if( nuevaPregunta.tipo === "multiselect" && nuevaPregunta.lista_opciones.length < 2) {
            setValidacionMultiselectSinOpciones(true)
            return false;
        } else {
            setValidacionMultiselectSinOpciones(false)
        }
        return true
    }
    

    const limpiarPregunta = () => {
        setNuevaPregunta({
            pregunta_nombre: "",
            obligatoria: false,
            tipo: "text",
            lista_opciones: []
        });
        document.getElementById("nueva-pregunta-form").reset();
    }

    const handleSelectTipo = (e) => {
        setNuevaPregunta({...nuevaPregunta, tipo: e.target.value})
    }

    const handleInputPregunta = (e) => {
        setValidacionNombrePregunta(false)
        setNuevaPregunta({...nuevaPregunta, pregunta_nombre: e.target.value.trim()})
    }

    const handleCheckObligatorio = (e) => {
        setNuevaPregunta({...nuevaPregunta, obligatoria: e.target.checked})
    }

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
    }

    //PACIENTE
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

    const construirFormulario = () => {
        const jsonFormulario = formulario.preguntas;
        
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
                <Row className="px-4">
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

    const handleGuardarFormulario = (e) => {
        e.preventDefault();
        guardarFormulario(formulario)
        .then((response) => {
            Swal.fire({title: "Se guardo"})
        })
        .catch((error) => {
            Swal.fire({title:error.message})
        })
    }

    const [formularioHecho, setFormularioHecho] = useState(null)


    //Multiselect opciones
    const [opcionMultiselect, setOpcionMultiselect] = useState("");

    const handleInputOpcionMultiselect = (e) => {
        setValidacionNombreOpcionMultiselectVacia(false)
        setValidacionMultiselectSinOpciones(false)
        setOpcionMultiselect(e.target.value);
    }

    const handleAgregarOpcion = (e) => {
        e.preventDefault()
        const opcionNueva = opcionMultiselect.trim()
        if(nuevaPregunta.lista_opciones.indexOf(opcionNueva) === -1 && opcionNueva !== ""){
            setNuevaPregunta((prevData) => ({
                ...prevData,
                lista_opciones: [...prevData.lista_opciones, opcionNueva]
            }))
        } else {
            setValidacionNombreOpcionMultiselectVacia(true);
        }
        setOpcionMultiselect("");
    }

    //Ver como mostrarlo mejor
    const mostrarOpcionesAgregadas = () => {
        return <div>
            <h5>Opciones Agregadas:</h5>
            {nuevaPregunta.lista_opciones.map((opcion) => {
                return <Col key={opcion+"-opcion"}>{opcion}</Col>
            }
                )}
        </div>
    }

    return (
        <div className="p-3 container">
            <h2>Creacion de formulario</h2>
            <hr/>
            <div className="">
                <Row>
                    <Col md={2}>
                        <h2>Titulo:</h2>
                    </Col>
                    <Col md={4} className="align-items-end">
                        <FormControl id="nuevo-formulario-titulo" onChange={handleInputTitulo} value={formulario.titulo} />
                    </Col>
                    <Col md={2}>
                        <btn className="btn-primario" onClick={handleGuardarFormulario}>Guardar Formulario</btn>
                    </Col>
                </Row>
                <hr/>
                <Form id="nueva-pregunta-form" onSubmit={handleAddPregunta}>
                    <Row>
                        <Col md={4} xs={6} className="pt-4">
                        <FormLabel>Pregunta</FormLabel>
                        <FormControl id="nuevo-campo-nombre" onChange={handleInputPregunta} value={nuevaPregunta.nombre}  />
                        </Col>
                        <Col md={4} xs={6} className="pt-4">
                            <FormLabel>Tipo</FormLabel>
                            <FormSelect id="nuevo-campo-tipo" onChange={handleSelectTipo} value={nuevaPregunta.tipo}>
                                <option value="text">Texto</option>
                                <option value="radio">Radio</option>
                                <option value="multiselect">Seleccionar multiples</option>
                            </FormSelect>
                        </Col>
                        <Col className="d-flex align-items-end pt-4" md={4} xs={6}>
                            <FormCheck type="checkbox" label="Obligatorio"  id="nuevo-campo-obligatorio" onChange={handleCheckObligatorio}/>
                        </Col>
                    </Row>
                    <Collapse in={validacionNombrePregunta}>
                        <div className="pt-3">
                            <Alert variant="danger">
                                La pregunta no puede estar vacia
                            </Alert>
                        </div>
                    </Collapse>
                    <Collapse in={nuevaPregunta.tipo == "multiselect"} >
                        <div>
                            <Row>
                                <Col className="pt-3">
                                    <FormLabel>Opciones</FormLabel>
                                    <FormControl id="nueva-opcion" value={opcionMultiselect} onChange={handleInputOpcionMultiselect}/>
                                </Col>
                                <Col className="d-flex align-items-end">
                                    <button className="btn-primario" onClick={handleAgregarOpcion}>Agregar Opcion</button>
                                </Col>
                            </Row>
                            <Collapse in={validacionNombreOpcionMultiselectVacia}>
                                <div className="pt-3">
                                    <Alert variant="danger">
                                        Debe ingresar el valor de la opcion para agregarla
                                    </Alert>
                                </div>
                            </Collapse>
                            <Collapse in={validacionMultiselectSinOpciones}>
                                <div className="pt-3">
                                    <Alert variant="danger">
                                        No se puede agregar una pregunta de tipo seleccion multiple sin opciones
                                    </Alert>
                                </div>
                            </Collapse>
                            <Row>
                                {mostrarOpcionesAgregadas()}
                            </Row>
                        </div>
                    </Collapse>
                    <div className="pt-4">
                        <button className="btn-primario" >Agregar campo</button>
                    </div>
                </Form>
                <div className="pt-4">
                        <button className="btn-primario" onClick={(e)=>console.log(respuestaData)} >Mostrar log Respuestas</button>
                        <button className="btn-primario" onClick={(e)=>console.log(formulario)} >Mostrar log </button>
                        <button className="btn-primario" onClick={(e)=>console.log(nuevaPregunta)} >Mostrar Pregunta </button>
                </div>
                <div>
                    {formularioHecho}
                </div>
            </div>
        </div>
    )
}

export default Formulario