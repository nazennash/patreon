import React, { useEffect, useState } from 'react';
import { apiConfig } from '../apiConfig';
import ProductCard from '../components/ProductCard';
import Modal from '../components/Modal';

export const NewArrivals = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 2;

    const getProducts = async (page = 1) => {
        try {
            const response = await apiConfig.get(`/products/product/new_arrivals/?page=${page}&limit=${itemsPerPage}`);
            setProducts(response.data.results);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        getProducts(currentPage);
    }, [currentPage]);

    const handleProductClick = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedProduct(null);
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <div className='m-5'>
            <div className='mb-3'>
                <h1><span className='text-2xl font-semibold'>New Arrivals:</span> <span>updated less 30 mins ago</span></h1>
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
            <div className="pagination">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    // className='bg-gray-300 p-2 rounded-lg mr-2'
                    className='p-2 rounded-lg mr-2'

                >
                    &larr; Back
                </button>
                <span> {currentPage} </span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={products.length < itemsPerPage}
                    className='p-2 rounded-lg ml-2'

                >
                    Next &rarr;
                </button>
            </div>
            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                product={selectedProduct}
            />
        </div>
    );
};
