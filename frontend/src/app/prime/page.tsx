"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { ChevronRight, Truck, Film, Music, BookOpen, ShieldCheck } from 'lucide-react';

export default function PrimePage() {
    const benefits = [
        { icon: <Truck size={28} />, title: "Free Delivery", desc: "Unlimited FREE delivery on eligible items" },
        { icon: <Film size={28} />, title: "Prime Video", desc: "Watch movies, TV shows & originals" },
        { icon: <Music size={28} />, title: "Amazon Music", desc: "Listen to over 100 million songs, ad-free" },
        { icon: <BookOpen size={28} />, title: "Prime Reading", desc: "Read a selection of eBooks & magazines" },
        { icon: <ShieldCheck size={28} />, title: "Early Access", desc: "Exclusive early deals & lightning offers" },
    ];

    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <main className="max-w-[900px] mx-auto px-4 py-8">
                <div className="flex items-center text-[12px] text-gray-500 mb-6 gap-1">
                    <Link href="/account" className="hover:text-[#c45500] hover:underline">Your Account</Link>
                    <ChevronRight size={10} />
                    <span className="text-gray-900 font-medium">Prime</span>
                </div>

                <div className="bg-gradient-to-r from-[#232f3e] to-[#131921] text-white rounded-lg p-8 mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <img src="https://m.media-amazon.com/images/G/31/marketing/prime/2022PrimeBrand/Logos/Prime_Logo_RGB_Prime_Blue_MASTER._CB542734830_.png" className="h-8" alt="Prime" style={{ filter: 'invert(1) hue-rotate(180deg) brightness(1.2)' }} />
                    </div>
                    <h1 className="text-2xl font-bold mb-2">Amazon Prime</h1>
                    <p className="text-gray-300 text-[15px] mb-6">Get fast, free delivery with Prime. Plus watch movies, listen to music, and more.</p>
                    <button className="bg-[#ffd814] hover:bg-[#f7ca00] text-[#111] text-[14px] font-bold px-8 py-2.5 rounded-full border border-[#fcd200] shadow-sm transition-colors">
                        Start your free trial
                    </button>
                </div>

                <h2 className="text-xl font-bold text-[#111] mb-4">Prime Benefits</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {benefits.map((b, i) => (
                        <div key={i} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow cursor-pointer">
                            <div className="text-[#007185] mb-3">{b.icon}</div>
                            <h3 className="text-[16px] font-bold text-[#111] mb-1">{b.title}</h3>
                            <p className="text-[14px] text-gray-600">{b.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-8 text-center py-6 border-t border-gray-200">
                    <p className="text-[14px] text-gray-500">₹1,499/year after trial. Cancel anytime.</p>
                </div>
            </main>
        </div>
    );
}
