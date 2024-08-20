import React, { useEffect, useState } from 'react';
import { apiConfig } from '../apiConfig';
import ProductCard from '../components/ProductCard';
import Modal from '../components/Modal';

export const Products = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const getProducts = async () => {
        const response = await apiConfig.get('/products/product');
        setProducts(response.data);
    };

    useEffect(() => {
        getProducts();
    }, []);

    const handleProductClick = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedProduct(null);
    };

    return (
        <div className='m-5'>
            <div className='mb-3'>
                <h1 className='text-2xl font-semibold'>Products</h1>
            </div>
            <hr />
            <div className='mt-3 flex flex-wrap'>
                {products.map((item) => (
                    <ProductCard
                        key={item.id}
                        product={item}
                        onClick={() => handleProductClick(item)}
                    />
                ))}
            </div>
            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                product={selectedProduct}
            />
        </div>
    );
};
