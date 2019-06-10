import React from 'react';
import { FaSearch } from 'react-icons/fa';

import "./form.css";

const Form =(props) =>{
  const { handleQuery , query }= props;
    return (
      <React.Fragment>    
     <form className="form">
        <label htmlFor="query" hidden>search</label>  
        <input
          type="text"
          name="query"
          className="form-control"
          onChange={e => handleQuery(e.target.value)}
          value={query}
          placeholder="Search for a restaurant in Edinburgh..."
        />
        <FaSearch  className="search-icon" aria-label="search bar"/>
        </form>
      </React.Fragment>
    )
}

export default  Form;
