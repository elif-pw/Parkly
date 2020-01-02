import React, {useState, useEffect} from 'react';
import Header from "./Header.js"
import MyGoogleMap from "./Map.js"
import Footer from "./Footer.js"

import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
//import * as parkData from "./data/skateboard-parks.json";
import mapStyles from "./mapStyles";



function Map() {
   const [selectedPark, setSelectedPark] = useState(null);

   useEffect(() => {
     const listener = e => {
       if (e.key === "Escape") {
         setSelectedPark(null);
       }
     };
     window.addEventListener("keydown", listener);

     return () => {
       window.removeEventListener("keydown", listener);
     };
   }, []);
return (
    <GoogleMap
      defaultZoom={13}
      defaultCenter={{ lat: 52.2297700, lng: 21.0117800 }}
      defaultOptions={{ styles: mapStyles, disableDefaultUI:true,
      zoomControl: true
       }}

    >
    </GoogleMap>
  );
}
const MapWrapped = withScriptjs(withGoogleMap(Map));

export default function MapPage() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
        <Header />
        <MyGoogleMap / >
        <Footer />
    </div>
  );
}

