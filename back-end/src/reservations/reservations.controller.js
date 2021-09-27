const e = require("express");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("../reservations/reservations.service");
/**
 * List handler for reservation resources
 */
async function list(req, res) {
  service
    .list()
    .then((data) => res.json({data}));
}

function create (req, res) {
  service
    .create(req.body)
    .then((data) => res.json({data}));
}

function hasBody ( req, res, next ) {
  if(req.body){
    next()
  }
  else{
    next({
      status: 400,
      message: "No Body",
    })
  }
}

module.exports = {
  list:asyncErrorBoundary(list),
  create:[hasBody, asyncErrorBoundary(create)],
};
