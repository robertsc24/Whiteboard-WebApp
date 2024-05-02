import chai from 'chai';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server'); 
const should = chai.should();

chai.use(chaiHttp);

describe('Users', () => {
    beforeEach((done) => { 
        User.remove({}, (err) => { 
           done();           
        });        
    });

    // Test the /POST route
    describe('/POST user', () => {
        it('it should POST a user', (done) => {
          let user = {
              name: 'John Doe',
              password: 'password123'
          }
          chai.request(server)
              .post('/auth/register')
              .send(user)
              .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('User successfully added!');
                done();
              });
        });
    });
});
