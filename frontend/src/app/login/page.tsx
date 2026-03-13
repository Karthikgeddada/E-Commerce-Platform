"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/api';
import Link from 'next/link';

export default function LoginPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await authService.login(formData);
            router.push('/');
            router.refresh();
        } catch (err: any) {
            const message = err.response?.data?.message || 'Login failed. Please check your credentials.';
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col items-center pt-8 px-4 pb-20">
            <Link href="/" className="mb-6 group">
                <div className="flex items-center text-2xl font-bold tracking-tighter text-gray-900">
                    amazon<span className="text-[#000]">.in</span>
                </div>
            </Link>

            <div className="w-full max-w-[350px] border border-gray-300 rounded-[8px] p-6 flex flex-col shadow-sm">
                <h1 className="text-[28px] font-normal mb-4 text-[#111] leading-tight">Sign in or create account</h1>

                {error && <p className="text-red-700 text-[13px] mb-4 border border-red-700 p-2.5 rounded-[4px] bg-red-50 flex items-center gap-2">
                    <span className="text-lg font-bold">!</span> {error}
                </p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-[13px] font-bold mb-1 text-[#111]">Enter mobile number or email</label>
                        <input
                            type="email"
                            required
                            className="w-full border border-gray-400 p-2 rounded-[3px] focus:border-[#e77600] focus:ring-[3px] focus:ring-[#e77600]/20 outline-none text-[13px] transition-all"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                    <div className="relative">
                        <div className="flex justify-between items-center mb-1">
                            <label className="block text-[13px] font-bold text-[#111]">Password</label>
                            <Link href="/forgot-password" className="text-[13px] text-[#0066c0] hover:text-[#c45500] hover:underline">Forgot Password?</Link>
                        </div>
                        <input
                            type="password"
                            required
                            className="w-full border border-gray-400 p-2 rounded-[3px] focus:border-[#e77600] focus:ring-[3px] focus:ring-[#e77600]/20 outline-none text-[13px] transition-all"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>
                    <button
                        disabled={loading}
                        className="w-full bg-[#ffd814] hover:bg-[#f7ca00] py-2 rounded-[8px] shadow-sm border border-[#fcd200] text-[13px] font-medium transition-all active:scale-[0.98]"
                    >
                        {loading ? 'Processing...' : 'Continue'}
                    </button>
                </form>

                <p className="text-[12px] text-[#111] mt-5 leading-relaxed">
                    By continuing, you agree to Amazon's <span className="text-[#0066c0] hover:text-[#c45500] hover:underline cursor-pointer">Conditions of Use</span> and <span className="text-[#0066c0] hover:text-[#c45500] hover:underline cursor-pointer">Privacy Notice</span>.
                </p>

                <div className="mt-8 pt-4 border-t border-gray-100 italic">
                    <p className="text-[13px] font-bold text-[#111] mb-1">Buying for work?</p>
                    <p className="text-[13px] text-[#0066c0] hover:text-[#c45500] hover:underline cursor-pointer">Create a free business account</p>
                </div>
            </div>

            <div className="w-full max-w-[350px] mt-6 flex flex-col items-center">
                <div className="flex items-center w-full mb-4">
                    <div className="flex-1 h-px bg-gray-200"></div>
                    <span className="mx-2 text-[12px] text-gray-500 whitespace-nowrap">New to Amazon?</span>
                    <div className="flex-1 h-px bg-gray-200"></div>
                </div>
                <Link
                    href="/signup"
                    className="w-full border border-[#adb1b8] bg-[#eff1f3] hover:bg-[#e7e9ec] py-1.5 rounded-[8px] text-center text-[13px] font-medium shadow-sm active:bg-[#d0d3d6] transition-all"
                >
                    Create your Amazon account
                </Link>
            </div>

            <div className="mt-auto pt-10 flex flex-col items-center w-full max-w-[1000px] border-t border-gray-200">
                <div className="flex gap-8 text-[11px] text-[#0066c0] mb-3">
                    <span className="hover:text-[#c45500] hover:underline cursor-pointer">Conditions of Use</span>
                    <span className="hover:text-[#c45500] hover:underline cursor-pointer">Privacy Notice</span>
                    <span className="hover:text-[#c45500] hover:underline cursor-pointer">Help</span>
                </div>
                <p className="text-[11px] text-gray-500">
                    © 1996–2026, Amazon.com, Inc. or its affiliates
                </p>
            </div>
        </div>
    );
}
