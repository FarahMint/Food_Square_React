// LOAD SCRIPT FOR  MAP
export function loadScript(url) {
  // select the first script tag
  const index = window.document.getElementsByTagName("script")[0];

  // create script tag
  const script = window.document.createElement("script");
  //  access property of tag
  script.src = url;
  script.async = true;
  script.defer = true;

  //  append the child - use insertBefore so we will select the index - the reference \ the 1rst script tag
  // then select its parent node
  // & then insert script before it to keep our script @ the beginning of our list of script
  index.parentNode.insertBefore(script, index);
}

/* <script
  async
  defer
  src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap"
/>; */

const REACT_APP_CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const REACT_APP_CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
// ------------------------------------
// FETCH API
// ------------------------------------

export const fetchData = async() => {
  const url = `https://api.foursquare.com/v2/venues/explore?`;

  const param = {
    client_id: REACT_APP_CLIENT_ID,
    client_secret: REACT_APP_CLIENT_SECRET,
    near: `Edinburgh`,
    query: `food`,
    v: `20190322`
  };

  try{
    const dataResponse = await fetch(`${url}${new URLSearchParams(param)}`);
    let dataVenues = await dataResponse.json();
    // console.log(dataVenues);
    return dataVenues;
  }catch(err){console.log(err)}     
};

// ------------------------------------
// Display all SMALL images
// ------------------------------------

export const handle_icon = venue => {
  // Destructure venue obj
  // 1- get categories array -- then  get index of this array
  const {
    categories: [index]
  } = venue;
  const size = `32`;
  // 2- inside  this array get icon object to reach prefix & suffix obj
  const img = `${index.icon.prefix}${size}${index.icon.suffix}`;
  // console.log(index.icon.prefix);
  // console.log(img);
  return img;
};

 