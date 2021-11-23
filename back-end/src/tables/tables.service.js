const { table } = require("../db/connection");
const knex = require ("../db/connection");
// function that returns all the tables ordered by table_name
function list() {
    return knex("tables")
        .select("*")
        .orderBy("table_name");
}
// function that takes in a data object and creates a new table in the api and returns the new data
function create(data) {
    return knex("tables")
        .insert(data, "*")
        .then((data) => data[0]);
}
// function that takes in a table_id to check if it exists
function checkExisting( id ) {
    return knex("tables")
        .select("table_id")
        .where("table_id", id);
}
// function that takes in an id after validation and returns the data of said ID
function read( id ) {
    if(id !== null){
        return knex("tables")
        .select("*")
        .where("table_id", id)
        .then((data) => data[0]);
    }
    else{
        return knex("tables")
        .select("*")
        .orderBy("table_id");
    }

}
// function that takes in a reservation_id and a table_id and changes the reservation_id of said table_id to the given reservation_id
function seat( resId, tableId ) {
    return knex("tables")
        .update({reservation_id : resId}, null)
        .where("table_id", tableId)
}

function seat2( resId ) {
    return knex("reservations")
        .update({status : "seated"}, "status")
        .where("reservation_id", resId)
        .then((data) => data[0]);
}
// function that takes in a reservation_id to check if it exists
function checkExistingReservation( id ) {
    return knex("reservations")
        .select("*")
        .where("reservation_id", id)
}

function finish( id ) {
    return knex("tables")
        .update({reservation_id : null}, null)
        .where("table_id", id);
}

function finish2( id ) {
    return knex("reservations")
        .update({status: "finished"}, "status")
        .where("reservation_id", id)
        .then((data) => data[0]);
}

function checkStatus( id ) {
    return knex("reservations")
        .select("*")
        .where("reservation_id", id)
        .then((data) => data[0]);
}

module.exports = {
    list,
    create,
    read,
    checkExisting,
    checkExistingReservation,
    seat,
    seat2,
    finish,
    finish2,
    checkStatus,
}