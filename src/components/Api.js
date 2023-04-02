import axios from 'axios';
const API_URL = 'http://localhost:8081';

export const turnoById = (id) => {
	return axios.get(`${API_URL}/turnos/${id}`)
		.then(response => {
			return response.data
		})
}

export const getTurnos = () => {
	return axios.get(`${API_URL}/turnos`)
		.then(response => {
			return response.data
		})
}
