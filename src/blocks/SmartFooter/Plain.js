/**
 * Render a footer with copyright and nav links.
 * @module blocks/SmartFooter/PlainFooter
 */

import React from 'react';
import { Link, twJoin } from '@uniwebcms/module-sdk';
import Container from '../../basic/Container';

/**
 * Render a plain footer with copyright and nav links
 *
 * @component Plain
 * @prop {Profile} profile - A data profile.
 * @prop {Block} block - The template properties for the component.
 * @prop {Page} page - The page that contains the block.
 * @prop {Website} website - The website that contains the page.
 * @prop {Object} extra - Extra props from parent such as 'as'
 * @returns {function} A react component.
 */
export default function Plain(props) {
    const {
        profile,
        website,
        block: { params, theme },
        extra: { as = 'footer' }
    } = props;

    const { title } = profile.getBasicInfo();

    const year = new Date().getFullYear();
    const reservedText = website.localize({
        en: 'All rights reserved.',
        fr: 'Tous droits réservés.'
    });

    const copyright = params?.copyright || `© ${year} ${title}. ${reservedText}`;

    const pages = website.getPageHierarchy({
        nested: false,
        filterEmpty: true
    });

    let relatedPages = [],
        nonRelatedPages = [];

    pages.forEach((page) => {
        const { inputs } = page;
        let related = false;

        for (let input of inputs) {
            if (input['type'] && input['section']) {
                related = true;
            }
        }

        if (related) {
            relatedPages.push(page);
        } else {
            nonRelatedPages.push(page);
        }
    });

    const markup = (
        <Container as={as} className='!pt-6 !pb-8'>
            <h3 className='text-sm'>{copyright}</h3>
            {nonRelatedPages.length ? (
                <div className='flex flex-wrap mt-5'>
                    {nonRelatedPages.map((page, index) => {
                        let { label, route } = page;

                        route = route === '/' ? '' : route;

                        return (
                            <Link key={index} className={`text-sm mr-4`} to={route}>
                                {label}
                            </Link>
                        );
                    })}
                </div>
            ) : null}
        </Container>
    );

    return <div className={twJoin(theme, as === 'footer' && 'mt-32')}>{markup}</div>;
}
