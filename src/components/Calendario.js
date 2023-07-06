import React, { useEffect, useState } from 'react';

import { parse, format, startOfWeek, addDays, startOfMonth, endOfMonth, endOfWeek, isSameMonth, isSameDay, subMonths, addMonths} from 'date-fns'
import Table from 'react-bootstrap/Table'
import { Container, Modal, Row, Col } from 'react-bootstrap';
import { es } from 'date-fns/locale';
import './css/Calendario.css'
import { Link } from 'react-router-dom';
import NuevoTurnoFecha from './NuevoTurnoFecha'
import { formatENtoES } from './FuncionesGenerales';
import { cantidadTurnosPrioritarios, cantidadTurnosTotal, getPrioritariosDeMes } from './Api';
import './css/Botones.css'

const Calendario = () => {
    const [show, setShow] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [activeDate, setActiveDate] = useState(new Date());
    const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
    const [turnosEnDia, setTurnosEnDia] = useState(null);
    const [prioritariosEnDia, setPrioritariosEnDia] = useState(null);
    const [diasConPrioritarios, setDiasConPrioritarios] = useState([]);

    useEffect(() => {
      if(fechaSeleccionada != null) {
        turnosEnFecha();
        prioritariosEnFecha();
      }
      getDiasConPrioritarios();
  }, [show, showMenu, activeDate])

    const getHeader = () => {
        return (
          <div className="header">
            <Container fluid>
            <Row className=''>
              <Col className='text-end'>
                <button
                  type='button'
                  className="btn-primario"
                  onClick={() => setActiveDate(subMonths(activeDate, 1))}
                  >
                    Anterior
                </button>
              </Col>
              <Col className='text-center'>
                <button
                  className="todayButton btn-primario"
                  onClick={() => {
                    setActiveDate(new Date());
                  }}
                  >
                  Mes Actual
                </button>
              </Col>
              <Col className='text-start'>
                <button
                  type='button'
                  className="btn-primario"
                  onClick={() => setActiveDate(addMonths(activeDate, 1))}
                  >
                    Siguiente
                </button>
              </Col>
            </Row>
            </Container>
          </div>
        );
      };

    const getWeekDaysNames = () => {
        const weekStartDate = startOfWeek(activeDate);
        const weekDays = [];
        for (let day = 0; day < 7; day++) {
          weekDays.push(
            <th align='center' className="nombreDia weekNames">
              {format(addDays(weekStartDate, day), "E", {locale: es})}
            </th>
          );
        }
        return weekDays;
      };

      const generateDatesForCurrentWeek = (date, activeDate, diasPrioritarios) => {
        let currentDate = date;
        const week = [];
        for (let day = 0; day < 7; day++) {
          const cloneDate = currentDate;
          week.push(
            <td
              className={`fechaCalendario ${
                !isSameMonth(currentDate, activeDate) ? "fechaInactiva" 
                  : (diasPrioritarios.some(fecha => isSameDay(fecha, currentDate))  ? "fechaConPrioritario" : "" )
              } 
              `
            }
              onClick={(e) => {
                if(isSameMonth(cloneDate, activeDate)) {
                  console.log(cloneDate)
                  setFechaSeleccionada(format(cloneDate, 'yyyy-MM-dd'));
                  setShowMenu(true)
                }
              }}
            >
              {format(currentDate, "d")}
            </td>
          );
          currentDate = addDays(currentDate, 1);
        }
        return <>{week}</>;
      };

      const getDiasConPrioritarios = () => {
        const fecha = format(startOfMonth(activeDate), "yyyy-MM-01");
        return getPrioritariosDeMes(fecha)
          .then(
            data => {
              setDiasConPrioritarios(data);
          }
         )
      }

      const getDates = () => {
        const startOfTheSelectedMonth = startOfMonth(activeDate);
        const endOfTheSelectedMonth = endOfMonth(activeDate);
        const startDate = startOfWeek(startOfTheSelectedMonth);
        const endDate = endOfWeek(endOfTheSelectedMonth);
        //getDiasConPrioritarios(primeroDelMes)
        //console.log("DiasConPrioritarios: " + diasConPrioritarios)      
        const diasConPrioritarioDelMes = diasConPrioritarios.map(fecha => parse(fecha, 'yyyy-MM-dd', new Date()))
        let currentDate = startDate;
  
        const allWeeks = [];
  
        while (currentDate <= endDate) {
          allWeeks.push(
            <tr>
              {generateDatesForCurrentWeek(currentDate, activeDate, diasConPrioritarioDelMes)}
            </tr>
          );
          currentDate = addDays(currentDate, 7);
        }
        return allWeeks;
      

    
      }
      
      //Manejo de modales y ventanas emergentes
      const handleCloseMenuDia = () => setShow(false);

      const handleCloseMenuTurno = () => setShowMenu(false);

      const handleShowMenuDia = () => {
        setShowMenu(false)
        setShow(true)
      }

      const turnosEnFecha = () => {
        cantidadTurnosTotal(fechaSeleccionada)
          .then(
            data => {
              setTurnosEnDia(data);
            }
          )
      }
      
      const prioritariosEnFecha = () => {
        //console.log(fechaSeleccionada)
        cantidadTurnosPrioritarios(fechaSeleccionada)
          .then(
            data => {
              setPrioritariosEnDia(data);
            }
          )
      }

    return (
      
      <Container fluid>
      
        <div className='container py-3'>
          <h2 className="currentMonth py-2">{format(activeDate, "MMMM yyyy", {locale:es})}</h2>
            <Table bordered>
                <thead>
                    {getWeekDaysNames()}
                </thead>
                <tbody>
                    {getDates()}
                </tbody>
            </Table>
            {getHeader()} 
            <div>
                <Modal show={show} onHide={handleCloseMenuDia} centered>
                    <NuevoTurnoFecha closeFunction={handleCloseMenuDia} fecha={fechaSeleccionada} tipo={'REGULAR'}/>
                </Modal>
                <Modal show={showMenu} onHide={handleCloseMenuTurno} centered>
                  <Modal.Header> {fechaSeleccionada ? formatENtoES(fechaSeleccionada) : null}</Modal.Header>
                  <Modal.Header> Cantidad de turnos: {turnosEnDia}.</Modal.Header>
                  <Modal.Header> Turnos prioritarios: {prioritariosEnDia}</Modal.Header>
                  <Modal.Body className='container' centered>
                    <Row>
                      <Col className='text-center'>
                        <button className='btn-primario' onClick={handleShowMenuDia}>Nuevo Turno</button>
                      </Col>
                      <Col className='text-center'>
                        <Link to={{pathname: `/turnos`}} state={fechaSeleccionada} type="button" className=" btn-primario" style={{ textDecoration: 'none' }}> {'Ver turnos'} </Link>
                      </Col>
                    </Row>
                  </Modal.Body>
                </Modal>
            </div>
        </div>
        </Container>
    )
}


export default Calendario