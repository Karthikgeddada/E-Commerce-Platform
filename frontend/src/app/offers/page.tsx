"use client";

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { productService } from '@/services/api';
import Navbar from '@/components/Navbar';
import ProductGrid from '@/components/ProductGrid';
import Link from 'next/link';

function OffersContent() {
    const searchParams = useSearchParams();
    const category = searchParams.get('category') || '';
    const initialSort = searchParams.get('sort') || 'Discount: High to Low';

    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [minRating, setMinRating] = useState<number | null>(null);
    const [sortBy, setSortBy] = useState(initialSort);

    useEffect(() => {
        const fetchOffers = async () => {
            setLoading(true);
            try {
                const params: any = { offersOnly: 'true' };
                if (category) params.category = category;
                if (minRating) params.minRating = minRating;
                if (sortBy !== 'Featured') params.sort = sortBy;

                const response = await productService.getAll(params);
                setProducts(response.data);
            } catch (err) {
                setError('Failed to load deals. Please check if backend is running.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchOffers();
    }, [category, minRating, sortBy]);

    return (
        <div className="min-h-screen bg-[#F7F8F8] flex flex-col">
            <Navbar />

            {/* Deals Header Section */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-6">
                    <h1 className="text-2xl font-bold text-[#111]">Today's Deals</h1>
                    <p className="text-sm text-gray-600 mt-1 font-medium">Extra savings for everyone. Check out our latest limited-time deals below.</p>
                </div>
            </div>

            <main className="flex-1 w-full pb-10 px-2 md:px-4">
                <div className="max-w-[1600px] mx-auto w-full mt-6">
                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Sidebar Filters */}
                        <div className="w-full md:w-[260px] flex-shrink-0">
                            <div className="sticky top-[80px] space-y-8 bg-white p-5 rounded-sm shadow-sm border border-gray-100">
                                <div>
                                    <h4 className="font-bold text-[14px] mb-3 text-gray-900 border-b pb-2 uppercase tracking-wide">Category</h4>
                                    <ul className="space-y-2 text-[14px] text-gray-700">
                                        <li><Link href="/offers" className={`hover:text-[#c45500] transition-colors ${!category ? 'font-bold text-black border-l-2 border-[#e67a00] pl-2 -ml-2' : ''}`}>All Deals</Link></li>
                                        {['Electronics', 'Amazon Fashion', 'Shoes & Handbags', 'Appliances', 'Home & Kitchen', 'Books', 'Beauty', 'Sports, Fitness & Outdoors', 'Grocery & Gourmet Foods'].map((cat) => (
                                            <li key={cat}>
                                                <Link href={`/offers?category=${encodeURIComponent(cat)}`} className={`hover:text-[#c45500] transition-colors ${category === cat ? 'font-bold text-black border-l-2 border-[#e67a00] pl-2 -ml-2' : ''}`}>
                                                    {cat}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <h4 className="font-bold text-[14px] mb-3 text-gray-900 border-b pb-2 uppercase tracking-wide">Customer Review</h4>
                                    <div className="space-y-3 text-[14px] text-gray-700">
                                        {[4, 3, 2, 1].map(s => (
                                            <p
                                                key={s}
                                                onClick={() => setMinRating(minRating === s ? null : s)}
                                                className={`hover:text-[#c45500] cursor-pointer flex items-center gap-1 transition-colors ${minRating === s ? 'text-[#c45500] font-bold' : ''}`}
                                            >
                                                <span className="text-[#febd69] text-lg">{'★'.repeat(s)}{'☆'.repeat(5 - s)}</span>
                                                <span className="text-xs">& Up</span>
                                            </p>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-[#cc0c39]/5 p-5 rounded-sm border border-[#cc0c39]/20">
                                    <p className="text-sm font-bold text-[#cc0c39] mb-1">Limited Time Deal</p>
                                    <p className="text-xs text-gray-700 leading-relaxed font-medium">Flash sales ending soon! Grab yours before they disappear.</p>
                                </div>
                            </div>
                        </div>

                        {/* Product Listing */}
                        <div className="flex-1">
                            <div className="mb-6 bg-white p-5 shadow-sm border border-gray-100 flex justify-between items-center rounded-sm">
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900 leading-tight">
                                        {category ? `${category} Deals` : 'Top Deals'}
                                    </h2>
                                    <p className="text-[13px] text-gray-500 mt-1">{products.length} limited-time offers available</p>
                                </div>
                                <div className="hidden sm:block">
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="bg-gray-100 border border-gray-300 text-[13px] rounded-md px-4 py-2 outline-none focus:border-[#e67a00] shadow-sm cursor-pointer hover:bg-gray-200 transition-colors"
                                    >
                                        <option value="Discount: High to Low">Sort by: Top Deals</option>
                                        <option value="Featured">Sort by: Featured</option>
                                        <option value="Price: Low to High">Price: Low to High</option>
                                        <option value="Price: High to Low">Price: High to Low</option>
                                        <option value="Avg. Customer Review">Avg. Customer Review</option>
                                    </select>
                                </div>
                            </div>

                            {loading ? (
                                <div className="flex flex-col items-center justify-center p-40 bg-white shadow-sm rounded-sm border border-gray-100">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#CC0C39]"></div>
                                    <p className="mt-4 text-gray-500 font-medium">Hunting for best deals...</p>
                                </div>
                            ) : error ? (
                                <div className="bg-white p-10 shadow-sm rounded-sm text-center border border-gray-100">
                                    <div className="bg-red-50 text-red-700 p-6 border border-red-100 rounded-sm italic">
                                        {error}
                                    </div>
                                </div>
                            ) : (
                                <ProductGrid products={products} />
                            )}
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-[#232f3e] text-white mt-auto">
                <div className="bg-[#37475a] py-4 text-center text-[13px] font-bold hover:bg-[#485769] cursor-pointer transition-colors shadow-inner">
                    Back to top
                </div>
                <div className="max-w-[1000px] mx-auto py-10 flex flex-col items-center gap-6">
                    <Link href="/" className="text-2xl font-bold tracking-tight">amazon<span className="text-[#febd69]">.in</span></Link>
                    <div className="flex gap-4 text-[12px] text-gray-400">
                        <span>© 1996-2024, Amazon.com, Inc. or its affiliates</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default function OffersPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading Deals...</div>}>
            <OffersContent />
        </Suspense>
    );
}
