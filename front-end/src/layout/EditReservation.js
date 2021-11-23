import React, {useState, useEffect} from "react";
import {useParams, useHistory} from "react-router-dom";
import compareMain from "../utils/compare-main";
import ErrorAlert from "./ErrorAlert";

function EditReservation () {
    const history = useHistory();
    const {reservation_id} = useParams();
    const [reservation, setReservation] = useState(null);
    const [errors, setErrors] = useState(null);

    useEffect( () => {
        const abortController = new AbortController();
        setErrors(null);
        fetch(`http://localhost:5000/reservations/${reservation_id}`)
        .then((data) => data.json())
        .then((data) => setReservation(data.data))
        .catch(setErrors);
        return () => abortController.abort();
    }, [reservation_id])


    const changeHandler = (event) => {
        const { id, value } = event.target;
        setReservation(prevState => ({
            ...prevState,
            [id] : value
        }))
    }

    const submitHandler = (event) => {
        event.preventDefault();
        const dateTimeValidationErrors = compareMain(reservation.reservation_time, reservation.reservation_date);
        if ( dateTimeValidationErrors.length > 0 ) {
            console.log(dateTimeValidationErrors);
            setErrors(dateTimeValidationErrors);
        }
        else{
            const abortController = new AbortController();
            fetch(`http://localhost:5000/reservations/${reservation_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({data : reservation})
            })
            .then((data) => {
                history.push("/dashboard?date=" + reservation.reservation_date);
            })
            .catch(setErrors);
            return () => abortController.abort();
        }
    }

    const cancelHandler = (event) => {
        event.preventDefault();
        history.goBack();
    }

    if(errors) {
        if(Array.isArray(errors)){
            return (
                <div>
                    {
                        errors.map((error) => {
                            return (
                                <ErrorAlert error = {error} />
                            )
                        })
                    }
                </div>
            )
        }
        else{
            return (
                <ErrorAlert error = {errors} />
            )
        }
    }

    if(reservation) { 
        console.log(reservation.reservation_date);
    return (
        <div>
            <h2>
                Edit Reservation
            </h2>
            <form onSubmit={submitHandler}>
                <label>First Name:</label>
                <input id="first_name" value={reservation.first_name} onChange={changeHandler} type="text" name="first_name" required/>
                <br></br>
                <label>Last Name:</label>
                <input id="last_name" value={reservation.last_name} onChange={changeHandler} type="text" name="last_name" required/>
                <br></br>
                <label>Mobile Number:</label>
                <input id="mobile_number" value={reservation.mobile_number} onChange={changeHandler} type="text" name="mobile_number" required/>
                <br></br>
                <label>Reservation Date:</label>
                <input id="reservation_date" value={reservation.reservation_date} onChange={changeHandler} type="date" name="reservation_date" placeholder="YYYY-MM-DD" pattern="\d{4}-\d{2}-\d{2}" required/>
                <br></br>
                <label>Reservation Time:</label>
                <input id="reservation_time" value={reservation.reservation_time} onChange={changeHandler} type="time" name="reservation_time" placeholder="HH:MM" pattern="[0-9]{2}:[0-9]{2}" required/>
                <br></br>
                <label>People</label>
                <input id="people" value={reservation.people} onChange={changeHandler} type="number" name="people" min="1" required/>
                <br></br>
                <button type="submit"> 
                    Submit
                </button>
                <button onClick={cancelHandler}>
                    Cancel
                </button>

            </form>
        </div>
    )
    }
    else{
        return(
            <div>
                Reservation not found
            </div>
        )
    }
}

export default EditReservation;