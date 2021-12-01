import React, {useState, useEffect} from "react";
import {useParams, useHistory} from "react-router-dom";
import compareMain from "../utils/compare-main";
import ErrorAlert from "./ErrorAlert";
import Form from "./Form";

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

    if(reservation) { 
    return (
        <div>
            <h2>
                Edit Reservation
            </h2>
            <Form reservation={reservation} changeHandler = {changeHandler} submitHandler = {submitHandler} cancelHandler = {cancelHandler}/>
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