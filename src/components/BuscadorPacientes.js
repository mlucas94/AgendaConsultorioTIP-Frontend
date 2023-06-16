import { useState } from "react"
import AsyncSelect from 'react-select/async'
import { buscarPacienteLike, getPaciente } from "./Api"
import { Collapse } from "react-bootstrap"
import Swal from "sweetalert2"

const BuscadorPacientes = () => {
    
    const [dniONombre, setDniONombre] = useState("")
    const [paciente, setPaciente] = useState({
        nombre: "",
        dni: null,
        edad: null,
        obraSocial: "",
        plan: "",
        email: "",
        telefono: null
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
                return setPaciente({
                    nombre: data.nombre,
                    dni: data.dni,
                    edad: data.edad,
                    obraSocial: data.obraSocial,
                    plan: data.plan,
                    email: data.email,
                    telefono: data.telefono
                })
            }
        )
        .catch(
            error=> {
                Swal.fire({
                    title: 'Usuario no encontrado'
                })
            }
        )
    }

    const handleLimpiarPaciente = () => {
        setPaciente( {
            nombre: "",
            dni: null,
            edad: null,
            obraSocial: "",
            plan: "",
            email: "",
            telefono: null
        })
    }

    return (
        <div>
            <div className="row px-2 py-1 ">
                <div className="col-md-5">
                <AsyncSelect
                    name="paciente-select"
                    required="Por favor elija un paciente"
                    error="NOT VALID"
                    onChange={seleccionarPaciente}
                    loadOptions={handleInputPaciente}
                    placeholder={"Ingrese dni o nombre de paciente"}
                    value={{label: dniONombre}}
                    />
                </div>
                <div className="col-md-5" >
                    <button className="btn btn-primary" onClick={handleLimpiarPaciente}>Limpiar busqueda</button>
                </div>
                <Collapse in={paciente.nombre.length > 0} >
                    <div className="row">
                        <div className="px-2 py-2 col-md-10">
                            <h5>{paciente.nombre}</h5>
                            <h5>{paciente.dni}</h5>
                            <h5>{paciente.telefono}</h5>
                            <h5>{paciente.email}</h5>
                            <h5>{paciente.obraSocial ? paciente.obraSocial + " - " + paciente.plan : "No se encontro informacion de cobertura medica"}</h5>
                            <h5>{"Proximo turno: No se encontro ningun turno agendado"}</h5>
                        </div>
                    </div>
                </Collapse>
            </div>
        </div>
    )
    

}

export default BuscadorPacientes