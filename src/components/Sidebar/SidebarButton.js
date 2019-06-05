import React from 'react'
import "./sidebarButton.css"
const SidebarButton =(props)=> {
    const {sidebarToggle}= props
    return (
        <button className="toggle-button" onClick={sidebarToggle}>
            <div className="toggle-button__line"></div>
            <div className="toggle-button__line"></div>
            <div className="toggle-button__line"></div>
        </button>
    )
}

export default  SidebarButton;