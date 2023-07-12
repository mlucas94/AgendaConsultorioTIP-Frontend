import React, { useState } from 'react';
import './css/Registrar.css'
import { registrarProfesional } from './Api.js';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import './css/Botones.css'

function Register(props) {

    const [email, setEmail] = useState('')
    const [nombre, setNombre] = useState('')
    const [password, setPassword] = useState('')

    const [errorRegister, setErrorRegister] = useState(false)

    const atemptRegister = (e) => {
        e.preventDefault()
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
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location = '/'
                    }
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

    /*return (

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
                        <button className=' btn-primario' onClick={atemptRegister} disabled={canAtemptRegister()}>Registrarse</button>
                        <button type="reset" className='btn-secundario'>Limpiar selección</button>

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
    );*/

    return (
        <div className="Auth-form-container">
            <div>
                <img className="login-logo" src={process.env.PUBLIC_URL + '/agendate_logo_transparente.png'} />
            </div>
            <form className="Auth-form" onSubmit={atemptRegister}>
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Registrarse</h3>
                    <div className="text-center">
                        ¿Ya se ha registrado?{" "}
                        <Link to="/login" className="btn btn-outline-info">
                            Ingresar
                        </Link>
                    </div>
                    <div className="form-group mt-3">
                        <label>Nombre</label>
                        <input
                            type="nombre"
                            className="form-control mt-1"
                            placeholder="Ingrese su nombre"
                            onChange={(e) => setNombre(e.target.value)}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Email</label>
                        <input
                            type="email"
                            className="form-control mt-1"
                            placeholder="Ingrese su email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Contraseña</label>
                        <input
                            type="password"
                            className="form-control mt-1"
                            placeholder="Ingrese su nueva contraseña"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button onClick={atemptRegister} disabled={canAtemptRegister()} className='btn-primario'>
                            Registrarse
                        </button>
                    </div>
                    {errorRegister &&
                        <>
                            <hr></hr>
                            <div class="alert alert-danger" role="alert">
                                El email ingresado es inválido. Revise el formato e intente nuevamente
                            </div>
                        </>
                    }
                </div>
            </form>
        </div>
    )
}

export default Register;