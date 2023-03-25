import axios from 'axios';
const API_URL = 'http://localhost:8081';

export const turnoById = (id) => {
	return axios.get(`${API_URL}/turno/`)
	.then(response => {
		console.log(response);
		return response.data
	})
}
