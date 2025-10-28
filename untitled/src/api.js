const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';


export const fetchProducts = async () => {
    const res = await fetch(`${API_URL}/products`);
    if (!res.ok) throw new Error('Failed to load products');
    return res.json();
};


export const postReview = async (productId, review) => {
    const res = await fetch(`${API_URL}/products/${productId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(review)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to submit review');
    return data.product;
};