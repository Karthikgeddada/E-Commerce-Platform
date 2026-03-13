import React from 'react';

interface AmazonLogoProps {
    variant?: 'white' | 'black';
    className?: string;
    width?: number | string;
    height?: number | string;
}

const AmazonLogo: React.FC<AmazonLogoProps> = ({ variant = 'white', className = '', width = 'auto', height = '30' }) => {
    return (
        <img
            src="https://assets.upstox.com/content/assets/images/cms/202451/Amazon%20logo.png"
            alt="Amazon"
            className={`object-contain ${className}`}
            style={{
                height: height,
                width: width,
                filter: variant === 'white' ? 'brightness(0) invert(1)' : 'none'
            }}
        />
    );
};

export default AmazonLogo;
