import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from 'components/Appointment';
import axios from "axios";
import {getAppointmentsForDay, getInterview} from '../helpers/selectors';

// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 3,
//     time: "2pm"
//   },
//   {
//     id: 4,
//     time: "3pm"
//   },
//   {
//     id: 5,
//     time: "4pm"
//   }
// ];

export default function Application(props) {

  const [state, setState] = useState({
    day:'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  });

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const setDay = day => setState({...state, day});
  // const setDays = days => setState(prev => ({...prev, days}));

  useEffect(()=>{
    Promise.all([
      axios.get('api/days'),
      axios.get('api/appointments'),
      axios.get('api/interviewers')
    ]).then((all) => {
      console.log(all[0].data);
      console.log(all[1].data);
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    })

  },[]);

  return (
    <main className="layout">
      <section className="sidebar">
          <img className="sidebar--centered" src="images/logo.png" alt="Interview Scheduler"/> 
          <hr className="sidebar__separator sidebar--centered" />
          <nav className="sidebar__menu">
            <DayList
              days={state.days}
              day={state.day}
              setDay={setDay}
            />
          </nav>
          <img className="sidebar__lhl sidebar--centered" src="images/lhl.png" alt="Lighthouse Labs"/>
    

      </section>
      <section className="schedule">
        {dailyAppointments.map(appointment => {
          const interview = getInterview(state, appointment.interview);
          return (<Appointment
          key={appointment.id}
          {...appointment}
          interview={interview}
          />);
        })}
        <Appointment id="last" time="5pm" />
      </section>
    </main>
  );
}
