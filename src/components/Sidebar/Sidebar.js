import React from 'react'
import Venues from "../venues/Venues";


import "./sidebar.css"
const Sidebar =(props)=> {
  const {handleClickList} = props;
    return (
        <div className="sidebar__venues">
           <Venues
              {...props}
              handleClickList={handleClickList}
            />
        </div>
    )
}

export default   Sidebar;