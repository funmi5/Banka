import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';

chai.should();
chai.use(chaiHttp);

// const testUserSignUp = ;

const signUpUrl = '/api/v1/auth/signup'; 
const signInUrl = '/api/v1/auth/signin'; 


describe('Test for User signUp controller', () => {
    it('should register a new user when all the details are provided', (done) => {
        chai.request(app)
        .post(signUpUrl)
        .send({
            firstName: 'Mat',
            lastName: 'Eniola',
            email: 'test@banka.com',
            password: 'password'
        })
        .end((err, res) => {
            expect(res.body.status).to.equal(201);
            expect(res.body.data).to.be.a('object');
            expect(res.body.data).to.have.property('token');
            expect(res.body.data).to.have.property('id');
            expect(res.body.data).to.have.property('firstName');
            expect(res.body.data).to.have.property('lastName');
            expect(res.body.data).to.have.property('email');
            expect(res.body.data.token).to.be.a('string');
            done();
        });
    });

    it('should not register a user when an existing email is used', (done) => {
        chai.request(app)
        .post(signUpUrl)
        .send({
            firstName: 'Epeh',
            lastName: 'Ire',
            email: 'm.eny@banka.com',
            password: 'password'
        })
        .end((err, res) =>{
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            done();
        });
    });
});

describe('Test for User signIn controller', () => {
    it('should sign in a user when the correct detail is provided', (done) => {
        chai.request(app)
        .post(signInUrl)
        .send({
            email: 'm.eny@banka.com',
            password: 'password'
        })
        .end((err, res) => {
            expect(res).to.have.status(202);
            expect(res.body).to.be.a('object');
            expect(res.body.status).to.equal(202);
            expect(res.body.data).to.be.a('object');
            expect(res.body.data).to.have.property('token');
            expect(res.body.data).to.have.property('id');
            expect(res.body.data).to.have.property('firstName');
            expect(res.body.data).to.have.property('lastName');
            expect(res.body.data).to.have.property('email');
            expect(res.body.data.token).to.be.a('string');
            done();
        });
    });

    it('should not sign in a user when password is incorrect', (done) => {
        chai.request(app)
        .post(signInUrl)
        .send({
            email: 'm.eny@banka.com',
            password: 'pword'
        })
        .end((err, res) => {
            expect(res).to.have.status(401);
            expect(res.body).to.be.a('object');
            expect(res.body.status).to.equal(401);
            expect(res.body).to.have.property('error');
            done();
        });
    });

    it('should not sign in a user when email is incorrect', (done) => {
        chai.request(app)
        .post(signInUrl)
        .send({
            email: 'm.gbeny@banka.com',
            password: 'password'
        })
        .end((err, res) => {
            expect(res).to.have.status(401);
            expect(res.body).to.be.a('object');
            expect(res.body.status).to.equal(401);
            expect(res.body).to.have.property('error');
            done();
        });
    });
});
