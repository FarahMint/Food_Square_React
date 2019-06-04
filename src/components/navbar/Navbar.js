import React from 'react';
// import { useState, useEffect } from 'react';
 import Form from "../form/Form";
// import { handle_icon } from "../utils";

import "./navbar.css"

const Navbar = (props) => {

 

    return (
        <header>
        <nav className="header-logo">
          <span>FoodyEd</span>  
          <Form
            {...props}
              handleChange={props.handleChange}
              handleSubmit={props.handleSubmit}
              filter_venues={props.filter_venues}
             />

        </nav>
      </header>
    )
}

export default  Navbar;
