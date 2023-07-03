const request = require('supertest');
const app = require('../app.js');

describe('GET /users', () => {
    // Test setup
    beforeAll(async () => {
        // Create a users
        await request(app)
            .post('/users')
            .send({
                username: 'test1',
                password: 'TesTpass.1',
                email: 'Test1@test.com',
                dob: '2000-10-10',
                creditCardNumber: '1234567890123456'
            });
        await request(app)
            .post('/users')
            .send({
                username: 'test2',
                password: 'TesTpass.1',
                email: 'Test1@test.com',
                dob: '2000-10-10',
                creditCardNumber: '1234567890123455'
            });
        await request(app)
            .post('/users')
            .send({
                username: 'test3',
                password: 'TesTpass.1',
                email: 'Test1@test.com',
                dob: '2000-10-10',
                creditCardNumber: ''
            });
    });



    it('should return all users', async () => {
        const res = await request(app)
            .get('/users')
            .send({
                creditCard: ''
            });
            const db = app.users 
        expect(res.body).toStrictEqual(
            [
                {
                    "username": "test1",
                    "password": "TesTpass.1",
                    "email": "Test1@test.com",
                    "dob": "2000-10-10",
                    "creditCardNumber": "1234567890123456"
                },
                {
                    "username": "test2",
                    "password": "TesTpass.1",
                    "email": "Test1@test.com",
                    "dob": "2000-10-10",
                    "creditCardNumber": "1234567890123455"
                },
                {
                    "username": "test3",
                    "password": "TesTpass.1",
                    "email": "Test1@test.com",
                    "dob": "2000-10-10",
                    "creditCardNumber": ""
                }
            ]
        );
    });

    it('should return all users with credit cards', async () => {
        const res = await request(app)
            .get('/users')
            .send({
                creditCard: 'yes'
            });
            expect(res.body).toStrictEqual(
                [
                    {
                        "username": "test1",
                        "password": "TesTpass.1",
                        "email": "Test1@test.com",
                        "dob": "2000-10-10",
                        "creditCardNumber": "1234567890123456"
                    },
                    {
                        "username": "test2",
                        "password": "TesTpass.1",
                        "email": "Test1@test.com",
                        "dob": "2000-10-10",
                        "creditCardNumber": "1234567890123455"
                    }
                ]
            );
    });
});