import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './map.css';

// Fix default marker icon in bundled apps (images must be resolvable)
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

export default function EventMap({ events = [] }) {
  const eventsWithCoords = events.filter((e) => e && e.lat != null && e.lng != null);

  return (
    <div className="event-map-wrapper">
      <MapContainer
        center={[37.35, -121.95]}
        zoom={10}
        scrollWheelZoom={true}
        className="event-map-container"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {eventsWithCoords.map((event, index) => (
          <Marker key={event.id ?? index} position={[event.lat, event.lng]}>
            <Popup>
              <strong>{event.name}</strong>
              <p>{event.interest ?? event.category}</p>
              <p>{event.location}</p>
              <p>{event.timedate ?? event.time ?? event.date}</p>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}