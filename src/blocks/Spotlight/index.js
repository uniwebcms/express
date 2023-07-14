import React from 'react';
import Container from '../../basic/Container';
import { twJoin, Image, Link, twMerge, SafeHtml } from '@uniwebcms/module-sdk';

export default function SpotLight(props) {
    const { block, page } = props;

    const theme = block.theme;
    const pageProfile = page.getPageProfile();

    let items = block.getBlockItems();

    const childBlocks = block.childBlocks;

    if (childBlocks.length) {
        childBlocks.forEach((childBlock) => {
            const childItems = childBlock.getBlockItems();

            items.push(...childItems);
        });
    }

    return (
        <Container className={theme}>
            <div className='space-y-16'>
                {items.map((items, index) => {
                    const { title, subtitle, description, images, links } = items;

                    const image = images[0];

                    return (
                        <div
                            key={index}
                            className='flex flex-col-reverse lg:grid lg:grid-cols-12 lg:items-center lg:gap-x-8'>
                            <div
                                className={twJoin(
                                    index % 2 === 0
                                        ? 'lg:col-start-1'
                                        : 'lg:col-start-7 xl:col-start-8',
                                    'mt-6 lg:col-span-6 lg:row-start-1 lg:mt-0 xl:col-span-5'
                                )}>
                                <h2 className='text-xl xl:text-2xl font-semibold'>{title}</h2>
                                <h3 className='text-lg mt-0 xl:mt-0.5 xl:text-xl font-medium'>
                                    {subtitle}
                                </h3>
                                <SafeHtml
                                    as='p'
                                    value={description}
                                    className='mt-1.5 xl:mt-2.5 text-base xl:text-lg'
                                />
                                {links.length ? (
                                    <div className='mt-4 flex flex-wrap items-center'>
                                        {links.map((link, index) => (
                                            <Link
                                                key={index}
                                                to={link.href}
                                                className={twMerge(
                                                    'border rounded-xl bg-[var(--link-bg)] hover:bg-[var(--link-bg-hover)] px-4 py-1.5 text-sm font-semibold',
                                                    index === 0 ? 'mr-2' : 'mx-2'
                                                )}>
                                                {link.label}
                                            </Link>
                                        ))}
                                    </div>
                                ) : null}
                            </div>
                            <div
                                className={twJoin(
                                    index % 2 === 0
                                        ? 'lg:col-start-8 xl:col-start-7'
                                        : 'lg:col-start-1',
                                    'flex-auto lg:col-span-5 lg:row-start-1 xl:col-span-6'
                                )}>
                                <div className='aspect-h-2 aspect-w-5 overflow-hidden rounded-lg bg-gray-100'>
                                    {image ? (
                                        <Image
                                            profile={pageProfile}
                                            value={image.value}
                                            alt={image.alt}
                                            className='object-center'
                                        />
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </Container>
    );
}
