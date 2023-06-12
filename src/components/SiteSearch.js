import React, { Suspense } from 'react';
import { website, getComponent } from '@uniwebcms/module-sdk';

const Search = getComponent('widgets', 'SiteSearch');

export default function (props) {
    return (
        <Suspense fallback={''}>
            <Search
                website={website}
                siteId={website.getSiteId()}
                searchFile={website.getSearchFile()}
                ga={website.getGA()}
                iconClassName={'hover:opacity-90 text-gray-500 w-5 h-5'}
                iconPosition='end'
            />
        </Suspense>
    );
}
