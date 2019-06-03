import React from 'react';
import { FaSearch } from 'react-icons/fa';

import "./form.css";

const Form =(props) =>{
    return (
      <React.Fragment>    
     <div className="form nav-mobile-search">
        <label htmlFor="query" hidden>search</label>
        
        <input
          type="text"
          name="query"
          className="form-control"
          onChange={e => props.handleChange(e.target.value)}
          value={props.query}
          placeholder="Search for a restaurant here..."
        />
        <FaSearch  className="search-icon"/>
        </div>
      </React.Fragment>
    )
}

export default  Form;
