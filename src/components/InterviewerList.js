import React from 'react';
import 'components/InterviewerList.scss';
import InterviewerListItem from 'components/InterviewerListItem';

export default function InterviewerList(props) {
  const composeInterviewerList = props.interviewers.map(interviewer => {
    return (
    <InterviewerListItem
    key={interviewer.id}
    name={interviewer.name}
    avatar={interviewer.avatar}
    setInterviewer={event => {props.setInterviewer(interviewer.id)}}
    selected={interviewer.id === props.interviewer}
    />
    );
  });

  return (
    <section className="interviewers">
      <h4>Interviewers</h4>
      <ul className="interviewers__list">{composeInterviewerList}</ul>
    </section>
  );
};