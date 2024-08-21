import React, { useEffect, useState } from 'react';
import { apiConfig } from '../apiConfig';
import ProductCard from '../components/ProductCard';
import Modal from '../components/Modal';

export const Products = () => {
    const [products, setProducts] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [noResultsFound, setNoResultsFound] = useState(false);

    const handleSearch = (event) => {
        setSearchInput(event.target.value);
    };

    const getProducts = async () => {
        try {
            const response = await apiConfig.get('/products/product/');
            setProducts(response.data);
            setAllProducts(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const searchProducts = async (searchQuery) => {
        try {
            if (searchQuery === '') {
                setNoResultsFound(false);
                setProducts(allProducts);
            } else {
                const response = await apiConfig.get(`/products/product/?search=${searchQuery}`);
                if (response.data.length > 0) {
                    setProducts(response.data);
                    setNoResultsFound(false);
                } else {
                    setNoResultsFound(true);
                    setProducts(allProducts);
                }
            }
        } catch (error) {
            console.error("Error searching products:", error);
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    useEffect(() => {
        searchProducts(searchInput);
    }, [searchInput]);

    const handleProductClick = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedProduct(null);
    };

    return (
        <div className='m-5'>
            <div className='flex justify-between'>
                <input
                    type="text"
                    placeholder="Search products..."
                    className="flex items-center mx-auto border border-black p-2 mb-4 w-10/12 rounded-b-xl"
                    value={searchInput}
                    onChange={handleSearch}
                />
            </div>
            <div className='mb-3'>
                <h1 className='text-2xl font-semibold'>Products</h1>
                {noResultsFound && (
                    <p className="text-red-500">No matching products found.</p>
                )}
            </div>
            <hr />
            <div className='mt-3 flex flex-wrap'>
                {products.map((item) => (
                    <ProductCard
                        key={item.id}
                        product={item}
                        onClick={() => handleProductClick(item)}
                    />
                ))}
            </div>
            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                product={selectedProduct}
            />
        </div>
    );
};
