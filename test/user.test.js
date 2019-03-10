import chai from 'chai';
import chaiHTTP from 'chai-http';
import jwt from 'jsonwebtoken';
import app from '../api/index';
// import dummyData from '../api/utils/dummyUserData';

const { assert, expect, use } = chai;

use(chaiHTTP);

const API_PREFIX = '/api/v1';
// const newlength = dummyData.user.length + 1;
const safeUser = {
  epicMail: 'joelugwumadu2@epicmail.com',
};
const jwtTokent = jwt.sign({ user: safeUser }, 'secret', {
  expiresIn: 86400,
});
// const fakeUser = {
//   epicMail: 'testtest@epicmail.com',
// };
// const fakejwtToken = jwt.sign({ user: fakeUser }, 'secret', {
//   expiresIn: 86400,
// });


// beforeEach(async () => {
//   await chai
//     .request(app)
//     .post(`${API_PREFIX}/auth/signup`)
//     .send({
//       firstName: 'joel',
//       lastName: 'ugwumadu2',
//       email: 'roger@test.com',
//       password: 'password',
//     });
//   await chai
//     .request(app)
//     .post(`${API_PREFIX}/auth/signup`)
//     .send({
//       firstName: 'test',
//       lastName: 'test',
//       email: 'roger2@test.com',
//       password: 'password2',
//     });
//   await chai
//     .request(app)
//     .post(`${API_PREFIX}/auth/login`)
//     .send({
//       epicMail: 'joelugwumadu2@epicmail.com',
//       password: 'password',
//     });
//   await chai
//     .request(app)
//     .post(`${API_PREFIX}/auth/login`)
//     .send({
//       epicMail: 'testtest@epicmail.com',
//       password: 'password2',
//     });
// });
// describe('User Root api', () => {
//   it('GET / - User get response when navigate to root', (done) => {
//     chai
//       .request(app)
//       .get('/')
//       .end((res) => {
//         expect(res).to.eq(null);
//         done();
//       });
//   });
// });
describe('User get message api', () => {
  it('GET /messages - User Get all received emails', async () => {
    const result = await chai
      .request(app)
      .get(`${API_PREFIX}/messages`)
      .set('x-auth-token', jwtTokent);
    // expect(result).to.have.status(200);
    // expect(result.body.status).to.eq(200);
    expect(result.body.message).to.not.equal(0);
  });
});

