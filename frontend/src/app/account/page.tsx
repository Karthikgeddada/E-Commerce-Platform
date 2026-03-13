"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import {
    Package,
    Lock,
    Zap,
    MapPin,
    Briefcase,
    Gift,
    CreditCard,
    Users,
    Smartphone,
    List,
    Headphones,
    Mail
} from 'lucide-react';
import { authService } from '@/services/api';
import { useRouter } from 'next/navigation';

export default function AccountPage() {
    const router = useRouter();
    const user = authService.getCurrentUser();

    // Protection
    React.useEffect(() => {
        if (!user) {
            router.replace('/login');
        }
    }, [user, router]);

    if (!user) return null;

    const accountCards = [
        {
            title: "Your Orders",
            description: "Track, return, cancel an order, download invoice or buy again",
            icon: <Package size={32} className="text-[#48a3a2]" />,
            link: "/orders",
            bg: "bg-[#e5f4f4]"
        },
        {
            title: "Login & security",
            description: "Edit login, name, and mobile number",
            icon: <Lock size={32} className="text-[#48a3a2]" />,
            link: "/account/security",
            bg: "bg-[#e5f4f4]"
        },
        {
            title: "Prime",
            description: "Manage your membership, view benefits, and payment settings",
            icon: <Zap size={32} className="text-[#00a8e1]" />,
            link: "/prime",
            bg: "bg-white border-gray-100"
        },
        {
            title: "Your Addresses",
            description: "Edit, remove or set default address",
            icon: <MapPin size={32} className="text-[#48a3a2]" />,
            link: "/account/addresses",
            bg: "bg-[#e5f4f4]"
        },
        {
            title: "Your business account",
            description: "Sign up to save with business-exclusive pricing, schedule fast deliveries during business-hours, and more",
            icon: <Briefcase size={32} className="text-[#a57f4a]" />,
            link: "/business",
            bg: "bg-[#fef4e5]"
        },
        {
            title: "Gift cards",
            description: "View balance or redeem a card, and purchase a new Gift Card",
            icon: <Gift size={32} className="text-[#48a3a2]" />,
            link: "/gift-cards",
            bg: "bg-[#e5f4f4]"
        },
        {
            title: "Your Payments",
            description: "View all transactions, manage payment methods and settings",
            icon: <CreditCard size={32} className="text-[#48a3a2]" />,
            link: "/account/payments",
            bg: "bg-[#e5f4f4]"
        },
        {
            title: "Your Amazon Family",
            description: "Manage profiles, sharing, and permissions in one place",
            icon: <Users size={32} className="text-[#48a3a2]" />,
            link: "/family",
            bg: "bg-[#e5f4f4]"
        },
        {
            title: "Digital Services and Device Support",
            description: "Troubleshoot device issues, manage or cancel digital subscriptions",
            icon: <Smartphone size={32} className="text-gray-500" />,
            link: "/help",
            bg: "bg-gray-50"
        },
        {
            title: "Your Lists",
            description: "View, modify, and share your lists, or create new ones",
            icon: <List size={32} className="text-[#48a3a2]" />,
            link: "/wishlist",
            bg: "bg-[#e5f4f4]"
        },
        {
            title: "Customer Service",
            description: "Browse self service options, help articles or contact us",
            icon: <Headphones size={32} className="text-[#48a3a2]" />,
            link: "/help",
            bg: "bg-[#e5f4f4]"
        },
        {
            title: "Your Messages",
            description: "View or respond to messages from Amazon, Sellers and Buyers",
            icon: <Mail size={32} className="text-[#48a3a2]" />,
            link: "/messages",
            bg: "bg-[#e5f4f4]"
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            <main className="max-w-[1000px] mx-auto px-4 py-8">
                <h1 className="text-[28px] font-normal text-[#111] mb-6">Your Account</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {accountCards.map((card, idx) => (
                        <Link
                            key={idx}
                            href={card.link}
                            className="flex items-start gap-4 p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors group cursor-pointer h-full"
                        >
                            <div className={`w-16 h-16 rounded-full flex-shrink-0 flex items-center justify-center ${card.bg} border border-transparent group-hover:border-gray-200`}>
                                {card.icon}
                            </div>
                            <div className="flex flex-col">
                                <h2 className="text-[17px] font-bold text-[#111] group-hover:text-[#c45500] leading-tight mb-1">{card.title}</h2>
                                <p className="text-[14px] text-gray-600 leading-snug">{card.description}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>

            <footer className="mt-20 border-t border-gray-200 py-10">
                <div className="max-w-[1000px] mx-auto text-center">
                    <div className="flex justify-center gap-8 text-[12px] text-[#0066c0] mb-4">
                        <span className="hover:text-[#c45500] hover:underline cursor-pointer">Conditions of Use</span>
                        <span className="hover:text-[#c45500] hover:underline cursor-pointer">Privacy Notice</span>
                        <span className="hover:text-[#c45500] hover:underline cursor-pointer">Help</span>
                    </div>
                    <p className="text-[12px] text-gray-500">
                        © 1996–2026, Amazon.com, Inc. or its affiliates
                    </p>
                </div>
            </footer>
        </div>
    );
}
