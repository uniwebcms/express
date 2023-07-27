import React from 'react';
import Container from '../../basic/Container';
import { Image, Link, twJoin, SafeHtml } from '@uniwebcms/module-sdk';

export default function Features(props) {
    const { block, page, website } = props;

    let items = block.getBlockItems();

    block.childBlocks.forEach((childBlock) => {
        items.push(...childBlock.getBlockItems());
    });

    const {
        title = website.localize({
            en: 'Features',
            fr: 'Caractéristiques'
        }),
        subtitle = ''
    } = block.getBlockProperties();

    const pageProfile = page.getPageProfile();

    return (
        <Container className={twJoin('py-24 sm:py-32', block.theme)}>
            <div className='mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3'>
                <div>
                    <h2 className='text-3xl font-bold leading-10 tracking-tight'>{title}</h2>
                    <h3 className='text-xl font-semibold tracking-tight sm:text-2xl'>{subtitle}</h3>
                </div>

                <dl className='col-span-2 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2'>
                    {items.map((item, index) => {
                        const { banner, images, title, description, links } = item;

                        const image = banner || images[0];
                        const link = links[0];

                        return (
                            <div key={index}>
                                <dt>
                                    {image ? (
                                        <div className='mb-4 h-12 w-12'>
                                            <Image
                                                profile={pageProfile}
                                                value={image.value}
                                                alt={image.value}
                                                rounded={'rounded-lg'}
                                            />
                                        </div>
                                    ) : null}
                                    <h3 className='text-lg font-semibold leading-7'>{title}</h3>
                                </dt>
                                <SafeHtml
                                    as='dd'
                                    value={description}
                                    className='mt-1 text-base leading-7'
                                />
                                {link ? (
                                    <dd className='mt-2.5 flex items-center space-x-2'>
                                        <Link
                                            to={link.href}
                                            className='text-base font-medium leading-7'>
                                            {link.label} <span aria-hidden='true'>→</span>
                                        </Link>
                                    </dd>
                                ) : null}
                            </div>
                        );
                    })}
                </dl>
            </div>
        </Container>
    );
}
