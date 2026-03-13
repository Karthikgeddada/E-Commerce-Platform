import React from 'react';

interface AmazonLogoProps {
    variant?: 'white' | 'black';
    className?: string;
    width?: number | string;
    height?: number | string;
}

const AmazonLogo: React.FC<AmazonLogoProps> = ({ variant = 'white', className = '', width = 'auto', height = '30' }) => {
    const textColor = variant === 'white' ? 'white' : 'black';
    const arrowColor = '#febd69';

    return (
        <div className={`flex flex-col items-start ${className}`} style={{ height, width }}>
            <div className="flex items-baseline relative">
                <span className="font-bold text-[28px] tracking-tighter" style={{ color: textColor, lineHeight: 1 }}>
                    amazon
                </span>
                <span className={`text-[14px] font-bold ml-0.5 ${variant === 'white' ? 'mt-1.5' : ''}`} style={{ color: textColor }}>
                    .in
                </span>

                {/* Amazon Smile/Arrow SVG */}
                <svg
                    viewBox="0 0 100 20"
                    className="absolute -bottom-[8px] left-[4px] w-[85%]"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M2 5C15 15 45 18 95 6C97 5.5 98 8 96 9C75 20 25 22 2 10C0 9 0 4 2 5Z"
                        fill={arrowColor}
                    />
                    <path
                        d="M93 7L98 5L96 11L93 7Z"
                        fill={arrowColor}
                    />
                </svg>
            </div>
        </div>
    );
};

export default AmazonLogo;
