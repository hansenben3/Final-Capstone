import React from "react";

function Form ({reservation = null, changeHandler, submitHandler, cancelHandler}) {

    if(reservation){
    return (
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
    )
}
else{
    return (
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
    )
}

}

export default Form;