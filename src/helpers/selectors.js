export function getAppointmentsForDay(state, day) {
  const filteredAppointments = [];
  const filteredDays = state.days.filter(filteredDay => filteredDay.name === day)
  //if the day is undefined or has no appointments will return an empty array
  if (filteredDays[0] === undefined || filteredDays[0].appointments.length < 1) {
    return [];
  }
  //turns object keys into integers and checks if the filtered days appointments array contains the keys
  //and if so pushes the appointment obj into filteredAppointments array
  for (const key in state.appointments) {
    let intKey = parseInt(key);
    if (filteredDays[0].appointments.includes(intKey)) {
      filteredAppointments.push(state.appointments[key]);
    }
  }

  return filteredAppointments;
};

