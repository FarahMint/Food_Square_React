import React from 'react';
 
import Form from "../form/Form";
import  SidebarButton from "../Sidebar/SidebarButton";
import "./navbar.css";

const Navbar = (props) => {
 const {sidebarToggle,  handleQuery ,filter_venues  } = props
    return (
        <header className="toolbar">
        
        <nav className="toolbar__navigation">
        <SidebarButton sidebarToggle= {sidebarToggle}/>
          <div  className="toolbar__logo">
          <span>FoodyEd</span>  
          </div>
          <Form
            {...props}
               handleQuery ={ handleQuery }
              filter_venues={filter_venues}
             /> 
        </nav>
      </header>
    )
}
export default  Navbar;
