import { compareTime, checkTime } from "./compare-time";
import { compareDate, checkDate } from "./compare-date";

const dateErrors = { 
    "date1": "Reservation Date must be in the future",
    "date2": "Reservation Date cannot be on a Tuesday",
    "time1": "Reservation Time must be within restaurant hours (10:30 a.m - 9:30 p.m)",
    "time2": "Reservation Time cannot be earlier then now"
}


function compareMain (time, date) {
    let errors = [];
    const dateCheck = compareDate(date);
    const closedCheck = checkDate(date);
    const timeCheckCurrent = compareTime(time);
    const openCloseTimeCheck = checkTime(time); // checks the time open
    // date is past today compare time to open close
    if(closedCheck === true){
        if(dateCheck === true){
            if(openCloseTimeCheck){
                // validate that its available????
                return errors;
            }
            else{
                errors.push(dateErrors.time1)
                return errors;
            }
        }
        // date is today compare time to open close then current time 
        else if ( dateCheck === 0 ) {
            if(openCloseTimeCheck){
                if(timeCheckCurrent){
                    // validate its available
                    return errors;
                }
                else{
                    errors.push(dateErrors.time2);
                    return errors;
                }
            }
            else{
                errors.push(dateErrors.time1);
                if(timeCheckCurrent){
                    return errors;
                }
                else{
                    errors.push(dateErrors.time2);
                    return errors;
                }
            }
        }
        // date is in the past still compare time to open close
        else{
            errors.push(dateErrors.date1);
            if(openCloseTimeCheck) {
                return errors;
            }
            else{
                errors.push(dateErrors.time1);
                return errors;
            }
        }
    }
    // day is tuesday stack more errors if applicable
    else {
        errors.push(dateErrors.date2);
        if(dateCheck === true){
            if(openCloseTimeCheck){
                // validate that its available????
                return errors;
            }
            else{
                errors.push(dateErrors.time1)
                return errors;
            }
        }
        // date is today compare time to open close then current time 
        else if ( dateCheck === 0 ) {
            if(openCloseTimeCheck){
                if(timeCheckCurrent){
                    // validate its available
                    return errors;
                }
                else{
                    errors.push(dateErrors.time2);
                    return errors;
                }
            }
            else{
                errors.push(dateErrors.time1);
                if(timeCheckCurrent){
                    return errors;
                }
                else{
                    errors.push(dateErrors.time2);
                    return errors;
                }
            }
        }
        // date is in the past still compare time to open close
        else{
            errors.push(dateErrors.date1);
            if(openCloseTimeCheck) {
                return errors;
            }
            else{
                errors.push(dateErrors.time1);
                return errors;
            }
        }
    }
}

export default compareMain;