import chai from 'chai';
import chaiHTTP from 'chai-http';
import app from '../api/index';
import dummyData from '../api/utils/dummyUserData';

const { assert, expect, use } = chai;

use(chaiHTTP);

const API_PREFIX = '/api/v1';
const newlength = dummyData.user.length + 1;

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
  it('POST /auth/signup - User SignUp Validation Test(Required)', async () => {
    const result = await chai
      .request(app)
      .post(`${API_PREFIX}/auth/signup`)
      .send({
        firstName: 'Roger',
        lastName: 'Test',
        email: 'roger@test.com',
      });
    expect(result).to.have.status(400);
    assert.equal(result.body.status, 'error');
    assert.equal(result.body.type, 'validation');
  });
  it('POST /auth/signup - User SignUp Validation Test(Email)', async () => {
    const result = await chai
      .request(app)
      .post(`${API_PREFIX}/auth/signup`)
      .send({
        firstName: 'Roger',
        lastName: 'Test',
        email: 'rogetest.com',
        password: 'password',
      });
    expect(result).to.have.status(400);
    assert.equal(result.body.status, 'error');
    assert.equal(result.body.type, 'validation');
  });
  it('POST /auth/signup - User Can Sign Up', async () => {
    const result = await chai
      .request(app)
      .post(`${API_PREFIX}/auth/signup`)
      .send({
        firstName: 'joel',
        lastName: 'ugwumadu2',
        email: 'roger@test.com',
        password: 'password',
      });
    expect(result).to.have.status(201);
    expect(dummyData.user.length).to.not.equal(2);
    expect(dummyData.user.length).to.equal(newlength);
    assert.equal(result.body.status, 'success');
  });
  it('POST /auth/signup - User Can Sign Up', async () => {
    const result = await chai
      .request(app)
      .post(`${API_PREFIX}/auth/signup`)
      .send({
        firstName: 'test',
        lastName: 'test',
        email: 'roger2@test.com',
        password: 'password2',
      });
    expect(result).to.have.status(201);
    expect(dummyData.user.length).to.not.equal(2);
    assert.equal(result.body.status, 'success');
  });
  it("POST /auth/signup - User Can't signup again with the same email", async () => {
    const result = await chai
      .request(app)
      .post(`${API_PREFIX}/auth/signup`)
      .send({
        firstName: 'joel',
        lastName: 'ugwumadu2',
        email: 'roger@test.com',
        password: 'password',
      });
    expect(result).to.have.status(500);
    assert.equal(result.body.status, 'error');
  });
});

describe('User Auth Login Endpoint Tests', () => {
  it('POST /auth/login - User Login Validation Test(Required)', async () => {
    const result = await chai
      .request(app)
      .post(`${API_PREFIX}/auth/login`)
      .send({
        epicMail: 'roger@test.com',
      });
    expect(result).to.have.status(400);
    assert.equal(result.body.status, 'error');
    assert.equal(result.body.type, 'validation');
  });
  it('POST /auth/login - User Login Validation Test(Email)', async () => {
    const result = await chai
      .request(app)
      .post(`${API_PREFIX}/auth/login`)
      .send({
        epicMail: 'roger',
        password: 'password',
      });
    expect(result).to.have.status(400);
    assert.equal(result.body.status, 'error');
    assert.equal(result.body.type, 'validation');
  });
  it('POST /auth/login - User Cannot Login without being registered', async () => {
    const result = await chai
      .request(app)
      .post(`${API_PREFIX}/auth/login`)
      .send({
        epicMail: 'thesis@science.com',
        password: 'password',
      });
    expect(result).to.have.status(409);
    assert.equal(result.body.status, 'error');
  });
  it('POST /auth/login - User Can Login', async () => {
    const result = await chai
      .request(app)
      .post(`${API_PREFIX}/auth/login`)
      .send({
        epicMail: 'joelugwumadu2@epicmail.com',
        password: 'password',
      });
    expect(result).to.have.status(200);
    assert.equal(result.body.status, 'success');
  });
  it('POST /auth/login - User Can Login', async () => {
    const result = await chai
      .request(app)
      .post(`${API_PREFIX}/auth/login`)
      .send({
        epicMail: 'testtest@epicmail.com',
        password: 'password2',
      });
    expect(result).to.have.status(200);
    assert.equal(result.body.status, 'success');
  });
  it("POST /auth/login - User Can't login with incorrect password", async () => {
    const result = await chai
      .request(app)
      .post(`${API_PREFIX}/auth/login`)
      .send({
        email: 'joelugwumadu2@epicmail.com',
        password: 'password111',
      });
    assert.equal(result.body.status, 'error');
  });
});
