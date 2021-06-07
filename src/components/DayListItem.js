import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";

export default function DayListItem(props) {
  console.log(props);

  const dayClass = classNames({
    'day-list__item': true,
    'day-list__item--selected': props.selected,
    'day-list__item--full': props.spots === 0
  });

  const formatSpots = function(spots) {
    if (spots > 1) {
      return `${spots} spots remaining`;
    } else if (spots === 0) {
      return `no spots remaining`
    }
    return `${spots} spot remaining`;
  };

  console.log(dayClass)

  return (
    <li onClick={() => props.setDay(props.name)} className={dayClass}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
};