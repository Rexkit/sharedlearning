exports.up = function(knex) {
    return knex.schema.alterTable('pages', function(table) {
        table.string("description").notNullable();
    })
}

exports.down = function(knex) {
    return knex.schema.alterTable('pages', function(table) {
        table.dropColumn('description');
    })
}