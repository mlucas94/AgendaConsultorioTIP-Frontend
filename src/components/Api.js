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

export const getTurnos = () => {
	return axios.get(`${API_URL}/turnos`)
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
		console.log(response.data)
		return response.data
	})
	.catch(error => {
		console.log(error.response.data)
		return error.response.data.message
	})

	// const horarios1 = [
	// 	{horaInicio: '09:00', horaFin:'10:00'},
	// 	{horaInicio: '10:00', horaFin:'11:00'},
	// 	{horaInicio: '11:00', horaFin:'12:00'},
	// 	{horaInicio: '12:00', horaFin:'13:00'},
	// 	{horaInicio: '13:00', horaFin:'14:00'},
	// 	{horaInicio: '14:00', horaFin:'15:00'},
	// 	{horaInicio: '15:00', horaFin:'16:00'},
	// 	{horaInicio: '16:00', horaFin:'17:00'},
	// 	{horaInicio: '17:00', horaFin:'18:00'},
	// ]
	// console.log(horarios1)
	// const horarios2 = [
	// 	{horaInicio: '09:00', horaFin:'09:30'},
	// 	{horaInicio: '09:30', horaFin:'10:00'},
	// 	{horaInicio: '10:00', horaFin:'10:30'},
	// 	{horaInicio: '10:30', horaFin:'11:00'},
	// 	{horaInicio: '11:00', horaFin:'11:30'},
	// 	{horaInicio: '11:30', horaFin:'12:00'},
	// 	{horaInicio: '12:00', horaFin:'12:30'},
	// 	{horaInicio: '12:30', horaFin:'13:00'},
	// 	{horaInicio: '13:00', horaFin:'13:30'},
	// 	{horaInicio: '13:30', horaFin:'14:00'},
	// 	{horaInicio: '14:00', horaFin:'14:30'},
	// 	{horaInicio: '14:30', horaFin:'15:00'},
	// 	{horaInicio: '15:00', horaFin:'15:30'},
	// 	{horaInicio: '15:30', horaFin:'16:00'},
	// 	{horaInicio: '16:00', horaFin:'16:30'},
	// 	{horaInicio: '16:30', horaFin:'17:00'},
	// 	{horaInicio: '17:00', horaFin:'17:30'},
	// 	{horaInicio: '17:30', horaFin:'18:00'},
	// ]

	//  return tipo == 'PRIORITARIO' ? horarios1 : horarios2;
}