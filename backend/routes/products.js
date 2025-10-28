import express from 'express';
const router = express.Router();

const products = [
    { id: 1, name: "Product 1", reviews: [] },
    { id: 2, name: "Product 2", reviews: [] }
];

router.get('/', (req, res) => {
    return res.status(200).json(products);
});

router.post('/:id/reviews', (req, res) => {
    const { id } = req.params;
    const { rating, reviewer, comment } = req.body;

    const product = products.find(p => p.id === Number(id));
    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }

    if (!Number.isFinite(rating) || rating < 1 || rating > 5) {
        return res.status(400).json({ error: 'Rating should be a number and be between 1 and 5' });
    }

    if (!reviewer || typeof reviewer !== 'string' || !reviewer.trim()) {
        return res.status(400).json({ error: 'Reviewer is required and should be a string' });
    }

    if (!comment || typeof comment !== 'string' || !comment.trim()) {
        return res.status(400).json({ error: 'Comment is required and should be a string' });
    }

    product.reviews.push({ rating, reviewer, comment });

    return res.status(201).json({ product });
});

export default router;
