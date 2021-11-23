const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("../reservations/reservations.service");
/**
 * List handler for reservation resources
 */
function update( req, res ) {
  service 
    .update( res.locals.id, res.locals.data )
    .then((data) => res.json({data}));
}

function list(req, res) {
  if(req.query.date){
    service
      .list(req.query.date)
      .then((data) => res.json({data}));
  }
  else if ( req.query.mobile_number) {
    service
      .list2(req.query.mobile_number)
      .then((data) => res.json({data}));
  }
  else{
    service
      .list()
      .then((data) => res.json({data}));
  }

}

function create (req, res) {
  service
    .create(res.locals.data)
    .then((data) => res.status(201).json({data}));
}

function hasBody ( req, res, next ) {
  if(req.body.data){
    res.locals.data = req.body.data;
    return next()
  }
  else{
    return next({
      status: 400,
      message: "No Body"
    })
  }
}

function statusCheck( req, res, next ) {
  const data = res.locals.data.status;
  if( data === undefined ) {
    return next({
      status : 400,
      message : "status is missing"
    })
  }
  else if ( data === "seated" ) {
    return next({
      status: 400,
      message: "status cannont be seated when created"
    })
  }
  else if ( data === "finished" ) {
    return next({
      status: 400,
      message: "status cannot be finished when created"
    })
  }
  else{
    return next();
  }
}

function firstNameCheck ( req, res, next ) {
  const data = res.locals.data.first_name;
  if(data === undefined){
    return next({
      status : 400,
      message : `first_name missing ${data}`
    });
  }
  else if(data.length === 0){
    return next({
      status : 400,
      message : `first_name empty ${data}`
    });
  }
  else{
    return next();
  }
}

function lastNameCheck ( req, res, next ) {
  const data = res.locals.data.last_name;
  if(data === undefined){
    return next({
      status : 400,
      message : "last_name missing"
    });
  }
  else if ( data.length === 0){
    return next({
      status : 400,
      message : "last_name empty"
    });
  }
  else{
    return next();
  }y
  
}

function mobileNumberCheck ( req, res, next ) {
  const data = res.locals.data.mobile_number;
  if(data === undefined){
    return next({
      status : 400,
      message : "mobile_number missing"
    });
  }
  else if ( data.length === 0) {
    return next({
      status : 400,
      message : "mobile_number empty"
    });
  }
  else{
    return next();
  }
}

function reservationDateCheck ( req, res, next ) {
  const data = res.locals.data.reservation_date;
  let date = /\d\d\d\d-\d\d-\d\d/i;
  if(data === undefined){
    return next({
      status : 400,
      message : "reservation_date missing"
    });
  }
  else if ( data.length === 0 ) {
    return next({
      status : 400,
      message : "reservation_date empty"
    });
  }
  else if (!data.match(date)) {
    return next({
      status : 400,
      message : "reservation_date is not a date"
    });
  }
  else{
    return next();
  }
}

function reservationTimeCheck ( req, res, next ) {
  const data = res.locals.data.reservation_time;
  let time = /\d\d:\d\d/i;
  if(data === undefined){
    return next({
      status : 400,
      message : "reservation_time missing"
    });
  }
  else if ( data.length === 0 ) {
    return next({
      status : 400,
      message : "reservation_time empty"
    });
  }
  else if (!data.match(time)){
    return next({
      status : 400,
      message : "reservation_time is not a time"
    });
  }
  else{
    return next();
  }
}

function peopleCheck ( req, res, next ) {
  const data = res.locals.data.people;
  if(data === undefined){
    return next({
      status : 400,
      message : "people missing"
    });
  }
  else if (!Number.isInteger(data)){
    return next({
      status : 400,
      message : "people is not a number"
    })
  }
  else if (parseInt(data) === 0 ) {
    return next({
      status : 400,
      message : "people is 0"
    })
  }
  else{
      return next();
  }
}

function read ( req, res ) {
  const id = res.locals.id;
  if(id !== null){
    service.read(id)
    .then((data) => res.json({"data": data }));
  }
  else{
    service.read()
    .then((data) => res.json({data}));
  }
}

function idExists ( req, res, next ) {
  const {reservation_id} = req.params;
  if(reservation_id){
    service.checkExisting(reservation_id)
    .then(data => {
      if(data.length === 0){
        return next({
          status : 404,
          message : `id: ${reservation_id} does not exist`
        })
      }
      else{
        res.locals.id = reservation_id;
        return next();
      }
    })
  }
  else{
    res.locals.id = null;
    return next();
  }
}

//check to see if the date is a tuesday
function tuesdayCheck ( req, res, next ) {
  let date = res.locals.data.reservation_date;
  const ans = checkDate(date);
  if(ans === true){
    return next();
  }
  else {
    return next({
      status : 400,
      message : "reservation_date cannot be on a tuesday because we are closed"
    });
  }
}

function todayCheck ( req, res, next ) {
  let date = res.locals.data.reservation_date;
  let time = res.locals.data.reservation_time;
  const ans = compareDate(date);
  if ( ans === true ) {
    return next();
  }
  else if ( ans === 0 ) {
    const ans2 = compareTime(time);
    if ( ans2 === true ) {
      return next();
    }
    else{
      return next({
        status : 400, 
        message : "reservation_time cannot be earlier today"
      })
    }
  }
  else{
    return next ({
      status : 400,
      message : "reservation_date must be in the future"
    })
  }
}

