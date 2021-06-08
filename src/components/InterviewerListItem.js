import React from 'react';
import classNames from 'classnames';
import 'components/InterviewerListItem.scss';
export default function InterviewerListItem(props) {

  let name = '';
  if(props.selected) {
    name = props.name;
  }
  const interviewerListItemClass = classNames({'interviewers__item': true, 'interviewers__item--selected': props.selected});

  return (
    <li className={interviewerListItemClass} key={props.id} onClick={props.setInterviewer}>
  <img
    className="interviewers__item-image"
    src={props.avatar}
    alt="Sylvia Palmer"
  />
  {name}
</li>
  );

};