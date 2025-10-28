import React from 'react';
import ReviewForm from './ReviewForm';


export default function ProductItem({ product }) {
    return (
        <div style={{ border: '1px solid #ddd', padding: 12, borderRadius: 8 }}>
            <h3 style={{ margin: 0 }}>{product.name}</h3>
            <ul>
                {product.reviews.length === 0 && <li>No reviews yet.</li>}
                {product.reviews.map((r, idx) => (
                    <li key={idx}>
                        <strong>{r.reviewer}</strong> – {r.rating}/5 — {r.comment}
                    </li>
                ))}
            </ul>
            <ReviewForm productId={product.id} />
        </div>
    );
}