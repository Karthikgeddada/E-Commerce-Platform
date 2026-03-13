"use client";

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { orderService } from '@/services/api';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

function OrderSuccessContent() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get('id');
    const [order, setOrder] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (orderId) {
            const fetchOrder = async () => {
                try {
                    const res = await orderService.getById(orderId as string);
                    setOrder(res.data);
                } catch (err) {
                    console.error(err);
                } finally {
                    setLoading(false);
                }
            };
            fetchOrder();
        }
    }, [orderId]);

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    if (!order) return <div className="min-h-screen flex items-center justify-center">Order not found</div>;

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col text-black">
            <Navbar />

            <main className="max-w-4xl mx-auto w-full px-4 py-12">
                <div className="bg-white border p-8 rounded-sm shadow-sm">
                    <div className="flex items-center gap-4 border-b pb-6 mb-6">
                        <CheckCircle className="text-green-600" size={48} />
                        <div>
                            <h1 className="text-2xl font-bold text-green-700">Your order has been placed successfully.</h1>
                            <p className="text-sm text-gray-900 mt-1">Order ID: #{order.id}</p>
                            <p className="text-[14px] text-gray-700 mt-2 font-medium">A confirmation email has been sent to your registered email address.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        <div>
                            <h3 className="font-bold text-sm mb-2 uppercase text-gray-900">Shipping Address</h3>
                            <div className="text-sm text-gray-800 space-y-1">
                                <p className="font-bold text-gray-900">{order.shipping_name}</p>
                                <p>{order.shipping_address}</p>
                                <p>{order.shipping_city}, {order.shipping_state} {order.shipping_zip_code}</p>
                                <p>Phone: {order.shipping_phone}</p>
                            </div>
                        </div>
                        <div>
                            <h3 className="font-bold text-sm mb-2 uppercase text-gray-900">Order Summary</h3>
                            <div className="text-sm space-y-1 text-gray-800">
                                <div className="flex justify-between">
                                    <span>Subtotal:</span>
                                    <span>₹{order.total_amount}</span>
                                </div>
                                <div className="flex justify-between font-bold text-[#b12704] pt-2 border-t mt-2">
                                    <span>Order Total:</span>
                                    <span>₹{order.total_amount}</span>
                                </div>
                            </div>
                            <div className="mt-4 p-4 bg-green-50 border border-green-100 rounded">
                                <p className="text-xs text-green-800 font-medium">Estimated delivery: {new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toDateString()}</p>
                            </div>
                        </div>
                    </div>

                    <div className="border-t pt-8">
                        <h3 className="font-bold text-sm mb-4 text-gray-900">Items:</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {order.items.map((item: any) => (
                                <div key={item.id} className="flex gap-4 p-4 border border-gray-200 rounded-sm hover:shadow-sm bg-white">
                                    <div className="w-16 h-16 flex-shrink-0">
                                        <img src={item.primary_image} alt="" className="w-full h-full object-contain" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold line-clamp-2 text-gray-900">{item.name}</p>
                                        <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                                        <p className="text-xs text-red-700 font-bold">₹{item.price_at_purchase}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-12 flex flex-col items-center gap-4">
                        <Link
                            href="/orders"
                            className="bg-[#ffd814] hover:bg-[#f7ca00] text-[#111] py-2 px-8 rounded-full text-sm font-medium shadow-sm border border-[#fcd200]"
                        >
                            View your orders
                        </Link>
                        <Link
                            href="/"
                            className="text-[#007185] hover:underline hover:text-[#c45500] font-medium"
                        >
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default function OrderSuccessPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <OrderSuccessContent />
        </Suspense>
    );
}
