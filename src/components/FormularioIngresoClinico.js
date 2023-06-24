import { Form, FormControl, FormLabel } from "react-bootstrap"
import "./css/Botones.css"
import { useState } from "react"
import { guardarRespuestas } from "./Api"
import Swal from "sweetalert2"

const FormularioIngresoClinico = () => {

    const [formData, setFormData] = useState({})
    
    const jsonFormulario = {
        "nombreFormulario": "Ingreso clinico",
        "secciones": {
            "antecedentes_familiares": {
                "nombre" : "Antecedentes familiares",
                "descripcion": "Indique si posee antecedentes familiares de alguna de las siguientes patologías",
                "campos": {
                    "cancer": {
                        "nombre": "Cancer",
                        "type": "text",
                        "required": true,
                    },
                    "diabetes" : {
                        "nombre": "Diabetes",
                        "type": "text",
                        "required": true,
                    },
                    "hipertension" : {
                        "nombre": "Hipertension",
                        "type": "text",
                        "required": true,
                    },

                }
            },
            "consumo_de_sustancias": {
                "nombre": "Consumo",
                "descripcion": "Indique si consume alguna de las siguientes sustancias",
                "campos": {
                    "alcohol": {
                        "nombre": "Alcohol",
                        "type": "text",
                        "required": true,
                    },
                    "cigarrillo": {
                        "nombre": "Tabaco/Cigarrillos",
                        "type": "text",
                        "required": true,
                    },
                    "medicamentos_con_prescripcion": {
                        "nombre": "Medicacion con prescripcion",
                        "type": "text",
                        "required": true
                    },
                    "otras": {
                        "nombre": "Otras sustancias",
                        "type": "text",
                        "required": false
                    }
                }
            }
        }
    }

    const construirFormulario = () => {
        return <div>
            {Object.keys(jsonFormulario.secciones).map((seccionKey) => {
                    const seccion = jsonFormulario.secciones[seccionKey];
                    return (
                    <div id={seccionKey}>
                        <hr/>
                        <h4>{seccion.nombre}</h4>
                        <h6>{seccion.descripcion}</h6>
                        {Object.keys(seccion.campos).map((campoKey) => {
                        const campo = seccion.campos[campoKey];
                        console.log(campo)
                        return (
                            <div>
                                <FormLabel>{campo.nombre}</FormLabel>
                                <FormControl onChange={handleChange} name={campoKey} required={campo.required} />
                            </div>
                        );
                        })}
                    </div>
                    );
                })
        }
        </div>
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };

    const handleSubmit = (e) => {
        e.preventDefault();
        let result = { contenido: JSON.stringify(formData), idPaciente: 1 }
        guardarRespuestas(result)
        .then(
            Swal.fire({title: "Se guardaron los datos del formulario", icon:"success"})
        )
        .catch( 
            error => {
                Swal.fire({title: "No se puedieron guardar los datos del formulario", icon:"error"})
            }
        )
    }
    
    
    return (
        <div className="p-4">
            <Form onSubmit={handleSubmit} id="componente-formulario">
                {construirFormulario()}
                <div className="pt-4">
                    <button type="submit" className="btn-primario">Guardar</button>
                </div>
            </Form>
        </div>
    )
}


export default FormularioIngresoClinico