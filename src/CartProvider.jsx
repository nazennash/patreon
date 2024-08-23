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

    const addToCart = (product, quantity) => {
        const updatedCart = {
            ...cart,
            [product.id]: {
                ...product,
                quantity: (cart[product.id]?.quantity || 0) + quantity
            }
        };
        setCart(updatedCart);

        const expiryDate = new Date();
        expiryDate.setMinutes(expiryDate.getMinutes() + 10);
        Cookies.set('cart', JSON.stringify(updatedCart), { expires: expiryDate });
    };

    const removeFromCart = (productId) => {
        const { [productId]: removedProduct, ...updatedCart } = cart;
        setCart(updatedCart);
        Cookies.set('cart', JSON.stringify(updatedCart));
    };

    const clearCart = () => {
        Cookies.remove('cart');
        setCart({});
    };

    const updateCartQuantity = (productId, newQuantity) => {
        const updatedCart = {
            ...cart,
            [productId]: {
                ...cart[productId],
                quantity: newQuantity
            }
        };
        setCart(updatedCart);
        Cookies.set('cart', JSON.stringify(updatedCart));
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, updateCartQuantity }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
