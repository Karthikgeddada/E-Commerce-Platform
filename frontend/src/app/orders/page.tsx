"use client";

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import { orderService, authService } from '@/services/api';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default function OrdersPage() {
    const router = useRouter();
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('Orders');

    const fetchOrders = async () => {
        setLoading(true);
        try {
            let status = undefined;
            if (activeTab === 'Not Yet Shipped') status = 'Pending';
            if (activeTab === 'Cancelled') status = 'Cancelled';

            const res = await orderService.getUserOrders(status);

            let filteredData = res.data;
            if (activeTab === 'Buy Again') {
                filteredData = res.data.filter((o: any) => o.status === 'Delivered');
            }

            setOrders(filteredData);
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
        fetchOrders();
    }, [router, activeTab]);

    const handleCancelOrder = async (orderId: number) => {
        if (!confirm('Are you sure you want to cancel this order?')) return;
        try {
            await orderService.cancelOrder(orderId);
            setActiveTab('Cancelled'); // Switch to cancelled tab automatically
        } catch (err: any) {
            alert(err.response?.data?.message || 'Error cancelling order');
        }
    };

    return (
        <div className="min-h-screen bg-[#eaeded]">
            <Navbar />

            <main className="max-w-[900px] mx-auto p-4 md:py-8">
                <div className="flex items-center text-[12px] text-gray-500 mb-6 gap-1">
                    <Link href="/" className="hover:text-[#c45500] hover:underline">Your Account</Link>
                    <ChevronRight size={10} />
                    <span className="text-[#c45500]">Your Orders</span>
                </div>

                <h1 className="text-3xl font-medium mb-6 text-gray-900">Your Orders</h1>

                <div className="flex gap-4 md:gap-6 mb-8 border-b border-gray-300 overflow-x-auto no-scrollbar whitespace-nowrap">
                    {['Orders', 'Buy Again', 'Not Yet Shipped', 'Cancelled'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`text-[13px] md:text-[14px] pb-2 transition-all flex-shrink-0 ${activeTab === tab ? 'font-bold border-b-2 border-[#e77600] text-[#111]' : 'text-gray-600 hover:text-gray-900'}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {loading ? (
                    <div className="flex justify-center p-20"><div className="animate-spin h-10 w-10 border-b-2 border-[#e77600] rounded-full"></div></div>
                ) : orders.length === 0 ? (
                    <div className="bg-white p-12 text-center rounded-sm shadow-sm border border-gray-200">
                        <p className="text-gray-600 mb-6 font-medium">
                            {activeTab === 'Orders' ? "You haven't placed any orders yet." : `No ${activeTab.toLowerCase()} orders found.`}
                        </p>
                        <Link href="/" className="bg-[#ffd814] hover:bg-[#f7ca00] px-8 py-2.5 rounded-full font-bold shadow-sm border border-[#fcd200] text-sm">Continue Shopping</Link>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order: any) => (
                            <div key={order.id} className="bg-white border border-gray-300 rounded-[8px] overflow-hidden shadow-sm">
                                {/* Order Header */}
                                <div className="bg-[#f0f2f2] px-6 py-4 flex flex-wrap gap-y-4 md:items-center justify-between text-[12px] text-gray-600 border-b border-gray-300">
                                    <div className="flex flex-wrap gap-x-10 gap-y-2">
                                        <div className="flex flex-col">
                                            <span className="uppercase font-medium text-gray-500">Order Placed</span>
                                            <span className="text-[14px] font-medium text-gray-700 whitespace-nowrap">{new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="uppercase font-medium text-gray-500">Total</span>
                                            <span className="text-[14px] font-medium text-gray-700 whitespace-nowrap">₹{Number(order.total_amount).toLocaleString('en-IN')}</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="uppercase font-medium text-gray-500">Ship To</span>
                                            <div className="group relative">
                                                <span className="text-[14px] font-medium text-[#007185] cursor-pointer hover:text-[#c45500] hover:underline flex items-center gap-1">
                                                    {order.shipping_name || 'Customer'} <ChevronRight size={10} className="rotate-90" />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col md:items-end">
                                        <span className="uppercase font-medium text-gray-500">Order # {(101 - 20002 - 3904 + order.id)}</span>
                                        <div className="flex gap-2">
                                            <span className="text-[#007185] hover:text-[#c45500] hover:underline cursor-pointer">View order details</span>
                                            <span className="text-gray-300">|</span>
                                            <span className="text-[#007185] hover:text-[#c45500] hover:underline cursor-pointer">Invoice</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Order Items */}
                                <div className="p-6">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                                        <div className="flex flex-col">
                                            <h3 className={`text-[18px] font-bold mb-1 capitalize ${order.status === 'Cancelled' ? 'text-red-600' : 'text-gray-900'}`}>
                                                {order.status === 'delivered' ? 'Delivered' : (order.status || 'Order Processed')}
                                            </h3>
                                            {order.status !== 'Cancelled' && <p className="text-[13px] text-gray-600 italic">Package was handed to a resident</p>}
                                        </div>

                                        {/* Cancel Order Button */}
                                        {order.status === 'Pending' && (
                                            <button
                                                onClick={() => handleCancelOrder(order.id)}
                                                className="text-[13px] px-4 py-1.5 rounded-md border border-gray-300 bg-white hover:bg-red-50 hover:border-red-200 text-red-600 font-medium transition-all shadow-sm"
                                            >
                                                Cancel Order
                                            </button>
                                        )}
                                    </div>

                                    <div className="space-y-6">
                                        {order.items.map((item: any) => (
                                            <div key={item.id} className="flex flex-col sm:flex-row gap-6">
                                                <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 bg-white border border-gray-100 rounded-md p-2 flex items-center justify-center overflow-hidden">
                                                    <img
                                                        src={item.primary_image || "https://placehold.co/200x200?text=No+Image"}
                                                        alt={item.name || "Product"}
                                                        className={`max-h-full max-w-full object-contain ${order.status === 'Cancelled' ? 'grayscale opacity-50' : ''}`}
                                                    />
                                                </div>
                                                <div className="flex-1 flex flex-col sm:flex-row gap-4 justify-between">
                                                    <div className="flex-1">
                                                        <Link href={item.product_id ? `/product/${item.product_id}` : '#'} className="text-[#007185] font-bold hover:underline hover:text-[#c45500] leading-snug line-clamp-2 mb-1">
                                                            {item.name || "Item no longer available"}
                                                        </Link>
                                                        {order.status !== 'Cancelled' && (
                                                            <p className="text-[12px] text-gray-500 mb-2">Return window closed on {new Date(new Date(order.created_at).getTime() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</p>
                                                        )}

                                                        <div className="flex gap-3 mt-2">
                                                            <button
                                                                disabled={!item.product_id}
                                                                className={`text-[13px] px-6 py-1.5 rounded-[8px] shadow-sm border transition-all font-medium ${item.product_id ? 'bg-[#ffd814] hover:bg-[#f7ca00] border-[#fcd200]' : 'bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed'}`}
                                                            >
                                                                {item.product_id ? 'Buy it again' : 'Not available'}
                                                            </button>
                                                            <button className="text-[13px] px-6 py-1.5 rounded-[8px] shadow-sm border border-gray-300 bg-white hover:bg-gray-50 font-medium transition-colors">View your item</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Bottom Action */}
                                <div className="bg-[#f0f2f2]/20 border-t border-gray-100 px-6 py-3 flex items-center gap-2 group cursor-pointer hover:bg-gray-50 transition-colors">
                                    <span className="text-[13px] font-bold text-[#007185] group-hover:text-[#c45500]">&#x3E; Archive order</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
