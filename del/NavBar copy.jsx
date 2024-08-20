import React, { useEffect, useState } from 'react';
import { Message } from 'react-icons-dom';
import { BiCart } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { apiConfig } from '../apiConfig';

export const NavBar = () => {
    const [cartCount, setCartCount] = useState(0);

    const getCartCount = async () => {
        try {
            const response = await apiConfig.get('/products/carts');
            const cartData = response.data; // Assume response.data is an array
            if (cartData.length > 0) {
                setCartCount(cartData[0].total_quantity); // Access the total_quantity from the first cart object
            }
        } catch (error) {
            console.error("Error fetching cart count:", error);
        }
    };


    useEffect(() => {
        getCartCount();
    }, []);

    return (
        <header className="text-gray-600 body-font shadow-md">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center justify-between">
                <Link to="/" className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        xml:space="preserve"
                        className="fill-current text-orange-600"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M20 34a2 2 0 1 1-3.999.001A2 2 0 0 1 20 34zm12 30a31.84 31.84 0 0 1-12.55-2.579A5.99 5.99 0 0 1 16 56V45.047A5.047 5.047 0 0 1 21.047 40c1.212 0 2.322.432 3.195 1.146A11.937 11.937 0 0 0 32 44c6.628 0 12-5.372 12-12s-5.372-12-12-12c-4.797 0-8.924 2.822-10.846 6.89l-.021-.012A1.998 1.998 0 0 1 19.343 28a2 2 0 0 1-2-2c0-.432.141-.829.374-1.154C20.344 19.607 25.741 16 32 16c8.836 0 16 7.164 16 16s-7.164 16-16 16c-3.922 0-7.486-1.442-10.262-3.794.002.024-.002.034-.02.021a1.062 1.062 0 0 0-1.718.835V56c0 .749.424 1.384 1.033 1.727A27.67 27.67 0 0 0 32 60c15.465 0 28-12.536 28-28S47.465 4 32 4C16.536 4 4 16.536 4 32v30a2 2 0 1 1-4 0V32C0 14.327 14.327 0 32 0s32 14.327 32 32-14.327 32-32 32z"
                        />
                    </svg>
                    <span className="ml-3 text-2xl font-bold text-gray-900">Patreon</span>
                </Link>

                <div className="flex items-center space-x-2">
                    <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base">
                        <Message className="w-6 h-6 text-gray-700" />
                        <span className="ml-1 font-bold">0</span>
                    </button>

                    <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base">
                        <BiCart className="w-6 h-6 text-gray-700" />
                        <span className="ml-1 font-bold">{cartCount}</span>
                    </button>
                </div>
            </div>
        </header>
    );
};
