"use client";

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import { cartService, authService } from '@/services/api';
import Link from 'next/link';
import { Trash2, ChevronRight } from 'lucide-react';

export default function CartPage() {
    const [cartItems, setCartItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);

    const fetchCart = async () => {
        const currentUser = authService.getCurrentUser();
        if (!currentUser) {
            setLoading(false);
            setCartItems([]);
            return;
        }

        try {
            const res = await cartService.get();
            setCartItems(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setUser(authService.getCurrentUser());
        fetchCart();
    }, []);

    const handleUpdateQuantity = async (id: number, qty: number) => {
        try {
            await cartService.update(id, qty);
            fetchCart();
            window.dispatchEvent(new CustomEvent('cartUpdated'));
        } catch (err) {
            console.error(err);
        }
    };

    const handleRemove = async (id: number) => {
        try {
            await cartService.remove(id);
            fetchCart();
            window.dispatchEvent(new CustomEvent('cartUpdated'));
        } catch (err) {
            console.error(err);
        }
    };

    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <div className="min-h-screen bg-[#eaeded] flex flex-col">
            <Navbar />

            <main className="flex-1 max-w-[1500px] mx-auto w-full px-4 lg:px-8 py-8 flex flex-col lg:flex-row gap-8">
                {/* Left Area (Items or Empty State) */}
                <div className={`flex-1 bg-white p-8 shadow-sm rounded-sm border border-gray-100 ${cartItems.length === 0 ? 'min-h-[460px] flex items-center justify-center' : ''}`}>
                    {loading ? (
                        <div className="flex justify-center py-20 w-full"><div className="animate-spin h-10 w-10 border-b-2 border-[#e77600] rounded-full"></div></div>
                    ) : cartItems.length === 0 ? (
                        <div className="w-full flex flex-col md:flex-row items-center gap-12 py-4">
                            <div className="w-full md:w-[450px] flex justify-center">
                                <img
                                    src="https://m.media-amazon.com/images/G/31/cart/empty/kettle-desaturated._CB445243649_.svg"
                                    className="w-full opacity-90 drop-shadow-sm"
                                    alt="Empty Cart"
                                />
                            </div>
                            <div className="flex-1 text-center md:text-left">
                                <h1 className="text-[28px] font-bold text-[#111] mb-1 leading-tight">Your Amazon Cart is empty</h1>
                                <Link href="/" className="text-[#007185] hover:text-[#c45500] hover:underline text-[14px] font-medium block mb-6">Shop today's deals</Link>

                                {!user && (
                                    <div className="flex flex-wrap gap-2 items-center justify-center md:justify-start">
                                        <Link
                                            href="/login"
                                            className="bg-[#ffd814] hover:bg-[#f7ca00] px-6 py-[7px] rounded-[8px] font-medium shadow-sm border border-[#fcd200] text-[13px] text-[#111] transition-all hover:shadow-md"
                                        >
                                            Sign in to your account
                                        </Link>
                                        <Link
                                            href="/signup"
                                            className="bg-white hover:bg-gray-50 px-6 py-[7px] rounded-[8px] font-medium shadow-sm border border-[#d5d9d9] text-[13px] text-[#111] transition-all hover:shadow-md"
                                        >
                                            Sign up now
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col">
                            <div className="flex justify-between items-end border-b pb-1 mb-2">
                                <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
                                <span className="text-[14px] text-gray-500 mb-1">Price</span>
                            </div>
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex py-6 border-b last:border-0 gap-8 group">
                                    <div className="w-44 h-44 flex-shrink-0 flex items-center justify-center p-4 bg-[#f7f8f8] rounded-sm relative overflow-hidden">
                                        <img src={item.primary_image} alt={item.name} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500 mix-blend-multiply" />
                                    </div>
                                    <div className="flex-1 flex flex-col">
                                        <div className="flex justify-between items-start mb-2 group-hover:text-[#007185] transition-colors">
                                            <h3 className="text-[18px] font-bold text-gray-900 leading-snug lg:max-w-[80%] line-clamp-2">{item.name}</h3>
                                            <span className="font-bold text-[18px] text-gray-900 whitespace-nowrap">₹{Number(item.price).toLocaleString('en-IN')}</span>
                                        </div>
                                        <p className="text-[#007600] text-[12px] font-bold mb-1">In stock</p>
                                        <div className="flex items-center gap-1.5 mb-4">
                                            <img src="https://m.media-amazon.com/images/G/31/marketing/fba/prime-badge-32x.png" className="h-3.5" alt="Prime" />
                                            <span className="text-[12px] text-gray-500 font-medium">Eligible for FREE Shipping</span>
                                        </div>

                                        <div className="mt-auto flex items-center gap-4 text-[13px] text-[#007185]">
                                            <div className="flex items-center bg-[#f0f2f2] rounded-[8px] border border-gray-300 shadow-sm px-3 py-1 group-hover:border-gray-400 transition-colors">
                                                <span className="mr-2 text-gray-600 font-medium">Qty:</span>
                                                <select
                                                    value={item.quantity}
                                                    onChange={(e) => handleUpdateQuantity(item.id, Number(e.target.value))}
                                                    className="bg-transparent outline-none font-bold text-gray-900 cursor-pointer"
                                                >
                                                    {[...Array(10)].map((_, i) => (
                                                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="h-4 w-px bg-gray-300"></div>
                                            <button
                                                onClick={() => handleRemove(item.id)}
                                                className="hover:underline hover:text-[#c45500] font-medium"
                                            >
                                                Delete
                                            </button>
                                            <div className="h-4 w-px bg-gray-300"></div>
                                            <button className="hover:underline hover:text-[#c45500] font-medium">Save for later</button>
                                            <div className="h-4 w-px bg-gray-300"></div>
                                            <button className="hover:underline hover:text-[#c45500] font-medium hidden sm:block">Compare with similar items</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className="flex justify-end pt-6">
                                <span className="text-[18px] text-gray-900">Subtotal ({itemCount} items): <span className="font-bold text-xl">₹{subtotal.toLocaleString('en-IN')}</span></span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Right: Checkout Sidebar */}
                {cartItems.length > 0 && (
                    <div className="w-full lg:w-80 flex flex-col gap-5">
                        <div className="bg-white p-6 shadow-sm rounded-sm border border-gray-100 flex flex-col">
                            <div className="flex items-center gap-2 text-[#007600] mb-4 bg-green-50 p-2.5 rounded-sm border border-green-100">
                                <div className="p-0.5 bg-green-600 rounded-full text-white"><ChevronRight size={12} className="rotate-90" /></div>
                                <span className="text-[12px] font-bold">Your order is eligible for FREE Delivery.</span>
                            </div>

                            <div className="mb-6">
                                <span className="text-[18px] flex flex-wrap items-center text-gray-900">
                                    Subtotal ({itemCount} items): <span className="font-bold ml-1 text-xl">₹{subtotal.toLocaleString('en-IN')}</span>
                                </span>
                            </div>

                            <div className="flex items-center gap-2 mb-6 text-[14px] text-gray-800 cursor-pointer">
                                <input type="checkbox" className="w-4 h-4 accent-green-700" id="gift" />
                                <label htmlFor="gift" className="cursor-pointer">This order contains a gift</label>
                            </div>

                            <Link
                                href="/checkout"
                                className="block w-full bg-[#ffd814] hover:bg-[#f7ca00] text-[#111] py-2.5 rounded-full text-[14px] font-bold text-center shadow-sm border border-[#fcd200] transition-all hover:scale-[1.01] active:scale-[0.98]"
                            >
                                Proceed to Buy
                            </Link>
                        </div>
                    </div>
                )}
            </main>

            {cartItems.length === 0 && !loading && !user && (
                <div className="w-full bg-white border-t border-gray-200 py-12">
                    <div className="max-w-[1500px] mx-auto px-4 lg:px-8">
                        <div className="flex flex-col items-center justify-center p-8 border border-gray-200 rounded-md">
                            <h3 className="text-[17px] font-bold text-[#111] mb-4">See personalized recommendations</h3>
                            <Link
                                href="/login"
                                className="bg-[#ffd814] hover:bg-[#f7ca00] px-32 py-1.5 rounded-[8px] font-bold shadow-sm border border-[#fcd200] text-[13px] text-[#111] text-center transition-all hover:shadow-md active:bg-[#f0c14b]"
                            >
                                Sign in
                            </Link>
                            <p className="text-[11px] text-[#111] mt-3">
                                New customer? <Link href="/signup" className="text-[#007185] hover:text-[#c45500] hover:underline">Start here.</Link>
                            </p>
                        </div>
                    </div>
                </div>
            )}

            <div className="bg-white py-10 px-4 border-t border-gray-100">
                <div className="max-w-[1500px] mx-auto">
                    <p className="text-[11px] text-gray-500 leading-normal">
                        The price and availability of items at Amazon.in are subject to change. The shopping cart is a temporary place to store a list of your items and reflects each item's most recent price. <br />
                        Do you have a gift card or promotional code? We'll ask you to enter your claim code when it's time to pay.
                    </p>
                </div>
            </div>
        </div>
    );
}
