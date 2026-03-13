"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { productService, cartService, wishlistService, authService } from '@/services/api';
import Navbar from '@/components/Navbar';
import { ChevronRight, Star, Heart } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ProductDetail() {
    const router = useRouter();
    const { id } = useParams();
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [mainImage, setMainImage] = useState('');
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await productService.getById(id as string);
                setProduct(res.data);
                const primary = res.data.images.find((img: any) => img.is_primary) || res.data.images[0];
                setMainImage(primary?.image_url);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleAddToCart = async () => {
        const user = authService.getCurrentUser();
        if (!user) {
            router.push('/login');
            return;
        }
        try {
            await cartService.add(product.id, quantity);
            window.dispatchEvent(new CustomEvent('cartUpdated'));
            alert('Added to cart!');
        } catch (error) {
            console.error(error);
        }
    };

    const handleAddToWishlist = async () => {
        const user = authService.getCurrentUser();
        if (!user) {
            router.push('/login');
            return;
        }
        try {
            await wishlistService.add(product.id);
            alert('Added to wishlist!');
        } catch (error) {
            console.error(error);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (!product) return <div>Product not found</div>;

    const specs = product.specifications || {};

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            <main className="max-w-[1500px] mx-auto p-4 md:px-8 md:py-6">
                {/* Breadcrumbs */}
                <div className="flex items-center text-[12px] text-gray-500 mb-6 gap-1 group">
                    <Link href="/" className="hover:text-[#c45500] hover:underline">Home</Link>
                    <ChevronRight size={10} />
                    <Link href={`/?category=${product.category_name}`} className="hover:text-[#c45500] hover:underline">{product.category_name}</Link>
                    <ChevronRight size={10} />
                    <span className="text-gray-900 font-medium truncate max-w-[200px]">{product.name}</span>
                </div>

                <div className="flex flex-col lg:flex-row gap-10">
                    {/* Left: Image Section */}
                    <div className="flex flex-col md:flex-row gap-4 lg:w-[45%]">
                        {/* Thumbnails */}
                        <div className="flex md:flex-col gap-2 order-2 md:order-1 flex-shrink-0">
                            {product.images.map((img: any, idx: number) => (
                                <button
                                    key={idx}
                                    onMouseEnter={() => setMainImage(img.image_url)}
                                    className={`relative w-12 h-12 md:w-14 md:h-14 border-2 rounded-[4px] p-0.5 overflow-hidden transition-all ${mainImage === img.image_url ? 'border-[#e77600] ring-4 ring-[#fdecc8]' : 'border-gray-100 hover:border-gray-400'}`}
                                >
                                    <img
                                        src={img.image_url}
                                        alt=""
                                        className="w-full h-full object-contain mix-blend-multiply"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1560393464-5c69a73c5770?w=800';
                                        }}
                                    />
                                </button>
                            ))}
                        </div>

                        {/* Main Image */}
                        <div className="order-1 md:order-2 flex-1 bg-white border border-gray-100 rounded-sm h-[400px] md:h-[550px] flex items-center justify-center p-6 relative group/image cursor-zoom-in">
                            <img
                                src={mainImage}
                                alt={product.name}
                                className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover/image:scale-105"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1560393464-5c69a73c5770?w=800';
                                }}
                            />
                        </div>
                    </div>

                    {/* Middle: Info Section */}
                    <div className="flex-1 lg:max-w-[35%]">
                        <h1 className="text-2xl md:text-3xl font-bold mb-1 text-gray-900 leading-tight">{product.name}</h1>
                        <Link href="/" className="text-[#007185] text-[14px] font-medium hover:text-[#c45500] hover:underline">Visit the {product.category_name} Store</Link>

                        <div className="flex items-center gap-3 mt-3 border-b border-gray-100 pb-4">
                            <div className="flex items-center gap-1.5">
                                <span className="text-[14px] font-bold mt-1">4.5</span>
                                <div className="flex text-[#ffa41c]">
                                    {[...Array(5)].map((_, i) => <Star key={i} size={16} fill={i < 4 ? "#ffa41c" : "none"} />)}
                                </div>
                            </div>
                            <span className="text-[14px] text-[#007185] hover:text-[#c45500] hover:underline">{(1000 + (product.id * 77) % 5000).toLocaleString()} ratings</span>
                            <div className="h-4 w-px bg-gray-300"></div>
                            <span className="text-[14px] text-[#007185] hover:text-[#c45500] hover:underline">10 answered questions</span>
                        </div>

                        <div className="py-5">
                            <div className="flex items-baseline gap-2 mb-1">
                                <span className="text-[#cc0c39] text-3xl font-light">-35%</span>
                                <div className="flex items-baseline text-gray-900">
                                    <span className="text-[16px] font-medium mt-1">₹</span>
                                    <span className="text-4xl font-bold leading-none tracking-tight">{Number(product.price).toLocaleString('en-IN')}</span>
                                </div>
                            </div>
                            <p className="text-[14px] text-gray-500">M.R.P.: <span className="line-through">₹{Math.round(product.price * 1.55).toLocaleString('en-IN')}</span></p>
                            <p className="text-[14px] mt-2 font-medium text-gray-900">Inclusive of all taxes</p>

                            <div className="mt-4 flex items-center gap-2 bg-[#f0f2f2] p-3 rounded-md border border-gray-200">
                                <img src="https://m.media-amazon.com/images/G/31/marketing/prime/2022PrimeBrand/Logos/Prime_Logo_RGB_Prime_Blue_MASTER._CB542734830_.png" className="h-4 md:h-5" alt="Prime" />
                                <p className="text-[13px] text-gray-700 font-medium">Enjoy <span className="font-bold">Unlimited FREE Delivery</span> with Prime</p>
                            </div>
                        </div>

                        <div className="py-4 space-y-4">
                            <div className="flex items-center gap-8">
                                <div className="flex flex-col items-center gap-1">
                                    <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center border border-gray-100"><img src="https://m.media-amazon.com/images/G/31/A2I-Convert/india/images/icons/7-days_return._CB653229871_.png" className="w-6 h-6 object-contain" alt="" /></div>
                                    <span className="text-[11px] text-[#007185] text-center font-medium">7 days Returnable</span>
                                </div>
                                <div className="flex flex-col items-center gap-1">
                                    <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center border border-gray-100 text-[#007185]"><ChevronRight size={20} className="rotate-90" /></div>
                                    <span className="text-[11px] text-[#007185] text-center font-medium">Free Delivery</span>
                                </div>
                                <div className="flex flex-col items-center gap-1">
                                    <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center border border-gray-100"><img src="https://m.media-amazon.com/images/G/31/A2I-Convert/india/images/icons/trust._CB653229871_.png" className="w-6 h-6 object-contain" alt="" /></div>
                                    <span className="text-[11px] text-[#007185] text-center font-medium">Secure Transaction</span>
                                </div>
                            </div>

                            <div className="h-px bg-gray-100 w-full"></div>

                            <div>
                                <h3 className="font-bold text-base mb-2 text-gray-900">About this item</h3>
                                <div className="text-[14px] text-gray-800 leading-relaxed space-y-2">
                                    {product.description.split('. ').map((s: string, i: number) => (
                                        <p key={i} className="flex gap-2">
                                            <span className="text-gray-300 select-none">•</span>
                                            {s}{s.endsWith('.') ? '' : '.'}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Buy Box */}
                    <div className="w-full lg:w-[280px] border border-gray-300 rounded-[8px] p-5 flex flex-col h-fit sticky top-[80px] shadow-sm">
                        <div className="mb-4">
                            <div className="flex items-baseline gap-1 text-gray-900 mb-1">
                                <span className="text-[16px] font-medium leading-none mt-1 text-gray-700">₹</span>
                                <span className="text-3xl font-bold leading-none tracking-tight">{Number(product.price).toLocaleString('en-IN')}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <img src="https://m.media-amazon.com/images/G/31/marketing/prime/2022PrimeBrand/Logos/Prime_Logo_RGB_Prime_Blue_MASTER._CB542734830_.png" className="h-5" alt="Prime" />
                                <span className="text-[14px] text-[#007185] font-medium">Free Delivery</span>
                            </div>
                        </div>

                        <div className="space-y-1 mb-5">
                            <p className="text-[14px] text-[#007600] font-bold">In stock</p>
                            <p className="text-[13px] text-gray-700">Sold by <span className="text-[#007185] hover:underline cursor-pointer">Amazon Retail</span> and <span className="text-[#007185] hover:underline cursor-pointer">Fulfilled by Amazon</span>.</p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <span className="text-[14px] font-bold text-gray-900">Quantity:</span>
                                <select
                                    value={quantity}
                                    onChange={(e) => setQuantity(Number(e.target.value))}
                                    className="flex-1 bg-gray-50 border border-gray-300 text-[13px] rounded-md px-3 py-1.5 focus:border-[#e77600] focus:ring-2 focus:ring-[#fdecc8] transition-all outline-none cursor-pointer"
                                >
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => <option key={n} value={n}>{n}</option>)}
                                </select>
                            </div>

                            <div className="flex flex-col gap-2.5">
                                <button
                                    onClick={handleAddToCart}
                                    className="w-full bg-[#ffd814] hover:bg-[#f7ca00] text-[#111] py-2.5 rounded-full text-[14px] font-bold shadow-sm border border-[#fcd200] transition-colors active:scale-[0.98]"
                                >
                                    Add to Cart
                                </button>
                                <button
                                    className="w-full bg-[#ffa41c] hover:bg-[#fa8900] text-[#111] py-2.5 rounded-full text-[14px] font-bold shadow-sm border border-[#f59e0b] transition-colors active:scale-[0.98]"
                                >
                                    Buy Now
                                </button>
                            </div>

                            <div className="pt-2">
                                <button
                                    onClick={handleAddToWishlist}
                                    className="w-full bg-[#f0f2f2] hover:bg-[#e3e6e6] text-gray-800 py-1.5 rounded-md text-[13px] font-medium flex items-center justify-center gap-2 border border-gray-300 shadow-sm transition-colors"
                                >
                                    <Heart size={16} /> Add to Wish List
                                </button>
                            </div>
                        </div>

                        <div className="mt-6 space-y-3 pt-6 border-t border-gray-200">
                            <div className="flex justify-between text-[12px]">
                                <span className="text-gray-600">Ships from</span>
                                <span className="text-gray-900 font-medium">Amazon</span>
                            </div>
                            <div className="flex justify-between text-[12px]">
                                <span className="text-gray-600">Payment</span>
                                <span className="text-gray-900 font-medium text-right">Secure transaction</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Technical Details Section */}
                <div className="mt-16 bg-white max-w-[1000px]">
                    <h2 className="text-xl font-bold mb-6 text-gray-900 border-b border-gray-100 pb-2">Technical Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
                        <table className="text-[14px] w-full border-collapse">
                            <tbody>
                                {Object.entries(specs).map(([key, val]: [string, any], idx: number) => (
                                    <tr key={key} className={`${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'} border-b border-gray-100 last:border-0`}>
                                        <td className="py-3 px-4 font-bold text-gray-800 w-[140px] uppercase text-[11px] tracking-wider">{key}</td>
                                        <td className="py-3 px-4 text-gray-700">{val}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}
