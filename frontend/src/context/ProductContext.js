import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { fetchProducts, postReview } from '../api';


const ProductsContext = createContext();


export function ProductsProvider({ children }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    const load = useCallback(async () => {
        try {
            setLoading(true);
            setError("");
            const list = await fetchProducts();
            setProducts(list);
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    }, []);


    useEffect(() => { load(); }, [load]);


    const addReview = async (productId, review) => {
        try {
            setError("");
            const updated = await postReview(productId, review);
            setProducts(prev => prev.map(p => (p.id === updated.id ? updated : p)));
        } catch (e) {
            setError(e.message);
            throw e;
        }
    };


    return (
        <ProductsContext.Provider value={{ products, loading, error, reload: load, addReview }}>
            {children}
        </ProductsContext.Provider>
    );
}


export const useProducts = () => useContext(ProductsContext);