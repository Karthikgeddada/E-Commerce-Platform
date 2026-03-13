"use client";

import React from 'react';
import ProductCard from './ProductCard';

interface ProductGridProps {
    products: any[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
    if (products.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-gray-500">
                <p className="text-xl">No products found matching your search.</p>
                <button
                    onClick={() => window.location.href = '/'}
                    className="mt-4 text-[#007185] hover:underline"
                >
                    Clear all filters
                </button>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};

export default ProductGrid;
