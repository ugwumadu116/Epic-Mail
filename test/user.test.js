import chai from 'chai';
import chaiHTTP from 'chai-http';
import app from '../api/index';

const { assert, expect, use } = chai;

use(chaiHTTP);

const API_PREFIX = '/api/v1';
before(async () => {
  await chai
    .request(app)
    .post(`${API_PREFIX}/auth/signup`)
    .send({
      firstName: 'joel',
      lastName: 'ugwumadu2',
      email: 'roger@test.com',
      password: 'password',
    });
  await chai
    .request(app)
    .post(`${API_PREFIX}/auth/signup`)
    .send({
      firstName: 'test',
      lastName: 'test',
      email: 'roger2@test.com',
      password: 'password2',
    });
  await chai
    .request(app)
    .post(`${API_PREFIX}/auth/login`)
    .send({
      epicMail: 'joelugwumadu2@epicmail.com',
      password: 'password',
    });
  await chai
    .request(app)
    .post(`${API_PREFIX}/auth/login`)
    .send({
      epicMail: 'testtest@epicmail.com',
      password: 'password2',
    });
});

describe('User Root api', () => {
  it('GET / - User get response when navigate to root', (done) => {
    chai
      .request(app)
      .get('/')
      .end((res) => {
        expect(res).to.eq(null);
        done();
      });
  });
});

describe('User Auth Signup Endpoint Tests', () => {
  it('POST /auth/signup - User SignUp Validation Test(Required)', (done) => {
    chai
      .request(app)
      .post(`${API_PREFIX}/auth/signup`)
      .send({
        firstName: 'Roger',
        lastName: 'Test',
        email: 'roger@test.com',
      })
      .then((res) => {
        expect(res).to.have.status(400);
        assert.equal(res.body.status, 'error');
        assert.equal(res.body.type, 'validation');
      });
    done();
  });
  it('POST /auth/signup - User SignUp Validation Test(Email)', (done) => {
    chai
      .request(app)
      .post(`${API_PREFIX}/auth/signup`)
      .send({
        firstName: 'Roger',
        lastName: 'Test',
        email: 'rogetest.com',
        password: 'password',
      })
      .then((res) => {
        expect(res).to.have.status(400);
        assert.equal(res.body.status, 'error');
        assert.equal(res.body.type, 'validation');
      });
    done();
  });
  it("POST /auth/signup - User Can't signup again with the same email", (done) => {
    chai
      .request(app)
      .post(`${API_PREFIX}/auth/signup`)
      .send({
        firstName: 'test',
        lastName: 'test',
        email: 'roger2@test.com',
        password: 'password2',
      })
      .then((res) => {
        expect(res).to.have.status(500);
        assert.equal(res.body.status, 'error');
        expect(res.body.message).to.equal('first name and last name already exits');
      });
    done();
  });
});

describe('User Auth Login Endpoint Tests', () => {
  it('POST /auth/login - User Login Validation Test(Required)', (done) => {
    chai
      .request(app)
      .post(`${API_PREFIX}/auth/login`)
      .send({
        epicMail: 'roger@test.com',
      })
      .then((res) => {
        expect(res).to.have.status(400);
        assert.equal(res.body.status, 'error');
        assert.equal(res.body.type, 'validation');
      });
    done();
  });
  it('POST /auth/login - User Login Validation Test(Email)', (done) => {
    chai
      .request(app)
      .post(`${API_PREFIX}/auth/login`)
      .send({
        epicMail: 'roger',
        password: 'password',
      })
      .then((res) => {
        expect(res).to.have.status(400);
        assert.equal(res.body.status, 'error');
        assert.equal(res.body.type, 'validation');
      });
    done();
  });
  it('POST /auth/login - User Cannot Login without being registered', (done) => {
    chai
      .request(app)
      .post(`${API_PREFIX}/auth/login`)
      .send({
        epicMail: 'thesis@science.com',
        password: 'password',
      })
      .then((res) => {
        expect(res).to.have.status(409);
        assert.equal(res.body.status, 'error');
      });
    done();
  });
  it("POST /auth/login - User Can't login with incorrect password", (done) => {
    chai
      .request(app)
      .post(`${API_PREFIX}/auth/login`)
      .send({
        email: 'joelugwumadu2@epicmail.com',
        password: 'password111',
      })
      .then((res) => {
        assert.equal(res.body.status, 'error');
      });
    done();
  });
});
