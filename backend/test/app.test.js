import request from 'supertest';
import app from '../app.js';


describe('Product Reviews API', () => {
    it('GET /products returns list', async () => {
        const res = await request(app).get('/products');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body[0]).toHaveProperty('id');
    });


    it('POST /products/:id/reviews validates input', async () => {
        const res = await request(app)
            .post('/products/1/reviews')
            .send({ reviewer: '', rating: 6, comment: '' });
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('error');
    });


    it('POST /products/:id/reviews adds review', async () => {
        const payload = { reviewer: 'Diego', rating: 5, comment: 'Excelente' };
        const res = await request(app)
            .post('/products/1/reviews')
            .send(payload);


        expect(res.statusCode).toBe(201);
        expect(res.body.product.reviews.some(r => r.reviewer === 'Diego')).toBe(true);
    });
});