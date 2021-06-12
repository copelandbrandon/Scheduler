import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from 'components/Appointment';
import axios from "axios";
import useApplicationData, {state, setDay, bookInterview, cancelInterview} from '../hooks/useApplicationData'
import {getAppointmentsForDay, getInterview, getInterviewersForDay} from '../helpers/selectors';


export default function Application(props) {

  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const interviewersArr = getInterviewersForDay(state, state.day);

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
          interviewers={interviewersArr}
          bookInterview={bookInterview}
          cancelInterview={cancelInterview}
          />);
        })}
        <Appointment id="last" time="5pm" />
      </section>
    </main>
  );
}
