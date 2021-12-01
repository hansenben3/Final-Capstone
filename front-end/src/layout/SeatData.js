import React, {useState} from "react";
import { useHistory } from "react-router";
import ErrorAlert from "./ErrorAlert";

function SeatData ({table, reservation_id, reservation, handler}) {
    const [errors, setErrors] = useState(null);
    const history = useHistory();
    const data = {data:{reservation_id : reservation_id}}

    const validateCapacity = () => {
        if(table.capacity >= reservation.people){
            seat();
        }
        else{
            setErrors("Capacity for table is less then reservation")
        }
    }
 
    const seat = () => {
        const abortController = new AbortController();
        fetch(`http://localhost:5000/tables/${table.table_id}/seat`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
        })
        .then( (data) => {
            history.push({
                pathname : "/reservations?date=" + reservation.reservation_date,
            })
            window.location.reload();
        })
        return () => abortController.abort();
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

    if(table){
        return (
            <div key = {table.table_id} className="table">
                <h2>Table ID : {table.table_id}</h2>
                <h3>Table Name : {table.table_name}</h3>
                <h3>Capacity : {table.capacity}</h3>
                <h3 data-table-id-status={table.table_id}>
                    {!table.reservation_id ? 
                        <button onClick={validateCapacity}>Free</button>
                        :
                        "Occupied"
                    }
                </h3>
            </div>
        )
    }
    else{
        return ( 
            <div>
                No table
            </div>
        )
    }
}

export default SeatData;