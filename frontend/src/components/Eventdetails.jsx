import "./Eventdetails.css";

export default function Eventdetails({ event }) {
    if (!event) return null; //no selected event, dont show anything
        return(
            <div className = "event details">
                <button 
                    className = "close details"
                    onClick = {onClose} // close details when x is clicked 
                    type = "button"
                >
                    X
                </button>

                
            </div >

    )

}