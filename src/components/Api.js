import axios from 'axios';
const API_URL = 'http://localhost:8081';

export const turnoById = (id) => {
	return axios.get(`${API_URL}/turnos/${id}`)
		.then(response => {
			return response.data
		})
}

export const getTurnos = (fechaSeleccionada) => {
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

export const getPaciente = (id) => {
	return axios.get(`${API_URL}/pacientes/${id}`)
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

//ARCHIVOS
export const getArchivosPaciente = (paginaArchivos) => {
	return axios.get(`${API_URL}/archivos/paciente`, {params: {
			pacienteId: paginaArchivos.pacienteId,
			orderBy: paginaArchivos.orderBy,
			ascendingOrder: paginaArchivos.ascendingOrder,
			numeroPagina: paginaArchivos.numeroPagina
		}})
		.then(response=> {
			return response.data;
		})
		.catch(error => {
			console.log(error.response.data.message)
		})
}

export const descargarArchivo = (archivo, nombreArchivo) => {
	return axios.get(`${API_URL}/archivo/descargar`, {params: {idArchivo: archivo}, responseType: 'blob'})
	.then(response=> {
		return response.data
	})
}

export const cargarArchivo = (archivoNuevo, paciente) => {
	const formData = new FormData();
    formData.append("archivo", archivoNuevo);
    formData.append("idPaciente", paciente);
	return axios.post(`${API_URL}/archivo/cargar`, formData,{headers: {'Content-Type': 'multipart/form-data'}})
	.then(response =>{
		return response
	})
	
}

export const eliminarArchivo = (idArchivoEliminar) => {
	return axios.delete(`${API_URL}/archivo/eliminar`, {params: {idArchivo : idArchivoEliminar}})
}

