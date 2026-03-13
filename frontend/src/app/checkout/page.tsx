"use client";

import React, { useState, useEffect } from 'react';
import { cartService, orderService } from '@/services/api';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, Lock } from 'lucide-react';
import OrderSummary from '@/components/OrderSummary';

export default function CheckoutPage() {
    const router = useRouter();
    const [cartItems, setCartItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        phone: ''
    });

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const res = await cartService.get();
                if (res.data.length === 0) {
                    router.push('/cart');
                    return;
                }
                setCartItems(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchCart();
    }, [router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const shipping = subtotal > 500 ? 0 : 40;
    const total = subtotal + shipping;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await orderService.create({
                shippingDetails: formData,
                totalAmount: total
            });
            if (res.success) {
                router.push(`/order-success?id=${res.orderId}`);
                window.dispatchEvent(new CustomEvent('cartUpdated'));
            }
        } catch (err) {
            console.error(err);
            alert('Failed to place order');
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col text-gray-900">
            {/* Simple Checkout Nav */}
            <div className="bg-white border-b py-4 px-8 flex items-center justify-between">
                <Link href="/">
                    <span className="text-2xl font-bold">amazon<span className="text-[#febd69]">.in</span></span>
                </Link>
                <h1 className="text-2xl font-normal hidden md:block text-gray-800">Checkout</h1>
                <Lock className="text-gray-400" />
            </div>

            <main className="max-w-6xl mx-auto w-full px-4 py-8 flex flex-col md:flex-row gap-8">
                <div className="flex-1 space-y-6">
                    {/* Shipping Address Section */}
                    <div className="bg-white border p-6 rounded-sm">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-bold">1 Enter a new shipping address</h2>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4 text-sm max-w-lg">
                            <div>
                                <label className="block font-bold mb-1 text-gray-800">Full name (First and Last name)</label>
                                <input
                                    type="text" name="name" required value={formData.name} onChange={handleChange}
                                    className="w-full border border-gray-400 p-2 rounded-sm focus:border-[#e77600] focus:ring-1 focus:ring-[#e77600] outline-none shadow-inner text-gray-900 bg-white"
                                />
                            </div>
                            <div>
                                <label className="block font-bold mb-1 text-gray-800">Address</label>
                                <input
                                    type="text" name="address" required value={formData.address} onChange={handleChange}
                                    className="w-full border border-gray-400 p-2 rounded-sm outline-none shadow-inner text-gray-900 bg-white"
                                    placeholder="Street address, P.O. box, etc."
                                />
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <label className="block font-bold mb-1 text-gray-800">City</label>
                                    <input
                                        type="text" name="city" required value={formData.city} onChange={handleChange}
                                        className="w-full border border-gray-400 p-2 rounded-sm outline-none shadow-inner text-gray-900 bg-white"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="block font-bold mb-1 text-gray-800">State</label>
                                    <input
                                        type="text" name="state" required value={formData.state} onChange={handleChange}
                                        className="w-full border border-gray-400 p-2 rounded-sm outline-none shadow-inner text-gray-900 bg-white"
                                    />
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-1/2">
                                    <label className="block font-bold mb-1 text-gray-800">Zip Code</label>
                                    <input
                                        type="text" name="zipCode" required value={formData.zipCode} onChange={handleChange}
                                        className="w-full border border-gray-400 p-2 rounded-sm outline-none shadow-inner text-gray-900 bg-white"
                                    />
                                </div>
                                <div className="w-1/2">
                                    <label className="block font-bold mb-1 text-gray-800">Phone number</label>
                                    <input
                                        type="text" name="phone" required value={formData.phone} onChange={handleChange}
                                        className="w-full border border-gray-400 p-2 rounded-sm outline-none shadow-inner text-gray-900 bg-white"
                                    />
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Order Review Section */}
                    <div className="bg-white border p-6 rounded-sm">
                        <h2 className="text-lg font-bold mb-4">2 Review items</h2>
                        <div className="space-y-4">
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex gap-4 py-2 border-b last:border-0">
                                    <img src={item.primary_image} alt="" className="w-16 h-16 object-contain" />
                                    <div>
                                        <p className="font-bold text-sm text-gray-900">{item.name}</p>
                                        <p className="text-red-700 font-bold text-sm">₹{item.price}</p>
                                        <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Place Order Sidebar */}
                <div className="w-full md:w-80 h-fit bg-white border p-4 rounded-sm">
                    <button
                        onClick={handleSubmit}
                        className="w-full bg-[#ffd814] hover:bg-[#f7ca00] text-[#111] py-2 rounded-lg text-sm font-medium text-center shadow-sm border border-[#fcd200] mb-4"
                    >
                        Use this address
                    </button>
                    <p className="text-xs text-gray-500 text-center mb-4 leading-tight">
                        By placing your order, you agree to Amazon's privacy notice and conditions of use.
                    </p>
                    <div className="border-t pt-4">
                        <h3 className="font-bold text-sm mb-4">Order Summary</h3>
                        <OrderSummary subtotal={subtotal} shipping={shipping} total={total} />
                    </div>
                </div>
            </main>
        </div>
    );
}
