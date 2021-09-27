import React, {useState} from "react";
import {useHistory} from "react-router-dom";

function NewReservation () {
    const history = useHistory();
    const [data, setData] = useState(undefined);
// might need to add a change handler
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
        setData(newReservation);
        console.log(JSON.stringify(data));
        fetch("http://localhost:5000/reservations", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((data) => history.push("/dashboard?" + data));

        // will need to make a post request to this url that goes the server and add the data... then some validation
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
                <label>First Name:</label>
                <input id="first_name" type="text" name="first_name" required/>
                <br></br>
                <label>Last Name:</label>
                <input id="last_name" type="text" name="last_name" required/>
                <br></br>
                <label>Mobile Number:</label>
                <input id="mobile_number" type="text" name="mobile_number"required/>
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