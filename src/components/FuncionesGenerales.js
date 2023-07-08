import Swal from "sweetalert2";

export const formatENtoES = (fecha) => {
    const [year, month, day] = fecha.split("-")
    return day + '-' + month + '-' + year;
  } 

export const formatEStoEN = (fecha) => {
  const [day, month, year] = fecha.split("-")
  return year + '-' + month + '-' + day;
}


export const mostrarAlertaCarga = () => {
    Swal.fire({
        title: 'Cargando',
        text: 'Espere...',
        showConfirmButton:false
      });
}

export const cerrarAlertaCarga = () => {
    Swal.close();
}