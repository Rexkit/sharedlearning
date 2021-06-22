exports.up = async (knex) => {
    await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

    return knex.schema.createTable("pages", function(table) {
        table.uuid("id").unique().notNullable().primary().defaultTo(knex.raw('uuid_generate_v4()'));
        table.string("name").notNullable();
        table.uuid("user_id").references('id').inTable('users');
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('pages');
};