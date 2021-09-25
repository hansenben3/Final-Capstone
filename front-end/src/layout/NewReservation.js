import React from "react";
import {useHistory} from "react-router-dom";

function NewReservation () {
    const history = useHistory();

    const changeHandler = () => {

        // change handler for the data of the form

        // this will handle state that is send down from parent object

    }

    const submitHandler = (event) => {
        event.preventDefault();
        const form = event.target;
        const newReservation = {
            first_name: form.querySelector("#first_name").value,
            last_name: form.querySelector("#last_name").value,
            mobile_number: form.querySelector("#mobile_number").value,
            reservation_date: form.querySelector("#reservation_date").value,
            reservation_time: form.querySelector("#reservation_time").value,
            people: form.querySelector("#people").value
        }
        console.log(newReservation);
        // will need to make a post request to this url that goes the server and add the date... then some validation
        //                      that then leads to the dashboard of said reservation

    }

    const cancelHandler = (event) => {
        event.preventDefault();
        history.goBack();
    }
// submit button needs to save the new reservation them displays dashboard page for the date of the new reservation
// displays any errors returned from the api
// cancel button that returns the use to the previous page
    return ( 
        <div>
            <form onSubmit={submitHandler}>
                <label for="first_name">First Name:</label>
                <input id="first_name" type="text" name="first_name" />
                <br></br>
                <label for="last_name">Last Name:</label>
                <input id="last_name" type="text" name="last_name" />
                <br></br>
                <label for="mobile_number">Mobile Number:</label>
                <input id="mobile_number" type="number" name="mobile_number"/>
                <br></br>
                <label for="reservation_date">Reservation Date:</label>
                <input id="reservation_date" type="date" name="reservation_date" />
                <br></br>
                <label for="reservation_time">Reservation Time:</label>
                <input id="reservation_time" type="time" name="reservation_time" />
                <br></br>
                <label for="people">People</label>
                <input id="people" type="number" name="people" min="1" />
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