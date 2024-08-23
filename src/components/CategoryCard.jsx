import React, { useState } from 'react';
import TruncatedText from './TruncatedText';
import { useCart } from '../CartProvider';
import BuyNowModal from './BuyNowModal';

const CategoryCard = ({ product }) => {
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(0);
    const [isBuyNowModalOpen, setIsBuyNowModalOpen] = useState(false);

    const handleAddToCart = () => {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        addToCart(product, 1);
    };

    const openModal = () => {
        setIsBuyNowModalOpen(true);
    };

    const closeModal = () => {
        setIsBuyNowModalOpen(false);
    };

    return (
        <>
            <div key={product.id} className='m-10 w-full md:w-1/2 lg:w-1/3 border rounded-lg p-3 shadow-md'>
                <div className='m-1'>
                    <span>
                        <button
                            className='font-bold bg-green-600 text-white py-1 px-2 rounded text-sm'
                            onClick={openModal}
                        >
                            Buy Now
                        </button>
                    </span>
                    {product.images.length > 0 && (
                        <img
                            src={product.images[0].image}
                            alt={product.name}
                            className='w-[auto] h-[200px] object-contain cursor-pointer mx-auto rounded-xl'
                            onClick={openModal}
                        />
                    )}

                    <div>
                        <div>
                            {product.description && (
                                <p className='text-sm mt-2'>{product.description}</p>
                            )}
                        </div>
                    </div>

                    <div className='px-1 border-t'>
                        <div className='font-semibold mt-1'>
                            <TruncatedText text={product.name} />
                        </div>
                        <div className='text-sm flex justify-between items-center'>
                            <span>Kshs. <span className='font-medium'>{product.price}</span></span>
                            <span>
                                <button
                                    className='font-bold bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 border border-blue-700 rounded'
                                    onClick={handleAddToCart}
                                >
                                    Add to Cart
                                </button>
                            </span>
                            <span>Colour: <span className='font-medium'>{product.color}</span></span>
                        </div>
                    </div>
                </div>
            </div>

            {isBuyNowModalOpen && (
                <BuyNowModal
                    isOpen={isBuyNowModalOpen}
                    onClose={closeModal}
                    product={product}
                />
            )}
        </>
    );
};

export default CategoryCard;
