import React from 'react';
import TruncatedText from './TruncatedText';

const ProductCard = ({ product }) => {
    return (
        <div key={product.id} className='w-44 border rounded-lg p-3 shadow-md'>
            <button className='w-5 h-5 rounded-full border-2 border-gray-400 text-center text-black flex items-center justify-center bg-transparent text-lg'>
                &#43;
            </button>
            {product.images.length > 0 && (
                <img src={product.images[0].image} alt="image" key={product.images[0].image} className='w-[auto] h-[150px] object-contain' />
            )}
            <div className='px-1 border-t'>
                <div className='font-semibold mt-1'>
                    <TruncatedText text={product.name} />
                </div>
                <div className='text-sm'>
                    Kshs. {product.price}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
