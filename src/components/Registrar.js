import React, { useState } from 'react';
import './css/Registrar.css'
import { registrarProfesional } from './Api.js';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

function Register(props) {

    const [email, setEmail] = useState('')
    const [nombre, setNombre] = useState('')
    const [password, setPassword] = useState('')

    const [errorRegister, setErrorRegister] = useState(false)

    const atemptRegister = () => {
        let nuevoProfesional = {
            nombre: nombre,
            email: email,
            password: password
        }

        registrarProfesional(nuevoProfesional)
            .then(response => {
                console.log(response)
                setErrorRegister(false)
                Swal.fire({
                    title: '¡Nuevo profesional ' + nombre + ' registrado!',
                    icon: 'success'
                })
                return
            })
            .catch(e => {
                console.log(e)
                setErrorRegister(true)
            });
    }

    const canAtemptRegister = () => {
        return !(nombre !== '' && email !== '' && password !== '');
    }

    return (

        <div className="container">
            <div className="row">
                <div className="col-sm">
                    <img className="login-logo" src={process.env.PUBLIC_URL + '/agendate_logo_transparente.png'} />
                </div>
                <div className="col-sm">
                    <h1>Registrarse a agendate</h1>
                    <hr></hr>
                    <div class="form-group">
                        <label for="nombre">Nombre</label>
                        <input type="text" class="form-control" id="nombre" name="nombre" aria-describedby="emailHelp" onChange={(e) => setNombre(e.target.value)} />
                    </div>
                    <div class="form-group">
                        <label for="email">E-mail</label>
                        <input type="email" class="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div class="form-group">
                        <label for="password">Contraseña</label>
                        <input type="password" class="form-control" id="password" name="password" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="registerButtons">
                        <button className='btn btn-primary' onClick={atemptRegister} disabled={canAtemptRegister()}>Registrarse</button>
                        <button type="reset" className='btn btn-light'>Limpiar selección</button>

                        {errorRegister &&
                            <>
                                <hr></hr>
                                <div class="alert alert-danger" role="alert">
                                    El email ingresado es inválido. Revise el formato e intente nuevamente
                                </div>
                            </>
                        }
                    </div>
                    <hr></hr>
                    <p>Puede <Link to='/login'>ingresar a su cuenta</Link> si ya está registrado</p>
                </div>
            </div>
        </div>
    );
}

export default Register;