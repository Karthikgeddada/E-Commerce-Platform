"use client";

import React, { useState, useEffect } from 'react';
import { cartService, orderService } from '@/services/api';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, Lock, Check } from 'lucide-react';
import OrderSummary from '@/components/OrderSummary';

export default function CheckoutPage() {
    const router = useRouter();
    const [cartItems, setCartItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);
    const [step, setStep] = useState(1); // 1: Address, 2: Review & Place Order
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        phone: ''
    });

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const res = await cartService.get();
                if (res.data.length === 0) {
                    router.push('/cart');
                    return;
                }
                setCartItems(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchCart();
    }, [router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const shipping = subtotal > 500 ? 0 : 40;
    const total = subtotal + shipping;

    const handleNextStep = (e: React.FormEvent) => {
        e.preventDefault();
        // Basic validation
        if (!formData.name || !formData.address || !formData.city || !formData.state || !formData.zipCode || !formData.phone) {
            alert('Please fill in all shipping details');
            return;
        }
        setStep(2);
        window.scrollTo(0, 0);
    };

    const handlePlaceOrder = async () => {
        if (isPlacingOrder) return;

        setIsPlacingOrder(true);
        try {
            const res = await orderService.create({
                shippingDetails: formData,
                totalAmount: total
            });
            if (res.success) {
                router.push(`/order-success?id=${res.orderId}`);
                window.dispatchEvent(new CustomEvent('cartUpdated'));
            }
        } catch (err: any) {
            console.error('Checkout error:', err);
            const errorMessage = err.response?.data?.error || err.response?.data?.message || 'Failed to place order. Please try again.';
            alert(errorMessage);
            setIsPlacingOrder(false);
        }
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="animate-spin h-10 w-10 border-b-2 border-[#e77600] rounded-full"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-white flex flex-col text-gray-900">
            {/* Simple Checkout Nav */}
            <div className="bg-[#fcfcfc] border-b py-3 px-8 flex items-center justify-between">
                <Link href="/">
                    <div className="flex items-center">
                        <span className="text-[22px] font-bold text-black font-amazon">amazon<span className="text-[#febd69]">.in</span></span>
                    </div>
                </Link>
                <h1 className="text-[28px] font-normal hidden md:block text-[#111]">Checkout</h1>
                <Lock className="text-[#999]" size={20} />
            </div>

            <main className="max-w-[1150px] mx-auto w-full px-4 py-8 grid grid-cols-1 lg:grid-cols-[1fr_310px] gap-8">
                <div className="space-y-4">
                    {/* Step 1: Shipping Address */}
                    <div className={`border rounded-md overflow-hidden ${step === 1 ? 'border-[#e77600] ring-1 ring-[#e77600]' : 'border-gray-200'}`}>
                        <div className="bg-[#fcfcfc] px-6 py-4 flex justify-between items-center border-b">
                            <div className="flex items-center gap-4">
                                <span className={`text-[18px] font-bold ${step === 1 ? 'text-[#e77600]' : 'text-gray-900'}`}>1</span>
                                <h2 className="text-[18px] font-bold">Shipping address</h2>
                            </div>
                            {step > 1 && (
                                <button onClick={() => setStep(1)} className="text-[#007185] hover:text-[#c45500] text-sm hover:underline">Change</button>
                            )}
                        </div>

                        {step === 1 ? (
                            <form onSubmit={handleNextStep} className="p-6 space-y-4 text-[13px] max-w-[600px]">
                                <div>
                                    <label className="block font-bold mb-1">Full name (First and Last name)</label>
                                    <input
                                        type="text" name="name" required value={formData.name} onChange={handleChange}
                                        className="w-full border border-gray-400 p-2 rounded-sm focus:border-[#e77600] focus:ring-1 focus:ring-[#e77600] outline-none shadow-inner"
                                    />
                                </div>
                                <div>
                                    <label className="block font-bold mb-1">Address</label>
                                    <input
                                        type="text" name="address" required value={formData.address} onChange={handleChange}
                                        className="w-full border border-gray-400 p-2 rounded-sm outline-none shadow-inner"
                                        placeholder="Street address, P.O. box, etc."
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block font-bold mb-1">City</label>
                                        <input
                                            type="text" name="city" required value={formData.city} onChange={handleChange}
                                            className="w-full border border-gray-400 p-2 rounded-sm outline-none shadow-inner"
                                        />
                                    </div>
                                    <div>
                                        <label className="block font-bold mb-1">State</label>
                                        <input
                                            type="text" name="state" required value={formData.state} onChange={handleChange}
                                            className="w-full border border-gray-400 p-2 rounded-sm outline-none shadow-inner"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block font-bold mb-1">Zip Code</label>
                                        <input
                                            type="text" name="zipCode" required value={formData.zipCode} onChange={handleChange}
                                            className="w-full border border-gray-400 p-2 rounded-sm outline-none shadow-inner"
                                        />
                                    </div>
                                    <div>
                                        <label className="block font-bold mb-1">Phone number</label>
                                        <input
                                            type="text" name="phone" required value={formData.phone} onChange={handleChange}
                                            className="w-full border border-gray-400 p-2 rounded-sm outline-none shadow-inner"
                                        />
                                    </div>
                                </div>
                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        className="bg-[#ffd814] hover:bg-[#f7ca00] text-[#111] px-6 py-1.5 rounded-lg text-sm font-medium shadow-sm border border-[#fcd200]"
                                    >
                                        Use this address
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="px-6 py-4 text-[14px]">
                                <p className="font-medium">{formData.name}</p>
                                <p>{formData.address}</p>
                                <p>{formData.city}, {formData.state} {formData.zipCode}</p>
                                <p>Phone: {formData.phone}</p>
                            </div>
                        )}
                    </div>

                    {/* Step 2: Review Items */}
                    <div className={`border rounded-md overflow-hidden ${step === 2 ? 'border-[#e77600] ring-1 ring-[#e77600]' : 'border-gray-200'}`}>
                        <div className="bg-[#fcfcfc] px-6 py-4 flex items-center gap-4 border-b">
                            <span className={`text-[18px] font-bold ${step === 2 ? 'text-[#e77600]' : 'text-gray-900'}`}>2</span>
                            <h2 className="text-[18px] font-bold">Review items and delivery</h2>
                        </div>

                        {step === 2 && (
                            <div className="p-6">
                                <div className="space-y-6">
                                    {cartItems.map((item) => (
                                        <div key={item.id} className="flex gap-4 p-4 border rounded-md">
                                            <div className="w-24 h-24 flex-shrink-0 flex items-center justify-center bg-gray-50 p-2">
                                                <img src={item.primary_image} alt="" className="max-h-full max-w-full object-contain mix-blend-multiply" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-bold text-[15px] mb-1">{item.name}</p>
                                                <p className="text-[#CC0C39] font-bold text-[15px]">₹{item.price.toLocaleString('en-IN')}</p>
                                                <p className="text-[13px] text-[#007600] font-bold">In Stock</p>
                                                <p className="text-[13px] text-gray-600 mt-1">Quantity: {item.quantity}</p>
                                                <p className="text-[12px] text-[#565959] mt-2 italic">Sold by: Amazon Retail</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-8 border p-6 bg-[#fcfcfc] rounded-md flex flex-col md:flex-row justify-between items-center gap-4">
                                    <div className="text-[14px] text-gray-700">
                                        <p className="font-bold">Final Step:</p>
                                        <p>Review your order details and delivery address above before clicking "Place your order".</p>
                                    </div>
                                    <button
                                        onClick={handlePlaceOrder}
                                        disabled={isPlacingOrder}
                                        className="whitespace-nowrap bg-[#ffd814] hover:bg-[#f7ca00] text-[#111] px-10 py-2.5 rounded-full text-[14px] font-bold shadow-sm border border-[#fcd200] disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95"
                                    >
                                        {isPlacingOrder ? (
                                            <div className="flex items-center gap-2">
                                                <div className="animate-spin h-4 w-4 border-b-2 border-black rounded-full"></div>
                                                Placing Order...
                                            </div>
                                        ) : 'Place your order'}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar Summary */}
                <div className="space-y-4">
                    <div className="bg-white border p-5 rounded-md h-fit sticky top-4">
                        <button
                            onClick={step === 1 ? handleNextStep : handlePlaceOrder}
                            disabled={isPlacingOrder}
                            className="w-full bg-[#ffd814] hover:bg-[#f7ca00] text-[#111] py-2 rounded-full text-[13px] font-bold shadow-sm border border-[#fcd200] mb-3 disabled:opacity-50 active:scale-95 transition-transform"
                        >
                            {isPlacingOrder ? 'Processing...' : (step === 1 ? 'Use this address' : 'Place your order')}
                        </button>
                        <p className="text-[11px] text-gray-600 text-center mb-4 leading-normal">
                            Choose a payment method to continue checking out. You'll still have a chance to review and edit your order before it's final.
                        </p>

                        <div className="border-t pt-4">
                            <h3 className="text-[14px] font-bold mb-3">Order Summary</h3>
                            <OrderSummary subtotal={subtotal} shipping={shipping} total={total} />
                        </div>

                        <div className="border-t mt-4 pt-4 bg-[#fcfcfc] -mx-5 -mb-5 p-5 border-b rounded-b-md">
                            <div className="flex justify-between items-center text-[#b12704] font-bold text-[18px]">
                                <span>Order Total:</span>
                                <span>₹{total.toLocaleString('en-IN')}</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#fcfcfc] border p-4 rounded-md text-[13px]">
                        <p className="text-[#007185] hover:underline cursor-pointer">How are delivery costs calculated?</p>
                    </div>
                </div>
            </main>

            <footer className="mt-auto border-t py-10 bg-gray-50">
                <div className="max-w-[1150px] mx-auto text-center px-4">
                    <div className="flex justify-center gap-6 text-[11px] text-[#0066c0] mb-4">
                        <span className="hover:text-[#c45500] hover:underline cursor-pointer">Conditions of Use</span>
                        <span className="hover:text-[#c45500] hover:underline cursor-pointer">Privacy Notice</span>
                        <span className="hover:text-[#c45500] hover:underline cursor-pointer">Help</span>
                    </div>
                    <p className="text-[11px] text-gray-500">
                        © 1996–2026, Amazon.com, Inc. or its affiliates
                    </p>
                </div>
            </footer>
        </div>
    );
}
