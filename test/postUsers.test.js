const request = require('supertest');
const app = require('../app.js');

describe('POST /users', () => {
    it('should return 400 if validation fails', async () => {
        const res = await request(app)
            .post('/users')
            .send({
                username: 'test1',
                password: 'testpass',
                email: 'Test1',
                dob: '2000-10-10',
                creditCardNumber: '1234567890123456'
            });
        expect(res.status).toBe(400);
    });
    
    it('should return 403 if user is under 18', async () => {
        const res = await request(app)
            .post('/users')
            .send({
                username: 'test1',
                password: 'TesTpass.1',
                email: 'Test1@test.com',
                dob: '2010-10-10',
                creditCardNumber: '1234567890123456'
            });
        expect(res.status).toBe(403);
    });
    
    it('should return 201 if user is created', async () => {
        const res = await request(app)
            .post('/users')
            .send({
                username: 'test1',
                password: 'TesTpass.1',
                email: 'Test1@test.com',
                dob: '2000-10-10',
                creditCardNumber: '1234567890123456'
            });
        expect(res.status).toBe(201);
    });

    it('should return 409 if username already exists', async () => {
        const res = await request(app)
            .post('/users')
            .send({
                username: 'test1',
                password: 'TesTpass.1',
                email: 'Test1@test.com',
                dob: '2000-10-10',
                creditCardNumber: '1234567890123456'
            });
        expect(res.status).toBe(409);
    });
});