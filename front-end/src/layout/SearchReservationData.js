import React from "react";
import { Link } from "react-router-dom";
import formatReservationDate from "../utils/format-reservation-date";
import formatReservationTime from "../utils/format-reservation-time";

function SearchReservationData ({reservation}) {
        formatReservationDate(reservation);
        formatReservationTime(reservation);
        const id = reservation.reservation_id;

    const cancelHandler = (event) => {
        const cancelId = event.target.id[0];
        fetch(`http://localhost:5000/reservations/${cancelId}/status`, {
            method : "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({data : {status: "cancelled"}})
        })
        .then((data) => console.log(data));
    }

        return (
            <div key ={id} className="reservation">
                <h2>Time: {reservation.reservation_time} Date: {reservation.reservation_date}</h2>
                <h3>
                    {reservation.first_name} {reservation.last_name}
                </h3>
                <p>Phone Number : {reservation.mobile_number}</p>
                <p>Party Size : {reservation.people}</p>
                <p>Status : {reservation.status}</p>
                <Link to={"/reservations/" + parseInt(id) + "/edit"}>
                        <button>
                            Edit
                        </button>
                </Link>
                <button id={reservation.reservation_id} onClick={cancelHandler}>
                    Cancel
                </button>
            </div>
        )
}

export default SearchReservationData;