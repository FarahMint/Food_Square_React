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

const API_KEY =  process.env.REACT_APP_API_KEY;

export const loadMap = () => {
  loadScript(
    `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=initMap`
  );
  //Initialize initMap => for JS to render the init map
  //To keep it visible we convert it to the window obj
  window.initMap = this.initMap;
};

// ------------------------------------
// Display all SMALL images
// ------------------------------------

export const handle_icon = venue => {
  const {
    categories: [index]
  } = venue;
  const size = `32`;
  const img = `${index.icon.prefix}${size}${index.icon.suffix}`;
  // console.log(index.icon.prefix);
  // console.log(img);
  return img;
};
