import React, { useEffect, useState } from 'react';
import { apiConfig } from '../apiConfig';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';

export const Products = () => {
    const [products, setProducts] = useState([]);

    const getProducts = async () => {
        const response = await apiConfig.get('/products/product');
        setProducts(response.data);
    };

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <div className='m-5'>
            <div className='mb-3'>
                <h1 className='text-2xl font-semibold'>Products</h1>
            </div>
            <hr />
            <div className='mt-3'>
                {products.map((item) => (
                    <ProductCard key={item.id} product={item} />
                ))}
            </div>
        </div>
    );
};
