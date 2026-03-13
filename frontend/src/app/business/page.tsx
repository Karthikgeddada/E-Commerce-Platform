"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { ChevronRight, Briefcase, Truck, Receipt, Users, TrendingUp } from 'lucide-react';

export default function BusinessPage() {
    const benefits = [
        { icon: <Receipt size={28} />, title: "Business Pricing", desc: "Get exclusive quantity discounts and GST invoices on eligible items" },
        { icon: <Truck size={28} />, title: "Fast Delivery", desc: "Schedule deliveries during business hours for your convenience" },
        { icon: <Users size={28} />, title: "Multi-User Accounts", desc: "Add multiple users and manage purchasing permissions" },
        { icon: <TrendingUp size={28} />, title: "Analytics", desc: "Track spending patterns and optimize procurement" },
    ];

    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <main className="max-w-[900px] mx-auto px-4 py-8">
                <div className="flex items-center text-[12px] text-gray-500 mb-6 gap-1">
                    <Link href="/account" className="hover:text-[#c45500] hover:underline">Your Account</Link>
                    <ChevronRight size={10} />
                    <span className="text-gray-900 font-medium">Business Account</span>
                </div>

                <div className="bg-gradient-to-r from-[#232f3e] to-[#37475a] text-white rounded-lg p-8 mb-8">
                    <div className="flex items-center gap-3 mb-3">
                        <Briefcase size={32} className="text-[#febd69]" />
                        <h1 className="text-2xl font-bold">Amazon Business</h1>
                    </div>
                    <p className="text-gray-300 text-[15px] mb-6 max-w-[600px]">Create a free Amazon Business account to save money with business-exclusive pricing, tax-exempt purchases, and multi-user accounts.</p>
                    <button className="bg-[#ffd814] hover:bg-[#f7ca00] text-[#111] text-[14px] font-bold px-8 py-2.5 rounded-full border border-[#fcd200] shadow-sm transition-colors">
                        Create a free Business Account
                    </button>
                </div>

                <h2 className="text-xl font-bold text-[#111] mb-4">Why Amazon Business?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {benefits.map((b, i) => (
                        <div key={i} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                            <div className="text-[#007185] mb-3">{b.icon}</div>
                            <h3 className="text-[16px] font-bold text-[#111] mb-1">{b.title}</h3>
                            <p className="text-[14px] text-gray-600">{b.desc}</p>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
