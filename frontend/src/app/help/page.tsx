"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { ChevronRight, Headphones, Package, CreditCard, RotateCcw, Truck, HelpCircle } from 'lucide-react';

export default function HelpPage() {
    const helpTopics = [
        { icon: <Package size={28} />, title: "Your Orders", desc: "Track packages, edit or cancel orders", link: "/orders" },
        { icon: <RotateCcw size={28} />, title: "Returns & Refunds", desc: "Return or exchange items, print return labels", link: "/orders" },
        { icon: <CreditCard size={28} />, title: "Payment Issues", desc: "Update payment methods, troubleshoot charges", link: "/account/payments" },
        { icon: <Truck size={28} />, title: "Delivery Issues", desc: "Missing, late, or damaged delivery", link: "/orders" },
        { icon: <HelpCircle size={28} />, title: "Account Settings", desc: "Change email, password, or address", link: "/account/security" },
        { icon: <Headphones size={28} />, title: "Contact Us", desc: "Chat, email, or call customer support", link: "/account" },
    ];

    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <main className="max-w-[900px] mx-auto px-4 py-8">
                <div className="flex items-center text-[12px] text-gray-500 mb-6 gap-1">
                    <Link href="/account" className="hover:text-[#c45500] hover:underline">Your Account</Link>
                    <ChevronRight size={10} />
                    <span className="text-gray-900 font-medium">Customer Service</span>
                </div>

                <h1 className="text-[28px] font-normal text-[#111] mb-2">Customer Service</h1>
                <p className="text-[16px] text-gray-600 mb-8">What would you like help with today? You can quickly self-serve on common topics, or connect with us for additional support.</p>

                <h2 className="text-xl font-bold text-[#111] mb-4">Browse Help Topics</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
                    {helpTopics.map((topic, i) => (
                        <Link key={i} href={topic.link} className="border border-gray-200 rounded-lg p-5 hover:shadow-md hover:border-[#e77600] transition-all cursor-pointer group">
                            <div className="text-[#007185] mb-3 group-hover:text-[#c45500] transition-colors">{topic.icon}</div>
                            <h3 className="text-[15px] font-bold text-[#111] mb-1 group-hover:text-[#c45500]">{topic.title}</h3>
                            <p className="text-[13px] text-gray-600">{topic.desc}</p>
                        </Link>
                    ))}
                </div>

                <div className="bg-[#f0f2f2] rounded-lg p-6 text-center">
                    <Headphones size={40} className="text-[#232f3e] mx-auto mb-3" />
                    <h3 className="text-[18px] font-bold text-[#111] mb-2">Need more help?</h3>
                    <p className="text-[14px] text-gray-600 mb-4">Our customer support team is available 24/7</p>
                    <button className="bg-[#ffd814] hover:bg-[#f7ca00] text-[#111] text-[14px] font-bold px-8 py-2.5 rounded-full border border-[#fcd200] shadow-sm transition-colors">
                        Contact Us
                    </button>
                </div>
            </main>
        </div>
    );
}
