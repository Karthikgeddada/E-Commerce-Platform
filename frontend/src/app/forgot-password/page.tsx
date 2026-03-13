"use client";

import React, { useState } from 'react';
import { authService } from '@/services/api';
import Link from 'next/link';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMessage('');
        try {
            await authService.forgotPassword(email);
            setMessage('If an account exists for this email, you will receive a password reset link shortly.');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Something went wrong. Please try again.');
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
                <h1 className="text-[28px] font-normal mb-4 text-[#111] leading-tight">Password assistance</h1>

                <p className="text-[13px] text-[#111] mb-4">
                    Enter the email address associated with your Amazon account.
                </p>

                {error && <p className="text-red-700 text-[13px] mb-4 border border-red-700 p-2.5 rounded-[4px] bg-red-50 flex items-center gap-2">
                    <span className="text-lg font-bold">!</span> {error}
                </p>}

                {message && <p className="text-green-700 text-[13px] mb-4 border border-green-700 p-2.5 rounded-[4px] bg-green-50 flex items-center gap-2">
                    <span className="text-lg font-bold">✓</span> {message}
                </p>}

                {!message && (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-[13px] font-bold mb-1 text-[#111]">Email</label>
                            <input
                                type="email"
                                required
                                className="w-full border border-gray-400 p-2 rounded-[3px] focus:border-[#e77600] focus:ring-[3px] focus:ring-[#e77600]/20 outline-none text-[13px] transition-all"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <button
                            disabled={loading}
                            className="w-full bg-[#ffd814] hover:bg-[#f7ca00] py-2 rounded-[8px] shadow-sm border border-[#fcd200] text-[13px] font-medium transition-all active:scale-[0.98]"
                        >
                            {loading ? 'Processing...' : 'Continue'}
                        </button>
                    </form>
                )}

                <div className="mt-8 pt-4 border-t border-gray-100 italic">
                    <p className="text-[13px] font-bold text-[#111] mb-1">Has your email changed?</p>
                    <p className="text-[13px] text-[#111] leading-relaxed">
                        If you no longer use the email address associated with your Amazon account, you may contact <span className="text-[#0066c0] hover:text-[#c45500] hover:underline cursor-pointer">Customer Service</span> for help restoring access to your account.
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
