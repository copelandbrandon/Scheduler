import React, { Fragment } from 'react';
import 'components/Appointment/styles.scss'
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import useVisualMode from '../../hooks/useVisualMode';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";

export default function Appointment(props) {

  const {mode, transition, back} = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function deleteInterview() {
    transition(DELETING);
    Promise.resolve(props.cancelInterview(props.id))
    .then(()=>transition(EMPTY))
    .catch((err)=>console.log(err.message));
  };

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    console.log("inside save");
    transition(SAVING);
    Promise.resolve(props.bookInterview(props.id, interview))
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
      onDelete={()=> transition(CONFIRM)}
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
      {mode === DELETING && (
      <Status
      message={DELETING}
      />
      )}
      {mode === CONFIRM && (
      <Confirm
      message={'Are you sure you would like to delete?'}
      onCancel={()=> back()}
      onConfirm={()=> deleteInterview()}//something needs to go in here
      />
      )}
    </article>
  );
};