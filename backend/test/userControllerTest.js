const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server'); // Sesuaikan path ke file server Anda
const should = chai.should();

chai.use(chaiHttp);

describe('Users', () => {
  describe('/GET users', () => {
    it('it should GET all the users', (done) => {
      chai.request(server)
          .get('/api/users') // Sesuaikan dengan route yang tepat
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            done();
          });
    });
  });
});
