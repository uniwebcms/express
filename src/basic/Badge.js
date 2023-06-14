/**
 * Create a Badge component.
 * @module Badge
 */

import React from 'react';

/**
 * Show a simple badge with a label.
 *
 * @example
 * function MyComponent() {
 *   return (
 *       <Badge color="green" className="hover:text-red-200">
 *			{label}
 *		 </Badge>
 *   );
 * }
 *
 * @component Badge
 * @prop {string} color - The primary color of the badge.
 * @prop {string} className - Additional tailwind class names.
 * @prop {ReactNode|ReactNodeArray} children - The contents for the Badge container.
 * @returns {function} A react component.
 */
export default function Badge({ children, color = 'green', className = '' }) {
    return (
        <span
            className={`inline-flex max-w-full items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${color}-200 text-${color}-800 ${className}`}>
            {children}
        </span>
    );
}
