import axios from 'axios';
const API_URL = 'http://localhost:8081';

export const turnoById = (id) => {
	return axios.get(`${API_URL}/turnos/${id}`)
		.then(response => {
			console.log("Hola")
			console.log(response.data)
			return response.data
		})
}

export const getTurnos = (fechaSeleccionada) => {
	console.log(fechaSeleccionada)
	return axios.get(`${API_URL}/turnos`, {params:{fecha:fechaSeleccionada}})
		.then(response => {
			return response.data
		})
}

export const agendarTurno = (turno) => {
	return axios.post(`${API_URL}/turnos`, turno)
		.then(response => {
			return true;
		})
		.catch(error => {
			return error.response.data.message
		})
}

export const buscarPacienteLike = (searchParameter) => {
	return axios.get(`${API_URL}/pacientes/dni`, {params: searchParameter})
	.then(response => {
		return response.data
	})
}


export const buscarHorariosDeDia = (fecha, tipo) => {
	return axios.get(`${API_URL}/turnos/horarios-disponibles`, {params: {fechaConsultada: fecha, tipoDeTurno: tipo}})
	.then(response => {
		return response.data
	})
	.catch(error => {
		return error.response.data.message
	})
}

export const cantidadTurnosTotal = (fecha) => {
	return axios.get(`${API_URL}/turnos/cantidadTotal`, {params: {fechaConsultada: fecha}})
	.then(response => {
		return response.data
	})
}

export const cantidadTurnosPrioritarios = (fecha) => {
	return axios.get(`${API_URL}/turnos/cantidadTotalPrioritarios`, {params: {fechaConsultada: fecha}})
	.then(response => {
		return response.data
	})
}

export const getPrioritariosDeMes = (fecha) => {
	return axios.get(`${API_URL}/turnos/prioritariosEnMes`, {params: {fechaConsultada: fecha}})
	.then(response => {
		return response.data
	})
}

export const agendarPaciente = (paciente) => {
	return axios.post(`${API_URL}/pacientes`, paciente)
		.then(response => {
			return true;
		})
		.catch(error => {
			return error.response.data.message
		})
}
