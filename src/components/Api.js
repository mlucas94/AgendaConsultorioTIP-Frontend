import axios from 'axios';
const API_URL = 'http://localhost:8081';
const ORIGIN_URL = 'http://localhost:3000';
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
	console.log(fechaSeleccionada)
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
			return err
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
	return axios.get(`${API_URL}/pacientes/${id}`, configAuth)
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

export const agendarPaciente = (paciente) => {
	return axios.post(`${API_URL}/pacientes`, paciente, configAuth)
		.then(response => {
			return true;
		})
		.catch(error => {
			return error.response.data.message
		})
}
