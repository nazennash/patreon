import React, { useState } from 'react';
import TruncatedText from './TruncatedText';
import { useCart } from '../CartProvider';
import Modal from './Modal';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddToCart = () => {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        addToCart(product.id, 1);
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div key={product.id} className='w-44 border rounded-lg p-3 shadow-md m-2'>
                <div className='m-1'>
                    <button
                        className='w-5 h-5 rounded-full border-2 border-gray-400 text-center text-black flex items-center justify-center bg-transparent text-lg'
                        onClick={handleAddToCart}
                    >
                        &#43;
                    </button>
                    {product.images.length > 0 && (
                        <img
                            src={product.images[0].image}
                            alt={product.name}
                            className='w-[auto] h-[150px] object-contain cursor-pointer'
                            onClick={openModal}
                        />
                    )}
                    <div className='px-1 border-t'>
                        <div className='font-semibold mt-1'>
                            <TruncatedText text={product.name} />
                        </div>
                        <div className='text-sm'>
                            Kshs. <span className='font-medium'>{product.price}</span>
                        </div>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <Modal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    product={product}
                />
            )}
        </>
    );
};

export default ProductCard;
