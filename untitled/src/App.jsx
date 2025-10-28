import React from 'react';
import { useProducts } from './context/ProductsContext';
import ProductItem from './components/ProductItem';
import './App.css';


export default function App() {
    const { products, loading, error, reload } = useProducts();


    return (
        <div className="container">
            <header>
                <h1>Product Reviews</h1>
                <button onClick={reload}>Reload</button>
            </header>
            {loading && <p>Loading products…</p>}
            {error && <p className="error">{error}</p>}
            <div className="grid">
                {products.map(p => (
                    <ProductItem key={p.id} product={p} />
                ))}
            </div>
        </div>
    );
}