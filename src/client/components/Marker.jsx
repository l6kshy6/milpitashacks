import { APIProvider, useMap, Map, AdvancedMarker, InfoWindow, useAdvancedMarkerRef } from '@vis.gl/react-google-maps';
import { useState } from "react";

const Marker = ({ drive }) => {
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [windowOpen, setWindowOpen] = useState(true);

  const clickEvent = ()=>{
    setWindowOpen(true);
  }
  return (
    <div>
      <AdvancedMarker ref={markerRef} onClick={clickEvent} position={{ lat: drive.location.lat, lng: drive.location.lng }} />
      {windowOpen && <InfoWindow anchor={marker} onCloseClick={() => setWindowOpen(false)}><><h1>{drive.name}</h1><p>{drive.location.address}</p></></InfoWindow>}
    </div >
  );
}
export default Marker;