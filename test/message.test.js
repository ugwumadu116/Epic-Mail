import chai from 'chai';
import chaiHTTP from 'chai-http';
import jwt from 'jsonwebtoken';
import app from '../api/index';

const { assert, expect, use } = chai;

use(chaiHTTP);

const API_PREFIX = '/api/v2';

const safeUser = {
  epicMail: 'joel@epicmail.com',
};
const secondUser = {
  epicMail: 'test@epicmail.com',
};
const jwtToken = jwt.sign({ user: safeUser }, 'secret', {
  expiresIn: 86400,
});
const jwtToken2 = jwt.sign({ user: secondUser }, 'secret', {
  expiresIn: 86400,
});
const fakeUser = {
  epicMail: 'testk@epicmail.com',
};
const fakejwtToken = jwt.sign({ user: fakeUser }, 'secret', {
  expiresIn: 86400,
});


describe('User Messages Endpoint Tests', () => {
  it('POST /messages/ - User POST email', async () => {
    const result = await chai
      .request(app)
      .post(`${API_PREFIX}/messages`)
      .set('x-auth-token', jwtToken)
      .send({
        subject: 'Roger',
        message: 'Test',
        receiverEmail: 'test@epicmail.com',
      });
    expect(result).to.have.status(201);
    expect(result.body.status).to.eq(201);
    expect(result.body.message).to.not.equal(0);
  });
  it('POST /messages/ - User POST email', async () => {
    const result = await chai
      .request(app)
      .post(`${API_PREFIX}/messages`)
      .set('x-auth-token', jwtToken2)
      .send({
        subject: 'Roger',
        message: 'Test',
        receiverEmail: 'joel@epicmail.com',
      });
    expect(result).to.have.status(201);
    expect(result.body.status).to.eq(201);
    expect(result.body.message).to.not.equal(0);
  });
  it('POST /messages/ - User POST email', async () => {
    const result = await chai
      .request(app)
      .post(`${API_PREFIX}/messages`)
      .set('x-auth-token', jwtToken2)
      .send({
        subject: 'Roger ok',
        message: 'Test test etc',
        receiverEmail: 'joel@epicmail.com',
      });
    expect(result).to.have.status(201);
    expect(result.body.status).to.eq(201);
    expect(result.body.message).to.not.equal(0);
  });
  it('POST /messages/ - User POST email fail validation', async () => {
    const result = await chai
      .request(app)
      .post(`${API_PREFIX}/messages`)
      .set('x-auth-token', jwtToken)
      .send({
        subject: 'Roger',
        message: 'Test',
        receiverEmail: 'rogetestepicmail.com',
      });
    expect(result).to.have.status(400);
    assert.equal(result.body.status, 'error');
    assert.equal(result.body.type, 'validation');
  });
  it('POST /messages/ - User POST email fail validation', async () => {
    const result = await chai
      .request(app)
      .post(`${API_PREFIX}/messages`)
      .set('x-auth-token', jwtToken)
      .send({
        subject: 'Roger',
        message: 'Test',
        email: 'rogetest@epicmail.com',
      });
    expect(result).to.have.status(400);
    assert.equal(result.body.status, 'error');
    assert.equal(result.body.type, 'validation');
  });

  it('GET /messages - User Get all received emails', async () => {
    const result = await chai
      .request(app)
      .get(`${API_PREFIX}/messages`)
      .set('x-auth-token', jwtToken);
    expect(result).to.have.status(200);
    expect(result.body.status).to.eq(200);
    expect(result.body.message).to.not.equal(0);
  });
  it('GET /messages/ - User has no received emails', async () => {
    const result = await chai
      .request(app)
      .get(`${API_PREFIX}/messages`)
      .set('x-auth-token', fakejwtToken);
    expect(result).to.have.status(404);
    expect(result.body.status).to.eq(404);
    expect(result.body.message).to.equal('No mail found');
  });
  it('GET /messages - User Fail token Validation Test(Required)', async () => {
    const result = await chai
      .request(app)
      .get(`${API_PREFIX}/messages`)
      .set('x-auth-token', 'jwtToken');
    expect(result).to.have.status(401);
  });
  it('GET /messages/unread - User Get all unread emails', async () => {
    const result = await chai
      .request(app)
      .get(`${API_PREFIX}/messages/unread`)
      .set('x-auth-token', jwtToken);
    expect(result).to.have.status(200);
    expect(result.body.status).to.eq(200);
    expect(result.body.message).to.not.equal(0);
  });
  it('GET /messages/sent - User Get all sent emails', async () => {
    const result = await chai
      .request(app)
      .get(`${API_PREFIX}/messages/sent`)
      .set('x-auth-token', jwtToken);
    expect(result).to.have.status(200);
    expect(result.body.status).to.eq(200);
    expect(result.body.message).to.not.equal(0);
  });
  it('GET /messages/sent - User has no sent emails', async () => {
    const result = await chai
      .request(app)
      .get(`${API_PREFIX}/messages/sent`)
      .set('x-auth-token', fakejwtToken);
    expect(result).to.have.status(404);
    expect(result.body.status).to.eq(404);
    expect(result.body.message).to.equal('No sent mail found');
  });
  it('GET /messages/:id - User Get specific email', async () => {
    const result = await chai
      .request(app)
      .get(`${API_PREFIX}/messages/${5}`)
      .set('x-auth-token', jwtToken2);
    expect(result).to.have.status(200);
    expect(result.body.status).to.eq(200);
    expect(result.body.message).to.not.equal(0);
  });
});
