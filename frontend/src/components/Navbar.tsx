"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, ShoppingCart, MapPin, Menu, User, ChevronDown } from 'lucide-react';
import { cartService, authService } from '@/services/api';
import LocationModal from './LocationModal';
import Sidebar from './Sidebar';

const Navbar = () => {
    const router = useRouter();
    const [cartCount, setCartCount] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [user, setUser] = useState<any>(null);
    const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
    const [deliveryLocation, setDeliveryLocation] = useState('India');
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

    // Helper to generate safe category links
    const catLink = (name: string) => `/?category=${encodeURIComponent(name)}`;

    useEffect(() => {
        const savedLocation = localStorage.getItem('deliveryLocation');
        if (savedLocation) setDeliveryLocation(savedLocation);

        const currentUser = authService.getCurrentUser();
        setUser(currentUser);

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

        const checkAuth = () => {
            const current = authService.getCurrentUser();
            setUser(current);
            const saved = localStorage.getItem('deliveryLocation');
            setDeliveryLocation(saved || 'India');

            if (current) {
                fetchCart();
            } else {
                setCartCount(0);
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

    const handleLogout = () => {
        authService.logout();
        setUser(null);
        setCartCount(0);
        router.push('/login');
    };

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
                <div className="bg-[#131921] text-white flex items-center justify-between px-4 py-1.5 gap-2 lg:gap-4 h-[60px]">
                    {/* Logo */}
                    <Link href="/" className="flex items-center border border-transparent hover:border-white p-1.5 transition-all rounded-sm ml-1 group">
                        <div className="relative">
                            <span className="text-2xl font-bold tracking-tight">amazon<span className="text-[#febd69]">.in</span></span>
                            <div className="absolute -bottom-1 right-0 h-0.5 w-0 bg-[#febd69] group-hover:w-full transition-all duration-300"></div>
                        </div>
                    </Link>

                    {/* Location */}
                    <div
                        onClick={() => setIsLocationModalOpen(true)}
                        className="hidden xl:flex items-center border border-transparent hover:border-white px-2 py-1.5 cursor-pointer rounded-sm transition-all"
                    >
                        <MapPin size={18} className="mt-2 text-gray-200" />
                        <div className="flex flex-col ml-1 leading-tight">
                            <span className="text-[12px] text-gray-400 font-normal">Deliver to</span>
                            <span className="text-[14px] font-bold">{deliveryLocation}</span>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="flex flex-1 h-[40px] group">
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
                                        <div
                                            className="fixed inset-0 z-[60]"
                                            onClick={() => setIsSearchCategoryOpen(false)}
                                        />
                                        <div className="absolute top-full left-0 mt-1 w-[220px] bg-white border border-gray-300 shadow-xl rounded-sm z-[70] py-1 max-h-[400px] overflow-y-auto">
                                            {categories.map((cat) => (
                                                <div
                                                    key={cat}
                                                    onClick={() => {
                                                        const selectedCat = cat === 'All Categories' ? 'All' : cat;
                                                        setSearchCategory(selectedCat);
                                                        setIsSearchCategoryOpen(false);
                                                        if (selectedCat === 'All') {
                                                            router.push('/');
                                                        } else {
                                                            router.push(catLink(selectedCat));
                                                        }
                                                    }}
                                                    className={`px-4 py-1.5 text-[13px] text-gray-800 hover:bg-[#e7f4f5] hover:text-[#007185] cursor-pointer whitespace-nowrap ${(searchCategory === cat || (searchCategory === 'All' && cat === 'All Categories')) ? 'bg-[#f3f3f3] font-bold border-l-4 border-[#007185]' : ''
                                                        }`}
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

                    {/* Right Side Items */}
                    <div className="flex items-center">
                        {/* Language/Flag (Simulated for visual) */}
                        <div className="hidden lg:flex items-center gap-1 px-2 py-2 border border-transparent hover:border-white cursor-pointer rounded-sm group">
                            <div className="w-5 h-3.5 bg-orange-500 rounded-sm"></div>
                            <span className="text-sm font-bold mt-1">EN</span>
                        </div>

                        {user ? (
                            <div className="flex items-center border border-transparent hover:border-white px-2 py-1.5 cursor-pointer group relative rounded-sm ml-1">
                                <div className="flex flex-col leading-tight">
                                    <span className="text-[12px] font-normal">Hello, {user.name.split(' ')[0]}</span>
                                    <span className="text-[14px] font-bold flex items-center gap-0.5">Account & Lists <Menu size={12} className="mt-0.5 text-gray-400" /></span>
                                </div>
                                {/* Account Dropdown */}
                                <div className="absolute top-full right-0 mt-0 w-64 bg-white text-[#111] shadow-[0_10px_30px_rgba(0,0,0,0.2)] border border-gray-200 rounded-[4px] hidden group-hover:block z-[100] p-0 overflow-hidden">
                                    <div className="bg-gray-50 p-4 border-b">
                                        <p className="font-bold text-sm">Your Account</p>
                                    </div>
                                    <ul className="p-2 space-y-0.5">
                                        <li><Link href="/orders" className="flex items-center px-3 py-2 text-[13px] hover:bg-gray-100 rounded-sm transition-colors text-gray-700">Your Orders</Link></li>
                                        <li><Link href="/wishlist" className="flex items-center px-3 py-2 text-[13px] hover:bg-gray-100 rounded-sm transition-colors text-gray-700">Your Wishlist</Link></li>
                                        <div className="h-px bg-gray-200 my-1"></div>
                                        <li><button onClick={handleLogout} className="w-full text-left px-3 py-2 text-[13px] hover:bg-gray-100 rounded-sm transition-colors text-blue-600 font-medium">Sign Out</button></li>
                                    </ul>
                                </div>
                            </div>
                        ) : (
                            <Link href="/login" className="flex items-center border border-transparent hover:border-white px-2 py-1.5 cursor-pointer rounded-sm ml-1 transition-all">
                                <div className="flex flex-col leading-tight">
                                    <span className="text-[12px] font-normal">Hello, sign in</span>
                                    <span className="text-[14px] font-bold">Account & Lists</span>
                                </div>
                            </Link>
                        )}

                        <Link href="/orders" className="hidden md:flex flex-col px-2 py-1.5 border border-transparent hover:border-white cursor-pointer rounded-sm leading-tight ml-1 transition-all">
                            <span className="text-[12px] font-normal">Returns</span>
                            <span className="text-[14px] font-bold">& Orders</span>
                        </Link>

                        <Link href="/cart" className="flex items-center border border-transparent hover:border-white px-2 py-1.5 relative rounded-sm ml-1 transition-all">
                            <div className="relative flex items-center">
                                <ShoppingCart size={34} strokeWidth={1.5} />
                                <span className="absolute top-[-5px] left-[15px] bg-[#f08804] text-[#131921] rounded-full h-[22px] w-[22px] flex items-center justify-center font-bold text-[14px]">
                                    {cartCount}
                                </span>
                            </div>
                            <span className="hidden lg:block font-bold text-[14px] mt-4 ml-0.5">Cart</span>
                        </Link>
                    </div>
                </div>

                {/* Bottom Menu Bar */}
                <div className="bg-[#232f3e] text-white flex items-center px-2 py-0.5 text-[14px] overflow-x-auto whitespace-nowrap h-[39px] no-scrollbar border-t border-[#37475a]">
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="flex items-center font-bold gap-1 border border-transparent hover:border-white px-3 py-1.5 transition-all rounded-sm ml-2 h-[32px] flex-shrink-0"
                    >
                        <Menu size={18} strokeWidth={3} /> <span className="text-[14px]">All</span>
                    </button>
                    <div className="flex items-center gap-0.5">
                        {[
                            { label: 'Fresh', href: catLink('Amazon Fresh') },
                            { label: 'Amazon miniTV', href: catLink('Alexa Skills') },
                            { label: 'Best Sellers', href: '/?sort=Avg. Customer Review' },
                            { label: "Today's Deals", href: catLink('Deals') },
                            { label: 'Electronics', href: catLink('Electronics') },
                            { label: 'Appliances', href: catLink('Appliances') },
                            { label: 'Fashion', href: catLink('Amazon Fashion') },
                            { label: 'Home & Kitchen', href: catLink('Home & Kitchen') },
                            { label: 'Books', href: catLink('Books') },
                            { label: 'Beauty', href: catLink('Beauty') }
                        ].map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className="border border-transparent hover:border-white px-3 py-1.5 transition-all rounded-sm text-[13px] font-medium h-[32px] flex items-center"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </div>

                <LocationModal
                    isOpen={isLocationModalOpen}
                    onClose={() => setIsLocationModalOpen(false)}
                    onApply={handleLocationApply}
                    currentZip={deliveryLocation === 'India' ? '' : deliveryLocation}
                />

            </nav>
            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />
        </>
    );
};

export default Navbar;
