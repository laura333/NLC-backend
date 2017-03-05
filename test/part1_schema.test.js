/* eslint-disable camelcase */

'use strict';

process.env.NODE_ENV = 'test';

const assert = require('chai').assert;
const { suite, test } = require('mocha');
const knex = require('../knex');

suite('Part 1: Schema for photos should be built.', () => {
  before((done) => {
    knex.migrate.latest()
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('The photos table should have 5 columns with data types and parameters that match the required schema.', (done) => {
    knex('photos').columnInfo()
      .then((actual) => {
        const expected = {
          id: {
            type: 'integer',
            maxLength: null,
            nullable: false,
            defaultValue: 'nextval(\'photos_id_seq\'::regclass)'
          },

          title: {
            type: 'character varying',
            maxLength: 255,
            nullable: false,
            defaultValue: null
          },

          description: {
            type: 'character varying',
            maxLength: 255,
            nullable: false,
            defaultValue: null
          },

          show: {
            type: 'character varying',
            maxLength: 255,
            nullable: false,
            defaultValue: null
          },

          image: {
            type: 'character varying',
            maxLength: 255,
            nullable: false,
            defaultValue: null
          }

          // created_at: {
          //   type: 'timestamp with time zone',
          //   maxLength: null,
          //   nullable: false,
          //   defaultValue: 'now()'
          // },

          // updated_at: {
          //   type: 'timestamp with time zone',
          //   maxLength: null,
          //   nullable: false,
          //   defaultValue: 'now()'
          // }
        };

        for (const column in expected) {
          assert.deepEqual(
            actual[column],
            expected[column],
            `Column named - ${column} - is not the same.`
          );
        }

        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
