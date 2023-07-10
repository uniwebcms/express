/**
 * Render a page with a media header and filterable profile cards.
 * @module blocks/ProfileList
 */

import React from 'react';
import Container from '../../basic/Container';
import { Link, useLinkedProfileFilterState, Image } from '@uniwebcms/module-sdk';
import Sorter from '../../basic/Sorter';
import Filter from '../../basic/Filter';

const Card = ({ profile, properties = {} }) => {
    const head = profile.getBasicInfo();
    const { title, subtitle } = head;

    const { borderless = false } = properties;

    return (
        <Link
            profile={profile}
            className={`overflow-hidden group hover:bg-gray-50 rounded-xl px-6 py-4 ${
                !borderless ? 'border' : ''
            }`}>
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

const Cards = ({ mainProfile, profileType, section, properties, renderCard }) => {
    const {
        filter: showFilter = true,
        sorting: hasSorting = true,
        card: cardProperties = {}
    } = properties;

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
                {filtered.map((profile) =>
                    renderCard ? (
                        renderCard(profile.key, profile, cardProperties)
                    ) : (
                        <Card key={profile.key} profile={profile} properties={cardProperties} />
                    )
                )}
            </ul>
        </div>
    );
};

/**
 * Render a page with a media header and filterable profile cards.
 *
 * @component ProfileList
 * @prop {Profile} profile - A data profile.
 * @prop {Block} block - The template properties for the component.
 * @prop {Page} page - The page that contains the block.
 * @prop {Website} website - The website that contains the page.
 * @returns {function} A react component.
 */
export default function (props) {
    const {
        profile,
        block,
        extra: { as = 'section', className = '', renderCard = undefined }
    } = props;

    let { inputType: profileType, input: section } = block;

    if (profileType && !section) {
        [section] = profile.findRelationField(profileType);
    }

    if (profileType && section) {
        return (
            <Container as={as} className={className}>
                <Cards
                    mainProfile={profile}
                    profileType={profileType}
                    section={section}
                    properties={block.getBlockProperties()}
                    renderCard={renderCard}
                />
            </Container>
        );
    }

    return null;
}
