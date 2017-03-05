'use strict';

exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('photos').del()
        .then(function() {
            return Promise.all([
                // Inserts seed entries
                knex('photos').insert({
                    id: 1,
                    title: 'Spring 2016',
                    description: 'strike a pose',
                    show: 'It\'s An Honor To Be Nominated!',
                    image: 'http://www.northlandchorale.org/images/photos/Spring2016@2x.jpg'
                    // created_at: new Date('2017-02-24 00:07:16 UTC'),
                    // updated_at: new Date('2017-02-24 00:07:16 UTC')
                }),
                knex('photos').insert({
                    id: 2,
                    title: 'Fall 2016',
                    description: 'colorful Chorale',
                    show: 'Dancy Party!',
                    image: 'http://www.northlandchorale.org/images/photos/Fall2016@2x.jpg'
                    // created_at: new Date('2017-02-24 00:07:16 UTC'),
                    // updated_at: new Date('2017-02-24 00:07:16 UTC')
                })
            ]);
        })
        .then(() => {
            return knex.raw("SELECT setval('photos_id_seq', (SELECT MAX(id) FROM photos));");
        });
};
