exports.up = async (knex) => {
    await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

    return knex.schema.createTable("textcontent", function(table) {
        table.uuid("id").unique().notNullable().primary().defaultTo(knex.raw('uuid_generate_v4()'));
        table.uuid("page_id").references('id').inTable('pages').unique().notNullable().onUpdate('CASCADE').onDelete('CASCADE');
        table.json("data").nullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('textcontent');
};