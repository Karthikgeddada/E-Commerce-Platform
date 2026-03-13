"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { ChevronRight, Lock, Eye, EyeOff, Shield, Smartphone } from 'lucide-react';
import { authService } from '@/services/api';
import { useRouter } from 'next/navigation';

export default function SecurityPage() {
    const router = useRouter();
    const user = authService.getCurrentUser();

    React.useEffect(() => {
        if (!user) router.replace('/login');
    }, [user, router]);

    if (!user) return null;

    const securityItems = [
        { label: "Name", value: user.name || "User", icon: <Lock size={20} /> },
        { label: "Email", value: user.email, icon: <Shield size={20} /> },
        { label: "Mobile Number", value: "+91 ••••••7890", icon: <Smartphone size={20} /> },
        { label: "Password", value: "••••••••", icon: <Eye size={20} /> },
    ];

    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <main className="max-w-[700px] mx-auto px-4 py-8">
                <div className="flex items-center text-[12px] text-gray-500 mb-6 gap-1">
                    <Link href="/account" className="hover:text-[#c45500] hover:underline">Your Account</Link>
                    <ChevronRight size={10} />
                    <span className="text-gray-900 font-medium">Login & Security</span>
                </div>

                <h1 className="text-[28px] font-normal text-[#111] mb-6">Login & Security</h1>

                <div className="border border-gray-300 rounded-lg overflow-hidden">
                    {securityItems.map((item, idx) => (
                        <div key={idx} className={`flex items-center justify-between p-5 ${idx < securityItems.length - 1 ? 'border-b border-gray-200' : ''}`}>
                            <div className="flex items-center gap-4">
                                <div className="text-gray-400">{item.icon}</div>
                                <div>
                                    <p className="text-[14px] font-bold text-gray-900">{item.label}</p>
                                    <p className="text-[14px] text-gray-600">{item.value}</p>
                                </div>
                            </div>
                            <button className="bg-[#f0f2f2] hover:bg-[#e3e6e6] border border-gray-300 text-[13px] font-medium px-6 py-1.5 rounded-lg shadow-sm transition-colors">
                                Edit
                            </button>
                        </div>
                    ))}
                </div>

                <div className="mt-8 p-5 bg-[#fef8f2] border border-[#fbd8b4] rounded-lg">
                    <h3 className="text-[16px] font-bold text-[#111] mb-2">Two-Step Verification (2SV)</h3>
                    <p className="text-[14px] text-gray-600 mb-4">Add an extra layer of security to your account by requiring a verification code in addition to your password.</p>
                    <button className="bg-[#ffd814] hover:bg-[#f7ca00] text-[#111] text-[13px] font-bold px-6 py-2 rounded-full border border-[#fcd200] shadow-sm transition-colors">
                        Turn on
                    </button>
                </div>
            </main>
        </div>
    );
}
