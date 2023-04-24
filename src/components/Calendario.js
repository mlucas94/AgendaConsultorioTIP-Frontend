import React, { useState, useEffect } from 'react';
import NuevoTurno from './NuevoTurno';
import { format, startOfWeek, addDays, startOfMonth, endOfMonth, endOfWeek, isSameMonth, isSameDay, subMonths, addMonths} from 'date-fns'
import Table from 'react-bootstrap/Table'
import { Modal } from 'react-bootstrap';
import { es } from 'date-fns/locale';
import './css/Calendario.css'
import { Link } from 'react-router-dom';

const Calendario = () => {
    const [show, setShow] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [activeDate, setActiveDate] = useState(new Date());
    const [fechaSeleccionada, setFechaSeleccionada] = useState(null);

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
            <h2 className="currentMonth">{format(activeDate, "MMMM yyyy")}</h2>
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
                isSameMonth(currentDate, activeDate) ? "" : "inactiveDay"
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

      const handleClose = () => setShow(false);

      const handleCloseMenu = () => setShowMenu(false);

      const handleShowMenu = () => {
        setShowMenu(false)
        setShow(true)
      }

    return (
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
                <Modal show={show} onHide={handleClose} centered>
                    <NuevoTurno fecha={fechaSeleccionada} />
                </Modal>
                <Modal show={showMenu} onHide={handleCloseMenu} centered>
                  <Modal.Header> 5 turnos en el dia de la fecha</Modal.Header>
                  <Modal.Header> 2 Son prioritarios</Modal.Header>
                  <Modal.Body className='container' centered>
                    <button className='btn btn-primary' onClick={handleShowMenu}>Nuevo Turno</button>
                    <br/>
                    <Link to={{pathname: `/turno/`}} type="button" className="btn btn-primary"> {'[WIP] Turnos del dia'} </Link>
                  </Modal.Body>
                </Modal>
            </div>
        </div>
    )
}


export default Calendario