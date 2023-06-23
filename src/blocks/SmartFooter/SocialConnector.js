/**
 * Render a footer with newsletter and media links.
 * @module blocks/SmartFooter/SocialConnectorFooter
 */

import React, { useState } from 'react';
import { MediaIcon, cn } from '@uniwebcms/module-sdk';
import Container from '../../basic/Container';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import MoonLoader from 'react-spinners/MoonLoader';

const ExtraContent = ({ info, profile }) => {
    const { type, section, title } = info;

    if (type === 'mediaLinks') {
        const links = profile.getSocialMediaLinks(section);

        return (
            <div className='space-y-2.5 md:space-y-4'>
                <h3 className='text-basic font-medium'>{title}</h3>
                <div className='flex items-center space-x-4'>
                    {links.map((link, index) => {
                        const { type, url, name, label } = link;

                        return (
                            <a key={index} href={url} target='_blank' title={label || name}>
                                <MediaIcon type={type} size='6' />
                            </a>
                        );
                    })}
                </div>
            </div>
        );
    }

    return null;
};

function Newsletter({ website }) {
    const [email, setEmail] = useState('');

    const siteId = website.getSiteId();

    const [buttonIcon, setButtonIcon] = useState(null);

    const handleOnSubmit = (e) => {
        e.preventDefault();

        setButtonIcon(<MoonLoader css='display:block;margin-left:6px' size='16px'></MoonLoader>);

        setTimeout(() => {
            website.submitWebsiteForm(siteId, 'newsletter', { email }).then((res) => {
                setEmail('');

                setButtonIcon(<AiOutlineCheckCircle className='h-5 w-5 ' />);

                setTimeout(() => {
                    setButtonIcon(null);
                }, 2000);
            });
        }, 500);
    };

    return (
        <form onSubmit={handleOnSubmit} className='flex h-9'>
            <input
                type='email'
                placeholder={website.localize({
                    en: 'Email address',
                    fr: 'Adresse électronique'
                })}
                aria-label='Email address'
                required
                className='min-w-0 flex-auto appearance-none rounded-md border bg-white px-3 py-2 shadow-md placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[var(--highlight)] sm:text-sm text-gray-900'
                value={email}
                onChange={(e) => {
                    setEmail(e.target.value || '');
                }}
            />
            <button
                type='submit'
                className='flex-none ml-4 flex items-center justify-center h-full w-28 rounded-md bg-[var(--highlight)] hover:bg-[var(--highlight-hover)] text-[15px]'>
                <span>{buttonIcon || website.localize({ en: 'Subscribe', fr: "S'abonner" })}</span>
            </button>
        </form>
    );
}

/**
 * Render a footer with newsletter and media links
 *
 * @component SocialConnector
 * @prop {Profile} profile - A data profile.
 * @prop {Block} block - The template properties for the component.
 * @prop {Page} page - The page that contains the block.
 * @prop {Website} website - The website that contains the page.
 * @prop {Object} extra - Extra props from parent such as 'as'
 * @returns {function} A react component.
 */
export default function SocialConnector(props) {
    const {
        website,
        profile,
        block: { params, theme },
        extra: { as = 'footer' }
    } = props;

    const { extraContent } = params;

    const markup = (
        <Container as={as} className='!py-8 !pb-10 !px-12 md:!px-8 lx:!px-12 xl:!px-24 2xl:!px-36'>
            <div className='block md:flex items-start justify-between space-y-6 md:space-y-0'>
                <div className='space-y-2.5 md:space-y-4'>
                    <h3 className='text-base font-medium'>Subscribe to my newsletter</h3>
                    <Newsletter website={website} />
                </div>
                {extraContent ? (
                    <ExtraContent info={extraContent} profile={profile} website={website} />
                ) : null}
            </div>
        </Container>
    );

    return <div className={cn(theme, as === 'footer' && 'mt-32')}>{markup}</div>;
}
