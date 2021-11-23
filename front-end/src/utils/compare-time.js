import { formatAsTime } from "./date-time";

// compares the time to rn runs when the date is today
function compareTime(time) {
    // get the current time and compare it to the time
    // from there if the current time is less then the given time return true else return false

    let today = new Date();
    let minutes = today.getMinutes();
    if(minutes < 10) {
        minutes = "0" + minutes.toString();
    }
    let now = formatAsTime(today.getHours() + ":" + minutes);
    
    let diff = timeCheck(time, now);
    if( diff[0] >= 1 ) {
        return true;
    }
    else if ( diff[1] >= 15 ) {
        return true;
    }
    else {
        return false;
    }

}
// if time 1 is greater then time 2 return the difference
function timeCheck(time1, time2){
    let t1 = time1.split(":");
    let t2 = time2.split(":");
    let result = [];
    result.push(parseInt(t1[0]) - parseInt(t2[0]));
    result.push(parseInt(t1[1]) - parseInt(t2[1]));
    return result;
}
// checks to see if the time is with 10:30 and 21:30 (9:30 p.m)
function checkTime(time) {
    let open = [10, 30];
    let close = [21, 30];
    time = time.split(":");
    time[0] = parseInt(time[0]);
    time[1] = parseInt(time[1]);
    if ( time[0] < open[0] ) {
        return false;
    }
    else if ( time[0] === open[0] ) {
        if(time[1] < open[1]) {
            return false;
        }
        else{
            return true;
        }
    }
    else {
        if ( time[0] <= close[0]) {
            if( time[0] === close[0] ) {
                if(time[1] <= close[1]){
                    return true;
                }
                else{
                    return false;
                }
            }
            else{
                return true;
            }
        }
        else{
            return false;
        }
    }
}


export  {compareTime, checkTime};