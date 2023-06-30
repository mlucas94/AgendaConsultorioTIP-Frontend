import { Col, Collapse, Form, FormCheck, FormControl, FormGroup, FormLabel, FormSelect, Row } from "react-bootstrap"
import { useEffect, useRef, useState } from "react"
import "./css/Botones.css"

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
            limpiarPregunta();
        } else {
            //Mostrar spans con errores de validacion en pregunta
            return
        }
        
    }

    const preguntaValida = () => {
        let nombre = nuevaPregunta.pregunta_nombre
        return (nombre.trim() != "");
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

    const handleInputRespuestaMultiselect = (e) => {
        //console.log(respuestaData)
        setRespuestaData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value
        }))
    }

    const construirFormulario = () => {
        const jsonFormulario = formulario.preguntas;
        console.log(jsonFormulario)
        
        const resultado = <div>
            <h3>{formulario.titulo}</h3>
            <Form name={formulario.titulo}>
                {Object.keys(formulario.preguntas).map((preguntaKey) => {
                    const pregunta = formulario.preguntas[preguntaKey]
                    if(pregunta.tipo === 'text') {
                        return (
                            <div key={preguntaKey} className="mb-2">
                            <FormLabel>{pregunta.pregunta_nombre}</FormLabel>
                            <FormControl name={preguntaKey} required={pregunta.obligatoria} onChange={handleInputRespuestaText}/>
                            <span id={preguntaKey + '-validacion'}></span>
                        </div>
                    )
                    }
                    if(pregunta.tipo === 'radio') {
                        return <div key={preguntaKey} className="mb-2">
                            <FormLabel>{pregunta.pregunta_nombre}</FormLabel>
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
                        console.log("MULTISELECT ENTRO")
                        return <div key={preguntaKey} className="mb-2">
                                <FormLabel>{pregunta.pregunta_nombre}</FormLabel>
                                <FormSelect as="select" name={preguntaKey} multiple onChange={handleInputRespuestaMultiselect}>
                                    {pregunta.lista_opciones.map((opcion) => {
                                        return <option value={opcion}>{opcion}</option>
                                    })}
                                </FormSelect>
                        </div>
                    }
                })}
            </Form>
        </div>

        setFormularioHecho(resultado);
        return;
    }

    const [formularioHecho, setFormularioHecho] = useState(null)


    //Multiselect opciones
    const [opcionMultiselect, setOpcionMultiselect] = useState("");

    const handleInputOpcionMultiselect = (e) => {
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
        }
        setOpcionMultiselect("");
        // document.getElementById("nueva-opcion");
    }

    //Ver porque esto no renderiza nada
    const mostrarOpcionesAgregadas = () => {
        //opcionesString
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
                    <Collapse in={nuevaPregunta.tipo == "multiselect"} >
                        <div>
                            <Row>
                                <Col className="pt-3">
                                    <FormLabel>Agregar Opcion</FormLabel>
                                    <FormControl id="nueva-opcion" value={opcionMultiselect} onChange={handleInputOpcionMultiselect}/>
                                </Col>
                                <Col className="d-flex align-items-end">
                                    <button className="btn-primario" onClick={handleAgregarOpcion}>Agregar Opcion</button>
                                </Col>
                            </Row>
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
                        <button className="btn-primario" onClick={(e)=>console.log(respuestaData)} >Generar Formulario</button>
                </div>
                <div>
                    {formularioHecho}
                </div>
            </div>
        </div>
    )
}

export default Formulario