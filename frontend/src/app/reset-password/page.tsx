"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { authService } from '@/services/api';
import Link from 'next/link';

function ResetPasswordForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (!token) {
            setError('Invalid or missing reset token.');
        }
    }, [token]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }

        setLoading(true);
        setError('');
        try {
            await authService.resetPassword({ token, password });
            setSuccess(true);
            setTimeout(() => {
                router.push('/login');
            }, 3000);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (!token && !error) return null;

    return (
        <div className="min-h-screen bg-white flex flex-col items-center pt-8 px-4 pb-20">
            <Link href="/" className="mb-6 group">
                <div className="flex items-center text-2xl font-bold tracking-tighter text-gray-900">
                    amazon<span className="text-[#000]">.in</span>
                </div>
            </Link>

            <div className="w-full max-w-[350px] border border-gray-300 rounded-[8px] p-6 flex flex-col shadow-sm">
                <h1 className="text-[28px] font-normal mb-4 text-[#111] leading-tight">Create new password</h1>

                {error && <p className="text-red-700 text-[13px] mb-4 border border-red-700 p-2.5 rounded-[4px] bg-red-50 flex items-center gap-2">
                    <span className="text-lg font-bold">!</span> {error}
                </p>}

                {success ? (
                    <div className="text-center">
                        <p className="text-green-700 text-[14px] mb-4 font-medium italic">
                            ✓ Your password has been reset successfully.
                        </p>
                        <p className="text-[13px] text-gray-600">Redirecting to login page...</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-[13px] font-bold mb-1 text-[#111]">New password</label>
                            <input
                                type="password"
                                required
                                minLength={6}
                                className="w-full border border-gray-400 p-2 rounded-[3px] focus:border-[#e77600] focus:ring-[3px] focus:ring-[#e77600]/20 outline-none text-[13px] transition-all"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-[13px] font-bold mb-1 text-[#111]">Re-enter password</label>
                            <input
                                type="password"
                                required
                                className="w-full border border-gray-400 p-2 rounded-[3px] focus:border-[#e77600] focus:ring-[3px] focus:ring-[#e77600]/20 outline-none text-[13px] transition-all"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <button
                            disabled={loading || !!error}
                            className={`w-full ${loading || !!error ? 'bg-gray-200 cursor-not-allowed' : 'bg-[#ffd814] hover:bg-[#f7ca00]'} py-2 rounded-[8px] shadow-sm border border-[#fcd200] text-[13px] font-medium transition-all active:scale-[0.98]`}
                        >
                            {loading ? 'Processing...' : 'Save changes and sign in'}
                        </button>
                    </form>
                )}
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

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={<div className="flex justify-center p-20">Loading...</div>}>
            <ResetPasswordForm />
        </Suspense>
    );
}
