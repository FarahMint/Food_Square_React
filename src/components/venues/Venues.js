import React from "react";

import {  handle_icon  } from "../../utils";
import { FaSmileWink } from 'react-icons/fa';
import "./venues.css";


const Venues = props => {

// 1) display  the search performed by user
  const display = () => {
    // if no item found when do research 
    if( props.displayNoFound){
       return (
         <React.Fragment>
 <p className="not__found">Sorry no restaurant was found in Edinburgh. Try another one 
 <FaSmileWink aria-label="smyley"/>
 </p>
         </React.Fragment>
      )
      } 
//  otherwise -> display either the search performed by user or all the venues fetch from the API
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
                  src={handle_icon(venue)}
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
                src={handle_icon(venue)}
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
