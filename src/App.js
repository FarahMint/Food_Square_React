import React, { Component } from "react";
import { loadScript, handle_icon } from "./utils";

import Venues from "./components/Venues";
import "./App.css";

const REACT_APP_API_KEY = process.env.REACT_APP_API_KEY;
const REACT_APP_CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const REACT_APP_CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;



 

class App extends Component {
  state = {
    venues: [],
    center: null,
    markers: [],
    isHovered: {},
    activeMarker: false,
    query: "",
    filtered: []
  };

  fetchData = () => {
    const url = `https://api.foursquare.com/v2/venues/explore?`;

    const param = {
      client_id: REACT_APP_CLIENT_ID,
      client_secret: REACT_APP_CLIENT_SECRET,
      near: `Edinburgh`,
      query: `food`,
      v: `20190322`
    };




    fetch(`${url}${new URLSearchParams(param)}`)
      .then(response => response.json())
      .then(data => {
        // console.log(data.response);
        this.setState(
          {
            center: data.response.geocode.center,
            venues: data.response.groups[0].items
          },
          // load map only when get venues
          this.loadMap()
        );
      });
  };

  // MAP

  loadMap = () => {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=${REACT_APP_API_KEY}&callback=initMap`
    );
    //Initialize initMap => for JS to render the init map
    //To keep it visible we convert it to the window obj
    window.initMap = this.initMap;
  };

 




  initMap = () => {
    // GET DATA FROM STATE
    // const { list } = this.props;
    let markers = [];
    let center = { ...this.state.center };
    //For the browser access google -> window
    const map = new window.google.maps.Map(document.getElementById("map"), {
      center: center,
      zoom: 13
    });
    this.map = map;

    // CREATE AN INFO WINDOW

   const infowindow = new window.google.maps.InfoWindow({
    maxWidth: 500,
    content:'<div id="info__window-map"></div>'
      });
    // const infowindow = new window.google.maps.InfoWindow({});
    this.infowindow = infowindow;

    this.state.venues.map(({ venue }) => {
      //For each item we create an info window
      const {
        categories: [name]
      } = venue;
      let content_details = {
        name: venue.name,
        address: venue.location.formattedAddress.join(" "),
        category: name.name
      };
      // console.log(content_details.categories);
      let window_text = `<div class="info_box">
    
      <img src="${handle_icon(venue)}" alt=${venue.name} class="icon-w"/>
      <h3>${content_details.name}</h3>
      <p>${content_details.category}</p>
      <p>${content_details.address}</p>
      </div> `;

      //For each item we create a marker
      let marker = new window.google.maps.Marker({
        id: venue.id,
        position: {
          lat: venue.location.lat,
          lng: venue.location.lng
        },
        map: this.map,
        name: venue.name,
        details: window_text,
        animation: window.google.maps.Animation.DROP
      });

      marker.addListener("click", () => {
        infowindow.setContent(window_text);

        infowindow.open(map, marker);
      });

      marker.addListener("mouseover", () => {
        this.handleMouseEnter(venue.id);
        // set new content
        infowindow.setContent(window_text);
        // open window
        infowindow.open(map, marker);
        // *** ANIMATION ****
        marker.setAnimation(window.google.maps.Animation.BOUNCE);
        setTimeout(() => {
          marker.setAnimation(null);
        }, 2000);
      });

      marker.addListener("mouseout", () => {
        // open window
        infowindow.close();
        this.handleMouseLeave(venue.id);
      });

      markers = markers.concat(marker);
      return this.marker;
    });

    this.setState(() => {
      return {
        markers
      };
    });
  };

  // hover
  handleMouseEnter = index => {
    this.setState(prevState => {
      return {
        isHovered: { ...prevState.isHovered, [index]: true },
        activeMarker: true
      };
    });
  };

  handleMouseLeave = index => {
    this.setState(prevState => {
      return {
        isHovered: { ...prevState.isHovered, [index]: false },
        activeMarker: false
      };
    });
  };

  handleClickList = venue => {
    let venue_flag = this.state.markers.find(marker => marker.id === venue.id);

    this.openMarker(venue_flag);
  };

  handleChange = query => {
    let filter_venue = this.state.venues.filter(({ venue }) =>
      venue.name.toLowerCase().includes(query)
    );
    this.state.markers.forEach(marker =>
      marker.name.toLowerCase().includes(query)
        ? marker.setVisible(true)
        : marker.setVisible(false)
    );

    this.setState({ filtered: filter_venue, query: query });
  };

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps, prevState) {
    let venue_flag;
    this.state.venues.map(({ venue }) => {
      if (this.state.isHovered[venue.id] !== prevState.isHovered[venue.id]) {
        venue_flag = this.state.markers.find(marker => marker.id === venue.id);
// open marker
        this.openMarker(venue_flag); 
      }
      return venue_flag;
    });
  }

  openMarker = venue_flag => {
    if (this.state.activeMarker) {
      this.infowindow.setContent(venue_flag.details);
      this.infowindow.open(this.map, venue_flag);
      console.log(this.infowindow);
      this.map.setZoom(14);

      //Animate marker
      venue_flag.setAnimation(window.google.maps.Animation.BOUNCE);
      setTimeout(() => {
        venue_flag.setAnimation(null);
      }, 2000);
    } else {
      this.closeWindow();
    }
  };
  closeWindow() {
    this.infowindow.close();
  }

  render() {
    return (
      <div>
        <div className="container">
          <nav className="header-logo">
            <span>FoodyEd</span>
          </nav>

          <div className="container-venues">
            <Venues
              {...this.state}
              handleChange={this.handleChange}
              handleMouseEnter={this.handleMouseEnter}
              handleMouseLeave={this.handleMouseLeave}
              handleClickList={this.handleClickList}
              handle_icon={handle_icon}
              filter_venues={this.filter_venues}
            />
          </div>
          <div className="container-map" id="map">
            <h1>Map</h1>
          </div>
        </div>
        <footer>
          <a
            href="https://github.com/FarahMint"
            target="_blank"
            rel="noopener noreferrer"
          >
            FarahMint
          </a>
        </footer>
      </div>
    );
  }
}

export default App;
