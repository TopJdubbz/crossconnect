import React, {useState, useEffect} from 'react';
import {MapContainer, TileLayer, Marker, Popup, useMap} from 'react-leaflet';
import './map.css';
import L, { map } from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;

export default function EventMap({events}) {
    const [events, setEvents] = useState([]);
    //Change style depending on later.

    //Fitbounds:
    useEffect(() => {
        if (mapRef.current) {const group = new L.featureGroup(events.map(event => L.marker([event.lat, event.lng])));
        mapRef.current.fitBounds(group.getBounds(), {padding: [50,50]})}}, [events])
        //change the [events] part if its glitchy.
    
    return(
        <div>
            <MapContainer 
            center={[0, 0]} 
            zoom={2} 
            scrollWheelZoom={true}
            style={{ height: '400px', width: '100%' }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                //Convert each event in events to a marker on the map:
                {events.map((event, index) => (
                    <Marker key={index} position={[event.lat, event.lng]}>
                        <Popup> //Includ CSS here!
                            <strong>{event.name}</strong>
                            <p>{event.interest}</p>
                            <p>{event.location}</p>
                            <p>{event.timedate}</p>
                        </Popup>
                    </Marker>
                ))}

            </MapContainer>

        </div>



    )
}