function hoursCheck ( req, res, next ) {
  let time = res.locals.data.reservation_time;
  const ans = checkTime(time);
  if ( ans === true ) {
    return next();
  }
  else {
    return next({
      status : 400,
      message : "reservation_time cannot be earlier then 10:30 a.m or later then 9:30 p.m"
    })
  }
}

function updateStatus ( req, res ) {
  service.updateStatus(res.locals.id, res.locals.data.status)
    .then((data) => {
      service.read(res.locals.id)
        .then((data) => res.json({data}))
    })
}

function checkStatus ( req, res, next ) {
  const givenStatus = res.locals.data.status;
  if( givenStatus === "seated" || givenStatus === "finished" || givenStatus === "booked" || givenStatus === "cancelled"){
    return next();
  }
  else{
    return next({
      status: 400,
      message:"unknown status given"
    })
  }
}

function currentStatusCheck ( req, res, next ) {
  service.read(res.locals.id)
    .then((data) => {
      if( data.status === "finished"){
        return next({
          status : 400,
          message: "table already finished cannot be updated"
        })
      }
      else{
        res.locals.currentStatus = data.status;
        return next();
      }
    })
}

// past this line is the utils
// past this line is the utils
// past this line is the utils
// past this line is the utils
// past this line is the utils
// past this line is the utils
// past this line is the utils
// past this line is the utils
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

  function compareTime(time) {
    // get the current time and compare it to the time
    // from there if the current time is less then the given time return true else return false

    let today = new Date();
    let now = formatAsTime(today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds());
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
const dateFormat = /\d\d\d\d-\d\d-\d\d/;
const timeFormat = /\d\d:\d\d/;

/**
 * Formats a Date object as YYYY-MM-DD.
 *
 * This function is *not* exported because the UI should generally avoid working directly with Date instance.
 * You may export this function if you need it.
 *
 * @param date
 *  an instance of a date object
 * @returns {string}
 *  the specified Date formatted as YYYY-MM-DD
 */
function asDateString(date) {
  return `${date.getFullYear().toString(10)}-${(date.getMonth() + 1)
    .toString(10)
    .padStart(2, "0")}-${date.getDate().toString(10).padStart(2, "0")}`;
}

/**
 * Format a date string in ISO-8601 format (which is what is returned from PostgreSQL) as YYYY-MM-DD.
 * @param dateString
 *  ISO-8601 date string
 * @returns {*}
 *  the specified date string formatted as YYYY-MM-DD
 */
function formatAsDate(dateString) {
  return dateString.match(dateFormat)[0];
}

/**
 * Format a time string in HH:MM:SS format (which is what is returned from PostgreSQL) as HH:MM.
 * @param timeString
 *  HH:MM:SS time string
 * @returns {*}
 *  the specified time string formatted as YHH:MM.
 */
function formatAsTime(timeString) {
  return timeString.match(timeFormat)[0];
}

/**
 * Today's date as YYYY-MM-DD.
 * @returns {*}
 *  the today's date formatted as YYYY-MM-DD
 */
function today() {
  return asDateString(new Date());
}

/**
 * Subtracts one day to the specified date and return it in as YYYY-MM-DD.
 * @param currentDate
 *  a date string in YYYY-MM-DD format (this is also ISO-8601 format)
 * @returns {*}
 *  the date one day prior to currentDate, formatted as YYYY-MM-DD
 */
function previous(currentDate) {
  let [ year, month, day ] = currentDate.split("-");
  month -= 1;
  const date = new Date(year, month, day);
  date.setMonth(date.getMonth());
  date.setDate(date.getDate() - 1);
  return asDateString(date);
}

/**
 * Adds one day to the specified date and return it in as YYYY-MM-DD.
 * @param currentDate
 *  a date string in YYYY-MM-DD format (this is also ISO-8601 format)
 * @returns {*}
 *  the date one day after currentDate, formatted as YYYY-MM-DD
 */
function next(currentDate) {
  let [ year, month, day ] = currentDate.split("-");
  month -= 1;
  const date = new Date(year, month, day);
  date.setMonth(date.getMonth());
  date.setDate(date.getDate() + 1);
  return asDateString(date);
}



module.exports = {
  read: [ asyncErrorBoundary(idExists),asyncErrorBoundary(read)],
  list: [ asyncErrorBoundary(list)],
  create:[ hasBody, firstNameCheck, lastNameCheck, mobileNumberCheck,
    reservationDateCheck, reservationTimeCheck, peopleCheck, hoursCheck, tuesdayCheck, todayCheck, statusCheck, asyncErrorBoundary(create)],
  updateStatus:[hasBody, asyncErrorBoundary(idExists), asyncErrorBoundary(currentStatusCheck),checkStatus,
     asyncErrorBoundary(updateStatus)],
  update: [ asyncErrorBoundary(idExists), hasBody, firstNameCheck, lastNameCheck, mobileNumberCheck,
    reservationDateCheck, reservationTimeCheck, peopleCheck, hoursCheck, tuesdayCheck, todayCheck, statusCheck, asyncErrorBoundary(update)]
};
