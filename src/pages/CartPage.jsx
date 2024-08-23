import React from 'react';
import { useCart } from '../CartProvider';

const CartPage = () => {
    const { cart, updateCartQuantity, removeItemFromCart, clearCart } = useCart();

    const subtotal = Object.values(cart).reduce(
        (acc, product) => acc + (parseFloat(product.price) || 0) * product.quantity,
        0
    );
    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    const handleIncreaseQuantity = (productId) => {
        const newQuantity = cart[productId].quantity + 1;
        updateCartQuantity(productId, newQuantity);
    };

    const handleDecreaseQuantity = (productId) => {
        const newQuantity = cart[productId].quantity - 1;
        if (newQuantity >= 1) {
            updateCartQuantity(productId, newQuantity);
        }
    };

    const handleClearCart = () => {
        clearCart();
    };

    const handleRemoveItem = (productId) => {
        removeItemFromCart(productId);
    };

    return (
        <div className="container mx-auto p-5">
            <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
            {Object.keys(cart).length === 0 ? (
                <p className="text-gray-600">Your cart is currently empty.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Cart Items */}
                    <div className="col-span-2">
                        {Object.entries(cart).map(([productId, productData]) => (
                            <div
                                key={productData.id}
                                className="flex justify-between items-center p-4 mb-4 border rounded-lg bg-white shadow-md"
                            >
                                <div className="flex space-x-4">
                                    <div className="flex-1">
                                        <h2 className="text-lg font-semibold">{productData.name}</h2>
                                        <p className="text-gray-600">Price: ${parseFloat(productData.price).toFixed(2)}</p>
                                        <div className="flex items-center space-x-2 mt-2">
                                            <button
                                                className="px-2 py-1 bg-gray-300 rounded-lg"
                                                onClick={() => handleDecreaseQuantity(productId)}
                                            >
                                                &minus;
                                            </button>
                                            <span className="px-4 py-1 border rounded">{productData.quantity}</span>
                                            <button
                                                className="px-2 py-1 bg-gray-300 rounded-lg"
                                                onClick={() => handleIncreaseQuantity(productId)}
                                            >
                                                &#43;
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleRemoveItem(productId)}
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="col-span-1">
                        <div className="p-4 bg-gray-100 rounded-lg shadow-md">
                            <h2 className="text-xl font-bold mb-4">Cart Summary</h2>
                            <div className="flex justify-between mb-2">
                                <span className="text-gray-700">Subtotal:</span>
                                <span className="font-semibold">${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span className="text-gray-700">Tax (10%):</span>
                                <span className="font-semibold">${tax.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-xl font-bold">
                                <span>Total:</span>
                                <span>${total.toFixed(2)}</span>
                            </div>

                            <button
                                className="mt-4 bg-green-500 text-white py-2 px-4 rounded w-full hover:bg-green-600"
                                onClick={() => alert("Proceed to checkout functionality!")}
                            >
                                Proceed to Checkout
                            </button>

                            <button
                                className="mt-4 bg-red-500 text-white py-2 px-4 rounded w-full hover:bg-red-600"
                                onClick={handleClearCart}
                            >
                                Clear Cart
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;
