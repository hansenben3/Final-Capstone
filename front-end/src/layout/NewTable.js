import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import ErrorAlert from "./ErrorAlert";

function NewTable () {
    const history = useHistory();
    const [error, setError] = useState(null);

    const cancelHandler = (event) => {
        event.preventDefault();
        history.goBack();
    }

    const submitHandler = (event) => {
        event.preventDefault();
        const form = event.target;
        const newTable = {
            data: {
                table_name : form.querySelector("#table_name").value,
                capacity : parseInt(form.querySelector("#capacity").value)  
            }

        }
        // validation for the table will go here if needed
        fetch("http://localhost:5000/tables", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTable)
        })
        .then((result) => result.json())
        .then((result) => {
            history.push("/dashboard");
        })
        .catch(setError);
    }

    if( error ) {
        return ( 
            <div>
                {
                    Array.isArray(error) ? 
                    error.map((e) => {
                        return (
                            <>
                            <ErrorAlert error = {e} />
                            </>
                        )
                        
                    }) 
                    :
                    <ErrorAlert error = {error}/>
                }
            </div>
        )
    }

    return (
        <div className="head">
            <h2>
                Create a new table
            </h2>
            <form onSubmit={submitHandler}>
                <label> Table Name: </label>
                <input id="table_name" name="table_name" type = "text" required minLength="2" ></input>
                <br></br>
                <label> Capacity: </label>
                <input id="capacity" name="capacity" type = "number" required min="1"></input>
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

export default NewTable;