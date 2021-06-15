import React, { Fragment } from 'react';
import 'components/Appointment/styles.scss'
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';
import useVisualMode from '../../hooks/useVisualMode';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  const {mode, transition, back} = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function destroy() {
    transition(DELETING, true)
    Promise.resolve(props.cancelInterview(props.id))
    .then(()=>transition(EMPTY))
    .catch(()=>transition(ERROR_DELETE, true));
  };

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    console.log("Mode:",mode);
    Promise.resolve(props.bookInterview(props.id, interview))
    .then(()=>transition(SHOW))
    .catch(()=> transition(ERROR_SAVE, true));
  };
  
  return (
    <article className ='appointment' data-testid="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)}/>}
      {mode === SHOW && (
      <Show
      student={props.interview.student && props.interview.student}
      interviewer={props.interview.interviewer}
      onDelete={()=> transition(CONFIRM)}
      onEdit={()=> transition(EDIT)}
      />
      )}
      {mode === CREATE && (
      <Form
      interviewers={props.interviewers}
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
      onConfirm={()=> destroy()}
      />
      )}
      {mode === EDIT && (
      <Form
      name={props.interview.student}
      interviewers={props.interviewers}
      interviewer={props.interview.interviewer.id}
      onSave={(name, interviewer) => save(name, interviewer)}
      onCancel={() => back()}
      />
      )}
      {mode === ERROR_SAVE && (
      <Error
      message={"Could not save your appointment, please try again."}
      onClose={()=> back()}
      />
      )}
      {mode === ERROR_DELETE && (
      <Error
      message={"Could not delete the appointment, please try again."}
      onClose={()=> back()}
      />
      )}
    </article>
  );
};