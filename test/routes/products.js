const express = require('express');
const router = express.Router();


const products = [
    {
        id: 1,
        name: "Product 1",
        reviews: []
    },
    {
        id: 2,
        name: "Product 2",
        reviews: []
    }
]
router.get('/', function (req, res, next) {
    res.status(200).json(products);
});

router.post('/:id/reviews', function (req, res, next) {
    const body = req.body;
    const id = req.params.id;
    const selectedProduct = products.findIndex((product) => product.id === Number(id));
    if (selectedProduct === -1) {
        res.status(404).send('Product not found');
    }
    const {rating, reviewer, comment} = body;

    if (!Number.isFinite(rating) || rating < 1 || rating > 5) {
        res.status(400).send('Rating should be a number and be between 1 and 5');
    }

    if (!reviewer || typeof reviewer !== 'string' || !reviewer.trim()) {
        res.status(400).send('Reviewer is required and should be a string');
    }

    if (!comment || typeof comment !== 'string' || !comment.trim()) {
        res.status(400).send('Comment is required and should be a string');
    }
    products[selectedProduct].reviews.push({rating, reviewer, comment});

    res.status(201).send(products[selectedProduct]);

})

module.exports = router;
