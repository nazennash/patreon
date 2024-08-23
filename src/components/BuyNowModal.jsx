import React, { useState } from 'react';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useCart } from '../CartProvider';

const BuyNowModal = ({ isOpen, onClose, product }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [deliveryPoint, setDeliveryPoint] = useState('');
    const [thankYouMessage, setThankYouMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
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
        addToCart(product.id, quantity);
    };

    const handleBuyNow = () => {
        setThankYouMessage(`
            Thank you for buying ${quantity}  ${product.name}.\n
            Check your phone for payment prompt.\n
            Your order will be delivered to ${deliveryPoint}.\n
            Check your email for delivery details.
            `);
        console.log('Buying Now: ', product);
    };

    const handleQuantityChange = (amount) => {
        setQuantity((prevQuantity) => Math.max(1, prevQuantity + amount));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        handleBuyNow();
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

                        <div className='flex items-center mt-4'>
                            <button
                                className='bg-gray-300 text-gray-700 px-2 py-1 rounded'
                                onClick={() => handleQuantityChange(-1)}
                                disabled={isSubmitting}
                            >
                                &#8722;
                            </button>
                            <span className='mx-4 text-lg'>{quantity}</span>
                            <button
                                className='bg-gray-300 text-gray-700 px-2 py-1 rounded'
                                onClick={() => handleQuantityChange(1)}
                                disabled={isSubmitting}
                            >
                                &#43;
                            </button>
                        </div>

                        <form className='mt-4' onSubmit={handleSubmit}>
                            <input
                                type='text'
                                value={deliveryPoint}
                                onChange={(e) => setDeliveryPoint(e.target.value)}
                                placeholder='Enter delivery point (e.g., CBD, Nairobi)'
                                className='w-full p-2 border border-gray-300 rounded mb-4'
                                required
                                disabled={isSubmitting}
                            />

                            <button
                                type='submit'
                                className={`w-full bg-green-500 text-white font-bold py-2 px-4 rounded ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-700'
                                    }`}
                                disabled={isSubmitting}
                            >
                                Submit Order
                            </button>
                        </form>

                        {thankYouMessage && (
                            <p className='mt-4 text-green-600 font-bold'>{thankYouMessage}</p>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default BuyNowModal;
