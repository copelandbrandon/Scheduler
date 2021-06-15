import React from 'react';
import 'components/InterviewerList.scss';
import InterviewerListItem from 'components/InterviewerListItem';
import PropTypes from 'prop-types';

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

export default function InterviewerList(props) {

  const composeInterviewerList = props.interviewers.map(interviewer => {
    return (
    <InterviewerListItem
    key={interviewer.id}
    name={interviewer.name}
    avatar={interviewer.avatar}
    setInterviewer={event => {props.onChange(interviewer.id)}}
    selected={interviewer.id === props.value}
    />
    );
  });

  return (
    <section className="interviewers">
      <h4>Interviewer</h4>
      <ul className="interviewers__list">{composeInterviewerList}</ul>
    </section>
  );
};