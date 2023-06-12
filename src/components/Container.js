import React from 'react';

export default function ({ children, className = '' }) {
    return (
        <section className={`py-8 md:py-12 xl:py-16 ${className}`}>
            <div className="mx-auto px-4 sm:px-6 md:max-w-4xl md:px-4 lg:max-w-7xl xl:max-w-8xl 2xl:max-w-9xl lg:px-12">
                {children}
            </div>
        </section>
    );
}
