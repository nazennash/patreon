import React, { useState } from 'react';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useCart } from '../CartProvider';

const Modal = ({ isOpen, onClose, product }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const { addToCart } = useCart();

    if (!isOpen) return null;

    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
        );
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const handleAddToCart = () => {
        addToCart(product.id, 1);
    };

    const handleBuyNow = () => {
        console.log('Buying Now: ', product);
    };

    return (
        <div className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50'>
            <div className='relative bg-white rounded-lg p-5 w-11/12 md:w-2/3 xl:w-1/3'>
                <button
                    className='absolute top-2 right-2 text-gray-800 hover:text-gray-900'
                    onClick={onClose}
                >
                    <FaTimes className='w-6 h-6' />
                </button>
                {product && (
                    <>
                        <div className='relative'>
                            <img
                                src={product.images[currentIndex].image}
                                alt={product.name}
                                className='w-full h-[200px] lg:h-[250px] object-contain cursor-pointer'
                            />
                            <button
                                onClick={handlePrev}
                                className='absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-800 hover:text-gray-900'
                            >
                                <FaChevronLeft className='w-6 h-6' />
                            </button>
                            <button
                                onClick={handleNext}
                                className='absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-800 hover:text-gray-900'
                            >
                                <FaChevronRight className='w-6 h-6' />
                            </button>
                        </div>
                        <h2 className='text-xl font-bold mt-4'>{product.name}</h2>
                        <p className='text-md mt-2 mb-2'>Kshs. {product.price}</p>
                        <hr />
                        <p className='mt-3'>{product.description}</p>

                        <div className='flex justify-between'>
                            <button
                                className='w-1/2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-l mt-4'
                                onClick={handleAddToCart}
                            >
                                &#43; Cart
                            </button>
                            <button
                                className='w-1/2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-r mt-4'
                                onClick={handleBuyNow}
                            >
                                Buy Now
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Modal;
