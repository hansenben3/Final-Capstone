import { today } from "./date-time";

// function that takes date1 and date2 and compares the 2
// if date1 is before date2 return false else return true
function compareDate(date) {
let arr1 = date.split("-");
let arr2 = today().split("-");
let year1 = parseInt(arr1[0]);
let year2 = parseInt(arr2[0]);
let month1 = parseInt(arr1[1]);
let month2 = parseInt(arr2[1]);
let day1 = parseInt(arr1[2]);
let day2 = parseInt(arr2[2]);
// if year given is in the past return false
if(year1 < year2){
    return false;
}
// if year given is larger then current return true
else if (year1 > year2){
    return true;
}
// if year given is the same as current continue
else{
    // if month given is in the past return false
    if(month1 < month2){
        return false;
    }
    // if month given is larger return true;
    else if (month1 > month2){
        return true;
    }
    //if month given is the same as current continue
    else{
        // if day given is in the past return false
        if(day1 < day2) {
            return false;
        }
        // if the day given is greater then the current day return true
        else if ( day1 > day2){
            return true;
        }
        // if the day given is the same return 0
        else{
            return 0;
        }
    }
}
}
//checks to see if the give date is a tuesday if so throw false 
function checkDate(date) {
    date = date.split("-");
    const d = ( new Date(date[0],date[1]-1, date[2]));
    if ( d.getDay() === 2 ) {
        return false;
    }
    else{
        return true;
    }
    // check if date is tuesday
    // if date is tuesday return false else return true;
}

export { compareDate, checkDate };