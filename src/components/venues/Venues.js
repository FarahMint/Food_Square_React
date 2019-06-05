import React from "react";
import "./venues.css";

const Venues = props => {
//  display either the search performed by user or all the venues fetch from the API
// 1) display  the search performed by user
  const display = () => {
    if (props.filtered &&props.filtered.length) {
      return (
        <ul>
          {props.filtered.map(({ venue }) => {
            return (
              <li
                key={venue.id}
                className="venue__item"
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
      //  2) if no search are performed by user get all the venues fetched from the API
      return (
        <ul>
          { props.venues && props.venues.map(({ venue }) => (
            <li
              key={venue.id}
              className="venue__item"
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
    <React.Fragment>
      <div className="container-item">{display()}</div>
    </React.Fragment>
  );
};
export default Venues;
