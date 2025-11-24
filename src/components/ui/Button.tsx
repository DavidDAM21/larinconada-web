import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'white';
    children: React.ReactNode;
}

export function Button({
    variant = 'primary',
    children,
    className = '',
    ...props
}: ButtonProps) {
    const baseStyles = 'px-6 py-3 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
        primary: 'bg-amber-800 text-amber-50 hover:bg-amber-900 active:bg-amber-950 shadow-md',
        secondary: 'bg-stone-600 text-stone-50 hover:bg-stone-700 active:bg-stone-800 shadow-md',
        outline: 'border-2 border-amber-800 text-amber-900 hover:bg-amber-50 active:bg-amber-100',
        white: 'bg-white text-amber-900 hover:bg-amber-50 active:bg-amber-100 shadow-md',
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
