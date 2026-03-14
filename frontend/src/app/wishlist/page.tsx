"use client";

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import { wishlistService, cartService, authService } from '@/services/api';
import { useRouter } from 'next/navigation';
import { Trash2, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'react-hot-toast';

export default function WishlistPage() {
    const router = useRouter();
    const [wishlist, setWishlist] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchWishlist = async () => {
        try {
            const res = await wishlistService.get();
            setWishlist(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const user = authService.getCurrentUser();
        if (!user) {
            router.replace('/login');
            return;
        }
        fetchWishlist();
    }, [router]);

    const handleRemove = async (id: number) => {
        try {
            await wishlistService.remove(id);
            fetchWishlist();
            toast.success('Removed from Wishlist', { icon: '🗑️' });
        } catch (err) {
            console.error(err);
            toast.error('Failed to remove item');
        }
    };

    const handleAddToCart = async (product: any) => {
        try {
            await cartService.add(product.id, 1);
            window.dispatchEvent(new CustomEvent('cartUpdated'));
            // Optionally remove from wishlist after adding to cart
            // await handleRemove(product.wishlist_id);
            toast.success(
                <div className="flex flex-col gap-1">
                    <span className="font-bold">Added to Cart!</span>
                    <span className="text-[12px] opacity-90 line-clamp-1">{product.name}</span>
                </div>,
                { icon: '🛒' }
            );
        } catch (err) {
            console.error(err);
            toast.error('Failed to add to cart');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col text-black">
            <Navbar />

            <main className="max-w-[1200px] mx-auto w-full px-4 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-normal text-gray-900">Your Wishlist</h1>
                    <span className="text-gray-500">{wishlist.length} item(s)</span>
                </div>

                {loading ? (
                    <div className="flex justify-center p-10">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
                    </div>
                ) : wishlist.length === 0 ? (
                    <div className="bg-white p-10 text-center border shadow-sm rounded-sm">
                        <p className="text-lg text-gray-700">Your wishlist is empty.</p>
                        <Link href="/" className="text-[#007185] hover:underline mt-2 inline-block">Start adding items</Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {wishlist.map((item) => (
                            <div key={item.wishlist_id} className="bg-white border rounded shadow-sm hover:shadow-md transition-shadow p-4 flex flex-col group">
                                <Link href={`/product/${item.id}`} className="flex-1">
                                    <div className="h-48 flex items-center justify-center mb-4 bg-gray-50 rounded p-4">
                                        <img src={item.primary_image} alt={item.name} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform" />
                                    </div>
                                    <h3 className="text-sm font-medium text-gray-900 mb-1 line-clamp-2 h-10 group-hover:text-[#c45500]">
                                        {item.name}
                                    </h3>
                                    <p className="text-lg font-bold text-gray-900 mb-2">₹{item.price}</p>
                                </Link>

                                <div className="space-y-2 mt-4">
                                    <button
                                        onClick={() => handleAddToCart(item)}
                                        className="w-full bg-[#ffd814] hover:bg-[#f7ca00] text-[#111] py-1.5 rounded-full text-sm font-medium border border-[#fcd200] flex items-center justify-center gap-2"
                                    >
                                        <ShoppingCart size={16} /> Add to Cart
                                    </button>
                                    <button
                                        onClick={() => handleRemove(item.wishlist_id)}
                                        className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 py-1.5 rounded-full text-sm font-medium flex items-center justify-center gap-2"
                                    >
                                        <Trash2 size={16} /> Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
