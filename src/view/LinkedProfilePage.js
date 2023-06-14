/**
 * Render a page with a media header and filterable profile cards.
 * @module LinkedProfilePage
 */

import React from 'react';
import Container from '../components/Container';
import { Link, useLinkedProfileFilterState, Image } from '@uniwebcms/module-sdk';
import MediaHeader from '../components/MediaHeader';
import Sorter from '../components/Sorter';
import Filter from '../components/Filter';

const Card = ({ profile, properties = {} }) => {
    const head = profile.getBasicInfo();
    const { title, subtitle } = head;

    const { border = false, style } = properties;

    return (
        <Link
            profile={profile}
            className={`overflow-hidden group hover:bg-gray-50 rounded-xl px-6 py-4 ${
                border ? 'border' : ''
            }`}
            style={style}>
            <div className='flex justify-between'>
                <div className='w-20 h-20 rounded-full overflow-hidden'>
                    <Image profile={profile} type='banner' />
                </div>
            </div>

            <div className='text-xl font-medium text-gray-700 truncate mt-5'>{title}</div>
            {subtitle ? (
                <div className='text-lg font-normal text-gray-500 truncate mt-2'>{subtitle}</div>
            ) : null}
        </Link>
    );
};

const Cards = ({ mainProfile, profileType, section, showFilter, hasSorting, cardProperties }) => {
    const [pt, vt = 'profile'] = profileType.split('/');

    const [filter, setFilter] = useLinkedProfileFilterState(mainProfile, `${pt}/${vt}`, section);

    const { filtered } = filter;

    return (
        <div className='mt-4 sm:mt-8 space-y-14'>
            <div className='flex justify-end'>
                <div className='flex space-x-1 items-center'>
                    {showFilter ? (
                        <Filter filter={filter} setFilter={setFilter}>
                            <Filter.Search />
                            <Filter.Menu />
                        </Filter>
                    ) : null}
                    {hasSorting ? <Sorter filter={filter} setFilter={setFilter} /> : null}
                </div>
            </div>
            <ul
                role='list'
                className='grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3'>
                {filtered.map((profile) => (
                    <Card key={profile.key} profile={profile} properties={cardProperties} />
                ))}
            </ul>
        </div>
    );
};

/**
 * Render a page with a media header and filterable profile cards.
 * 
 * @component
 * @prop {Profile} profile - 
 * @prop {Block} block - 
 * @prop {Page} page - 
 * @prop {Website} website - 
 * @returns {function}
 */
export default function (props) {
    const { profile, block, page, website } = props;
    const {
        profileType,
        section,
        filter: showFilter = true,
        sorting: hasSorting = true,
        card
    } = block.getBlockProperties();

    return (
        <>
            <MediaHeader page={page} website={website} />
            <Container>
                {profileType && section ? (
                    <Cards
                        mainProfile={profile}
                        profileType={profileType}
                        section={section}
                        showFilter={showFilter}
                        hasSorting={hasSorting}
                        cardProperties={card}
                    />
                ) : null}
            </Container>
        </>
    );
}
