import React from 'react'
import Venues from "../Venues/Venues";

import {  handle_icon } from "../../utils";


import "./sidebar.css"
const Sidebar =(props)=> {
  const {handleClickList} = props;
    return (
        <div className="sidebar__venues">
           <Venues
              {...props}
              handleClickList={handleClickList}
              handle_icon={handle_icon}
            />

        </div>
    )
}

export default   Sidebar;