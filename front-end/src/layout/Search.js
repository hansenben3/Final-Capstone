import React, {useEffect, useState} from "react";
import SearchReservationData from "./SearchReservationData";

function Search () {
    const [reservations, setReservations] = useState([]);
    const [renderedReservations, setRendered] = useState(<h2>No reservations found</h2>)

    const search = (event) => {
        event.preventDefault();
        const form = event.target;
        const newNumber = form.querySelector("#mobile_number").value;
        fetch(`http://localhost:5000/reservations?mobile_number=${newNumber}`)
        .then((data) => data.json())
        .then((data) => setReservations(data.data))
    }

    useEffect( () => {
        if(reservations.length === 0) {
            setRendered(<h2>No reservations found</h2>)
        }
        else{
            setRendered(
                reservations.map((reservation) => {
                    return (
                        <div key={reservation.reservation_id}>
                           <SearchReservationData reservation = {reservation} /> 
                        </div>
                        
                    )
                })
            )
        }
    }, [reservations])


    return (
        <div>
            <div className="head">
                <form onSubmit={search}> 
                    <label>Search by Phone-Number</label>
                    <br></br>
                    <input id="mobile_number" name="mobile_number" type="text">
                    </input>
                    <button type="submit">
                        Find
                    </button>
                </form>
            </div>
            <div className="renderedSearch">
                {renderedReservations} 
            </div>
        </div>
    )
}

export default Search;