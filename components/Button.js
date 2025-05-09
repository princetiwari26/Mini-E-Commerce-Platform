'use client';

export default function Button({ 
    children, 
    onClick, 
    type = 'button',
    variant = 'primary',
    className = '',
    fullWidth = false
}) {
    const baseClasses = 'px-4 py-2 rounded-lg font-medium transition-all duration-200 ease-in-out';
    const variantClasses = {
        primary: 'bg-button-primary text-primary',
        secondary: 'bg-button-secondary text-primary',
    };
    
    return (
        <button
            type={type}
            onClick={onClick}
            className={`
                ${baseClasses}
                ${variantClasses[variant]}
                ${fullWidth ? 'w-full' : ''}
                ${className} cursor-pointer
            `}
        >
            {children}
        </button>
    );
}