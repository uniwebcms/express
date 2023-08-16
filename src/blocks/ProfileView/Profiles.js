import React, { useState } from 'react';
import Container from '../../basic/Container';
import Sorter from '../../basic/Sorter';
import Filter from '../../basic/Filter';
import {
    useLinkedProfileFilterState,
    Profile,
    Link,
    Image,
    twJoin,
    useLoadProfileBody,
    SafeHtml
} from '@uniwebcms/module-sdk';
import { BsGridFill } from 'react-icons/bs';
import { FaListUl } from 'react-icons/fa';

const Card = ({ profile, properties = {} }) => {
    const { contentId } = profile;
    const { title, subtitle } = profile.getBasicInfo();

    const { view = 'grid' } = properties;

    let description = '';

    if (useLoadProfileBody(profile)) {
        const section = profile.findSectionByFieldName('description', true);
        if (section) {
            description = profile.at(`${section}/description`);
        }
    }

    if (view === 'grid') {
        return (
            <Link
                to={contentId}
                className={`overflow-hidden group hover:bg-gray-50 rounded-xl px-6 py-6 border`}>
                <div className='flex items-center space-x-8'>
                    <div className='w-20 h-20 rounded-full overflow-hidden flex-shrink-0'>
                        <Image profile={profile} type='banner' />
                    </div>
                    <div className='overflow-hidden space-y-5'>
                        <h3
                            className='text-xl font-medium text-gray-700 truncate group-hover:text-blue-600'
                            title={title}>
                            {title}
                        </h3>
                        {subtitle ? (
                            <div
                                className='text-lg font-normal text-gray-500 line-clamp-2'
                                title={subtitle}>
                                {subtitle}
                            </div>
                        ) : null}
                    </div>
                </div>
                {description ? (
                    <SafeHtml
                        value={description}
                        title={profile.stripTags(description)}
                        className='text-base mt-4 line-clamp-2 text-gray-600'
                    />
                ) : null}
            </Link>
        );
    } else {
        return (
            <Link
                to={contentId}
                className={`flex group hover:bg-gray-50 px-6 py-4 sm:px-8 sm:py-6 xl:px-10 xl:py-10 items-center`}>
                <div className='flex justify-between w-4/12 md:w-3/12 lg:w-2/12'>
                    <div className='lg:w-48 lg:h-28 w-32 h-20'>
                        <Image profile={profile} type='banner' rounded='rounded-md' />
                    </div>
                </div>

                <div className='w-8/12 md:w-9/12 lg:w-5/12 px-4 sm:space-y-2 space-y-1'>
                    <div
                        className='text-lg lg:text-xl font-medium text-gray-700 lg:line-clamp-2 line-clamp-1 group-hover:text-blue-600'
                        title={title}>
                        {title}
                    </div>
                    {subtitle ? (
                        <div className='text-base lg:text-lg font-normal text-gray-500 lg:line-clamp-2 line-clamp-1'>
                            {subtitle}
                        </div>
                    ) : null}
                    {description ? (
                        <SafeHtml
                            value={description}
                            title={profile.stripTags(description)}
                            className='text-sm lg:text-base line-clamp-2 text-gray-600 lg:hidden'
                        />
                    ) : null}
                </div>
                <div className='w-0 lg:w-5/12 px-0 lg:px-4'>
                    {description ? (
                        <SafeHtml
                            value={description}
                            title={profile.stripTags(description)}
                            className='text-base line-clamp-4 text-gray-600 leading-7'
                        />
                    ) : null}
                </div>
            </Link>
        );
    }
};

const Layout = ({ block, page, profile, extra, info }) => {
    const { renderCard } = extra;
    const { section, profileType } = info;

    const {
        filter: showFilter = true,
        sorting: hasSorting = true,
        properties
    } = block.getBlockProperties();

    const [filter, setFilter] = useLinkedProfileFilterState(profile, profileType, section);
    const [view, setView] = useState('list');

    const { filtered } = filter;

    const title = page.getPageTitle() || properties.title || '';

    return (
        <Container className={block.theme}>
            <h2 className='text-3xl font-bold leading-10 tracking-tight mb-2'>{title}</h2>

            <div className='mt-4 sm:mt-8 space-y-8'>
                <div className='flex justify-end items-center'>
                    <div className='flex space-x-1 items-center'>
                        {showFilter ? (
                            <Filter filter={filter} setFilter={setFilter}>
                                <Filter.Search />
                                <Filter.Menu />
                            </Filter>
                        ) : null}
                        {hasSorting ? <Sorter filter={filter} setFilter={setFilter} /> : null}
                    </div>
                    <div className='h-8 flex items-center border border-gray-300 rounded-full ml-4'>
                        <button
                            className={twJoin(
                                'h-full flex items-center transition-colors duration-300 ease-in focus:outline-none hover:text-blue-400 pl-3.5 pr-2 rounded-l-full',
                                view === 'grid' ? 'text-blue-400 bg-gray-200' : 'text-gray-400'
                            )}
                            onClick={() => setView('grid')}>
                            <BsGridFill className='w-4 h-4' />
                        </button>
                        <button
                            className={twJoin(
                                'h-full flex items-center transition-colors duration-300 ease-in focus:outline-none hover:text-blue-400 pr-3.5 pl-2 rounded-r-full',
                                view === 'list' ? 'text-blue-400 bg-gray-200' : 'text-gray-400'
                            )}
                            onClick={() => setView('list')}>
                            <FaListUl className='w-4 h-4' />
                        </button>
                    </div>
                </div>

                <ul
                    role='list'
                    className={twJoin(
                        view === 'grid'
                            ? 'grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-20'
                            : 'border rounded-3xl divide-y'
                    )}>
                    {filtered.map((profile) =>
                        renderCard ? (
                            renderCard(profile.key, profile, { view })
                        ) : (
                            <Card key={profile.key} profile={profile} properties={{ view }} />
                        )
                    )}
                </ul>
            </div>
        </Container>
    );
};

export default function Profiles(props) {
    const {
        profile,
        block: { inputType }
    } = props;

    if (!inputType) return null;

    const [section] = profile.findRelationField(inputType);
    const profileType = Profile.completeProfileType(inputType);

    if (!section) return null;

    return <Layout {...props} info={{ section, profileType }} />;
}
