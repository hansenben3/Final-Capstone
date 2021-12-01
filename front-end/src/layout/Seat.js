import React, {useState, useEffect} from "react";
import { useHistory, useParams } from "react-router";
import ErrorAlert from "./ErrorAlert";
import SeatReservationData from "./SeatReservationData";

function Seat () {
    const {reservation_id} = useParams();
    const [reservation, setReservation] = useState(null)
    const [tables, setTables] = useState([]);
    const [errors, setErrors] = useState(null);
    const data = {data:{reservation_id : reservation_id}}
    const history = useHistory();

    useEffect( () => {
        const abortController = new AbortController();
        setErrors(null);
        fetch("http://localhost:5000/tables")
        .then((result) => (result.json()
        .then((result) => setTables(result.data))))
        .catch(setErrors);
      return () => abortController.abort();
    }, [])

    useEffect( () => {
        const abortController = new AbortController();
        setErrors(null);
        fetch(`http://localhost:5000/reservations/${reservation_id}`)
        .then((data) => data.json())
        .then((data) => setReservation(data.data))
        .catch(setErrors);
        return () => abortController.abort();
    }, [reservation_id])
 
    const seat = (event) => {
        event.preventDefault();
        const select = event.target.querySelector("select");
        const table = tables.filter((table) => table.table_id.toString() === select.value.toString())[0];
        if(table.reservation_id === null){
            if(table.capacity >= reservation.people){
                const abortController = new AbortController();
                fetch(`http://localhost:5000/tables/${table.table_id}/seat`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                .then(() => {
                    //window.location.reload();
                    history.push({
                        pathname : "/dashboard?date=" + reservation.reservation_date,
                    })
                    window.location.reload()
                })
                return () => abortController.abort();
            }
            else{
                setErrors("Capacity for table is less then reservation")
            }
        }
        else{
            setErrors("Table is occupied cannot seat")
        }
    }



    //Error not null call
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
    //Tables not null Call
    if(tables) {
        return (
            <div>
                {
                reservation ? 
                <div className="reservation">
                    <SeatReservationData reservation = {reservation} />
                </div>
                :
                <div className="reservation">
                    Reservation Failed to Load
                </div>
                }
                <h3>Tables</h3>
                <form onSubmit={seat}>
                <select name="table_id">
                    {tables.map((table) => {
                    return (
                    <option value={table.table_id} key={table.table_id}>
                        {table.table_name} - {table.capacity}
                    </option>
                    )
                })}
                </select>
                <button href= {`/reservations/${reservation_id}/seat`} type="submit">
                    Submit
                </button>
                </form>
                
            </div>
        )
    }
    //Tables null Call
    else{
        return (
            <div>
                No Tables
            </div>
        )
    }
    
}

export default Seat;
