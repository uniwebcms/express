import React from 'react';
import { twJoin, Image } from '@uniwebcms/module-sdk';

export default function LogoClouds(props) {
    const { page, block, website } = props;
    const { theme, childBlocks } = block;

    const items = block.getBlockItems();

    childBlocks.forEach((childBlock) => {
        const childItems = childBlock.getBlockItems();

        items.push(...childItems);
    });

    const {
        title = website.localize({
            en: 'Logos',
            fr: 'Logos'
        }),
        subtitle = ''
    } = block.getBlockProperties();

    const pageProfile = page.getPageProfile();

    return (
        <div className={twJoin(theme, 'mt-16 sm:mt-32 py-24 sm:py-32')}>
            <div className='mx-auto max-w-7xl px-6 lg:px-8'>
                <h2 className='text-center text-3xl font-bold tracking-tight'>{title}</h2>
                {subtitle ? (
                    <h3 className='text-center text-lg font-medium tracking-tight mt-1.5'>
                        {subtitle}
                    </h3>
                ) : null}
                <div className='mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5'>
                    {items.map((item, index) => {
                        const image = item.banner || item.images[0];

                        if (image) {
                            return (
                                <Image
                                    key={index}
                                    profile={pageProfile}
                                    value={image.value}
                                    alt={image.alt}
                                    className='col-span-2 max-h-12 w-full object-contain lg:col-span-1'
                                />
                            );
                        }
                        return null;
                    })}
                </div>
            </div>
        </div>
    );
}
