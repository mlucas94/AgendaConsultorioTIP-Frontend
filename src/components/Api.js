import axios from 'axios';
const API_URL = 'http://localhost:8081';
const configAuth = { 
	headers: { 
		Authorization: `Bearer ${sessionStorage.getItem('currentUser')}`
	}
}

export async function turnoById(id) {
	const config = { 
		headers: { 
			'Authorization': `Bearer ${sessionStorage.getItem('currentUser')}`
		}
	}
	console.log("session token " + sessionStorage.getItem('currentUser'))
	return await axios.get(`${API_URL}/turnos/${id}`, config)
		.then(response => {
			console.log(response.data)
			return response.data
		})
		.catch(err => {
			console.log("Rompio turnoById")
			return err
		})
}

export async function getTurnos(fechaSeleccionada) {
	const config =  { 
		headers: { 
			Authorization: `Bearer ${sessionStorage.getItem('currentUser')}`
		}
	}
	console.log("session token " + sessionStorage.getItem('currentUser'))
	return await axios.get(`${API_URL}/turnos`, {params:{fecha:fechaSeleccionada}, ...config})
		.then(response => {
			console.log("HOLA" + fechaSeleccionada)
			return response.data
		})
		.catch(err => {
			console.log("Rompio getTurnos")
			return err
		})
}

export async function agendarTurno(turno) {
	const config = { 
		headers: { 
			Authorization: `Bearer ${sessionStorage.getItem('currentUser')}`
		}
	}
	console.log("session token " + sessionStorage.getItem('currentUser'))
	return await axios.post(`${API_URL}/turnos`, turno, config)
		.then(response => {
			return true;
		})
		.catch(err => {
			console.log("Rompio agendarTurno")
			console.log(err.message)
			throw Error(err.message)
		})
}

export async function cancelarTurno(idTurno) {
	const config = { 
		headers: { 
			Authorization: `Bearer ${sessionStorage.getItem('currentUser')}`
		}
	}
	console.log("session token " + sessionStorage.getItem('currentUser'))
	return await axios.post(`${API_URL}/turnos/cancelar/` + idTurno, {}, config)
		.then(response => {
			return true;
		})
		.catch(err => {
			console.log("Rompio cancelarTurno")
			console.log(err.message)
			throw Error(err.message)
		})
}

export async function buscarPacienteLike(searchParameter) {
	const config = { 
		headers: { 
			Authorization: `Bearer ${sessionStorage.getItem('currentUser')}`
		}
	}
	console.log("session token " + sessionStorage.getItem('currentUser'))
	return await axios.get(`${API_URL}/pacientes/dni`, {params: searchParameter, ...config})
		.then(response => {
			return response.data
		})
		.catch(err => {
			console.log("Rompio buscarPacienteLike")
			return err
		})
}

export const getPaciente = (id) => {
	const config = { 
		headers: { 
			Authorization: `Bearer ${sessionStorage.getItem('currentUser')}`
		}
	}
	return axios.get(`${API_URL}/pacientes/${id}`, config)
		.then(response => {
			return response.data
		})
}

export async function buscarHorariosDeDia(fecha, tipo) {
	const config = { 
		headers: { 
			Authorization: `Bearer ${sessionStorage.getItem('currentUser')}`
		}
	}
	console.log("session token " + sessionStorage.getItem('currentUser'))
	return await axios.get(`${API_URL}/turnos/horarios-disponibles`, {params: {fechaConsultada: fecha, tipoDeTurno: tipo}, ...config})
		.then(response => {
			return response.data
		})
		.catch(err => {
			console.log("Rompio buscarHorariosDeDia")
			return err
		})
}

export async function cantidadTurnosTotal(fecha) {
	const config = { 
		headers: { 
			Authorization: `Bearer ${sessionStorage.getItem('currentUser')}`
		}
	}
	//console.log("session token " + sessionStorage.getItem('currentUser'))
	return await axios.get(`${API_URL}/turnos/cantidadTotal`, {params: {fechaConsultada: fecha}, ...config})
		.then(response => {
			return response.data
		})
		.catch(err => {
			console.log("Rompio cantidadTurnosTotal")
			return err
		})
}

