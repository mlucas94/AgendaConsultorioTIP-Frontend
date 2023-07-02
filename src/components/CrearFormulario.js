import { Alert, Col, Collapse, Form, FormCheck, FormControl, FormLabel, FormSelect, Row } from "react-bootstrap"
import { guardarFormulario, guardarRespuestas } from "./Api"
import { useEffect, useState } from "react"
import Select from 'react-select'
import "./css/Botones.css"
import Swal from "sweetalert2"


const CrearFormulario = () => {

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
        setValidacionTitulo(false)
        setFormulario({...formulario, titulo: e.target.value})
    }
    
    const handleAddPregunta = (e) => {
        e.preventDefault()
        //validar que nuevaPregunta este completa
        if (preguntaValida()) {
            //Lo guardo en el json para persistirlo. Asi se guarda si es un objeto de objetos pregunta
            //setFormulario({ ...formulario, preguntas: { ...formulario.preguntas, [nuevaPregunta.pregunta_nombre]: nuevaPregunta } })
            
            //Asi lo guardo para tener una lista
            const indexRepetido = formulario.preguntas.findIndex(
                (pregunta) => pregunta.pregunta_nombre === nuevaPregunta.pregunta_nombre
            );
            if (indexRepetido !== -1) {
                const arrayReemplazo = [...formulario.preguntas];
                arrayReemplazo[indexRepetido] = nuevaPregunta;
                setFormulario({ ...formulario, preguntas: arrayReemplazo })
            } else {
                let preguntasNuevo = formulario.preguntas;
                preguntasNuevo.push(nuevaPregunta)
                setFormulario({ ...formulario, preguntas: preguntasNuevo })
            }
            limpiarPregunta();
        }

    }

    //State validaciones
    const [validacionTitulo, setValidacionTitulo] = useState(false);

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
        console.log(e.target)
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
            [selectTarget]: opcionesElegidas.join('; ')
        }))
    }

    const handleSubmitRespuestas = (e) => {
        e.preventDefault()
    }


    const construirFormulario = () => {      
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
            </Form>
        </div>

        setFormularioHecho(resultado);
        return;
    }

    const handleGuardarFormulario = (e) => {

        e.preventDefault();
        if(formulario.titulo.trim()=="") {
            setValidacionTitulo(true)
            return
        }
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
                        <button className="btn-primario" onClick={handleGuardarFormulario}>Guardar Formulario</button>
                    </Col>
                </Row>
                <Collapse in={validacionTitulo}>
                    <div className="pt-3">
                        <Alert variant="danger">
                            El formulario requiere un titulo
                        </Alert>
                    </div>
                </Collapse>
                <hr/>
                <h3>Nuevo campo</h3>
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
                <hr/>
                <h2>Vista previa de formulario</h2>
                <div>
                    {formularioHecho}
                </div>
            </div>
        </div>
    )
}

export default CrearFormulario
