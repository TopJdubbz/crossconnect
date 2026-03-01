import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; 
import L from 'leaflet';
import './map.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// We only use the 'events' passed down from the parent! No useState here.
export default function EventMap({ events }) {
  const mapRef = useRef(null);

  // Hackathon Trick: Generates safe coordinates based on the event name so the map doesn't crash
  const getCoords = (event) => {
    if (event.lat && event.lng) return [event.lat, event.lng];
    const offsetLat = (event.name ? event.name.length * 0.002 : 0);
    const offsetLng = (event.category ? event.category.length * 0.002 : 0);
    return [37.3541 + offsetLat, -121.9552 - offsetLng]; // Centered near Santa Clara
  };

  useEffect(() => {
    if (mapRef.current && events && events.length > 0) {
      const group = new L.featureGroup(
        events.map(event => L.marker(getCoords(event)))
      );
      mapRef.current.fitBounds(group.getBounds(), { padding: [50, 50] });
    }
  }, [events]);

  return (
    <div>
      <MapContainer 
        ref={mapRef} 
        center={[37.3541, -121.9552]} 
        zoom={12} 
        scrollWheelZoom={true}
        style={{ height: '400px', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {events && events.map((event, index) => {
          const coords = getCoords(event);
          return (
            <Marker key={index} position={coords}>
              <Popup>
                <strong>{event.name}</strong>
                <p>{event.category}</p>
                <p>{event.location}</p>
                <p>{event.time}</p>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}