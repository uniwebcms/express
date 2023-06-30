import React from 'react';
import { twJoin, Image } from '@uniwebcms/module-sdk';

export default function Testimonial(props) {
    const {
        page,
        block: { main, theme },
        profile
    } = props;

    const { title: profileTitle, subtitle: profileSubtitle } = profile.getBasicInfo();

    const { title, description } = props.block.getBlockHeader();
    const pageProfile = page.getPageProfile();

    let { banner, body } = main;

    banner = banner || body?.imgs?.[0];

    let brightness = '',
        gradientVia = '';

    if (theme === 'context__light') {
        brightness = 'brightness-150';
        gradientVia = 'via-[#fff]';
    } else if (theme === 'context__dark') {
        brightness = 'brightness-75';
        gradientVia = 'via-gray-900/90';
    }

    return (
        <div className={twJoin(theme, 'mt-16 sm:mt-32 py-16 sm:py-24')}>
            <div className='relative overflow-hidden px-6 py-20 shadow-xl sm:px-10 sm:py-24 md:px-12 lg:px-20'>
                {banner ? (
                    <>
                        <Image
                            profile={pageProfile}
                            value={banner?.value}
                            alt={banner?.alt}
                            className={twJoin(
                                'absolute inset-0 h-full w-full object-cover',
                                brightness
                            )}
                        />
                        <div
                            className={twJoin(
                                'absolute inset-0 bg-gradient-to-r from-transparent to-transparent via-10% lg:via-30% opacity-25',
                                gradientVia
                            )}
                            aria-hidden='true'></div>
                    </>
                ) : null}
                <div
                    className='relative mx-auto max-w-2xl lg:mx-0 lg:flex lg:space-x-20 lg:max-w-full'
                    style={{
                        textShadow:
                            '1px 0px 1px var(--text-shadow), -1px 0px 1px var(--text-shadow), 0px 1px 1px var(--text-shadow)'
                    }}>
                    <div className='w-56 h-56 hidden lg:block'>
                        <Image profile={profile} type='avatar' className='rounded-xl' />
                    </div>
                    <div className='flex-1'>
                        <div className=''>
                            <h3 className='text-3xl font-semibold'>{title}</h3>
                        </div>
                        <figure>
                            <blockquote className='mt-6 text-lg font-medium sm:text-xl sm:leading-8'>
                                <p>{description}</p>
                            </blockquote>
                            <figcaption className='mt-6 flex items-center space-x-6 lg:block lg:space-x-0'>
                                <div className='w-16 h-16 block lg:hidden'>
                                    <Image profile={profile} type='avatar' rounded />
                                </div>
                                <div className='text-base'>
                                    <div className='font-medium'>{profileTitle}</div>
                                    <div className='mt-1'>{profileSubtitle}</div>
                                </div>
                            </figcaption>
                        </figure>
                    </div>
                </div>
            </div>
        </div>
    );
}
