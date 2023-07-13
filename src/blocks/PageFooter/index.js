import React from 'react';
import Container from '../../basic/Container';
import { Link, twJoin } from '@uniwebcms/module-sdk';

export default function PageFooter(props) {
    const {
        profile,
        block: { theme, params },
        website
    } = props;

    const pages = website.getPageHierarchy({
        nested: false,
        filterEmpty: true
    });

    const { title } = profile.getBasicInfo();

    const year = new Date().getFullYear();
    const reservedText = website.localize({
        en: 'All rights reserved.',
        fr: 'Tous droits réservés.'
    });

    const copyright = params?.copyright || `© ${year} ${title}. ${reservedText}`;

    return (
        <Container as='footer' className={twJoin('!py-10', theme)}>
            <h3 className='text-sm'>{copyright}</h3>
            <div className='flex flex-wrap mt-5'>
                {pages.map((page, index) => {
                    let { label, route } = page;

                    route = route === '/' ? '' : route;

                    return (
                        <Link key={index} className={`text-sm mr-4`} to={route}>
                            {label}
                        </Link>
                    );
                })}
            </div>
        </Container>
    );
}
