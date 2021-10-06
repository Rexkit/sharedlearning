exports.up = function(knex) {
    return knex.schema.alterTable('media', function(table) {
        table.uuid("page_id").references('id').inTable('pages').onUpdate('CASCADE').onDelete('CASCADE');
    })
}

exports.down = function(knex) {
    return knex.schema.alterTable('media', function(table) {
        table.dropColumn('page_id');
    })
}