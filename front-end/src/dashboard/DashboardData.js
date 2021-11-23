import React from "react";
import formatReservationDate from "../utils/format-reservation-date";
import formatReservationTime from "../utils/format-reservation-time";
import { Link } from "react-router-dom";


function DashboardData ({reservations, setReservations}) {
if(reservations){

    const cancelReservationHandler = (event) => {
        //event.preventDefault();
        window.confirm("Do you want to cancel this reservation?")
        fetch(`http://localhost:5000/reservations/${event.target.id}/status`, {
            method : "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({data: {status:"cancelled"}})
        })
        .then(() => window.location.reload())
        setReservations();
    }

        // maps the reservations in the correct format and then returns them in a fragment that the dashboard displays
        const a = reservations.map((reservation) => {
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
                    <p> Status : {reservation.status}</p>
                    <br></br>
                    {reservation.status === "booked" ? 
                    <a href={`/reservations/${reservation.reservation_id}/seat`}>
                        <button>
                            Seat
                        </button>
                    </a>
                    :
                    <></>
                    }
                    {reservation.status === "cancelled" ?
                        <> </>
                        :
                        <Link to={"/reservations/" + parseInt(id) + "/edit"}>
                            <button>
                                Edit
                            </button>
                        </Link>
                    }
                    {reservation.status === "cancelled" ?
                        <> </>
                        :
                        <button id={reservation.reservation_id} data-reservation-id-cancel={reservation.reservation_id} onClick={cancelReservationHandler}>
                        Cancel
                    </button>
                    }
                </div>
            )
        })

        return (
            <div className="reservationContainer">
                {a}
            </div>
        )
}
else{
    return(
        <div>
            Reservations was not given
        </div>
    )
}
}

export default DashboardData;