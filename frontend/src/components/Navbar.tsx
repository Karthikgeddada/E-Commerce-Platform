"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, ShoppingCart, MapPin, Menu, ChevronDown } from 'lucide-react';
import AmazonLogo from './AmazonLogo';
import { cartService, authService } from '@/services/api';
import LocationModal from './LocationModal';
import Sidebar from './Sidebar';

const Navbar = () => {
    const router = useRouter();
    const [cartCount, setCartCount] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [user, setUser] = useState<any>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('user');
            return saved ? JSON.parse(saved) : null;
        }
        return null;
    });
    const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
    const [deliveryLocation, setDeliveryLocation] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('deliveryLocation') || 'India';
        }
        return 'India';
    });
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [searchCategory, setSearchCategory] = useState('All');
    const [isSearchCategoryOpen, setIsSearchCategoryOpen] = useState(false);

    const categories = [
        "All Categories", "Alexa Skills", "Amazon Devices", "Amazon Fashion", "Amazon Fresh",
        "Amazon Pharmacy", "Appliances", "Apps & Games", "Audible Audiobooks", "Baby",
        "Beauty", "Books", "Car & Motorbike", "Clothing & Accessories", "Collectibles",
        "Computers & Accessories", "Deals", "Electronics", "Furniture", "Garden & Outdoors",
        "Gift Cards", "Grocery & Gourmet Foods", "Health & Personal Care", "Home & Kitchen",
        "Industrial & Scientific", "Jewellery", "Kindle Store", "Luggage & Bags", "Luxury Beauty",
        "Movies & TV Shows", "MP3 Music", "Music", "Musical Instruments", "Office Products",
        "Pet Supplies", "Prime Video", "Shoes & Handbags", "Software", "Sports, Fitness & Outdoors",
        "Subscribe & Save", "Tools & Home Improvement", "Toys & Games", "Under ₹500",
        "Video Games", "Watches"
    ];

    const catLink = (name: string) => `/?category=${encodeURIComponent(name)}`;

    useEffect(() => {
        const fetchCart = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setCartCount(0);
                return;
            }
            try {
                const res = await cartService.get();
                if (res.data) {
                    const count = res.data.reduce((acc: number, item: any) => acc + item.quantity, 0);
                    setCartCount(count);
                }
            } catch (error) {
                console.error('Error fetching cart count:', error);
            }
        };

        const checkAuth = async () => {
            // First do a fast local check
            const current = authService.getCurrentUser();
            setUser(current);

            const saved = localStorage.getItem('deliveryLocation');
            setDeliveryLocation(saved || 'India');

            if (current) fetchCart();
            else setCartCount(0);

            // Then verify with backend for true persistence
            const verifiedUser = await authService.verifyToken();
            if (verifiedUser) {
                setUser(verifiedUser);
            }
        };

        checkAuth();
        window.addEventListener('cartUpdated', fetchCart);
        window.addEventListener('authChange', checkAuth);
        return () => {
            window.removeEventListener('cartUpdated', fetchCart);
            window.removeEventListener('authChange', checkAuth);
        };
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        let url = `/?search=${encodeURIComponent(searchQuery)}`;
        if (searchCategory !== 'All' && searchCategory !== 'All Categories') {
            url += `&category=${encodeURIComponent(searchCategory)}`;
        }
        router.push(url);
    };

    const handleLocationApply = (zip: string) => {
        setDeliveryLocation(zip);
        localStorage.setItem('deliveryLocation', zip);
        setIsLocationModalOpen(false);
    };

    return (
        <>
            <nav className="flex flex-col sticky top-0 z-50 shadow-md">
                {/* Top Navy Bar */}
                <div className="bg-[#131921] text-white flex items-center justify-between px-2 md:px-4 py-1.5 gap-2 lg:gap-4 h-[50px] md:h-[60px]">
                    <div className="flex items-center gap-1">
                        <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2 text-white hover:bg-gray-800 rounded-sm">
                            <Menu size={24} />
                        </button>
                        <Link href="/" className="flex items-center border border-transparent hover:border-white px-2 pt-2 pb-1 transition-all rounded-sm group h-[50px]">
                            <AmazonLogo variant="white" height={45} />
                        </Link>
                    </div>

                    <div onClick={() => setIsLocationModalOpen(true)} className="hidden xl:flex items-center border border-transparent hover:border-white px-2 py-1.5 cursor-pointer rounded-sm transition-all ml-2">
                        <MapPin size={18} className="mt-2 text-gray-200" />
                        <div className="flex flex-col ml-1 leading-tight">
                            <span className="text-[12px] text-gray-400 font-normal">Deliver to</span>
                            <span className="text-[14px] font-bold">{deliveryLocation}</span>
                        </div>
                    </div>

                    {/* Desktop Search */}
                    <form onSubmit={handleSearch} className="hidden lg:flex flex-1 h-[40px] group mx-2">
                        <div className="flex w-full bg-white rounded-[4px] focus-within:ring-[3px] focus-within:ring-[#febd69] transition-all relative">
                            <div className="relative h-full flex items-center">
                                <button
                                    type="button"
                                    onClick={() => setIsSearchCategoryOpen(!isSearchCategoryOpen)}
                                    className="bg-[#f3f3f3] hover:bg-[#dadada] text-[#555] px-3.5 h-full flex items-center gap-1 border-r border-[#bbb] text-[12px] font-medium transition-colors whitespace-nowrap min-w-[60px] rounded-l-[4px]"
                                >
                                    {searchCategory === 'All Categories' ? 'All' : (searchCategory.length > 10 ? searchCategory.substring(0, 10) + '...' : searchCategory)}
                                    <ChevronDown size={14} className="mt-0.5 text-gray-500" />
                                </button>
                                {isSearchCategoryOpen && (
                                    <>
                                        <div className="fixed inset-0 z-[60]" onClick={() => setIsSearchCategoryOpen(false)} />
                                        <div className="absolute top-full left-0 mt-1 w-[220px] bg-white border border-gray-300 shadow-xl rounded-sm z-[70] py-1 max-h-[400px] overflow-y-auto">
                                            {categories.map((cat) => (
                                                <div
                                                    key={cat}
                                                    onClick={() => {
                                                        const selectedCat = cat === 'All Categories' ? 'All' : cat;
                                                        setSearchCategory(selectedCat);
                                                        setIsSearchCategoryOpen(false);
                                                        if (selectedCat === 'All') router.push('/');
                                                        else if (selectedCat === 'Deals') router.push('/offers');
                                                        else router.push(catLink(selectedCat));
                                                    }}
                                                    className={`px-4 py-1.5 text-[13px] text-gray-800 hover:bg-[#e7f4f5] hover:text-[#007185] cursor-pointer whitespace-nowrap ${(searchCategory === cat || (searchCategory === 'All' && cat === 'All Categories')) ? 'bg-[#f3f3f3] font-bold border-l-4 border-[#007185]' : ''}`}
                                                >
                                                    {cat}
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                            <input
                                type="text"
                                className="flex-1 px-4 py-2 text-[#111] outline-none text-[15px] placeholder:text-gray-500"
                                placeholder="Search Amazon.in"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button type="submit" className="bg-[#febd69] hover:bg-[#f3a847] p-2.5 flex items-center justify-center min-w-[50px] text-[#131921] transition-colors rounded-r-[4px]">
                                <Search size={24} strokeWidth={2.5} />
                            </button>
                        </div>
                    </form>

                    <div className="flex items-center gap-1 lg:gap-3">
                        <Link href={user ? "/account" : "/login"} className="flex items-center px-1 md:px-2 py-1 transition-all rounded-sm border border-transparent hover:border-white">
                            <div className="flex flex-col leading-tight">
                                <span className="text-[11px] md:text-[12px] font-normal hidden sm:block">Hello, {user ? user.name.split(' ')[0] : 'sign in'}</span>
                                <span className="text-[13px] md:text-[14px] font-bold flex items-center whitespace-nowrap">
                                    {user ? <span className="sm:hidden">Profile</span> : <span className="sm:hidden">Sign in</span>}
                                    <span className="hidden sm:inline">Account & Lists</span>
                                    <ChevronDown size={12} className="ml-0.5 text-gray-400 hidden sm:block" />
                                </span>
                            </div>
                        </Link>

                        <Link href="/orders" className="hidden md:flex flex-col px-2 py-1 transition-all rounded-sm border border-transparent hover:border-white">
                            <span className="text-[12px] font-normal">Returns</span>
                            <span className="text-[14px] font-bold">& Orders</span>
                        </Link>

                        <Link href="/cart" className="flex items-center px-1 md:px-2 py-1 relative transition-all rounded-sm border border-transparent hover:border-white">
                            <div className="relative">
                                <ShoppingCart size={26} className="md:w-8 md:h-8" strokeWidth={1.5} />
                                <span className="absolute -top-1 -right-1 md:-top-1.5 md:-right-1.5 bg-[#f08804] text-[#131921] rounded-full h-[18px] w-[18px] md:h-[20px] md:w-[20px] flex items-center justify-center font-bold text-[11px] md:text-[12px]">
                                    {cartCount}
                                </span>
                            </div>
                            <span className="hidden lg:block font-bold text-[14px] self-end mb-0.5 ml-1">Cart</span>
                        </Link>
                    </div>
                </div>

                {/* Mobile Search Row */}
                <div className="bg-[#131921] px-3 pb-2 lg:hidden">
                    <form onSubmit={handleSearch} className="flex h-[38px]">
                        <div className="flex w-full bg-white rounded-[4px] relative">
                            <input
                                type="text"
                                className="flex-1 px-4 py-2 text-[#111] outline-none text-[14px] placeholder:text-gray-500 rounded-l-[4px]"
                                placeholder="Search Amazon.in"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button type="submit" className="bg-[#febd69] p-2 flex items-center justify-center min-w-[45px] text-[#131921] rounded-r-[4px]">
                                <Search size={22} strokeWidth={2.5} />
                            </button>
                        </div>
                    </form>
                </div>

                {/* Bottom Bar */}
                <div className="bg-[#232f3e] text-white flex items-center px-2 py-0.5 text-[14px] overflow-x-auto no-scrollbar border-t border-[#37475a] h-[38px]">
                    <button onClick={() => setIsSidebarOpen(true)} className="hidden lg:flex items-center font-bold gap-1 border border-transparent hover:border-white px-3 py-1 transition-all rounded-sm h-[32px] flex-shrink-0">
                        <Menu size={18} strokeWidth={3} />
                        <span>All</span>
                    </button>
                    <div className="flex items-center gap-0.5 whitespace-nowrap">
                        {[
                            { label: 'Fresh', href: catLink('Fresh') },
                            { label: 'Deals', href: '/offers' },
                            { label: 'Electronics', href: catLink('Electronics') },
                            { label: 'Appliances', href: catLink('Appliances') },
                            { label: 'Fashion', href: catLink('Amazon Fashion') },
                            { label: 'Home', href: catLink('Home & Kitchen') },
                            { label: 'Books', href: catLink('Books') },
                            { label: 'Beauty', href: catLink('Beauty') }
                        ].map((item) => (
                            <Link key={item.label} href={item.href} className="border border-transparent hover:border-white px-3 py-1 transition-all rounded-sm text-[13px] font-medium h-[32px] flex items-center">
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </nav>

            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
            <LocationModal
                isOpen={isLocationModalOpen}
                onClose={() => setIsLocationModalOpen(false)}
                onApply={handleLocationApply}
                currentZip={deliveryLocation === 'India' ? '' : deliveryLocation}
                isLoggedIn={!!user}
            />
        </>
    );
};

export default Navbar;
