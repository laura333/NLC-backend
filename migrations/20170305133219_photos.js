'use strict';

exports.up = function(knex, Promise) {
    return knex.schema.createTable('photos', function(table) {
        table.increments();
        table.string('title').notNullable();
        table.string('description');
        table.string('show');
        table.string('image').notNullable();
        // table.timestamps(true, true);
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('photos');
};
