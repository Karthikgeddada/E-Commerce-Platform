"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { ChevronRight, CreditCard, Plus, Shield } from 'lucide-react';
import { authService } from '@/services/api';
import { useRouter } from 'next/navigation';

export default function PaymentsPage() {
    const router = useRouter();
    const user = authService.getCurrentUser();

    React.useEffect(() => {
        if (!user) router.replace('/login');
    }, [user, router]);

    if (!user) return null;

    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <main className="max-w-[900px] mx-auto px-4 py-8">
                <div className="flex items-center text-[12px] text-gray-500 mb-6 gap-1">
                    <Link href="/account" className="hover:text-[#c45500] hover:underline">Your Account</Link>
                    <ChevronRight size={10} />
                    <span className="text-gray-900 font-medium">Payment Methods</span>
                </div>

                <h1 className="text-[28px] font-normal text-[#111] mb-2">Manage Payment Methods</h1>
                <p className="text-[14px] text-gray-600 mb-6">Add or edit payment methods below.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {/* Existing card */}
                    <div className="border border-gray-300 rounded-lg p-5 relative">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-8 bg-gradient-to-r from-[#1a1f71] to-[#2c3ea2] rounded flex items-center justify-center">
                                <CreditCard size={18} className="text-white" />
                            </div>
                            <div>
                                <p className="text-[14px] font-bold text-gray-900">Visa ending in 4242</p>
                                <p className="text-[13px] text-gray-500">Expires 12/2027</p>
                            </div>
                        </div>
                        <div className="bg-[#f7fce9] text-[#067d06] text-[12px] font-bold px-2 py-1 rounded inline-block mb-3">Default</div>
                        <div className="flex gap-3 text-[13px]">
                            <span className="text-[#007185] hover:text-[#c45500] hover:underline cursor-pointer">Edit</span>
                            <span className="text-gray-300">|</span>
                            <span className="text-[#007185] hover:text-[#c45500] hover:underline cursor-pointer">Remove</span>
                        </div>
                    </div>

                    {/* Add new card */}
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center text-center hover:border-gray-400 transition-colors cursor-pointer">
                        <Plus size={40} className="text-gray-400 mb-2" />
                        <p className="text-[14px] font-bold text-gray-500">Add a payment method</p>
                    </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-[#f0f2f2] rounded-lg border border-gray-200">
                    <Shield size={24} className="text-[#067d06] flex-shrink-0" />
                    <p className="text-[13px] text-gray-700">Your payment information is stored securely. Amazon protects your data with industry-leading encryption.</p>
                </div>
            </main>
        </div>
    );
}
