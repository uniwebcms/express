import React from 'react';
import { twJoin, Image } from '@uniwebcms/module-sdk';

export default function LogoClouds(props) {
    const { page, block } = props;
    const { mainTitle, theme, childBlocks } = block;

    const items = block.getBlockItems();

    const title = mainTitle || items[0]?.title;
    const description = block.description || items[0]?.subtitle;

    childBlocks.forEach((childBlock) => {
        const childItems = childBlock.getBlockItems();

        items.push(...childItems);
    });

    const pageProfile = page.getPageProfile();

    return (
        <div className={twJoin(theme, 'mt-16 sm:mt-32 py-24 sm:py-32')}>
            <div className='mx-auto max-w-7xl px-6 lg:px-8'>
                <h2 className='text-center text-3xl font-bold tracking-tight'>{title}</h2>
                {description ? (
                    <h3 className='text-center text-lg font-medium tracking-tight mt-1.5'>
                        {description}
                    </h3>
                ) : null}
                <div className='mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5'>
                    {items.map((item, index) => {
                        const image = item.images[0];

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
                    {/* <img
                        className='col-span-2 max-h-12 w-full object-contain lg:col-span-1'
                        src='https://tailwindui.com/img/logos/158x48/transistor-logo-gray-900.svg'
                        alt='Transistor'
                        width={158}
                        height={48}
                    />
                    <img
                        className='col-span-2 max-h-12 w-full object-contain lg:col-span-1'
                        src='https://tailwindui.com/img/logos/158x48/reform-logo-gray-900.svg'
                        alt='Reform'
                        width={158}
                        height={48}
                    />
                    <img
                        className='col-span-2 max-h-12 w-full object-contain lg:col-span-1'
                        src='https://tailwindui.com/img/logos/158x48/tuple-logo-gray-900.svg'
                        alt='Tuple'
                        width={158}
                        height={48}
                    />
                    <img
                        className='col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1'
                        src='https://tailwindui.com/img/logos/158x48/savvycal-logo-gray-900.svg'
                        alt='SavvyCal'
                        width={158}
                        height={48}
                    />
                    <img
                        className='col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1'
                        src='https://tailwindui.com/img/logos/158x48/statamic-logo-gray-900.svg'
                        alt='Statamic'
                        width={158}
                        height={48}
                    /> */}
                </div>
            </div>
        </div>
    );
}
