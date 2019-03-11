import chai from 'chai';
import chaiHTTP from 'chai-http';
import jwt from 'jsonwebtoken';
import app from '../api/index';

const { assert, expect, use } = chai;

use(chaiHTTP);

const API_PREFIX = '/api/v1';

const safeUser = {
  epicMail: 'joelugwumadu2@epicmail.com',
};
const jwtToken = jwt.sign({ user: safeUser }, 'secret', {
  expiresIn: 86400,
});
const fakeUser = {
  epicMail: 'testtest@epicmail.com',
};
const fakejwtToken = jwt.sign({ user: fakeUser }, 'secret', {
  expiresIn: 86400,
});

beforeEach(async () => {
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

describe('User Messages Endpoint Tests', () => {
  it('GET /messages - User Get all received emails', async (done) => {
    await chai
      .request(app)
      .get(`${API_PREFIX}/messages`)
      .set('x-auth-token', jwtToken)
      .then((res) => {
        // expect(res).to.have.status(200);
        // console.log('res.bodyyyyyyyy:', res.body)
        expect(res.body.status).to.eq(200);
        expect(res.body.message).to.not.equal(0);
      })
      .then(done, done);
  });
  it('GET /messages/ - User has no recieved emails', (done) => {
    chai
      .request(app)
      .get(`${API_PREFIX}/messages`)
      .set('x-auth-token', fakejwtToken)
      .then((res) => {
        expect(res).to.have.status(404);
        expect(res.body.status).to.eq(404);
        expect(res.body.message).to.equal('No mail found');
      });
    done();
  });
  it('GET /messages - User Fail token Validation Test(Required)', (done) => {
    chai
      .request(app)
      .get(`${API_PREFIX}/messages`)
      .set('x-auth-token', 'jwtToken')
      .then((res) => {
        expect(res).to.have.status(400);
      });
    done();
  });
  it('GET /messages/unread - User Get all unread emails', (done) => {
    chai
      .request(app)
      .get(`${API_PREFIX}/messages/unread`)
      .set('x-auth-token', jwtToken)
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.eq(200);
        expect(res.body.message).to.not.equal(0);
      });
    done();
  });
  it('GET /messages/unread - User has no unread emails', (done) => {
    chai
      .request(app)
      .get(`${API_PREFIX}/messages/unread`)
      .set('x-auth-token', fakejwtToken)
      .then((res) => {
        expect(res).to.have.status(404);
        expect(res.body.status).to.eq(404);
        expect(res.body.message).to.equal('No unread mail found');
      });
    done();
  });
  it('GET /messages/sent - User Get all sent emails', (done) => {
    chai
      .request(app)
      .get(`${API_PREFIX}/messages/sent`)
      .set('x-auth-token', jwtToken)
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.eq(200);
        expect(res.body.message).to.not.equal(0);
      });
    done();
  });
  it('GET /messages/sent - User has no sent emails', (done) => {
    chai
      .request(app)
      .get(`${API_PREFIX}/messages/sent`)
      .set('x-auth-token', fakejwtToken)
      .then((res) => {
        expect(res).to.have.status(404);
        expect(res.body.status).to.eq(404);
        expect(res.body.message).to.equal('No sent mail found');
      });
    done();
  });
  it('GET /messages/:id - User Get specific email', (done) => {
    chai
      .request(app)
      .get(`${API_PREFIX}/messages/3`)
      .set('x-auth-token', jwtToken)
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.eq(200);
        expect(res.body.message).to.not.equal(0);
      });
    done();
  });
  it('GET /messages/sent - User specific email dont exist', (done) => {
    chai
      .request(app)
      .get(`${API_PREFIX}/messages/3`)
      .set('x-auth-token', fakejwtToken)
      .then((res) => {
        expect(res).to.have.status(404);
        expect(res.body.status).to.eq(404);
        expect(res.body.message).to.equal('No mesage found');
      });
    done();
  });
  it('POST /messages/ - User POST email', (done) => {
    chai
      .request(app)
      .post(`${API_PREFIX}/messages`)
      .set('x-auth-token', jwtToken)
      .send({
        subject: 'Roger',
        message: 'Test',
        recieverId: 'rogetest@epicmail.com',
      })
      .then((res) => {
        expect(res).to.have.status(201);
        expect(res.body.status).to.eq(201);
        expect(res.body.message).to.not.equal(0);
      });
    done();
  });
  it('POST /messages/ - User POST email fail validation', (done) => {
    chai
      .request(app)
      .post(`${API_PREFIX}/messages`)
      .set('x-auth-token', jwtToken)
      .send({
        subject: 'Roger',
        message: 'Test',
        recieverId: 'rogetestepicmail.com',
      })
      .then((res) => {
        expect(res).to.have.status(400);
        assert.equal(res.body.status, 'error');
        assert.equal(res.body.type, 'validation');
      });
    done();
  });
  it('POST /messages/ - User POST email fail validation', (done) => {
    chai
      .request(app)
      .post(`${API_PREFIX}/messages`)
      .set('x-auth-token', jwtToken)
      .send({
        subject: 'Roger',
        message: 'Test',
        email: 'rogetest@epicmail.com',
      })
      .then((res) => {
        expect(res).to.have.status(400);
        assert.equal(res.body.status, 'error');
        assert.equal(res.body.type, 'validation');
      });
    done();
  });
  it('DELETE /messages/:id - User DELETE specific email', (done) => {
    chai
      .request(app)
      .delete(`${API_PREFIX}/messages/3`)
      .set('x-auth-token', jwtToken)
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.eq(200);
        assert.equal(res.body.message, 'Deleted successfully');
      });
    done();
  });
  it('DELETE /messages/:id - User fail to DELETE specific email', (done) => {
    chai
      .request(app)
      .delete(`${API_PREFIX}/messages/33`)
      .set('x-auth-token', fakejwtToken)
      .then((res) => {
        expect(res).to.have.status(404);
        expect(res.body.status).to.eq(404);
        expect(res.body.message).to.equal('No mesage found');
      });
    done();
  });
});
