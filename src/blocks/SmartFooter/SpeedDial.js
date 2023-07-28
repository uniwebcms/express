/**
 * Render a footer that can preview the content of other pages.
 * @module blocks/SmartFooter/SpeedDialFooter
 */

import React, { Fragment } from 'react';
import { Link, twJoin, Image, useLinkedProfileFilterState } from '@uniwebcms/module-sdk';
import Container from '../../basic/Container';

const RelatedItems = (props) => {
    const { profile, info, properties = {} } = props;

    const { type, section, route } = info;
    const { maxCount = 3, bannerRound = 'none', bannerShape = 'rect' } = properties;

    let linkTo, linkToPrefix;

    if (type === 'articles') {
        linkToPrefix = route;
    } else {
        linkTo = route;
    }

    const [filter, setFilter] = useLinkedProfileFilterState(profile, type, section, '', {
        _sort: 'lastedit-reverse'
    });

    let { filtered = [] } = filter;

    filtered = filtered.slice(0, Number(maxCount));

    return (
        <div className='w-full space-y-4'>
            {filtered.map((p, index) => {
                const { title } = p.getBasicInfo();

                return (
                    <Link
                        to={linkToPrefix ? `${linkToPrefix}/${p.getId()}` : linkTo}
                        key={p.key}
                        className={twJoin(
                            'block group relative flex space-x-3',
                            index > 0 && 'pt-6 lg:pt-4'
                        )}>
                        <div
                            className={twJoin(
                                bannerShape === 'sqar' ? 'w-10 h-10' : 'w-14 h-10',
                                'flex-shrink-0'
                            )}>
                            <Image profile={p} type='banner' rounded={`rounded-${bannerRound}`} />
                        </div>
                        <div>
                            <p className='font-medium text-sm line-clamp-2' title={title}>
                                {title}
                            </p>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
};

const NonRelatedItems = ({ links, maxCount = 3 }) => {
    links = links.slice(0, Number(maxCount));

    return (
        <div className='w-full space-y-4'>
            {links.map((link, index) => {
                const { label, route } = link;

                return (
                    <Link key={index} to={route} className='block'>
                        <p className='font-medium text-sm line-clamp-2' title={label}>
                            {label}
                        </p>
                    </Link>
                );
            })}
        </div>
    );
};

/**
 * Render a footer that can preview the content of other pages.
 *
 * @component SpeedDial
 * @prop {Profile} profile - A data profile.
 * @prop {Block} block - The template properties for the component.
 * @prop {Page} page - The page that contains the block.
 * @prop {Website} website - The website that contains the page.
 * @prop {Object} extra - Extra props from parent such as 'as'
 * @returns {function} A react component.
 */
export default function SpeedDial(props) {
    const {
        website,
        profile,
        block,
        extra: { as = 'footer' }
    } = props;

    const { maxCol = 4, ...properties } = block.getBlockProperties();

    const pages = website.getPageHierarchy({
        nested: true,
        filterEmpty: true
    });

    let relatedPages = [],
        nonRelatedPages = [],
        nestedPages = [];

    pages.forEach((page) => {
        const { inputs, child_items } = page;
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

        if (child_items.length) {
            nestedPages.push(...child_items);
        }
    });

    let pageCols = [];

    if (!relatedPages.length) return null;

    if (relatedPages.length === 1) {
        let links = [];

        for (const page of nestedPages) {
            links.push({ label: page.label, route: page.route });
        }
        for (const page of nonRelatedPages) {
            links.push({ label: page.label, route: page.route });
        }

        pageCols = [
            relatedPages[0],
            { title: website.localize({ en: 'Page links', fr: 'Liens de page' }), links }
        ];
    } else {
        // show all related pages
        console.log('speedDial', relatedPages);
        pageCols = relatedPages.slice(0, maxCol);
    }

    const markup = (
        <Container as={as}>
            <div className='flex [&>*:nth-child(n+2)]:hidden md:[&>*:nth-child(n+2)]:block md:[&>*:nth-child(n+4)]:hidden lg:[&>*:nth-child(n+4)]:block lg:[&>*:nth-child(n+6)]:hidden xl:[&>*:nth-child(n+6)]:block xl:[&>*:nth-child(n+8)]:hidden 2xl:[&>*:nth-child(n+8)]:block'>
                {pageCols.map((page, index) => {
                    const { title, route, inputs, links } = page;

                    const input = inputs?.[0];

                    return (
                        <Fragment key={index}>
                            <div className='relative group flex-1'>
                                {input ? (
                                    <Link
                                        to={route}
                                        className='text-sm absolute top-2 right-0 invisible group-hover:visible hover:!text-[var(--highlight)]'>
                                        {website.localize({ en: 'See all', fr: 'Voir tous' })}
                                    </Link>
                                ) : null}
                                <div>
                                    <div className='w-7 h-1 bg-[var(--highlight)] mb-1'></div>
                                    <h3 className='text-xl font-semibold'>{title}</h3>
                                </div>
                                <div className='mt-5'>
                                    {input ? (
                                        <RelatedItems
                                            {...{
                                                profile,
                                                website,
                                                info: { ...input, route },
                                                properties
                                            }}
                                        />
                                    ) : null}
                                    {links?.length ? (
                                        <NonRelatedItems links={links} {...properties} />
                                    ) : null}
                                </div>
                            </div>
                            {index < pageCols.length - 1 ? (
                                <div className='w-px bg-[var(--divider)] h-auto mx-5'></div>
                            ) : null}
                        </Fragment>
                    );
                })}
            </div>
        </Container>
    );

    return <div className={twJoin(block.theme, as === 'footer' && 'mt-32')}>{markup}</div>;
}
