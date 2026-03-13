"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { ChevronRight, Plus, MapPin } from 'lucide-react';
import { authService } from '@/services/api';
import { useRouter } from 'next/navigation';

export default function AddressesPage() {
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
                    <span className="text-gray-900 font-medium">Your Addresses</span>
                </div>

                <h1 className="text-[28px] font-normal text-[#111] mb-6">Your Addresses</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Add address card */}
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center text-center hover:border-gray-400 transition-colors cursor-pointer min-h-[200px]">
                        <Plus size={48} className="text-gray-400 mb-3" />
                        <p className="text-[16px] font-bold text-gray-500">Add address</p>
                    </div>

                    {/* Default address */}
                    <div className="border border-gray-300 rounded-lg p-5 relative min-h-[200px]">
                        <div className="absolute top-0 left-0 right-0 bg-[#f0f2f2] px-4 py-1.5 rounded-t-lg border-b border-gray-200">
                            <span className="text-[12px] font-bold text-gray-700">Default address</span>
                        </div>
                        <div className="pt-6">
                            <p className="text-[14px] font-bold text-gray-900 mb-1">{user.name}</p>
                            <p className="text-[14px] text-gray-700 leading-relaxed">
                                123 Main Street, Apt 4B<br />
                                Hyderabad, Telangana 500001<br />
                                India<br />
                                Phone: +91 98765 43210
                            </p>
                            <div className="flex gap-3 mt-4 text-[13px]">
                                <span className="text-[#007185] hover:text-[#c45500] hover:underline cursor-pointer">Edit</span>
                                <span className="text-gray-300">|</span>
                                <span className="text-[#007185] hover:text-[#c45500] hover:underline cursor-pointer">Remove</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
