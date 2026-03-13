"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { ChevronRight, Gift, CreditCard } from 'lucide-react';

export default function GiftCardsPage() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <main className="max-w-[900px] mx-auto px-4 py-8">
                <div className="flex items-center text-[12px] text-gray-500 mb-6 gap-1">
                    <Link href="/account" className="hover:text-[#c45500] hover:underline">Your Account</Link>
                    <ChevronRight size={10} />
                    <span className="text-gray-900 font-medium">Gift Cards</span>
                </div>

                <h1 className="text-[28px] font-normal text-[#111] mb-6">Gift Cards & Balance</h1>

                {/* Balance Card */}
                <div className="bg-gradient-to-r from-[#232f3e] to-[#37475a] text-white rounded-lg p-6 mb-8">
                    <p className="text-[14px] text-gray-300 mb-1">Your Gift Card Balance</p>
                    <p className="text-4xl font-bold mb-4">₹0.00</p>
                    <button className="bg-[#ffd814] hover:bg-[#f7ca00] text-[#111] text-[14px] font-bold px-6 py-2 rounded-full border border-[#fcd200] shadow-sm transition-colors">
                        Redeem a Gift Card
                    </button>
                </div>

                {/* Options */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-gray-300 rounded-lg p-5 hover:shadow-md transition-shadow cursor-pointer">
                        <div className="flex items-center gap-3 mb-3">
                            <Gift size={24} className="text-[#007185]" />
                            <h3 className="text-[16px] font-bold text-[#111]">Buy a Gift Card</h3>
                        </div>
                        <p className="text-[14px] text-gray-600">Choose from a variety of designs and delivery options for any occasion.</p>
                    </div>
                    <div className="border border-gray-300 rounded-lg p-5 hover:shadow-md transition-shadow cursor-pointer">
                        <div className="flex items-center gap-3 mb-3">
                            <CreditCard size={24} className="text-[#007185]" />
                            <h3 className="text-[16px] font-bold text-[#111]">Reload Your Balance</h3>
                        </div>
                        <p className="text-[14px] text-gray-600">Add funds to your Amazon Gift Card Balance to use on future purchases.</p>
                    </div>
                </div>
            </main>
        </div>
    );
}
