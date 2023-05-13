export const formatENtoES = (fecha) => {
    const [year, month, day] = fecha.split("-")
    return day + '-' + month + '-' + year;
  } 