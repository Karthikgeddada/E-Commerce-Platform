"use client";

import React from 'react';

interface OrderSummaryProps {
    subtotal: number;
    shipping: number;
    total: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ subtotal, shipping, total }) => {
    return (
        <div className="space-y-2 text-xs text-gray-800">
            <div className="flex justify-between">
                <span>Items:</span>
                <span>₹{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
                <span>Delivery:</span>
                <span>₹{shipping === 0 ? 'FREE' : shipping}</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-[#b12704] pt-2">
                <span>Order Total:</span>
                <span>₹{total.toLocaleString()}</span>
            </div>
        </div>
    );
};

export default OrderSummary;
