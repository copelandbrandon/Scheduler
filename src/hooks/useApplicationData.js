import React, { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {

  const [state, setState] = useState({
    day:'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  });

  useEffect(()=>{
    Promise.all([
      axios.get('api/days'),
      axios.get('api/appointments'),
      axios.get('api/interviewers')
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    })
  },[]);
  //Pair programmed updateSpots function with Brandon Shemilt
  const updateSpots = function (dayName, days, appointments) {
   const daysCopy = days.map((day) => ({ ...day }));
 
   for (const day of daysCopy) {
     if (day.name === dayName) {
       day.spots = day.appointments.filter(
         (item) => !appointments[item].interview
       ).length;
     }
   }
 
   return daysCopy;
 };
  
  const setDay = day => setState({...state, day});
  

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${id}`)
    .then(()=>{setState({...state, appointments, days: updateSpots(state.day, state.days, appointments)})});
  };

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: {...interview}
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, {interview})
    .then(()=> {
      setState({...state, appointments, days: updateSpots(state.day, state.days, appointments)});
    });
  };

  return {state, setDay, bookInterview, cancelInterview};
};
