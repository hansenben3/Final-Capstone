import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import ErrorAlert from "./ErrorAlert";
import compareMain from "../utils/compare-main";
import Form from "./Form";

function NewReservation () {
    const history = useHistory();
    const [errors, setErrors] = useState(null);
// might need to add a change handler
    const submitHandler = (event) => {
        event.preventDefault();
        const form = event.target;
        const newReservation = {
            data:{
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
            setErrors(dateTimeValidationErrors);
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
            .catch(setErrors);
            return () => abortController.abort();
        }
    }

    const cancelHandler = (event) => {
        event.preventDefault();
        history.goBack();
    }

    if( errors ) {
        return ( 
            <div className="alert alert-danger">
                {
                    Array.isArray(errors) ? 
                    errors.map((e) => {
                        return (
                            <div key = {errors.findIndex((element) => element === e)}>
                            <ErrorAlert error = {e} />
                            </div>
                        )
                        
                    }) 
                    :
                    <ErrorAlert error = {errors} />
                }
            </div>
        )
    }

// submit button needs to save the new reservation them displays dashboard page for the date of the new reservation
// displays any errors returned from the api
// cancel button that returns the use to the previous page
    return ( 
        <div className="head">
            <Form submitHandler = {submitHandler} cancelHandler = {cancelHandler}/>
        </div>
    )
}

export default NewReservation;