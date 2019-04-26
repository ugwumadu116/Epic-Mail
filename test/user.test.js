import chai from 'chai';
import chaiHTTP from 'chai-http';
import app from '../server/index';

const { assert, expect, use } = chai;

use(chaiHTTP);

const API_PREFIX = '/api/v1';
before(async () => {
  await chai
    .request(app)
    .post(`${API_PREFIX}/auth/signup`)
    .send({
      firstName: 'joel',
      lastName: 'ugwumadu',
      epicMail: 'ugwumadu',
      phone: '07064586146',
      password: 'password',
    });
  await chai
    .request(app)
    .post(`${API_PREFIX}/auth/signup`)
    .send({
      firstName: 'test',
      lastName: 'test',
      epicMail: 'testing',
      phone: '07064586146',
      password: 'password',
    });
  await chai
    .request(app)
    .post(`${API_PREFIX}/auth/login`)
    .send({
      epicMail: 'ugwumadu@epicmail.com',
      password: 'password',
    });
  await chai
    .request(app)
    .post(`${API_PREFIX}/auth/login`)
    .send({
      epicMail: 'testing@epicmail.com',
      password: 'password',
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
        firstName: 'test',
        lastName: 'test',
        epicMail: '',
        phone: '07064586146',
        password: 'password',
      })
      .then((res) => {
        expect(res).to.have.status(400);
        assert.equal(res.body.status, 400);
        assert.equal(res.body.message.epicMail, 'Epic mail must be alphabets and at least 6 characters long');
      });
    done();
  });
  it('POST /auth/signup - User SignUp Validation Test(Email)', (done) => {
    chai
      .request(app)
      .post(`${API_PREFIX}/auth/signup`)
      .send({
        firstName: 'test',
        lastName: 'test',
        epicMail: 'testing',
        phone: '07063586146',
        password: 'password',
      })
      .then((res) => {
        expect(res).to.have.status(409);
        assert.equal(res.body.status, 409);
        assert.equal(res.body.message, 'email already exists');
      });
    done();
  });
  it("POST /auth/signup - User can't signup with an already registered phone number", (done) => {
    chai
      .request(app)
      .post(`${API_PREFIX}/auth/signup`)
      .send({
        firstName: 'test',
        lastName: 'test',
        epicMail: 'testinguu',
        phone: '07064586146',
        password: 'password',
      })
      .then((res) => {
        expect(res).to.have.status(409);
        assert.equal(res.body.status, 409);
        assert.equal(res.body.message, 'phone number already exist');
      });
    done();
  });
  it('POST /auth/login - User Login Validation Test(Required)', (done) => {
    chai
      .request(app)
      .post(`${API_PREFIX}/auth/login`)
      .send({
        epicMail: 'testing@epicmail.com',
        password: 'passwordn',
      })
      .then((res) => {
        expect(res).to.have.status(404);
        assert.equal(res.body.status, 404);
        assert.equal(res.body.message, 'invalid password or email');
      });
    done();
  });
  it('POST /auth/login - User Login Validation Test(Email)', (done) => {
    chai
      .request(app)
      .post(`${API_PREFIX}/auth/login`)
      .send({
        epicMail: '@roger',
        password: 'password',
      })
      .then((res) => {
        expect(res).to.have.status(404);
        assert.equal(res.body.status, 404);
        assert.equal(res.body.message, 'invalid password or email');
      });
    done();
  });
});
// describe('User Auth Login Endpoint Tests', () => {
//   it('POST /auth/login - User Login Validation Test(Required)', (done) => {
//     chai
//       .request(app)
//       .post(`${API_PREFIX}/auth/login`)
//       .send({
//         epicMail: 'testing@epicmail.com',
//         password: 'passwordn',
//       })
//       .then((res) => {
//         expect(res).to.have.status(404);
//         assert.equal(res.body.status, 404);
//         assert.equal(res.body.message, 'invalid password or username');
//       });
//     done();
//   });
//   // it('POST /auth/login - User Login Validation Test(Email)', (done) => {
//   //   chai
//   //     .request(app)
//   //     .post(`${API_PREFIX}/auth/login`)
//   //     .send({
//   //       epicMail: '@roger',
//   //       password: 'password',
//   //     })
//   //     .then((res) => {
//   //       expect(res).to.have.status(400);
//   //       assert.equal(res.body.type, 'validation');
//   //     });
//   //   done();
//   // });
//   // it('POST /auth/login - User Cannot Login without being registered', (done) => {
//   //   chai
//   //     .request(app)
//   //     .post(`${API_PREFIX}/auth/login`)
//   //     .send({
//   //       epicMail: 'thesis@science.com',
//   //       password: 'password',
//   //     })
//   //     .then((res) => {
//   //       expect(res).to.have.status(400);
//   //       assert.equal(res.body.status, 400);
//   //     });
//   //   done();
//   // });
//   // it("POST /auth/login - User Can't login with incorrect password", (done) => {
//   //   chai
//   //     .request(app)
//   //     .post(`${API_PREFIX}/auth/login`)
//   //     .send({
//   //       email: 'joel@epicmail.com',
//   //       password: 'password111',
//   //     })
//   //     .then((res) => {
//   //       assert.equal(res.body.status, 400);
//   //     });
//   //   done();
//   // });
// });
