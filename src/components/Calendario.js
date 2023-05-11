import React, { useEffect, useState } from 'react';

import { format, startOfWeek, addDays, startOfMonth, endOfMonth, endOfWeek, isSameMonth, isSameDay, subMonths, addMonths} from 'date-fns'
import Table from 'react-bootstrap/Table'
import { Container, Modal, Row, Col } from 'react-bootstrap';
import { es } from 'date-fns/locale';
import './css/Calendario.css'
import { Link } from 'react-router-dom';
import NuevoTurno from './NuevoTurno'
import NuevoTurnoFecha from './NuevoTurnoFecha'
import { cantidadTurnosPrioritarios, cantidadTurnosTotal } from './Api';

const Calendario = () => {
    const [show, setShow] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [activeDate, setActiveDate] = useState(new Date());
    const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
    const [turnosEnDia, setTurnosEnDia] = useState(null);
    const [prioritariosEnDia, setPrioritariosEnDia] = useState(null);

    useEffect(() => {
      turnosEnFecha();
      //prioritariosEnDia();
  }, [showMenu])
    
    const getHeader = () => {
        return (
          <div className="header">
            <button
              className="todayButton"
              onClick={() => {
                setActiveDate(new Date());
              }}
            >
              Mes actual
            </button>
            <button
              type='button'
              className="btn btn-primary btn-sm"
              onClick={() => setActiveDate(subMonths(activeDate, 1))}
            >
                Ant.
            </button>
            <button
              type='button'
              className="btn btn-primary btn-sm"
              onClick={() => setActiveDate(addMonths(activeDate, 1))}
            >
                Sig.
            </button>
            <h2 className="currentMonth">{format(activeDate, "MMMM yyyy", {locale:es})}</h2>
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

      const generateDatesForCurrentWeek = (date, activeDate) => {
        let currentDate = date;
        const week = [];
        for (let day = 0; day < 7; day++) {
          const cloneDate = currentDate;
          week.push(
            <td
              className={`fechaCalendario ${
                isSameMonth(currentDate, activeDate) ? "" : "fechaInactiva"
              } 
              `
            }
              onClick={() => {
                if(isSameMonth(cloneDate, activeDate)) {
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

      const getDates = () => {
        const startOfTheSelectedMonth = startOfMonth(activeDate);
        const endOfTheSelectedMonth = endOfMonth(activeDate);
        const startDate = startOfWeek(startOfTheSelectedMonth);
        const endDate = endOfWeek(endOfTheSelectedMonth);
    
        let currentDate = startDate;
    
        const allWeeks = [];
    
        while (currentDate <= endDate) {
          allWeeks.push(
            <tr>
                {generateDatesForCurrentWeek(currentDate, activeDate)}
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

      const fechaFormateada = () => {
        let date = new Date(fechaSeleccionada)
        return format(date, "dd-MM-yyyy", {locale:es})
      } 

      const turnosEnFecha = () => {
        cantidadTurnosTotal(fechaSeleccionada)
          .then(
            data => {
              setTurnosEnDia(data);
            }
          )
      }

      

    return (
      
      <Container fluid>
      
        <div className='container'>
            {getHeader()} 
            <Table bordered>
                <thead>
                    {getWeekDaysNames()}
                </thead>
                <tbody>
                    {getDates()}
                </tbody>
            </Table>
            <div>
                <Modal show={show} onHide={handleCloseMenuDia} centered>
                    <NuevoTurnoFecha closeFunction={handleCloseMenuDia} fecha={fechaSeleccionada} tipo={'REGULAR'}/>
                </Modal>
                <Modal show={showMenu} onHide={handleCloseMenuTurno} centered>
                  <Modal.Header> {fechaFormateada()}</Modal.Header>
                  <Modal.Header> Hay {turnosEnDia} turnos.</Modal.Header>
                  <Modal.Header> {2} turnos son prioritarios</Modal.Header>
                  <Modal.Body className='container' centered>
                    <button className='btn btn-primary' onClick={handleShowMenuDia}>Nuevo Turno</button>
                    <br/>
                    <Link to={{pathname: `/turno/`}} state={{fecha:fechaSeleccionada}} type="button" className="btn btn-primary"> {'Ver turnos'} </Link>
                  </Modal.Body>
                </Modal>
            </div>
        </div>
        </Container>
    )
}


export default Calendario