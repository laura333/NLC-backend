'use strict';

process.env.NODE_ENV = 'test';


const { suite, test } = require('mocha');
const request = require('supertest');
const knex = require('../knex');
const server = require('../server');

suite('Part 3: CRUD routes for photos resource should be created.', () => {

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

  test('GET /photos should return the id,title, description, show and image of all photos.', (done) => {
    /* eslint-disable max-len */
    request(server)
      .get('/photos')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, [{
          id:1,
          title:'Spring 2016',
          description:'strike a pose',
          show:'It\'s An Honor To Be Nominated!',
          image:'http://www.northlandchorale.org/images/photos/Spring2016@2x.jpg'
        },{
          id:2,
          title:'Fall 2016',
          description:'Colorful Chorale',
          show:'Dancy Party!',
          image:'http://www.northlandchorale.org/images/photos/Fall2016@2x.jpg'
        }], done);

      /* eslint-enable max-len */
  });

  test('GET /photos/:id should return the id,title, description, show and image of a single ad.', (done) => {
    /* eslint-disable max-len */
    request(server)
      .get('/photos/1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, {
          id:1,
          title:'Spring 2016',
          description:'strike a pose',
          show:'It\'s An Honor To Be Nominated!',
          image:'http://www.northlandchorale.org/images/photos/Spring2016@2x.jpg'
      }, done);

      /* eslint-enable max-len */
  });

  test('POST /photos should create a new photo and return the id, title, description, show and image that were created.', (done) => {
  /* eslint-disable max-len */
  request(server)
    .post('/photos')
    .set('Accept', 'application/json')
    .send({
          title:'Fall 2016-2',
          description:'Uptown Funk',
          show:'Dancy Party!',
          image:'http://www.northlandchorale.org/images/photos/Fall2016_2-2@2x.jpg'
    })
    .expect('Content-Type', /json/)
    .expect((res) => {
      delete res.body.createdAt;
      delete res.body.updatedAt;
    })
    .expect(200, {
          id: 3,
          title:'Fall 2016-2',
          description:'Uptown Funk',
          show:'Dancy Party!',
          image:'http://www.northlandchorale.org/images/photos/Fall2016_2-2@2x.jpg'
    }, done);

    /* eslint-enable max-len */
  });

  test('PATCH /photos/:id should update a photo and return the id, title, description, show and image that were updated.', (done) => {
  /* eslint-disable max-len */
  request(server)
    .patch('/photos/1')
    .set('Accept', 'application/json')
    .send({
          id:1,
          title:'Spring 2016',
          description:'act 2 fancy attire',
          show:'It\'s An Honor To Be Nominated!',
          image:'http://www.northlandchorale.org/images/photos/Spring2016_2@2x.jpg'
      })
    .expect('Content-Type', /json/)
    .expect((res) => {
      delete res.body.createdAt;
      delete res.body.updatedAt;
    })
    .expect(200, {
          id:1,
          title:'NES Classic',
          description:'act 2 fancy attire',
          show:'It\'s An Honor To Be Nominated!',
          image:'http://www.northlandchorale.org/images/photos/Spring2016_2@2x.jpg'
      }, done);

    /* eslint-enable max-len */
  });

  test('DELETE /photos/:id should delete a photo and return the id, title, description, show, and image that were deleted.', (done) => {
    /* eslint-disable max-len */
    request(server)
      .del('/photos/2')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect((res) => {
        delete res.body.createdAt;
        delete res.body.updatedAt;
      })
      .expect(200, {
          id:2,
          title:'Fall 2016',
          description:'colorful Chorale',
          show:'Dancy Party!',
          image:'http://www.northlandchorale.org/images/photos/Fall2016@2x.jpg'
        }, done);

      /* eslint-enable max-len */
  });

});
