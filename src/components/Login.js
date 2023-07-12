import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { loginProfesional } from './Api.js';
import './css/Login.css';
import './css/Botones.css'

function Login(props) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [redirect, setRedirect] = useState(false)
  const [errorLogin, setErrorLogin] = useState(false)
  const [fromSuccessLogin, setFromSuccessLogin] = useState(false)

  useEffect(() => {

    if (sessionStorage.length > 0) {
      setRedirect(true)
    }

  })

  const atemptLogin = (e) => {
    e.preventDefault()
    loginProfesional(email, password)
      .then(response => {
        let accessToken;
        let nombreUsuario;
        accessToken = response.accessToken;
        nombreUsuario = response.nombreUsuario;
        console.log("session token", accessToken);
        sessionStorage.setItem('currentUser', accessToken);
        sessionStorage.setItem('nombreUsuario', nombreUsuario);
        setFromSuccessLogin(true)
        setRedirect(true);
      })
      .catch(e => {
        console.log(e)
        setErrorLogin(true)
        setFromSuccessLogin(false)
      })

  }

  const canLogin = () => {
    return !(email.length > 0 && password.length > 0);
  }

  if (redirect) {
    return <Navigate to='/landing' />
  }

  return (
    <div className="Auth-form-container">

      <div>
        <img className="login-logo" src={process.env.PUBLIC_URL + '/agendate_logo_transparente.png'} />
      </div>
      <form className="Auth-form" onSubmit={atemptLogin}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Ingresar</h3>
          <div className="text-center">
            ¿Aún no se ha registrado?{" "}
            <Link to="/profesional/registrarse" className="btn btn-outline-info">
              Registrarse
            </Link>
          </div>
          <div className="form-group mt-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Ingrese email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Contraseña</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Ingrese contraseña"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button onClick={atemptLogin} disabled={canLogin()} className='btn-primario'>
              Ingresar
            </button>
          </div>
          {errorLogin &&
            <>
              <hr></hr>
              <div class="alert alert-danger" role="alert">
                Email y/o contraseña incorrectos
              </div>
            </>
          }
          {fromSuccessLogin &&
            <>
              <hr></hr>
              <div class="alert alert-success" role="alert">
                Ha ingresado correctamente
              </div>
            </>
          }
        </div>
      </form>

    </div>
  )
}

export default Login;