export async function cantidadTurnosPrioritarios(fecha) {
	const config = { 
		headers: { 
			Authorization: `Bearer ${sessionStorage.getItem('currentUser')}`
		}
	}
	console.log("session token " + sessionStorage.getItem('currentUser'))
	return await axios.get(`${API_URL}/turnos/cantidadTotalPrioritarios`, {params: {fechaConsultada: fecha}, ...config})
		.then(response => {
			return response.data
		})
		.catch(err => {
			console.log("Rompio cantidadTurnosPrioritarios")
			return err
		})
}

export async function getPrioritariosDeMes(fecha) {
	const config = { 
		headers: { 
			Authorization: `Bearer ${sessionStorage.getItem('currentUser')}`
		}
	}
	console.log("session token " + sessionStorage.getItem('currentUser'))
	return await axios.get(`${API_URL}/turnos/prioritariosEnMes`, {params: {fechaConsultada: fecha}, ...config})
		.then(response => {
			return response.data
		})
		.catch(err => {
			console.log("Rompio getPrioritariosDeMes")
			return err
		})
}

export async function loginProfesional(emailLogin, passwordLogin) {
	const body = { "email": emailLogin, "password": passwordLogin };
	return await axios.post(`${API_URL}/profesional/login`, body)
		.then(response => {
			return response.data
		})
}

export async function registrarProfesional(payload) {
	return await axios.post(`${API_URL}/profesional/registrarse`, payload)
		.then(response => {
			return response
		})
}

export const agendarPaciente = (paciente) => {
	const config = { 
		headers: { 
			Authorization: `Bearer ${sessionStorage.getItem('currentUser')}`
		}
	}
	return axios.post(`${API_URL}/pacientes`, paciente, config)
		.then(response => {
			return true;
		})
		.catch(error => {
			return error.response.data.message
		})
}

//ARCHIVOS
export const getArchivosPaciente = (paginaArchivos) => {
	const config = { 
		headers: { 
			Authorization: `Bearer ${sessionStorage.getItem('currentUser')}`
		}
	}
	return axios.get(`${API_URL}/archivos/paciente`, {params: paginaArchivos, ...config})
		.then(response=> {
			console.log("GETARCHIVOSPACIENTE")
			return response.data;
		})
		.catch(error => {
			console.log("Rompio getArchivosPaciente")
		})
}

export const descargarArchivo = (archivo, nombreArchivo) => {
	const config = { 
		headers: { 
			Authorization: `Bearer ${sessionStorage.getItem('currentUser')}`
		}
	}
	return axios.get(`${API_URL}/archivo/descargar`, {params: {idArchivo: archivo}, responseType: 'blob', ...config})
	.then(response=> {
		return response.data
	})
}

export const cargarArchivo = (archivoNuevo, paciente) => {
	const config = { 
		headers: { 
			Authorization: `Bearer ${sessionStorage.getItem('currentUser')}`
		}
	}
	const formData = new FormData();
    formData.append("archivo", archivoNuevo);
    formData.append("idPaciente", paciente);
	return axios.post(`${API_URL}/archivo/cargar`, formData,{headers: {'Content-Type': 'multipart/form-data'}, ...config})
	.then(response =>{
		return response
	})
	.catch(error => {
		throw Error(error.response.data.message);
	}

	)
	
}

export const eliminarArchivo = (idArchivoEliminar) => {
	const config = { 
		headers: { 
			Authorization: `Bearer ${sessionStorage.getItem('currentUser')}`
		}
	}
	return axios.delete(`${API_URL}/archivo/eliminar`, {params: {idArchivo : idArchivoEliminar}, ...config})
}

