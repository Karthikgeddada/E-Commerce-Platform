"use client";

import React, { useState } from 'react';
import { X } from 'lucide-react';

interface LocationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onApply: (zip: string) => void;
    currentZip?: string;
    isLoggedIn?: boolean;
}

const LocationModal: React.FC<LocationModalProps> = ({ isOpen, onClose, onApply, currentZip = '', isLoggedIn = false }) => {
    const [zip, setZip] = useState(currentZip);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-[375px] overflow-hidden">
                {/* Header */}
                <div className="bg-[#f0f2f2] px-6 py-4 flex justify-between items-center border-b">
                    <h2 className="text-lg font-bold text-gray-900">Choose your location</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-black">
                        <X size={24} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 space-y-6">
                    <p className="text-sm text-gray-600 leading-relaxed">
                        Delivery options and delivery speeds may vary for different locations
                    </p>

                    {!isLoggedIn && (
                        <button
                            onClick={() => window.location.href = '/login'}
                            className="w-full bg-[#ffd814] hover:bg-[#f7ca00] text-[#111] py-2.5 rounded-lg text-sm font-medium shadow-sm border border-[#fcd200]"
                        >
                            Sign in to see your addresses
                        </button>
                    )}

                    <div className="flex items-center gap-4">
                        <div className="flex-1 h-px bg-gray-300"></div>
                        <span className="text-xs text-gray-500 uppercase">or enter a US zip code</span>
                        <div className="flex-1 h-px bg-gray-300"></div>
                    </div>

                    <div className="flex gap-2">
                        <input
                            type="text"
                            className="flex-1 border border-gray-400 p-2 rounded-md focus:border-[#e77600] focus:ring-1 focus:ring-[#e77600] outline-none text-gray-900"
                            placeholder="Zip code"
                            value={zip}
                            onChange={(e) => setZip(e.target.value)}
                        />
                        <button
                            onClick={() => onApply(zip)}
                            className="px-6 border border-gray-300 rounded-full text-sm hover:bg-gray-50 text-gray-800"
                        >
                            Apply
                        </button>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex-1 h-px bg-gray-300"></div>
                        <span className="text-xs text-gray-500 uppercase">or ship outside the US</span>
                        <div className="flex-1 h-px bg-gray-300"></div>
                    </div>

                    <select className="w-full border border-gray-400 p-2 rounded-md bg-gray-50 text-gray-800 text-sm outline-none">
                        <option>India</option>
                        <option>United States</option>
                        <option>United Kingdom</option>
                        <option>Canada</option>
                        <option>Australia</option>
                    </select>

                    <div className="flex justify-end pt-2">
                        <button
                            onClick={onClose}
                            className="bg-[#ffd814] hover:bg-[#f7ca00] text-[#111] py-2 px-8 rounded-full text-sm font-medium shadow-sm border border-[#fcd200]"
                        >
                            Done
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LocationModal;
