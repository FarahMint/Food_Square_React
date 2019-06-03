import React from "react";
// import { FaSearch } from 'react-icons/fa';
// import Form from "./Form";


import "./venues.css";

const Venues = props => {
  const display = () => {
    if (props.filtered.length) {
      return (
        <ul>
          {props.filtered.map(({ venue }) => {
            return (
              <li
                key={venue.id}
                className="venue__item"
                onMouseEnter={() => props.handleMouseEnter(venue.id)}
                onMouseLeave={() => props.handleMouseLeave(venue.id)}
                onClick={() => props.handleClickList(venue)}
              >
                <img
                  src={props.handle_icon(venue)}
                  alt={venue.name}
                  className="icon"
                />

                {venue.name}
              </li>
            );
          })}
        </ul>
      );
    } else {
      return (
        <ul>
          {props.venues.map(({ venue }) => (
            <li
              key={venue.id}
              className="venue__item"
              onMouseEnter={() => props.handleMouseEnter(venue.id)}
              onMouseLeave={() => props.handleMouseLeave(venue.id)}
              onClick={() => props.handleClickList(venue)}
            >
              <img
                src={props.handle_icon(venue)}
                alt={venue.name}
                className="icon"
              />

              {venue.name}
            </li>
          ))}
        </ul>
      );
    }
  };

  return (
    <div>
      {/* <Form {...props}/>    */}
      <div className="container-item">{display()}</div>
    </div>
  );
};
export default Venues;
