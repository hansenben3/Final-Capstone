import React, { useEffect, useState} from "react";
import ErrorAlert from "../layout/ErrorAlert";
import useQuery from "../utils/useQuery";
import DashboardData from "./DashboardData";
import {next, previous, today} from "../utils/date-time";
import { useHistory } from "react-router-dom";
import TableData from "./TableData";
/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */

function Dashboard() {
  const query = useQuery();
  const history = useHistory();

  const checkQuery = () => {
    if(query.get("date")){
      return query.get("date")
    }
    return today();
  }
  
  const [date, setDate] = useState(checkQuery);
  const [reservations, setReservations] = useState([]);
  const [tables, setTable] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  useEffect( () => {
    const loadDashboard = () => {
      const abortController = new AbortController();
      setReservationsError(null);
      fetch("http://localhost:5000/reservations?date=" + date, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then((result) => (result.json().then((result) => setReservations(result.data))))
        .catch(setReservationsError);
      return () => abortController.abort();
    }

    loadDashboard();    
    history.push("?date="+date);
  }, [date,history]);

  useEffect( () => {
    const loadDashboard = () => {
      const abortController = new AbortController();
      setReservationsError(null);
      fetch("http://localhost:5000/tables")
      .then((result) => (result.json().then((result) => setTable(result.data))))
      .catch(setReservationsError);
      return () => abortController.abort();
    }

    loadDashboard();

  },[]);

  const previousDay = (event) => {
    event.preventDefault();
    setDate(previous(date));
  }

  const getToday = (event) => {
    event.preventDefault();
    setDate(today())
  }

  const nextDay = (event) => {
    event.preventDefault();
    setDate(next(date))
  }

  return (
    <main>
      <div className="head">
        <h1>Dashboard</h1>
        <div className="buttonContainer">
          <button onClick={previousDay}>
            Previous
          </button>
          <button onClick={getToday}>
            Today
          </button>
          <button onClick={nextDay}>
            Next
          </button>
        </div>
        <h4 className="mb-0">Reservations for dates : {date}</h4>
      </div>
        {
          Array.isArray(reservationsError) ?
          reservationsError.map((error) => {
            return (
              <>
              <ErrorAlert error = {error}/>
              </>
            )
          })
          :
          <ErrorAlert error = {reservationsError}/>
        }
      <DashboardData reservations={reservations} setReservations={setReservations}/>
      <TableData tables = {tables} setTable={setTable} setReservations={setReservations}/>
    </main>
  );
}

export default Dashboard;
