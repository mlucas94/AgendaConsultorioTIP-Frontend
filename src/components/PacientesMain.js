import { useState } from "react"
import BuscadorPacientes from "./BuscadorPacientes"
import { Link, useLocation } from "react-router-dom"

const PacientesMain = (props) => {
    
    const location = useLocation();
    const propsData = location.state;

    return (
        <div className="p-3">
            <h3>Buscador de pacientes</h3>
            <div className="row p-2">
                <BuscadorPacientes pacienteId={propsData ? propsData : ""}/>
                <div className="row">
                    <Link />
                </div>
            </div>
        </div>
    )
    

}

export default PacientesMain;