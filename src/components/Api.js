import axios from 'axios';
const API_URL = 'http://localhost:8081';

export const turnoById = (id) => {
	const auth = { headers: { Authorization: `Bearer ${sessionStorage.getItem('currentUser')}`}}
	return axios.get(`${API_URL}/turnos/${id}`, auth)
		.then(response => {
			console.log("Hola")
			console.log(response.data)
			return response.data
		})
}

export const getTurnos = (fechaSeleccionada) => {
	console.log(fechaSeleccionada)
	const auth = { headers: { Authorization: `Bearer ${sessionStorage.getItem('currentUser')}`}}
	return axios.get(`${API_URL}/turnos`, {params:{fecha:fechaSeleccionada}}, auth)
		.then(response => {
			return response.data
		})
}

export const agendarTurno = (turno) => {
	const auth = { headers: { Authorization: `Bearer ${sessionStorage.getItem('currentUser')}`}}
	return axios.post(`${API_URL}/turnos`, turno, auth)
		.then(response => {
			return true;
		})
		.catch(error => {
			return error.response.data.message
		})
}

export const buscarPacienteLike = (searchParameter) => {
	const auth = { headers: { Authorization: `Bearer ${sessionStorage.getItem('currentUser')}`}}
	return axios.get(`${API_URL}/pacientes/dni`, {params: searchParameter}, auth)
	.then(response => {
		return response.data
	})
}


export const buscarHorariosDeDia = (fecha, tipo) => {
	const auth = { headers: { Authorization: `Bearer ${sessionStorage.getItem('currentUser')}`}}
	return axios.get(`${API_URL}/turnos/horarios-disponibles`, {params: {fechaConsultada: fecha, tipoDeTurno: tipo}}, auth)
	.then(response => {
		return response.data
	})
	.catch(error => {
		return error.response.data.message
	})
}

export const cantidadTurnosTotal = (fecha) => {
	const auth = { headers: { Authorization: `Bearer ${sessionStorage.getItem('currentUser')}`}}
	return axios.get(`${API_URL}/turnos/cantidadTotal`, {params: {fechaConsultada: fecha}}, auth)
	.then(response => {
		return response.data
	})
}

export const cantidadTurnosPrioritarios = (fecha) => {
	const auth = { headers: { Authorization: `Bearer ${sessionStorage.getItem('currentUser')}`}}
	return axios.get(`${API_URL}/turnos/cantidadTotalPrioritarios`, {params: {fechaConsultada: fecha}}, auth)
	.then(response => {
		return response.data
	})
}

export const getPrioritariosDeMes = (fecha) => {
	const auth = { headers: { Authorization: `Bearer ${sessionStorage.getItem('currentUser')}`}}
	return axios.get(`${API_URL}/turnos/prioritariosEnMes`, {params: {fechaConsultada: fecha}}, auth)
	.then(response => {
		return response.data
	})
}

export const loginProfesional = (emailLogin, passwordLogin) => {
	const body = { email: emailLogin, password: passwordLogin };
	return axios.post(`${API_URL}/profesional/login`, body)
	.then(response => {
		return response.data
	})
}
