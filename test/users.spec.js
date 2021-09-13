const { expect } = require('chai');
const sinon = require('sinon');
const request = require('supertest');
const models = require('../database');
const { makeServer } = require('../server');

// Test Suite
describe('API users test', () => {
  const objetoFalso = 
    {
      "userName" : "edillon",
      "fullName" : "Enrique Dillon",
      "email" : "edillon@gmail.com",
      "phone" : 0,
      "address" : "gob paz 216"
    };

  beforeEach(() => {
    const ModeloFalso = {
      findAll() {
        return Promise.resolve(objetoFalso);
      },
      create(){
        return Promise.resolve(objetoFalso);
      }
    };
    sinon.stub(models, 'getModel').returns(ModeloFalso);
  });
  // Tests
  it('El nuevo usuario cargo correctamente sus datos', (done) => {
    const server = makeServer();
    request(server)
      .post('/users')
      .send(objetoFalso)
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err, res) => {
        if (err) {
          throw err;
        } else {
          expect(res.body).to.have.all.keys(['userName', 'fullName', 'address', 'phone', 'email']);
          done();
        }
      });
  });
});
