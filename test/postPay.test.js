const request = require('supertest');
const app = require('../app.js');

describe('POST /pay', () => {
    it('should return 400 if validation fails', async () => {
        const res = await request(app)
            .post('/payments')
            .send({
                creditCardNumber: '1234567890123456',
                amount: '1000'
            });
        expect(res.status).toBe(400);
    });
    
    it('should return 201 if user is created', async () => {
        const res = await request(app)
            .post('/users')
            .send({
                username: 'test2',
                password: 'TesTpass.1',
                email: 'Test1@test.com',
                dob: '2000-10-10',
                creditCardNumber: '1234567890123456'
            });
        expect(res.status).toBe(201);
    });

    it('should return 404 if creditcard not in database', async () => {
        const res = await request(app)
            .post('/payments')
            .send({
                creditCardNumber: '1234567890123457',
                amount: '100'
            });
        expect(res.status).toBe(404);
    });

    it('should return 201 if payment succsessful', async () => {
        const res = await request(app)
            .post('/payments')
            .send({
                creditCardNumber: '1234567890123456',
                amount: '100'
            });
        expect(res.status).toBe(201);
    });
});