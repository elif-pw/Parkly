import React, {useState, useEffect} from 'react';
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

class MyGoogleMap extends React.Component {
render(){
  return (
    <div style={{ width: "100vw", height: "95vh" }}>

    <MapWrapped
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places,visualization&key=AIzaSyAawrv0eMdyll-DEP_E2XllYyQzxWSjiHk
        `}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
      </div>

  );
  }
}

export default MyGoogleMap