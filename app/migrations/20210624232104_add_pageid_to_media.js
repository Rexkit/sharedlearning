exports.up = function(knex) {
    return knex.schema.alterTable('media', function(table) {
        table.uuid("page_id").references('id').inTable('pages');
    })
}

exports.down = function(knex) {
    return knex.schema.alterTable('media', function(table) {
        table.dropColumn('page_id');
    })
}