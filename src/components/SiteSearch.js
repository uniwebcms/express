/**
 * Enable website search across all pages.
 * @module SiteSearch
 */

import React, { Suspense } from 'react';
import { website, getComponent } from '../core';

const Search = getComponent('widgets', 'SiteSearch');

/**
 * Create a SiteSearch widget.
 *
 * @example
 * function MyComponent() {
 *    return (
 *       <SiteSearch />
 *    );
 * }
 *
 * @component SiteSearch
 * @returns {function} A Search component.
 */
export default function (props) {
    return (
        <Suspense fallback={''}>
            <Search
                website={website}
                iconClassName={'hover:opacity-90 text-gray-500 w-5 h-5'}
                iconPosition='end'
            />
        </Suspense>
    );
}
