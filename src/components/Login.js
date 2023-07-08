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

  const atemptLogin = () => {
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
    <div className="container">
      <div className="row">
        <div className="col-sm">
          <img className="login-logo" src={process.env.PUBLIC_URL + '/agendate_logo_transparente.png'} />
        </div>
        <div className="col-sm" />

        <div className="col-sm login-forms" >
          <h1>Ingresar</h1>
          <hr></hr>
          <div class="form-group">
            <label for="email">E-mail</label>
            <input type="email" class="form-control" id="email" aria-describedby="emailHelp" onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div class="form-group">
            <label for="password">Contraseña</label>
            <input type="password" class="form-control" id="password" onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button onClick={atemptLogin} disabled={canLogin()} className='btn-primario'>Ingresar</button>
          <Link to="/profesional/registrarse" className="btn btn-light">Registrarse</Link>
          <hr></hr>
          <p>Para crear un nuevo usuario, elija la opción Registrarse</p>
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
      </div>
    </div>
  );
}

export default Login;