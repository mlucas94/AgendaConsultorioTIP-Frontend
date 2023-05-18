import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { agendarPaciente } from './Api';
import { useState } from 'react';
import './css/Botones.css';
import './css/AgendarPaciente.css';
import { Container, FormControl, FormLabel } from 'react-bootstrap';

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

    const handleAgendar = () => {
        agendarPaciente(pacienteData)
            .then()
    }

    const setNombre = (e) => {
        setPacienteData({
            ...pacienteData,
            nombre: e.target.value.trim()
        })
    }

    const setDocumentoIdentidad = (e) => {
        setPacienteData({
            ...pacienteData,
            dni: e.target.value.trim()
        })
    }

    const setEmail = (e) => {
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
            <div>
                <h5>Datos del paciente</h5>
                <div className='row justify-content-center'>
                    <div className='col-md-4 p-2'>
                        <FormLabel>Nombre</FormLabel>
                        <FormControl required type='text' placeholder='Nombre completo' onChange={setNombre}/>
                    </div>
                    <div className='col-md-4 p-2' >
                        <FormLabel>Numero de Documento</FormLabel>
                        <FormControl required type='number' placeholder='Solo numeros' onChange={setDocumentoIdentidad}/>
                    </div>
                    <div className='col-md-2 p-2' >
                        <FormLabel>Edad</FormLabel>
                        <FormControl required type='number' min="0" placeholder='Edad del paciente' onChange={setEdad}/>
                    </div>
                </div>
                <hr/>
                <h5>Datos de contacto</h5>
                <div className='row justify-content-center'>
                    <div className='col-md-5 p-2'>
                        <FormLabel>Email</FormLabel>
                        <FormControl required type='text' placeholder='Direccion de email' onChange={setEmail}/>
                    </div>
                    <div className='col-md-5 p-2'>
                        <FormLabel>Telefono</FormLabel>
                        <FormControl required type='number' placeholder='Solo numeros' onChange={setTelefono}/>
                    </div>
                </div>
                <hr/>
                <h5>Cobertura</h5>
                <div className='row justify-content-center'>
                    <div className='col-md-5 p-2'>
                        <FormLabel>Obra social</FormLabel>
                        <FormControl type='text' placeholder='Opcional' onChange={setObraSocial}/>
                    </div>
                    <div className='col-md-5 p-2' >
                        <FormLabel>Plan</FormLabel>
                        <FormControl type='text' placeholder='Opcional' onChange={setPlan}/>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-2 p-2 ps-5">
                    <button className='btn-primario' onClick={handleAgendar}>AGENDAR</button>
                </div>
            </div>
        </div>
    )
}

export default AgendarPaciente