// describe('User Auth Signup Endpoint Tests', () => {
//   it('POST /auth/signup - User SignUp Validation Test(Required)', async () => {
//     const result = await chai
//       .request(app)
//       .post(`${API_PREFIX}/auth/signup`)
//       .send({
//         firstName: 'Roger',
//         lastName: 'Test',
//         email: 'roger@test.com',
//       });
//     expect(result).to.have.status(400);
//     assert.equal(result.body.status, 'error');
//     assert.equal(result.body.type, 'validation');
//   });
//   it('POST /auth/signup - User SignUp Validation Test(Email)', async () => {
//     const result = await chai
//       .request(app)
//       .post(`${API_PREFIX}/auth/signup`)
//       .send({
//         firstName: 'Roger',
//         lastName: 'Test',
//         email: 'rogetest.com',
//         password: 'password',
//       });
//     expect(result).to.have.status(400);
//     assert.equal(result.body.status, 'error');
//     assert.equal(result.body.type, 'validation');
//   });
// it('POST /auth/signup - User Can Sign Up', async () => {
//   const result = await chai
//     .request(app)
//     .post(`${API_PREFIX}/auth/signup`)
//     .send({
//       firstName: 'joel',
//       lastName: 'ugwumadu2',
//       email: 'roger@test.com',
//       password: 'password',
//     });
//   expect(result.statusCode).to.have.status(201);
//   assert.equal(result.body.status, 'success');
//   assert.equal(result.statusCode, 201);
// });
// it('POST /auth/signup - User Can Sign Up', async () => {
//   const result = await chai
//     .request(app)
//     .post(`${API_PREFIX}/auth/signup`)
//     .send({
//       firstName: 'test',
//       lastName: 'test',
//       email: 'roger2@test.com',
//       password: 'password2',
//     });
//   expect(result).to.have.status(201);
//   expect(dummyData.user.length).to.not.equal(2);
//   assert.equal(result.body.status, 'success');
// });
// it("POST /auth/signup - User Can't signup again with the same email", async () => {
//   const result = await chai
//     .request(app)
//     .post(`${API_PREFIX}/auth/signup`)
//     .send({
//       firstName: 'joel',
//       lastName: 'ugwumadu2',
//       email: 'roger@test.com',
//       password: 'password',
//     });
//   expect(result).to.have.status(500);
//   assert.equal(result.body.status, 'error');
// });
// it('POST /auth/login - User Login Validation Test(Required)', async () => {
//   const result = await chai
//     .request(app)
//     .post(`${API_PREFIX}/auth/login`)
//     .send({
//       epicMail: 'roger@test.com',
//     });
//   expect(result).to.have.status(400);
//   assert.equal(result.body.status, 'error');
//   assert.equal(result.body.type, 'validation');
// });
// it('POST /auth/login - User Login Validation Test(Email)', async () => {
//   const result = await chai
//     .request(app)
//     .post(`${API_PREFIX}/auth/login`)
//     .send({
//       epicMail: 'roger',
//       password: 'password',
//     });
//   expect(result).to.have.status(400);
//   assert.equal(result.body.status, 'error');
//   assert.equal(result.body.type, 'validation');
// });
// it('POST /auth/login - User Cannot Login without being registered', async () => {
//   const result = await chai
//     .request(app)
//     .post(`${API_PREFIX}/auth/login`)
//     .send({
//       epicMail: 'thesis@science.com',
//       password: 'password',
//     });
//   expect(result).to.have.status(409);
//   assert.equal(result.body.status, 'error');
// });
// it('POST /auth/login - User Can Login', async () => {
//   const result = await chai
//     .request(app)
//     .post(`${API_PREFIX}/auth/login`)
//     .send({
//       epicMail: 'joelugwumadu2@epicmail.com',
//       password: 'password',
//     });
//   expect(result).to.have.status(200);
//   assert.equal(result.body.status, 'success');
// });
// it("POST /auth/login - User Can't login with incorrect password", async () => {
//   const result = await chai
//     .request(app)
//     .post(`${API_PREFIX}/auth/login`)
//     .send({
//       email: 'joelugwumadu2@epicmail.com',
//       password: 'password111',
//     });
//   assert.equal(result.body.status, 'error');
// });
// it('POST /auth/login - User Can Login', async () => {
//   const result = await chai
//     .request(app)
//     .post(`${API_PREFIX}/auth/login`)
//     .send({
//       epicMail: 'testtest@epicmail.com',
//       password: 'password2',
//     });
//   expect(result).to.have.status(200);
//   assert.equal(result.body.status, 'success');
// });
// it('GET /messages - User Get all received emails', async () => {
//   const result = await chai
//     .request(app)
//     .get(`${API_PREFIX}/messages`)
//     .set('x-auth-token', jwtToken);
//   expect(result).to.have.status(200);
//   expect(result.body.status).to.eq(200);
//   expect(result.body.message).to.not.equal(0);
// });
// it('GET /messages/ - User has no recieved emails', async () => {
//   const result = await chai
//     .request(app)
//     .get(`${API_PREFIX}/messages`)
//     .set('x-auth-token', fakejwtToken);
//   expect(result).to.have.status(404);
//   expect(result.body.status).to.eq(404);
//   expect(result.body.message).to.equal('No mail found');
// });
// it('GET /messages - User Fail token Validation Test(Required)', async () => {
//   const result = await chai
//     .request(app)
//     .get(`${API_PREFIX}/messages`)
//     .set('x-auth-token', 'jwtToken');
//   expect(result).to.have.status(400);
// });
// it('GET /messages/unread - User Get all unread emails', async () => {
//   const result = await chai
//     .request(app)
//     .get(`${API_PREFIX}/messages/unread`)
//     .set('x-auth-token', jwtToken);
//   expect(result).to.have.status(200);
//   expect(result.body.status).to.eq(200);
//   expect(result.body.message).to.not.equal(0);
// });
// it('GET /messages/unread - User has no unread emails', async () => {
//   const result = await chai
//     .request(app)
//     .get(`${API_PREFIX}/messages/unread`)
//     .set('x-auth-token', fakejwtToken)
//   expect(result).to.have.status(404);
//   expect(result.body.status).to.eq(404);
//   expect(result.body.message).to.equal('No unread mail found');
// });
// it('GET /messages/sent - User Get all sent emails', async () => {
//   const result = await chai
//     .request(app)
//     .get(`${API_PREFIX}/messages/sent`)
//     .set('x-auth-token', jwtToken);
//   expect(result).to.have.status(200);
//   expect(result.body.status).to.eq(200);
//   expect(result.body.message).to.not.equal(0);
// });
// it('GET /messages/sent - User has no sent emails', async () => {
//   const result = await chai
//     .request(app)
//     .get(`${API_PREFIX}/messages/sent`)
//     .set('x-auth-token', fakejwtToken);
//   expect(result).to.have.status(404);
//   expect(result.body.status).to.eq(404);
//   expect(result.body.message).to.equal('No sent mail found');
// });
// it('GET /messages/:id - User Get specific email', async () => {
//   const result = await chai
//     .request(app)
//     .get(`${API_PREFIX}/messages/3`)
//     .set('x-auth-token', jwtToken)
//   expect(result).to.have.status(200);
//   expect(result.body.status).to.eq(200);
//   expect(result.body.message).to.not.equal(0);
// });
// it('GET /messages/sent - User specific email dont exist', async () => {
//   const result = await chai
//     .request(app)
//     .get(`${API_PREFIX}/messages/3`)
//     .set('x-auth-token', fakejwtToken);
//   expect(result).to.have.status(404);
//   expect(result.body.status).to.eq(404);
//   expect(result.body.message).to.equal('No mesage found');
// });
// it('POST /messages/ - User POST email', async () => {
//   const result = await chai
//     .request(app)
//     .post(`${API_PREFIX}/messages`)
//     .set('x-auth-token', jwtToken)
//     .send({
//       subject: 'Roger',
//       message: 'Test',
//       recieverId: 'rogetest@epicmail.com',
//     });
//   expect(result).to.have.status(201);
//   expect(result.body.status).to.eq(201);
//   expect(result.body.message).to.not.equal(0);
// });
// it('POST /messages/ - User POST email fail validation', async () => {
//   const result = await chai
//     .request(app)
//     .post(`${API_PREFIX}/messages`)
//     .set('x-auth-token', jwtToken)
//     .send({
//       subject: 'Roger',
//       message: 'Test',
//       recieverId: 'rogetestepicmail.com',
//     });
//   expect(result).to.have.status(400);
//   assert.equal(result.body.status, 'error');
//   assert.equal(result.body.type, 'validation');
// });
// it('POST /messages/ - User POST email fail validation', async () => {
//   const result = await chai
//     .request(app)
//     .post(`${API_PREFIX}/messages`)
//     .set('x-auth-token', jwtToken)
//     .send({
//       subject: 'Roger',
//       message: 'Test',
//       email: 'rogetest@epicmail.com',
//     });
//   expect(result).to.have.status(400);
//   assert.equal(result.body.status, 'error');
//   assert.equal(result.body.type, 'validation');
// });
// it('DELETE /messages/:id - User DELETE specific email', async () => {
//   const result = await chai
//     .request(app)
//     .delete(`${API_PREFIX}/messages/3`)
//     .set('x-auth-token', jwtToken);
//   expect(result).to.have.status(200);
//   expect(result.body.status).to.eq(200);
//   assert.equal(result.body.message, 'Deleted successfully');
// });
// it('DELETE /messages/:id - User fail to DELETE specific email', async () => {
//   const result = await chai
//     .request(app)
//     .delete(`${API_PREFIX}/messages/33`)
//     .set('x-auth-token', fakejwtToken);
//   expect(result).to.have.status(404);
//   expect(result.body.status).to.eq(404);
//   expect(result.body.message).to.equal('No mesage found');
// });
// });
