import React from 'react';
import { cn } from '@uniwebcms/module-sdk';

export default function HeroImage(props) {
    const {
        height = '500px',
        width = '100%',
        src,
        gradient = null,
        children,
        title,
        subtile
    } = props;

    let gradientClassName = '';

    if (gradient) {
        const { color = '#fff213' } = gradient;

        gradientClassName = `after:absolute after:inset-0 after:bg-gradient-to-b after:from-transparent after:z-0 `;

        const { theme, level } = gradient;

        switch (theme) {
            case 'dark':
                gradientClassName += `after:to-gray-600`;
                break;
            case 'medium':
                gradientClassName += `after:to-gray-400`;
                break;
            case 'light':
                gradientClassName += `after:to-gray-200 after:to-[var(--primary)]`;
                break;
        }

        // if (color && level) {
        //     gradientClassName += `to-${color}-${level}`;
        // }
    }

    console.log('gradientClassName', gradientClassName);

    return (
        <div
            className={cn('relative bg-cover bg-center bg-no-repeat', gradientClassName)}
            style={{
                width,
                height,
                backgroundImage: `url(${src})`
            }}>
            {children}
        </div>
    );
}
