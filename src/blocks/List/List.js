import React, { useEffect, useState } from 'react';
import { Profile, Link, Image, twJoin } from '@uniwebcms/module-sdk';
import Container from '../../basic/Container';
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

export default function (props) {
    const {
        block,
        extra: {
            as = 'section',
            className = 'grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3',
            renderCard = undefined
        }
    } = props;

    const { dataSource, theme } = block;

    const {
        title = '',
        filter: showFilter = true,
        sorting: hasSorting = true,
        card: cardProperties = {}
    } = block.getBlockProperties();

    const [profiles, setProfiles] = useState([]);
    const [filter, setFilter] = useState({ searchText: '', _sort: '' });

    useEffect(() => {
        if (dataSource && dataSource.contentType === 'list' && dataSource.contentId) {
            Profile.getProfilesInList(dataSource.contentId).then((res) => {
                setProfiles(res);
            });
        }
    }, [dataSource]);

    const filtered = dataSource.getFilteredProfiles(profiles, null, {
        searchText: filter.searchText
    });

    return (
        <Container as={as} className={twJoin('', theme)}>
            {title ? (
                <h2
                    className={twJoin(
                        'text-3xl font-bold leading-10 tracking-tight',
                        showFilter || hasSorting ? 'mb-2' : ' mb-14'
                    )}>
                    {title}
                </h2>
            ) : null}
            <div className='mt-4 sm:mt-8 space-y-8'>
                {showFilter || hasSorting ? (
                    <div className='flex justify-end'>
                        <div className='flex space-x-1 items-center'>
                            {showFilter ? (
                                <Filter filter={{ selection: filter }} setFilter={setFilter}>
                                    <Filter.Search />
                                </Filter>
                            ) : null}
                            {hasSorting ? (
                                <Sorter filter={{ selection: filter }} setFilter={setFilter} />
                            ) : null}
                        </div>
                    </div>
                ) : null}
                <ul role='list' className={className}>
                    {filtered.map((profile) =>
                        renderCard ? (
                            renderCard(profile.key, profile, cardProperties)
                        ) : (
                            <Card key={profile.key} profile={profile} properties={cardProperties} />
                        )
                    )}
                </ul>
            </div>
        </Container>
    );
}