export const cargarArchivoTurno = (archivoNuevo, turno) => {
	const config = { 
		headers: { 
			Authorization: `Bearer ${sessionStorage.getItem('currentUser')}`
		}
	}
	const formData = new FormData();
    formData.append("archivo", archivoNuevo);
    formData.append("idTurno", turno);
	return axios.post(`${API_URL}/archivo/cargar/turno`, formData,{headers: {'Content-Type': 'multipart/form-data'}, ...config})
	.then(response =>{
		return response
	})
}

export const getArchivosTurno = (paginaArchivos) => {
	const config = { 
		headers: { 
			Authorization: `Bearer ${sessionStorage.getItem('currentUser')}`
		}
	}
	return axios.get(`${API_URL}/archivos/turno`, {params: paginaArchivos, ...config})
		.then(response=> {
			return response.data;
		})
		.catch(error => {
			console.log(error.response.data.message)
		})
}

export const desasociarArchivoTurno = (idArchivoDesasociar, idTurno) => {
	const config = { 
		headers: { 
			Authorization: `Bearer ${sessionStorage.getItem('currentUser')}`
		}
	}
	return axios.delete(`${API_URL}/archivo/turno`, {params: {archivoId : idArchivoDesasociar, turnoId: idTurno}, ...config})
	.then(response => {
		return response
	})
}

export const proximoTurnoPaciente = (idPaciente) => {
	const config = { 
		headers: { 
			Authorization: `Bearer ${sessionStorage.getItem('currentUser')}`
		}
	}
	console.log("ID del paciente : " + idPaciente)
	return axios.get(`${API_URL}/proximo_turno/${idPaciente}`, config)
	.then(response => {
		return response.data;
	})
}

export const getLanding = () => {
	const config = { 
		headers: { 
			Authorization: `Bearer ${sessionStorage.getItem('currentUser')}`
		}
	}
	return axios.get(`${API_URL}/landing`, config)
	.then(response => {
		return response.data;
	})
}

export const guardarRespuestas = (respuestas) => {
	return axios.post(`${API_URL}/formularios/responder`, respuestas, configAuth)
	.then(response => {
		return response
	})
	.catch(error => {
		throw Error("Ocurrio un error al guardar las respuestas")
	})
}

export const getFormulariosCompletados = (idPaciente) => {
	console.log("session token " + sessionStorage.getItem('currentUser'))
	return axios.get(`${API_URL}/formularios/respondidos/${idPaciente}`, configAuth)
	.then(response => {
		return response.data;
	})
	.catch(error => {
		throw Error(error.message);
	})
}

export const guardarFormulario = (formulario) => {
	const config =  { 
		headers: { 
			Authorization: `Bearer ${sessionStorage.getItem('currentUser')}`,
			'Content-Type': 'text/plain'
		}
	}
	console.log("session token " + sessionStorage.getItem('currentUser'))
	return axios.post(`${API_URL}/formularios/crear`, formulario, configAuth)
	.then(response => {
		return response.data;
	})
	.catch(error => {
		console.log(error)
		throw Error(error.message);
	})
}

export const getListaFormularios = () => {
	return axios.get(`${API_URL}/formularios/listado`, configAuth)
	.then(response => {
		//console.log(response.data)
		return response.data;
	})
	.catch(error => {
		console.log(error)
		throw Error(error.message);
	})

}

export const getFormulario = (id) => {
	return axios.get(`${API_URL}/formularios/${id}`, configAuth)
	.then(response => {
		return response.data;
	})
	.catch(error => {
		console.log(error)
		throw Error(error.message);
	})
}

export const getRespuestasPaciente = (idFormulario, idPaciente) => {
	return axios.get(`${API_URL}/formularios/respuestas/${idFormulario}`, {params: {idPaciente: idPaciente}, ...configAuth})
	.then(response => {
		return response.data;
	})
	.catch(error => {
		console.log(error)
		throw Error(error.message);
	})
}
