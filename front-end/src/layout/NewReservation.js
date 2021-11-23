import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import ErrorAlert from "./ErrorAlert";
import compareMain from "../utils/compare-main";

function NewReservation () {
    const history = useHistory();
    const [error, setError] = useState(null);
// might need to add a change handler
    const submitHandler = (event) => {
        event.preventDefault();
        const form = event.target;
        const newReservation = {
            data : {
            first_name: form.querySelector("#first_name").value,
            last_name: form.querySelector("#last_name").value,
            mobile_number: form.querySelector("#mobile_number").value,
            reservation_date: form.querySelector("#reservation_date").value,
            reservation_time: form.querySelector("#reservation_time").value,
            people: parseInt(form.querySelector("#people").value),
            status: "booked"
            }
        }
        const dateTimeValidationErrors = compareMain(newReservation.data.reservation_time, newReservation.data.reservation_date);
        if ( dateTimeValidationErrors.length > 0 ) {
            setError(dateTimeValidationErrors);
        }
        else{
            const abortController = new AbortController();
            fetch("http://localhost:5000/reservations", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newReservation)
            })
            .then((result) => result.json())
            .then(() => {
                history.push("/dashboard?date=" + newReservation.data.reservation_date);
            })
            .catch(setError);
            return () => abortController.abort();
        }
    }

    const cancelHandler = (event) => {
        event.preventDefault();
        history.goBack();
    }

    if( error ) {
        return ( 
            <div>
                {
                    Array.isArray(error) ? 
                    error.map((e) => {
                        return (
                            <div className="alert alert-danger">
                            <ErrorAlert error = {e} />
                            </div>
                        )
                        
                    }) 
                    :
                    <ErrorAlert error = {error}/>
                }
            </div>
        )
    }

// submit button needs to save the new reservation them displays dashboard page for the date of the new reservation
// displays any errors returned from the api
// cancel button that returns the use to the previous page
    return ( 
        <div className="head">
            <form onSubmit={submitHandler}>
                <label>First Name:</label>
                <input id="first_name" type="text" name="first_name" required/>
                <br></br>
                <label>Last Name:</label>
                <input id="last_name" type="text" name="last_name" required/>
                <br></br>
                <label>Mobile Number:</label>
                <input id="mobile_number" type="text" name="mobile_number" required/>
                <br></br>
                <label>Reservation Date:</label>
                <input id="reservation_date" type="date" name="reservation_date" placeholder="YYYY-MM-DD" pattern="\d{4}-\d{2}-\d{2}" required/>
                <br></br>
                <label>Reservation Time:</label>
                <input id="reservation_time" type="time" name="reservation_time" placeholder="HH:MM" pattern="[0-9]{2}:[0-9]{2}" required/>
                <br></br>
                <label>People</label>
                <input id="people" type="number" name="people" min="1" required/>
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

export default NewReservation;