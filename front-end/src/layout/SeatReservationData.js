import React from "react";
import formatReservationDate from "../utils/format-reservation-date";
import formatReservationTime from "../utils/format-reservation-time";

function SeatReservationData ({reservation}) {
        formatReservationDate(reservation);
        formatReservationTime(reservation);
        const id = reservation.reservation_id;
        return (
            <div key ={id} className="reservation">
                <h2>Time: {reservation.reservation_time} Date: {reservation.reservation_date}</h2>
                <h3>
                    {reservation.first_name} {reservation.last_name}
                </h3>
                <p>Phone Number : {reservation.mobile_number}</p>
                <p>Party Size : {reservation.people}</p>
            </div>
        )
}

export default SeatReservationData;