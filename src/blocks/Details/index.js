import React from 'react';
import { SafeHtml } from '@uniwebcms/module-sdk';
import Container from '../../basic/Container';
import { Disclosure } from '@headlessui/react';
import { HiMinusSm, HiPlusSm } from 'react-icons/hi';

export default function (props) {
    const { block, website } = props;

    let items = block.getBlockItems();

    block.childBlocks.forEach((childBlock) => {
        items.push(...childBlock.getBlockItems());
    });

    const {
        title = website.localize({
            en: 'Frequently asked questions',
            fr: 'Questions fréquemment posées'
        })
    } = block.getBlockProperties();

    return (
        <Container className={block.theme}>
            <div className='divide-y divide-gray-900/10'>
                <h2 className='text-2xl font-bold leading-10 tracking-tight text-gray-900'>
                    {title}
                </h2>
                <dl className='mt-10 space-y-6 divide-y divide-gray-900/10'>
                    {items.map((item, index) => (
                        <Disclosure as='div' key={index} className='pt-6'>
                            {({ open }) => (
                                <>
                                    <dt>
                                        <Disclosure.Button
                                            as='div'
                                            className='flex w-full items-start justify-between text-left'>
                                            <span className='text-lg font-semibold leading-7'>
                                                {item.title}
                                            </span>
                                            <span className='ml-6 flex h-7 items-center'>
                                                {open ? (
                                                    <HiMinusSm
                                                        className='h-6 w-6'
                                                        aria-hidden='true'
                                                    />
                                                ) : (
                                                    <HiPlusSm
                                                        className='h-6 w-6'
                                                        aria-hidden='true'
                                                    />
                                                )}
                                            </span>
                                        </Disclosure.Button>
                                    </dt>
                                    <Disclosure.Panel as='dd' className='mt-2 pr-12'>
                                        <SafeHtml
                                            value={item.description}
                                            className='text-base leading-7'
                                        />
                                    </Disclosure.Panel>
                                </>
                            )}
                        </Disclosure>
                    ))}
                </dl>
            </div>
        </Container>
    );
}
