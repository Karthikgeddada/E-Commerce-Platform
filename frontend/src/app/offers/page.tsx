"use client";

import React, { useEffect, useState, Suspense } from 'react';
import { productService } from '@/services/api';
import Navbar from '@/components/Navbar';
import ProductGrid from '@/components/ProductGrid';
import Link from 'next/link';

function OffersContent() {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchOffers = async () => {
            setLoading(true);
            try {
                // Fetch only products with discounts
                const response = await productService.getAll({ offersOnly: 'true' });
                setProducts(response.data);
            } catch (err) {
                setError('Failed to load offers. Please check if backend is running.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchOffers();
    }, []);

    return (
        <div className="min-h-screen bg-[#F8F9FA] flex flex-col">
            <Navbar />

            {/* Premium Offers Banner */}
            <div className="bg-[#232f3e] text-white py-12 px-4 shadow-inner overflow-hidden relative">
                <div className="max-w-[1500px] mx-auto relative z-10">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="flex-1 text-center md:text-left">
                            <h1 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight">Today's Deals</h1>
                            <p className="text-lg md:text-xl text-gray-300 font-medium max-w-2xl">
                                Explore massive discounts on electronics, fashion, home essentials and more.
                                <span className="text-[#febd69] font-bold block mt-2 text-2xl">Limited Time Only!</span>
                            </p>
                        </div>
                        <div className="flex-shrink-0 bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 hidden md:block">
                            <div className="flex items-center gap-4">
                                <div className="text-center">
                                    <span className="text-4xl font-black text-[#febd69]">Up to 70%</span>
                                    <span className="block text-xs uppercase tracking-widest font-bold mt-1">Huge Savings</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#febd69]/10 to-transparent pointer-events-none"></div>
                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#febd69]/5 rounded-full blur-3xl"></div>
            </div>

            <main className="flex-1 w-full pb-20 px-4 md:px-8 mt-8">
                <div className="max-w-[1500px] mx-auto">
                    {/* Filters & Info Bar */}
                    <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4 border-b border-gray-200 pb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">Recommended Deals</h2>
                            <p className="text-sm text-gray-500 mt-1">{products.length} blockbuster deals active right now</p>
                        </div>
                        <div className="flex gap-3">
                            <span className="bg-white border border-gray-300 px-4 py-2 rounded-full text-xs font-bold text-gray-700 shadow-sm cursor-default">
                                All Categories
                            </span>
                            <span className="bg-[#cc0c39] text-white px-4 py-2 rounded-full text-xs font-bold shadow-md cursor-default">
                                Live Now
                            </span>
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex items-center justify-center p-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#e67a00]"></div>
                        </div>
                    ) : error ? (
                        <div className="bg-white p-10 shadow-md rounded-lg text-center border border-gray-100 max-w-2xl mx-auto">
                            <div className="text-red-600 mb-4 font-bold">⚠️ {error}</div>
                            <button
                                onClick={() => window.location.reload()}
                                className="bg-[#232f3e] text-white px-6 py-2 rounded-md font-bold"
                            >
                                Retry
                            </button>
                        </div>
                    ) : products.length === 0 ? (
                        <div className="bg-white p-20 shadow-sm rounded-lg text-center border border-gray-200">
                            <h3 className="text-xl font-bold text-gray-800">No active deals found</h3>
                            <p className="text-gray-500 mt-2">Check back later for new offers!</p>
                            <Link href="/" className="mt-6 inline-block text-[#007185] hover:underline font-bold">
                                Back to Shopping
                            </Link>
                        </div>
                    ) : (
                        <ProductGrid products={products} />
                    )}
                </div>
            </main>

            {/* Simple Footer */}
            <footer className="bg-[#232f3e] text-white py-12 mt-auto">
                <div className="max-w-[1500px] mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <Link href="/" className="text-2xl font-bold tracking-tight">amazon<span className="text-[#febd69]">.in</span></Link>
                    <div className="flex gap-8 text-[13px] text-gray-400">
                        <Link href="/" className="hover:underline">Privacy Notice</Link>
                        <Link href="/" className="hover:underline">Conditions of Use</Link>
                        <Link href="/" className="hover:underline">Interest-Based Ads</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default function OffersPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading deals...</div>}>
            <OffersContent />
        </Suspense>
    );
}
