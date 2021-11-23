// const e = require("express");
// const P = require("pino");
// const { count } = require("../db/connection");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./tables.service");
//function that returns all tables sorted by table_name
function list(req, res) {

  service
    .list()
    .orderBy("table_name")
    .then((data) => res.json({data}));

}
// after validation this function sends a request to the api to create a new table with said values
function create (req, res) {
  service
    .create(res.locals.data)
    .then((data) => res.status(201).json({data}));
}
//after validation this function sends a request to the api to change the reservation_id of the table to given reservation_id
function seat ( req, res ) {
  service.seat(res.locals.data.reservation_id, res.locals.id)
  .then((d) => {
    service.seat2(res.locals.data.reservation_id)
      .then((data) => res.json({data}))
  });
}
//takes the people count from locals and compares it to the capacity of the table given
function seatCapCheck ( req, res, next ) {
  const {id} = res.locals;
  service.read(id)
    .then((data) => {
      if( data.reservation_id ) {
        return next({
          status: 400,
          message: "Table is occupied"
        })
      }
      else{
        if(data.capacity >= res.locals.people){
            return next();   
        }
        else {
          return next({
            status : 400,
            message : `Table : ${id} is lacking the capacity for that reservation`
          })
        }
      }
    })
    .catch((err) => console.log(err))
}
// takes the reservation id from the body and makes sure it exists and stores the people count in locals
function resIdCheck ( req, res, next ) {
  const data = res.locals.data.reservation_id;
  if( data === undefined ) {
    return next({
      status : 400,
      message : "reservation_id is missing"
    })
  }
  else {
    service.checkExistingReservation(data)
      .then((resp) => {
        if( resp.length === 0 ) {
          return next({
            status : 404,
            message : `reservation_id: ${data} does not exist`
          })
        }
        else{
          res.locals.people = resp[0].people;
          return next();
        }
      })
  }
}
// checks to see if a body was given 
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
//checks to seee if  the table_name was in the body
function tableNameCheck ( req, res, next ) {
  const data = res.locals.data.table_name;
  if(data === undefined){
    return next({
      status : 400,
      message : `table_name missing ${data}`
    });
  }
  else if(data.length === 0){
    return next({
      status : 400,
      message : `table_name empty ${data}`
    });
  }
  else if ( data.length === 1) {
    return next({
      status : 400,
      message : "table_name cannot be one character"
    })
  }
  else{
    return next();
  }
}
//checks to see if the capacity was in the body
function capacityCheck ( req, res, next ) {
  const data = res.locals.data.capacity;
  if(data === undefined){
    return next({
      status : 400,
      message : "capacity missing"
    });
  }
  else if (!Number.isInteger(data)){
    return next({
      status : 400,
      message : "capacity is not a number"
    })
  }
  else if (parseInt(data) === 0 ) {
    return next({
      status : 400,
      message : "capacity is 0"
    })
  }
  else{
      return next();
  }
}
// after all of the validation of the data this function sneds the request to the api
function read ( req, res ) {
  const id = res.locals.id;
  if(id !== null){
    service.read(id)
    .then((data) => res.json({data}));
  }
  else{
    service.read()
    .then((data) => res.json({data}));
  }
}
// checks to see if the id given in the params exists
function idExists ( req, res, next ) {
  const table_id = req.params.table_id;
  if(table_id){
    service.checkExisting(table_id)
    .then(data => {
      if(data.length === 0){
        return next({
          status : 404,
          message : `id: ${table_id} does not exist`
        })
      }
      else{
        res.locals.id = table_id;
        return next();
      }
    })
  }
  else{
    return next({
      status : 500,
      message : "ID was not given"
    });
  }
}

function finish ( req, res ) {
  service.finish(res.locals.id)
    .then(() => {
      service.finish2(res.locals.resId)
        .then((data) => res.json({data}));
    });
}

function occupyCheck ( req, res, next ) {
  const {id} = res.locals;
  service.read(id)
    .then((data) => {
      if( !data.reservation_id ) {
        return next({
          status : 400,
          message : `Table : ${id} is not occupied`
        })
      }
      else{
        res.locals.resId = data.reservation_id;
        res.locals.id = id;
        return next();
      }
    })
}

function alreadySitted ( req, res, next ) {
  service.checkStatus(res.locals.data.reservation_id)
    .then((data) => {
      if(data.status === "seated") {
        return next({
          status : 400,
          message : "reservation is already seated"
        })
      }
      else{
        return next();
      }
    })
}

module.exports = {
  read: [ asyncErrorBoundary(idExists),asyncErrorBoundary(read)],
  list: [ asyncErrorBoundary(list)],
  create:[ hasBody, tableNameCheck, capacityCheck, asyncErrorBoundary(create)],
  seat:[ hasBody, asyncErrorBoundary(idExists), asyncErrorBoundary(resIdCheck), asyncErrorBoundary(seatCapCheck),
     asyncErrorBoundary(alreadySitted), asyncErrorBoundary(seat)],
  finish:[ asyncErrorBoundary(idExists), asyncErrorBoundary(occupyCheck), asyncErrorBoundary(finish)]
};
// the problem is in the seat function