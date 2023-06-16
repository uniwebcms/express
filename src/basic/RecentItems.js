import React from 'react';
import { useLinkedProfileFilterState, Link, Image } from '@uniwebcms/module-sdk';
import { IoLinkOutline } from 'react-icons/io5';

export default function RecentItems(props) {
    const { profile, website, properties } = props;

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

    return (
        <div className='w-full divide-y space-y-6 lg:space-y-4'>
            {filtered.map((p, index) => {
                const { title, subtitle, banner, lastEditTime } = p.getBasicInfo();

                const date = new Date(lastEditTime);

                let ItemWrapperProps = itemLinkPrefix
                    ? { to: `${itemLinkPrefix}/${p.getId()}` }
                    : {};

                return (
                    <ItemWrapper
                        {...ItemWrapperProps}
                        key={p.key}
                        className={`${
                            index > 0 ? 'pt-6 lg:pt-4' : ''
                        } px-1.5 block group relative flex space-x-4`}>
                        <div className='w-12 h-12'>
                            <Image profile={p} type='banner' />
                        </div>
                        <div>
                            {itemLinkPrefix ? (
                                <div
                                    className={`w-5 h-5 invisible group-hover:visible absolute right-0 ${
                                        index > 0 ? 'top-6 lg:top-4' : ''
                                    }`}>
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
    );
}
