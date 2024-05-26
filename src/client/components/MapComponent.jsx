import { APIProvider, useMap, Map, AdvancedMarker, InfoWindow, useAdvancedMarkerRef } from '@vis.gl/react-google-maps';
import { useEffect, useState } from "react";
import Marker from './Marker';

const MapComponent = ({ drives, focusHandler, location }) => {
    const [markerClicked, setMarkerClicked] = useState(false);
    const [markerClickedActual, setMarkerClickedActual] = useState(false);
    return (
        <>
            <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
                <Map mapId={"kill yourself"} defaultCenter={{ lat: 37.4509315, lng: -121.903105 }} defaultZoom={15} minZoom={7} maxZoom={20}>
                    {drives.map((drive) => <Marker drive={drive} key={drive.id} />)}
                </Map>
            </APIProvider>
        </>
    );
}
export default MapComponent;