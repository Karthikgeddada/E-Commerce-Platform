"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/api';
import Link from 'next/link';

export default function SignupPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await authService.signup(formData);
            router.push('/');
            router.refresh();
        } catch (err: any) {
            const message = err.response?.data?.message || 'Signup failed. Please try again.';
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

            <div className="w-full max-w-[350px] border border-gray-300 rounded-[4px] p-6 flex flex-col">
                <h1 className="text-[28px] font-normal mb-4 text-[#111] leading-tight">Create Account</h1>

                {error && <p className="text-red-700 text-[13px] mb-4 border border-red-700 p-2.5 rounded-[4px] bg-red-50 flex items-center gap-2">
                    <span className="text-lg font-bold">!</span> {error}
                </p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-[13px] font-bold mb-1 text-[#111]">Your name</label>
                        <input
                            type="text"
                            required
                            placeholder="First and last name"
                            className="w-full border border-gray-400 p-2 rounded-[3px] focus:border-[#e77600] focus:ring-[3px] focus:ring-[#e77600]/20 outline-none text-[13px] transition-all"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-[13px] font-bold mb-1 text-[#111]">Email</label>
                        <input
                            type="email"
                            required
                            className="w-full border border-gray-400 p-2 rounded-[3px] focus:border-[#e77600] focus:ring-[3px] focus:ring-[#e77600]/20 outline-none text-[13px] transition-all"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-[13px] font-bold mb-1 text-[#111]">Password</label>
                        <input
                            type="password"
                            required
                            placeholder="At least 6 characters"
                            className="w-full border border-gray-400 p-2 rounded-[3px] focus:border-[#e77600] focus:ring-[3px] focus:ring-[#e77600]/20 outline-none text-[13px] transition-all"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                        <p className="text-[11px] text-gray-600 mt-1 flex items-center gap-1.5 px-0.5">
                            <span className="text-blue-600 italic font-bold">i</span> Passwords must be at least 6 characters.
                        </p>
                    </div>
                    <button
                        disabled={loading}
                        className="w-full bg-[#ffd814] hover:bg-[#f7ca00] py-2 rounded-[8px] shadow-sm border border-[#fcd200] text-[13px] font-medium transition-all active:scale-[0.98] mt-2"
                    >
                        {loading ? 'Creating account...' : 'Continue'}
                    </button>
                </form>

                <p className="text-[12px] text-[#111] mt-5 leading-relaxed">
                    By creating an account, you agree to Amazon's <span className="text-[#0066c0] hover:text-[#c45500] hover:underline cursor-pointer">Conditions of Use</span> and <span className="text-[#0066c0] hover:text-[#c45500] hover:underline cursor-pointer">Privacy Notice</span>.
                </p>

                <div className="mt-8 pt-6 border-t border-gray-200">
                    <p className="text-[13px] text-[#111]">
                        Already have an account? <Link href="/login" className="text-[#0066c0] hover:text-[#c45500] hover:underline font-medium">Sign in &#x25B8;</Link>
                    </p>
                </div>
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
