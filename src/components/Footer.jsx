import React from 'react';
import { BiCart } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { useCart } from '../CartProvider';

export const Footer = () => {
    const { cart } = useCart();
    const totalQuantity = Object.values(cart).reduce((acc, item) => acc + (item.quantity || 0), 0);

    return (
        <footer className="text-gray-600 body-font shadow-md fixed bottom-0 inset-x-0 sm:hidden bg-blue-400">
            <div className="container mx-auto flex items-center justify-evenly p-2">

                <div className="flex space-x-2">
                    <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base">
                        <span className="ml-1 font-bold">0</span>
                    </button>

                    <Link to="/cart">
                        <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base">
                            <BiCart className="w-6 h-6 text-gray-700" />
                            <span className="ml-1 font-bold">{totalQuantity}</span>
                        </button>
                    </Link>
                </div>
            </div>
        </footer>
    );
};
