import { useState } from "react"
import BuscadorPacientes from "./BuscadorPacientes"
import { Link } from "react-router-dom"

const PacientesMain = () => {
    
    const [proximosTurnos, setProximosTurnos] = useState([])
    const [proximoPacientePrioritario, setProximoPacientePrioritario] = useState(null)

    return (
        <div className="p-3">
            <h3>Buscador de pacientes</h3>
            <hr/>
            <div className="row p-2">
                <BuscadorPacientes/>
                <div className="row">
                    <Link />
                </div>
            </div>
        </div>
    )
    

}

export default PacientesMain;