import React, { Fragment } from 'react';
import 'components/Appointment/styles.scss'
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import useVisualMode from '../../hooks/useVisualMode';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";

export default function Appointment(props) {

  const {mode, transition, back} = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

    function save(name, interviewer) {
      const interview = {
        student: name,
        interviewer
      };
      console.log("inside save");
      transition(SAVING);
      Promise.resolve(props.bookInterview(props.id, interview))////need to get the id from somewhere to use
      .then(()=>transition(SHOW))
      .catch((err)=>console.log(err.message));
    };

  return (
    <article className ='appointment'>
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)}/>}
      {mode === SHOW && (
      <Show
      student={props.interview.student}
      interviewer={props.interview.interviewer}
      />
      )}
      {mode === CREATE && (
      <Form
      name={props.name}
      interviewers={props.interviewers}
      interviewer={props.interviewer}
      onSave={(name, interviewer) => save(name, interviewer)}
      onCancel={() => back()}
      />
      )}
      {mode === SAVING && (
      <Status
      message={SAVING}
      />
      )}
    </article>
  );
};