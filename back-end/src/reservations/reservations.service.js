const knex = require ("../db/connection");

function list() {
    return knex("reservations")
        .select("*");
}

function create(data) {
    return knex("reservations")
        .insert(data, "reservation_date");
}

module.exports = {
    list,
    create,
}