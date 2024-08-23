import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiConfig } from '../apiConfig';
import CategoryCard from '../components/CategoryCard';

export const CategoryPage = () => {
    const { name } = useParams();
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');

    const getProducts = async () => {
        try {
            const queryParams = new URLSearchParams({
                category: name,
                search: search,
            }).toString();

            const response = await apiConfig.get(`/products/product/?${queryParams}`);
            setProducts(response.data.results);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        getProducts();
    }, [name, search]);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    return (
        <div className="container mx-auto my-4 px-4">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
                Category: {name}
            </h1>

            <div className="mb-6">
                <input
                    type="text"
                    value={search}
                    placeholder="Search by name or description"
                    onChange={handleSearchChange}
                    className="border border-gray-300 p-3 rounded-md w-full"
                />
            </div>

            <div className=" col-span-10 flex flex-wrap justify-start">
                {products.length > 0 ? (
                    products.map(product => (
                        <CategoryCard key={product.id} product={product} />
                    ))
                ) : (
                    <p>No products available for this category.</p>
                )}
            </div>
        </div>
    );
};
