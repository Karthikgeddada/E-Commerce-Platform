"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { ChevronRight, Mail, Bell, Package, Tag } from 'lucide-react';

export default function MessagesPage() {
    const messages = [
        {
            type: "order",
            icon: <Package size={20} className="text-[#007185]" />,
            title: "Your order has been delivered",
            preview: "Hello, your order #ORD-2024-001 has been successfully delivered. Thank you for shopping with Amazon!",
            date: "Mar 13, 2026",
            unread: false
        },
        {
            type: "promo",
            icon: <Tag size={20} className="text-[#cc0c39]" />,
            title: "Great Indian Sale - Up to 70% off!",
            preview: "Don't miss the biggest sale of the season. Deals on electronics, fashion, home & more.",
            date: "Mar 12, 2026",
            unread: true
        },
        {
            type: "alert",
            icon: <Bell size={20} className="text-[#ffa41c]" />,
            title: "Price drop on your wishlist item",
            preview: "An item in your wishlist is now available at a lower price. Check it out before the offer ends!",
            date: "Mar 11, 2026",
            unread: true
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <main className="max-w-[800px] mx-auto px-4 py-8">
                <div className="flex items-center text-[12px] text-gray-500 mb-6 gap-1">
                    <Link href="/account" className="hover:text-[#c45500] hover:underline">Your Account</Link>
                    <ChevronRight size={10} />
                    <span className="text-gray-900 font-medium">Messages</span>
                </div>

                <h1 className="text-[28px] font-normal text-[#111] mb-6">Your Messages</h1>

                <div className="border border-gray-300 rounded-lg overflow-hidden">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`flex items-start gap-4 p-5 cursor-pointer hover:bg-[#fafafa] transition-colors ${idx < messages.length - 1 ? 'border-b border-gray-200' : ''} ${msg.unread ? 'bg-[#f7fce9]' : ''}`}>
                            <div className="w-10 h-10 rounded-full bg-[#f0f2f2] flex items-center justify-center flex-shrink-0 mt-0.5">
                                {msg.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-4 mb-1">
                                    <h3 className={`text-[14px] truncate ${msg.unread ? 'font-bold text-[#111]' : 'font-medium text-gray-700'}`}>{msg.title}</h3>
                                    <span className="text-[12px] text-gray-400 flex-shrink-0">{msg.date}</span>
                                </div>
                                <p className="text-[13px] text-gray-500 line-clamp-2">{msg.preview}</p>
                            </div>
                            {msg.unread && <div className="w-2.5 h-2.5 rounded-full bg-[#007185] flex-shrink-0 mt-2" />}
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
