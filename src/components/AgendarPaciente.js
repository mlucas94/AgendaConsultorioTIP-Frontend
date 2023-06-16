import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { agendarPaciente } from './Api';
import { useState } from 'react';
import './css/Botones.css';
import './css/AgendarPaciente.css';
import { Alert, Collapse, Container, Form, FormControl, FormLabel } from 'react-bootstrap';
import Swal from 'sweetalert2';

const AgendarPaciente = () => {

    const [pacienteData, setPacienteData] = useState({
        dni: null,
        nombre: "",
        email: "",
        telefono: null,
        edad: null,
        obraSocial: "",
        plan: ""
    })
    const [emailAlert, setEmailAlert] = useState("")

    const handleAgendar = (e) => {
        e.preventDefault()
        //Validaciones pre-envio
        setEmailAlert("")
        const regExEmail = /\S+@\S+\.\S+/;
        if(!regExEmail.test(pacienteData.email)){
            setEmailAlert('Direccion de correo no valida. La direccion debe tener el formato "correo@electronico.com"')
            return
        }

        agendarPaciente(pacienteData)
            .then(
                data => {
                    if (typeof data === "string") {
                        Swal.fire ({
                            title: 'No se pudo agendar al paciente',
                            text: data,
                            icon: 'error'
                        })
                        return
                    }
                    Swal.fire ({
                        title: 'Agendado con exito!',
                        text: '¿Desea agendar un nuevo paciente?',
                        showCancelButton: true,
                        confirmButtonText: 'Nuevo paciente',
                        cancelButtonText: 'Volver a inicio',
                        allowOutsideClick: false,
                        icon: 'success'
                    }).then ((result) => {
                        if(result.isConfirmed) {
                            e.target.reset()
                            setPacienteData({
                                dni: null,
                                nombre: "",
                                email: "",
                                telefono: null,
                                edad: null,
                                obraSocial: "",
                                plan: ""
                            })
                        } else {
                            window.location='/'
                        }
                    })
                }
            )
            .catch( 
                error => {
                    Swal.fire({
                        title: "Error de conexión",
                        text: "No se pudieron guardar los datos del paciente.",
                        icon: 'error',
                        confirmButtonText: 'Aceptar'
                    })
                }
            )
    }

    const setNombre = (e) => {
        setPacienteData({
            ...pacienteData,
            nombre: e.target.value
        })
    }

    const setDocumentoIdentidad = (e) => {
        setPacienteData({
            ...pacienteData,
            dni: e.target.value.trim()
        })
    }

    const setEmail = (e) => {
        setEmailAlert("")
        setPacienteData({
            ...pacienteData,
            email: e.target.value.trim()
        })
    }

    const setTelefono = (e) => {
        setPacienteData({
            ...pacienteData,
            telefono: e.target.value.trim()
        })
    }

    const setEdad = (e) => {
        setPacienteData({
            ...pacienteData,
            edad: e.target.value.trim()
        })
    }

    const setObraSocial = (e) => {
        setPacienteData({
            ...pacienteData,
            obraSocial: e.target.value.trim()
        })
    }

    const setPlan = (e) => {
        setPacienteData({
            ...pacienteData,
            plan: e.target.value.trim()
        })
    }

    return (
        <div className=' container p-3 vh-50'>
            <h3>{"Formulario de ingreso de paciente"}</h3>
            <p>A continuacion ingrese los datos solicitados</p>
            <Form onSubmit={handleAgendar}>
                <div>
                    <h5>Datos del paciente</h5>
                    <div className='row justify-content-center'>
                            
                        <div className='col-md-4 p-2'>
                            <FormLabel>Nombre</FormLabel>
                            <FormControl required type='text' placeholder='Nombre completo' onChange={setNombre} value={pacienteData.nombre}/>
                        </div>
                        <div className='col-md-4 p-2' >
                            <FormLabel>Numero de Documento</FormLabel>
                            <FormControl required type='number' placeholder='Solo numeros' onChange={setDocumentoIdentidad} value={pacienteData.dni}/>
                        </div>
                        <div className='col-md-2 p-2' >
                            <FormLabel>Edad</FormLabel>
                            <FormControl required type='number' min="0" maxLength="999" placeholder='Edad del paciente' onChange={setEdad} value={pacienteData.edad}/>
                        </div>
                    </div>
                    <hr/>
                    <h5>Datos de contacto</h5>
                    <div className='row justify-content-center'>
                        <div className='col-md-5 p-2'>
                            <FormLabel>Email</FormLabel>
                            <FormControl id='emailInput' required type='text' placeholder='Direccion de email' onChange={setEmail} value={pacienteData.email}/>
                            <Collapse in={emailAlert.length > 0}><div><Alert variant='danger' name="email-no-valido-alerta">{emailAlert}</Alert></div></Collapse>

                        </div>
                        <div className='col-md-5 p-2'>
                            <FormLabel>Telefono</FormLabel>
                            <FormControl required type='number' placeholder='Solo numeros' onChange={setTelefono} value={pacienteData.telefono}/>
                        </div>
                    </div>
                    <hr/>
                    <h5>Cobertura</h5>
                    <div className='row justify-content-center'>
                        <div className='col-md-5 p-2'>
                            <FormLabel>Obra social</FormLabel>
                            <FormControl type='text' placeholder='Opcional' onChange={setObraSocial} value={pacienteData.obraSocial}/>
                        </div>
                        <div className='col-md-5 p-2' >
                            <FormLabel>Plan</FormLabel>
                            <FormControl type='text' placeholder='Opcional' onChange={setPlan} value={pacienteData.plan}/>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-2 p-2 ps-5">
                        <button className='btn-primario'>AGENDAR</button>
                    </div>
                </div>
            </Form>
        </div>
    )
}

export default AgendarPaciente