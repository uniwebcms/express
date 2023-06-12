/**
 * Render the avatar, banner or other asset of a profile.
 * @module Asset
 */

import React from 'react';

/**
 * Create a image with given profile and type.
 *
 * @example
 * function MyComponent() {
 *   return (
 *       <Asset profile={profile} type="banner" size="sm" rounded className="hover:cursor-pointer">
 *			{label}
 *		 </Asset>
 *   );
 * }
 *
 * @component Asset
 * @prop {Profile} profile - The target profile.
 * @prop {string} type - One of the following: 'avatar', 'banner' or 'image'.
 * @prop {string} size - One of the following: 'xs', 'sm', 'md', 'lg'.
 * @prop {string|bool} [rounded=false] - true for 'rounded-full' or a specific class name.
 * @prop {string} value - The value of the asset when type is 'image'.
 * @prop {string} className - Additional tailwind class names.
 * @returns {function} A react component.
 */
export default function (props) {
    const { profile, type, size, rounded, value, className = '' } = props;

    const roundClassName = rounded ? (rounded === true ? 'rounded-full' : rounded) : '';

    if (type === 'banner' || type === 'avatar') {
        const { url, alt } = profile.getImageInfo(type, size);

        return (
            <img
                src={url}
                className={`w-full h-full object-cover ${roundClassName} ${className}`}
                alt={alt}
                loading='lazy'
            />
        );
    } else if (type === 'image' && value) {
        const { src, altText } = profile.getAssetInfo(value, true, alt);

        return (
            <img
                src={src}
                className={`w-full h-full object-cover ${roundClassName} ${className}`}
                alt={altText}
            />
        );
    }
}
