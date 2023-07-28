/**
 * Render a footer with newsletter and media links.
 * @module blocks/SmartFooter/SocialConnectorFooter
 */

import React from 'react';
import { MediaIcon, twJoin } from '@uniwebcms/module-sdk';
import Container from '../../basic/Container';
import Newsletter from '../../basic/Newsletter';

const ExtraContent = ({ properties, profile }) => {
    const { section = 'social_media_links', title = '' } = properties;

    if (!section) return null;

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

    return null;
};

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
        profile,
        block,
        extra: { as = 'footer' }
    } = props;

    const markup = (
        <Container as={as} className='!py-8 pb-10 px-12 md:px-8 lx:px-12 xl:px-24 2xl:px-36'>
            <div className='block md:flex items-start justify-between space-y-6 md:space-y-0'>
                <Newsletter buttonColor='var(--highlight)' />
                <ExtraContent properties={block.getBlockProperties()} profile={profile} />
            </div>
        </Container>
    );

    return <div className={twJoin(block.theme, as === 'footer' && 'mt-32')}>{markup}</div>;
}
