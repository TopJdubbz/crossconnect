import { createPortal } from "react-dom";
import "./Eventdetails.css";

export default function Eventdetails({ event, onClose }) {
  if (!event) return null;

  const modal = (
    <div className="eventdetails-overlay" onClick={onClose}>
      <div className="eventdetails-popup" onClick={(e) => e.stopPropagation()}>
        <button
          className="eventdetails-close"
          onClick={onClose}
          type="button"
          aria-label="Close"
        >
          ×
        </button>
        <div className="eventdetails-content">
          {event.image && (
            <img src={event.image} alt="" className="eventdetails-image" />
          )}
          <h2>{event.name}</h2>
          {event.location && (
            <p>
              <strong>Location:</strong> {event.location}
            </p>
          )}
          {event.category && (
            <p>
              <strong>Category:</strong> {event.category}
            </p>
          )}
          {event.date && (
            <p>
              <strong>Date:</strong> {event.date}
            </p>
          )}
          {event.time && (
            <p>
              <strong>Time:</strong> {event.time}
            </p>
          )}
          {event.description && (
            <p className="eventdetails-description">{event.description}</p>
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
