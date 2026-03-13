"use client";

import React, { useEffect } from 'react';
import { X, User, ChevronRight, Globe, Flag } from 'lucide-react';
import Link from 'next/link';
import { authService } from '@/services/api';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
    const [user, setUser] = React.useState<any>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('user');
            return saved ? JSON.parse(saved) : null;
        }
        return null;
    });
    const catLink = (name: string) => `/?category=${encodeURIComponent(name)}`;

    useEffect(() => {
        setUser(authService.getCurrentUser());
    }, [isOpen]);

    // Prevent scrolling when sidebar is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black/60 z-[100] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            />

            {/* Sidebar Shell */}
            <div className={`fixed top-0 left-0 h-full w-[280px] sm:w-[365px] bg-white z-[101] transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} flex flex-col shadow-2xl overflow-y-auto`}>

                {/* Close Button (Relative to sidebar or fixed) */}
                <button
                    onClick={onClose}
                    className={`fixed left-[290px] sm:left-[375px] top-4 text-white z-[102] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                >
                    <X size={32} />
                </button>

                {/* Header */}
                <div className="bg-[#232f3e] text-white p-4 flex items-center gap-3 shrink-0">
                    <div className="bg-white/20 rounded-full p-1.5 border border-white/10">
                        <User size={25} fill="currentColor" />
                    </div>
                    <Link href={user ? "/account" : "/login"} onClick={onClose} className="text-[19px] font-bold tracking-tight hover:underline">
                        Hello, {user ? user.name : 'sign in'}
                    </Link>
                </div>

                {/* Body Content */}
                <div className="flex-1 overflow-y-auto text-[14px]">

                    {/* Trending Section */}
                    <div className="py-2 border-b border-gray-200">
                        <h3 className="px-9 py-2 text-[18px] font-bold text-[#111]">Trending</h3>
                        <ul className="text-gray-700 font-medium">
                            <li><Link href="/?sort=Avg. Customer Review" onClick={onClose} className="block px-9 py-[10px] hover:bg-gray-100">Best Sellers</Link></li>
                            <li><Link href="/?sort=Newest" onClick={onClose} className="block px-9 py-[10px] hover:bg-gray-100">New Releases</Link></li>
                            <li><Link href="#" className="block px-9 py-[10px] hover:bg-gray-100">Movers and Shakers</Link></li>
                        </ul>
                    </div>

                    {/* Shop By Category Section */}
                    <div className="py-2 border-b border-gray-200">
                        <div className="flex justify-between items-center px-9 py-2">
                            <h3 className="text-[18px] font-bold text-[#111]">Shop By Category</h3>
                        </div>
                        <ul className="text-gray-700 font-medium">
                            <li>
                                <Link href={catLink('Electronics')} onClick={onClose} className="flex justify-between items-center px-9 py-[10px] hover:bg-gray-100 transition-colors">
                                    Mobiles, Computers <ChevronRight size={18} className="text-gray-500" />
                                </Link>
                            </li>
                            <li>
                                <Link href={catLink('Electronics')} onClick={onClose} className="flex justify-between items-center px-9 py-[10px] hover:bg-gray-100 transition-colors">
                                    TVs, Audio, Cameras <ChevronRight size={18} className="text-gray-500" />
                                </Link>
                            </li>
                            <div className="h-px bg-gray-100 mx-9 my-1"></div>
                            <li>
                                <Link href={catLink('Amazon Fashion')} onClick={onClose} className="flex justify-between items-center px-9 py-[10px] hover:bg-gray-100 transition-colors">
                                    Men's & Women's Fashion <ChevronRight size={18} className="text-gray-500" />
                                </Link>
                            </li>
                            <li>
                                <Link href={catLink('Shoes & Handbags')} onClick={onClose} className="flex justify-between items-center px-9 py-[10px] hover:bg-gray-100 transition-colors">
                                    Footwear & Shoes <ChevronRight size={18} className="text-gray-500" />
                                </Link>
                            </li>
                            <div className="h-px bg-gray-100 mx-9 my-1"></div>
                            <li>
                                <Link href={catLink('Appliances')} onClick={onClose} className="flex justify-between items-center px-9 py-[10px] hover:bg-gray-100 transition-colors">
                                    Appliances <ChevronRight size={18} className="text-gray-500" />
                                </Link>
                            </li>
                            <li>
                                <Link href={catLink('Home & Kitchen')} onClick={onClose} className="flex justify-between items-center px-9 py-[10px] hover:bg-gray-100 transition-colors">
                                    Home, Kitchen, Furniture <ChevronRight size={18} className="text-gray-500" />
                                </Link>
                            </li>
                            <div className="h-px bg-gray-100 mx-9 my-1"></div>
                            <li>
                                <Link href={catLink('Beauty')} onClick={onClose} className="flex justify-between items-center px-9 py-[10px] hover:bg-gray-100 transition-colors">
                                    Beauty & Health <ChevronRight size={18} className="text-gray-500" />
                                </Link>
                            </li>
                            <li>
                                <Link href={catLink('Books')} onClick={onClose} className="flex justify-between items-center px-9 py-[10px] hover:bg-gray-100 transition-colors">
                                    Books <ChevronRight size={18} className="text-gray-500" />
                                </Link>
                            </li>
                            <li>
                                <Link href={catLink('Sports, Fitness & Outdoors')} onClick={onClose} className="flex justify-between items-center px-9 py-[10px] hover:bg-gray-100 transition-colors">
                                    Sports & Fitness <ChevronRight size={18} className="text-gray-500" />
                                </Link>
                            </li>
                            <li>
                                <Link href={catLink('Amazon Fresh')} onClick={onClose} className="flex justify-between items-center px-9 py-[10px] hover:bg-gray-100 transition-colors">
                                    Grocery & Fresh <ChevronRight size={18} className="text-gray-500" />
                                </Link>
                            </li>
                        </ul>
                        <button className="px-9 py-3 text-[#007185] hover:bg-gray-100 w-full text-left flex items-center gap-1 font-medium">
                            See all <ChevronRight size={16} className="mt-0.5 rotate-90" />
                        </button>
                    </div>

                    {/* Programs & Features Section */}
                    <div className="py-2 border-b border-gray-200">
                        <h3 className="px-9 py-2 text-[18px] font-bold text-[#111]">Programs & Features</h3>
                        <ul className="text-gray-700">
                            <li><Link href="#" className="block px-9 py-3 hover:bg-gray-100">Amazon Launchpad</Link></li>
                            <li><Link href="#" className="block px-9 py-3 hover:bg-gray-100">Handmade</Link></li>
                            <li>
                                <Link href="#" className="flex justify-between items-center px-9 py-3 hover:bg-gray-100">
                                    Gift Cards & Mobile Recharges <ChevronRight size={18} className="text-gray-400" />
                                </Link>
                            </li>
                            <li><Link href="#" className="block px-9 py-3 hover:bg-gray-100">Flight Tickets</Link></li>
                        </ul>
                    </div>

                    {/* Help & Settings Section */}
                    <div className="py-2">
                        <h3 className="px-9 py-2 text-[18px] font-bold text-[#111]">Help & Settings</h3>
                        <ul className="text-gray-700">
                            <li><Link href="/account" onClick={onClose} className="block px-9 py-3 hover:bg-gray-100">Your Account</Link></li>
                            <li><Link href="#" className="flex items-center gap-2 px-9 py-3 hover:bg-gray-100"><Globe size={18} /> English</Link></li>
                            <li><Link href="#" className="flex items-center gap-2 px-9 py-3 hover:bg-gray-100"><Flag size={18} /> India</Link></li>
                            <li><Link href="/orders" onClick={onClose} className="block px-9 py-3 hover:bg-gray-100">Customer Service</Link></li>
                            {user ? (
                                <li>
                                    <button
                                        onClick={() => {
                                            authService.logout();
                                            window.location.reload();
                                        }}
                                        className="block px-9 py-3 hover:bg-gray-100 w-full text-left"
                                    >
                                        Sign Out
                                    </button>
                                </li>
                            ) : (
                                <li><Link href="/login" onClick={onClose} className="block px-9 py-3 hover:bg-gray-100">Sign In</Link></li>
                            )}
                        </ul>
                    </div>

                </div>
            </div>
        </>
    );
};

export default Sidebar;
