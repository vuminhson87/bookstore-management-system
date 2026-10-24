
const request = require('supertest');
const app = require('../app');

describe('Authentication API', () => {
    const username = `student_${Date.now()}`;
    const password = '123456';

    test('Đăng ký thành công', async () => {
        const response = await request(app)
            .post('/api/auth/register')
            .send({ username, password });

        expect(response.status).toBe(201);
        expect(response.body.user.username).toBe(username);
        expect(response.body.user).not.toHaveProperty('passwordHash');
        expect(response.body.user).not.toHaveProperty('salt');
    });

    test('Đăng ký thiếu tên đăng nhập', async () => {
        const response = await request(app)
            .post('/api/auth/register')
            .send({ password });

        expect(response.status).toBe(400);
    });

    test('Đăng ký mật khẩu quá ngắn', async () => {
        const response = await request(app)
            .post('/api/auth/register')
            .send({ username: 'shortPasswordUser', password: '123' });

        expect(response.status).toBe(400);
    });

    test('Đăng ký trùng tên đăng nhập', async () => {
        const response = await request(app)
            .post('/api/auth/register')
            .send({ username, password });

        expect(response.status).toBe(409);
    });

    test('Đăng nhập thành công', async () => {
        const response = await request(app)
            .post('/api/auth/login')
            .send({ username, password });

        expect(response.status).toBe(200);
        expect(response.body.user.username).toBe(username);
        expect(response.body.user).not.toHaveProperty('passwordHash');
    });

    test('Đăng nhập sai mật khẩu', async () => {
        const response = await request(app)
            .post('/api/auth/login')
            .send({ username, password: 'wrongPassword' });

        expect(response.status).toBe(401);
    });

    test('Đăng nhập thiếu thông tin', async () => {
        const response = await request(app)
            .post('/api/auth/login')
            .send({ username });

        expect(response.status).toBe(400);
    });
    test('Đăng ký với tên đăng nhập không đúng kiểu dữ liệu', async () => {
        const response = await request(app)
            .post('/api/auth/register')
            .send({
                username: { value: 'admin' },
                password: '123456',
            });

        expect(response.status).toBe(400);
    });
});
