import { Col, Form, FormCheck, FormControl, FormLabel, FormSelect, FormText, Row } from "react-bootstrap"
import { useEffect, useRef, useState } from "react"
//import { guardarRespuestas } from "./Api"
//import Swal from "sweetalert2"
import "./css/Botones.css"

const Formulario = () => {
    
    const formElementRef = useRef(null);

    const [nuevaPregunta, setNuevaPregunta] = useState({
        pregunta_nombre: "",
        obligatoria: false,
        tipo: "text",
        lista_opciones: []
    });

    const [formulario, setFormulario] = useState({
        titulo: "",
        preguntas: {}
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
        console.log(formulario)
    }

    const construirFormulario = () => {
        const jsonFormulario = formulario.preguntas;
        console.log(jsonFormulario)
        
        const resultado = <div>
            <h3>{formulario.titulo}</h3>
            <Form name={formulario.titulo}>
                {Object.keys(formulario.preguntas).map((preguntaKey) => {
                    const pregunta = formulario.preguntas[preguntaKey]
                    return (
                        <div key={preguntaKey}>
                            <FormLabel>{pregunta.pregunta_nombre}</FormLabel>
                            <FormControl name={preguntaKey} required={pregunta.obligatoria}/>
                            <span id={preguntaKey + '-validacion'}></span>
                        </div>
                    )
                })}
            </Form>
        </div>

        setFormularioHecho(resultado);
        return;
    }

    const [formularioHecho, setFormularioHecho] = useState(null)


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
                    <div className="pt-4">
                        <button className="btn-primario" >Agregar campo</button>
                    </div>
                </Form>
                <div className="pt-4">
                        <button className="btn-primario" onClick={construirFormulario} >Generar Formulario</button>
                </div>
                <div>
                    {formularioHecho}
                </div>
            </div>
        </div>
    )
}

export default Formulario