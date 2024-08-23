import React, { useEffect, useState } from 'react';
import { apiConfig } from '../apiConfig';
import Modal from '../components/Modal';

export const Category = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(true);

    const itemsPerPage = 2;

    const getCategories = async (page = 1) => {
        try {
            const response = await apiConfig.get(`/products/category/?page=${page}&page_size=${itemsPerPage}`);
            setCategories(response.data.results || []);
            setHasNextPage(response.data.next !== null);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    useEffect(() => {
        getCategories(currentPage);
    }, [currentPage]);

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        window.location.href = `/category/${category.name}`;
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedCategory(null);
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <div className='m-5'>
            <div className='mb-3'>
                <h1 className='text-2xl font-semibold'>Categories</h1>
            </div>
            <hr />
            <div className='mt-3 flex flex-wrap'>
                {categories.map((category) => (
                    <div
                        key={category.id}
                        className='w-44 border rounded-lg p-3 shadow-md m-2 cursor-pointer'
                        onClick={() => handleCategoryClick(category)}
                    >
                        <div className='m-1'>
                            {category.images.length > 0 && (
                                <img
                                    src={category.images[0].image}
                                    alt={category.name}
                                    className='w-[auto] h-[150px] object-cover'
                                />
                            )}
                            <div className='px-1 border-t'>
                                <div className='font-semibold mt-1'>
                                    {category.name}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="pagination">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className='p-2 rounded-lg mr-2'
                >
                    &larr; Back
                </button>
                <span> {currentPage} </span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={!hasNextPage}
                    className='p-2 rounded-lg ml-2'
                >
                    Next &rarr;
                </button>
            </div>
            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                product={selectedCategory}
            />
        </div>
    );
};
