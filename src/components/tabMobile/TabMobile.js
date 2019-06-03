import React, {useState} from 'react'

import "./tabMobile.css";

const TabMobile=({ tabs = ["map", "venue"] }) =>{

    const [activeTab, setActive] = useState(null);

    return (
        <div className="mobile__tab">
            <ul>
              {tabs.map(tab => 
              <li key={tab} onClick={() => { setActive(tab) }} 
              style={{ color: activeTab === tab? "red" : "green" }}>{tab}</li>)}
               
            </ul>
            
        </div>
    )
}

export default TabMobile;