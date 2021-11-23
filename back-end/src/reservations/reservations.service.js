const knex = require ("../db/connection");

function list(date) {
    if(date){
        return knex("reservations")
            .select("*")
            .where({reservation_date : date})
            .whereNot({status:"finished"})
            .whereNot({status: "cancelled"})
            .orderBy("reservation_time");
    }
    else{
    return knex("reservations")
        .select("*")
        .orderBy("reservation_time");
    }
}

function list2( num ) {
    return knex("reservations")
        .select("*")
        .where("mobile_number", "like", `%${num}%`)
        .orderBy("reservation_time")
}

function create(data) {
    return knex("reservations")
        .insert(data, "*")
        .then((data) => data[0]);
}

function checkExisting(id) {
    return knex("reservations")
        .select("reservation_id")
        .where("reservation_id", id);
}

function read(id) {
    if(id !== null){
        return knex("reservations")
        .select("*")
        .where("reservation_id", id)
        .then((data) => data[0])
        .then((data) => {
            data.reservation_date = data.reservation_date.toISOString().slice(0,10)
            return data;
        });
    }
    else{
        return knex("reservations")
        .select("*")
        .orderBy("reservation_time")
        .then((data) => data[0]);
    }
}

function updateStatus (id, data) {
    return knex("reservations")
        .update({status : data}, "status")
        .where("reservation_id", id);
}

function update (id, data) {
    return knex("reservations")
        .update({
            first_name : data.first_name,
            last_name : data.last_name,
            mobile_number : data.mobile_number,
            reservation_date : data.reservation_date,
            reservation_time : data.reservation_time,
            people : data.people,
            status : data.status
        }, "*")
        .where("reservation_id", id)
        .then((data) => data[0]);
}

module.exports = {
    list,
    list2,
    create,
    read,
    checkExisting,
    updateStatus,
    update,
}