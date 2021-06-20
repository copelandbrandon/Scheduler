import React, {useState} from 'react';
import InterviewerList from '../InterviewerList';
import Button from '../Button';

export default function Form(props) {
  const [error, setError] = useState("");
  const [usersName, setUsersName] = useState(props.name || "");
  const [currentInterviewer, setInterviewer] = useState(props.interviewer || null);

  const validate = function() {
    if (usersName === "") {
      setError("Student name cannot be blank");
      return;
    } else if (!currentInterviewer) {
      setError("Please pick an interviewer");
      return;
    }

    setError("");
    props.onSave(usersName, currentInterviewer);
  };

  const reset = function() {
    setUsersName('');
    setInterviewer(null);
  };
  const cancel = function() {
    reset();
    props.onCancel();
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={usersName}
            onChange={(event) => setUsersName(event.target.value)}
            data-testid="student-name-input"
          />
          <section className="appointment__validation">{error}</section>
        </form>
        <InterviewerList interviewers={props.interviewers} value={currentInterviewer} onChange={(event) => setInterviewer(event)} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={cancel} danger>Cancel</Button>
          <Button onClick={validate} confirm>Save</Button>
        </section>
      </section>
    </main>
  );
};