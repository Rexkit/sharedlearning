exports.up = async (knex) => {
    await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

    return knex.schema.createTable("users", function(table) {
        table.uuid("id").unique().notNullable().primary().defaultTo(knex.raw('uuid_generate_v4()'));
        table.string("username").notNullable();
        table.string("email").notNullable().unique();
        table.string("password").notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('users');
};