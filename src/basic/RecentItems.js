/**
 * Renders the first x items in the target profile, sorted by last edit time.
 * @module RecentItems
 */

import React from 'react';
import { useLinkedProfileFilterState, Link, Image, cn, website } from '@uniwebcms/module-sdk';
import { IoLinkOutline } from 'react-icons/io5';

/**
 * @example
 * function MyComponent() {
 *    return (
 *       <RecentItems
 *           profile={profile}
 *           properties={{
 *               profileType: 'articles',
 *               section: 'member_articles',
 *               maxCount: 4,
 *               linkTo: 'articles'
 *           }}
 *       />;
 *    );
 * }
 *
 * @component
 * @param {Profile} profile - Target profile containing items.
 * @param {Object} properties - Additional properties.
 * @param {string} properties.profileType - Profile type to look for in the target profile.
 * @param {string} properties.section - Section of the profile to retrieve items from.
 * @param {number} [properties.maxCount] - Maximum number of items to render, default as 3.
 * @param {string} [properties.linkTo] - URL prefix for each item when rendering it as a link.
 * @returns {JSX.Element} - Rendered component.
 */
export default function RecentItems(props) {
    const { profile, properties } = props;

    const { profileType, section, maxCount = 3, linkTo } = properties;

    const [filter, setFilter] = useLinkedProfileFilterState(profile, profileType, section, '', {
        _sort: 'lastedit-reverse'
    });

    let { filtered = [] } = filter;

    filtered = filtered.slice(0, Number(maxCount));

    let itemLinkPrefix = '';

    if (linkTo) {
        itemLinkPrefix = website.parseLink(linkTo);
    }

    let ItemWrapper = itemLinkPrefix ? Link : 'div';

    const { label } = profile.getSectionInfo(section);

    return (
        <>
            <h3 className='text-xl mb-2.5'>{label}</h3>
            <div className='w-full divide-y space-y-6 lg:space-y-4'>
                {filtered.map((p, index) => {
                    const { title, subtitle, lastEditTime } = p.getBasicInfo();

                    const date = new Date(lastEditTime);

                    let ItemWrapperProps = itemLinkPrefix
                        ? { to: `${itemLinkPrefix}/${p.getId()}` }
                        : {};

                    return (
                        <ItemWrapper
                            {...ItemWrapperProps}
                            key={p.key}
                            className={cn(
                                'px-1.5 block group relative flex space-x-4',
                                index > 0 && 'pt-6 lg:pt-4'
                            )}>
                            <div className='w-12 h-12 flex-shrink-0'>
                                <Image profile={p} type='banner' rounded />
                            </div>
                            <div>
                                {itemLinkPrefix ? (
                                    <div
                                        className={cn(
                                            'w-5 h-5 invisible group-hover:visible absolute right-0',
                                            index > 0 && 'top-6 lg:top-4'
                                        )}>
                                        <IoLinkOutline className='w-full h-full' />
                                    </div>
                                ) : null}
                                <p className='text-sm pl-3 border-l'>
                                    {date.toLocaleDateString('en-CA', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </p>
                                <p className='font-semibold mt-1.5' title={title}>
                                    {title}
                                </p>
                                <p className='mt-0.5 text-[14px] line-clamp-1' title={subtitle}>
                                    {subtitle}
                                </p>
                            </div>
                        </ItemWrapper>
                    );
                })}
            </div>
        </>
    );
}
