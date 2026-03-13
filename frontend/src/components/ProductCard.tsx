"use client";

import React from 'react';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { cartService, wishlistService, authService } from '@/services/api';
import { useRouter } from 'next/navigation';

interface ProductCardProps {
    product: {
        id: number;
        name: string;
        price: number;
        primary_image: string;
        category_name: string;
        rating: number;
        num_reviews: number;
    }
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const router = useRouter();

    const handleAddToCart = async (e: React.MouseEvent) => {
        e.preventDefault(); e.stopPropagation();
        const user = authService.getCurrentUser();
        if (!user) {
            router.push('/login');
            return;
        }
        try {
            await cartService.add(product.id, 1);
            window.dispatchEvent(new CustomEvent('cartUpdated'));
            // Use a custom event or a better way to show success in production
            // For now, let's just make it feel more integrated
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };

    const handleAddToWishlist = async (e: React.MouseEvent) => {
        e.preventDefault(); e.stopPropagation();
        const user = authService.getCurrentUser();
        if (!user) {
            router.push('/login');
            return;
        }
        try {
            await wishlistService.add(product.id);
            alert('Added to wishlist!');
        } catch (error) {
            console.error('Error adding to wishlist:', error);
        }
    };

    // Use actual ratings and review counts from product data
    const rating = Number(product.rating || 0).toFixed(1);
    const reviews = Number(product.num_reviews || 0).toLocaleString();
    const isPrime = product.id % 2 === 0;

    return (
        <div className="bg-white flex flex-col p-4 border border-gray-200 hover:shadow-[0_10px_20px_rgba(0,0,0,0.1)] transition-all duration-300 h-full group relative rounded-sm cursor-pointer">
            {/* Wishlist Button */}
            <button
                onClick={handleAddToWishlist}
                className="absolute top-4 right-4 z-10 p-2 bg-white/90 rounded-full hover:bg-white text-gray-300 hover:text-red-500 transition-all shadow-sm border border-gray-100 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0"
            >
                <Heart size={18} />
            </button>

            {/* Badges */}
            <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                {product.price > 50000 && (
                    <span className="bg-[#cc0c39] text-white text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider">
                        Premium Choice
                    </span>
                )}
                {product.id % 7 === 0 && (
                    <span className="bg-[#e67a00] text-white text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider">
                        Best Seller
                    </span>
                )}
            </div>

            <Link href={`/product/${product.id}`} className="flex flex-col flex-1">
                {/* Image Container */}
                <div className="relative h-56 w-full mb-4 bg-[#f7f8f8] flex items-center justify-center p-4 overflow-hidden rounded-sm">
                    <img
                        src={product.primary_image || 'https://images.unsplash.com/photo-1560393464-5c69a73c5770?w=800'}
                        alt={product.name}
                        className="object-contain h-full w-full group-hover:scale-110 transition-transform duration-500 ease-out mix-blend-multiply"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1560393464-5c69a73c5770?w=800';
                        }}
                    />
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 px-1">
                    <h3 className="text-[15px] font-medium text-gray-900 mb-1.5 line-clamp-2 h-11 leading-tight group-hover:text-[#007185] transition-colors">
                        {product.name}
                    </h3>

                    {/* Ratings */}
                    <div className="flex items-center gap-1.5 mb-2">
                        <div className="flex text-[#febd69]">
                            {[1, 2, 3, 4, 5].map((s) => (
                                <span key={s} className="text-sm">
                                    {s <= Math.round(Number(rating)) ? '★' : '☆'}
                                </span>
                            ))}
                        </div>
                        <span className="text-xs text-[#007185] hover:text-[#c45500] hover:underline">
                            {reviews}
                        </span>
                    </div>

                    {/* Pricing */}
                    <div className="flex flex-col mb-2">
                        <div className="flex items-baseline gap-0.5 text-gray-900">
                            <span className="text-[13px] font-medium mt-0.5">₹</span>
                            <span className="text-[26px] font-bold leading-none tracking-tight">
                                {Number(product.price).toLocaleString('en-IN')}
                            </span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-gray-500 block">
                                M.R.P: <span className="line-through">₹{Math.round(product.price * 1.2).toLocaleString('en-IN')}</span>
                            </span>
                            <span className="text-[11px] bg-red-50 text-[#CC0C39] font-bold px-1.5 py-0.5 rounded-sm border border-red-100">
                                20% off
                            </span>
                        </div>
                    </div>

                    {/* Delivery & Prime */}
                    <div className="space-y-1 mb-4 text-[12px]">
                        {isPrime && (
                            <div className="flex items-center gap-1.5">
                                <img src="https://m.media-amazon.com/images/G/31/marketing/fba/prime-badge-32x.png" alt="Prime" className="h-4" />
                                <span className="text-gray-600 font-medium">FREE delivery <span className="font-bold text-gray-900">Tomorrow</span></span>
                            </div>
                        )}
                        {!isPrime && <p className="text-gray-600">FREE delivery <span className="font-bold text-gray-900">Monday, 20 Oct</span></p>}
                    </div>
                </div>
            </Link>

            {/* Actions */}
            <button
                onClick={handleAddToCart}
                className="w-full bg-[#ffd814] hover:bg-[#f7ca00] text-[#111] py-2 rounded-full text-[13px] font-bold shadow-[0_2px_5px_rgba(213,217,217,0.5)] transition-all border border-[#fcd200] active:scale-[0.98]"
            >
                Add to Cart
            </button>
        </div>
    );
};

export default ProductCard;
