import React from 'react';
import { twJoin } from '@uniwebcms/module-sdk';
import { Disclosure } from '@headlessui/react';
import { HiMinusSm, HiPlusSm } from 'react-icons/hi';

const faqs = [
    {
        question: "What's the best thing about Switzerland?",
        answer: "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat."
    }
];

export default function (props) {
    const { block, page, website } = props;

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
        <div className={twJoin('mt-16 sm:mt-32', block.theme)}>
            <div className='mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40'>
                <div className='mx-auto max-w-4xl divide-y divide-gray-900/10'>
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
                                            <p className='text-base leading-7'>{item.subtitle}</p>
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    );
}
