import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, FormControl } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate()

    const handleClick = () => {
        navigate("/calendario")
        window.location.reload()
    }

    return (
        <div className='vh-100 d-flex justify-content-center align-items-center'>
            <div>
                <Row>
                    <Form.Label htmlFor='inputPassword'>Password</Form.Label>
                    <Form.Control type="password" id="inputPassword"/>
                    <Form.Text>Ingrese su password</Form.Text>
                </Row>
                <Row>
                    <Button onClick={handleClick}>LOGIN</Button>
                </Row>
            </div>
        </div>
        
        )
}

export default Login
