/**
 * Elements Container.
 * @module Container
 */
import React from 'react';
import { website, twMerge, Image } from '@uniwebcms/module-sdk';

/**
 * Define a wrapper that centers child elements with responsive max-width
 *
 * @example
 * function MyComponent() {
 *   return (
 *       <Container className="mt-20">
 *			{children}
 *		 </Container>
 *   );
 * }
 *
 * @component Container
 * @prop {string|React.Component} as - The HTML element type or React component to use as the container.
 * @prop {string} className - Additional tailwind class names.
 * @prop {ReactNode|ReactNodeArray} children - The contents for the Badge container.
 * @returns {function} A react component.
 */
export default function ({
    as: Component = 'section',
    children,
    className = '',
    background = null,
    ...rest
}) {
    const page = website.activePage;

    return (
        <Component className={twMerge('py-24 sm:py-32 relative', className)} {...rest}>
            {typeof Component === 'string' ? (
                <div className='mx-auto px-4 sm:px-6 md:max-w-4xl md:px-4 lg:max-w-7xl xl:max-w-8xl 2xl:max-w-9xl lg:px-12 z-10'>
                    {children}
                </div>
            ) : (
                <div className='z-10'>{children}</div>
            )}
            {background && page ? (
                <div className='absolute top-0 left-0 w-full h-full'>
                    <Image
                        profile={page.getPageProfile()}
                        value={background.value}
                        alt={background.alt}
                    />
                </div>
            ) : null}
        </Component>
    );
}
