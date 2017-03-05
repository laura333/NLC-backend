/* eslint-disable camelcase */

'use strict';

process.env.NODE_ENV = 'test';

const assert = require('chai').assert;
const { suite, test } = require('mocha');
const knex = require('../knex');

suite('Part 2: Seed data for photos should be created.', () => {
  before((done) => {
    knex.migrate.latest()
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  beforeEach((done) => {
    knex.seed.run()
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('photos table: seed data should match test data.', (done) => {
    knex('photos').orderBy('id', 'ASC')
      .then((actual) => {
        /* eslint-disable max-len */
        const expected = [{
          id:1,
          title:'Spring 2016',
          description:'strike a pose',
          show:'It\'s An Honor To Be Nominated!',
          image:'http://www.northlandchorale.org/images/photos/Spring2016@2x.jpg',
          // created_at: new Date('2017-02-24 00:07:16 UTC'),
          // updated_at: new Date('2017-02-24 00:07:16 UTC')
        },{
          id:2,
          title:'Fall 2016',
          description:'colorful Chorale',
          show:'Dancy Party!',
          image:'http://www.northlandchorale.org/images/photos/Fall2016@2x.jpg',
          // created_at: new Date('2017-02-24 00:07:16 UTC'),
          // updated_at: new Date('2017-02-24 00:07:16 UTC')
        }];

        /* eslint-enable max-len */

        for (let i = 0; i < expected.length; i++) {
          assert.deepEqual(
            actual[i],
            expected[i],
            `Row where id=${i + 1} does not match.`
          );
        }

        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
