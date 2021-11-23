import React from "react";
/**
 * Defines the alert message to render if the specified error is truthy.
 * @param error
 *  an instance of an object with `.message` property as a string, typically an Error instance.
 * @returns {JSX.Element}
 *  a bootstrap danger alert that contains the message string.
 */

function ErrorAlert({ error }) {
if(error){
  if(error.message){
    error = error.message;
  }
}
    return (
      error && (
        <div className="alert alert-danger m-2">
          <h3>
            Error: {error}
          </h3>
          <br></br>
          <button onClick={() => window.location.reload(false)}>
            Try Again
          </button>
        </div>
      )
    );
}

export default ErrorAlert;
