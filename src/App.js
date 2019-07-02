import React, { Component } from "react";
import PropTypes from 'prop-types';

import { loadScript, handle_icon, fetchData } from "./utils";

import Sidebar from "./components/Sidebar/Sidebar";
import Navbar from "./components/navbar/Navbar";
import Map from "./components/map/Map";
import Footer from "./components/footer/Footer";

import "./App.css";

 const REACT_APP_API_KEY = process.env.REACT_APP_API_KEY;
 
class App extends Component {
  state = {
    center: null,
    markers: [],
    venues: [],
    activeMarker: false,
    query: "",
    filtered: [],

    sidebarOpen: false,
    displayNoFound: false,
  };
  


  getData= async()=>{
    
   try{
    //  call foodSquare Api
    const data = await fetchData();
    this.setState(
      {
        center: data.response.geocode.center,
        venues: data.response.groups[0].items
      }, 
      // directly after getting data from foodSquare API load the map
      this.loadMap());
    }catch(err){console.log(err)} ;
  }


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
    let center =this.state.center;
    //For the browser access google -> window
    const map = new window.google.maps.Map(document.getElementById("map"), {
      center: center,
      zoom: 11
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
     
      });

   
      return markers = markers.concat(marker);
    });

    this.setState(() => {
      return {
        markers
      };
    });
  };


  /** when click on list find the marker on the map */
  handleClickList = venue => {
    const {id} = venue;
    let venue_flag = this.state.markers.find(marker => marker.id === id);
    this.setState({ sidebarOpen: false });
    this.openMarker(venue_flag);
    return venue_flag;
  };



 /** when user perform a search filter list and find the corresponding marker on the map */
  handleQuery =(  query) => {
    // open sidebar to view list of venues and remove msg not found 
    this.setState({ sidebarOpen: true, displayNoFound:false,});
  
    // search with case incensitive -> gi
    const regex= new RegExp(`^${query}`, "gi");
    
 
      // 1) Filter venues
      let filter_venue = this.state.venues.filter(({ venue }) => venue.name.match(regex));
      this.setState({ filtered: filter_venue, query: query })
      // console.log(filter_venue);

      // -- check if venues are in the list provided by the API
      if(filter_venue.length === 0 && query !==""){
        this.setState({displayNoFound: true });
      }
     
   //loop through each marker
    this.state.markers.forEach(marker =>
      marker.name.match(regex)
        ? marker.setVisible(true)
        : marker.setVisible(false)
    );

    

  };



  openMarker = venue_flag => {
      this.infowindow.setContent(venue_flag.details);
      this.infowindow.open(this.map, venue_flag);
  
      this.map.setZoom(14);

      //Animate marker
      venue_flag.setAnimation(window.google.maps.Animation.BOUNCE);
      setTimeout(() => {
        venue_flag.setAnimation(null);
      }, 2000);
 
  };
  
  closeWindow() {
    this.infowindow.close();
  }

  componentDidMount() {
    // this.fetchData();
    this.getData()
  }


  sidebarToggle= ()=>{
    this.setState((prevState)=>{
   return { sidebarOpen : !prevState.sidebarOpen}
 })

  }


  render() {
    return (
      <div className="wrapper">
          <Navbar 
           sidebarToggle={this.sidebarToggle}
           handleQuery ={this.handleQuery }
           filter_venues={this.filter_venues} />

        {this.state.sidebarOpen && <Sidebar {...this.state}
          handleQuery ={this.handleQuery }
          filter_venues={this.filter_venues}
          handleClickList={this.handleClickList}  
        />}
     
        <main className="container-map">
            <Map/>   
        </main>

         <Footer />  
      </div>     
    );
  }
}

App.propTypes = {
  name: PropTypes.string,
  center: null,
  markers:PropTypes.array,
  venues: PropTypes.array,
  filtered: PropTypes.array,
  activeMarker:  PropTypes.bool,
  query: PropTypes.string,

  sidebarOpen:  PropTypes.bool,
  displayNoFound:  PropTypes.bool,

  getData: PropTypes.func,
  loadMap : PropTypes.func,
  initMap : PropTypes.func,
  handleClickList : PropTypes.func,
  handleQuery: PropTypes.func,
  openMarker: PropTypes.func,
  closeWindow: PropTypes.func,
  sidebarToggle: PropTypes.func,
};



export default App;
