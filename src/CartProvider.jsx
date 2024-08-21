import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const cookieCart = Cookies.get('cart') ? JSON.parse(Cookies.get('cart')) : {};
        return cookieCart;
    });

    useEffect(() => {
        const checkCartExpiry = () => {
            const cookieCart = Cookies.get('cart');
            if (cookieCart) {
                const parsedCart = JSON.parse(cookieCart);
                if (!parsedCart || Object.keys(parsedCart).length === 0) {
                    Cookies.remove('cart');
                    setCart({});
                }
            }
        };

        checkCartExpiry();
    }, []);

    const addToCart = (productId, quantity) => {
        const updatedCart = { ...cart, [productId]: (cart[productId] || 0) + quantity };
        setCart(updatedCart);

        // Set the cart cookie with a 7-day expiration time
        // Cookies.set('cart', JSON.stringify(updatedCart), { expires: 7 });

        const expiryDate = new Date();
        expiryDate.setMinutes(expiryDate.getMinutes() + 10);

        Cookies.set('cart', JSON.stringify(updatedCart), { expires: expiryDate });
    };

    const clearCart = () => {
        Cookies.remove('cart');
        setCart({});
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
