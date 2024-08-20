import React, { useEffect, useState } from 'react';
import TruncatedText from './TruncatedText';
import { apiConfig } from '../apiConfig';

const ProductCard = ({ product, onClick }) => {
    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = async () => {
        setQuantity(prevQuantity => prevQuantity + 1);

        try {
            await apiConfig.post('/products/cart/', {
                quantity,
                productId: product.id
            });
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };

    useEffect(() => {
        console.log(product.id);
        console.log(quantity);
    }, [product.id]);

    return (
        <div key={product.id} className='w-44 border rounded-lg p-3 shadow-md'>
            <button
                className='w-5 h-5 rounded-full border-2 border-gray-400 text-center text-black flex items-center justify-center bg-transparent text-lg'
                onClick={handleAddToCart}
            >
                &#43;
            </button>
            {product.images.length > 0 && (
                <img
                    key={product.id}
                    src={product.images[0].image}
                    alt={product.name}
                    className='w-[auto] h-[150px] object-contain cursor-pointer'
                    onClick={() => onClick(product)}
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
    );
};

export default ProductCard;
