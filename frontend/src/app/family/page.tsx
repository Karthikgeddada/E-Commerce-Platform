"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { ChevronRight, Users, Baby, ShoppingCart, Gift, Heart } from 'lucide-react';

export default function FamilyPage() {
    const features = [
        { icon: <Baby size={28} />, title: "Baby Registry", desc: "Create a registry and share it with friends and family" },
        { icon: <ShoppingCart size={28} />, title: "Family Shopping", desc: "Share your cart and manage family purchases together" },
        { icon: <Gift size={28} />, title: "Gift Ideas", desc: "Discover curated gift suggestions for every family member" },
        { icon: <Heart size={28} />, title: "Shared Wishlists", desc: "Create and manage shared wishlists with your family" },
    ];

    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <main className="max-w-[900px] mx-auto px-4 py-8">
                <div className="flex items-center text-[12px] text-gray-500 mb-6 gap-1">
                    <Link href="/account" className="hover:text-[#c45500] hover:underline">Your Account</Link>
                    <ChevronRight size={10} />
                    <span className="text-gray-900 font-medium">Amazon Family</span>
                </div>

                <div className="bg-gradient-to-r from-[#007185] to-[#00a3b4] text-white rounded-lg p-8 mb-8">
                    <div className="flex items-center gap-3 mb-3">
                        <Users size={32} />
                        <h1 className="text-2xl font-bold">Amazon Family</h1>
                    </div>
                    <p className="text-blue-100 text-[15px] mb-6 max-w-[600px]">Manage profiles, share benefits, and enjoy exclusive family-friendly features all in one place.</p>
                    <button className="bg-[#ffd814] hover:bg-[#f7ca00] text-[#111] text-[14px] font-bold px-8 py-2.5 rounded-full border border-[#fcd200] shadow-sm transition-colors">
                        Set Up Your Family Profile
                    </button>
                </div>

                <h2 className="text-xl font-bold text-[#111] mb-4">Family Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {features.map((f, i) => (
                        <div key={i} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow cursor-pointer">
                            <div className="text-[#007185] mb-3">{f.icon}</div>
                            <h3 className="text-[16px] font-bold text-[#111] mb-1">{f.title}</h3>
                            <p className="text-[14px] text-gray-600">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
