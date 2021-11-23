
exports.up = function(knex) {
    return knex.schema.createTable("tables", (table) => {
        table.increments("table_id").primary();
        table.string("table_name").notNullable();
        table.integer("reservation_id").references("reservation_id").inTable("reservations");
        table.integer("capacity").notNullable();
        table.timestamps(true, true);
      });
};

exports.down = function(knex) {
    return knex.schema.dropTable("tables");
};