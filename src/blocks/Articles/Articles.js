import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import { Image, Link, Profile } from '@uniwebcms/module-sdk';
import Container from '../../basic/Container';

export default function (props) {
    const {
        website,
        profile,
        page,
        block: { dataSource }
    } = props;

    const pageTitle = page.getPageTitle();
    const pageLeadText = page.getPageLeadText();

    const [listArticles, setListArticles] = useState([]);
    const [filter, setFilter] = useState({ search: '', year: '' });

    const categories = new Set();

    const renderFn = (article, key) => {
        const head = article.getBasicInfo();

        const { title, date, subtitle, handle } = head;

        return (
            <li key={key}>
                <Link
                    to={handle || article.getId()}
                    className='cursor-pointer overflow-hidden rounded-md flex space-x-0 lg:space-x-6 border max-w-4xl relative !shadow hover:!shadow-lg'>
                    <div className='w-44 h-44 flex-shrink-0 overflow-hidden hidden lg:block'>
                        <Image profile={article} type='banner'></Image>
                    </div>
                    <div className='flex flex-col space-y-1 pl-4 pr-8 py-5'>
                        <h2 className='font-bold text-lg lineClamp-2'>{title}</h2>
                        <p className='text-base lineClamp-2 text-gray-600'>{subtitle}</p>
                        <p className='text-sm text-gray-500'>{date}</p>
                    </div>
                </Link>
            </li>
        );
    };

    const filterFn = (articles, categories) => {
        return articles
            .filter((article) => {
                const { title, head } = article.getBasicInfo();
                const date = head.date || '';

                const yearLabel = date.split('-')[0];

                if (yearLabel) categories.add(yearLabel);

                let { search, year } = filter;

                let searchText = search.toLocaleLowerCase();
                let yearText = year.toLocaleLowerCase();

                if (searchText && !title.toLocaleLowerCase().includes(searchText)) return false;

                if (yearText && !date.toLocaleLowerCase().includes(yearText)) return false;

                return true;
            })
            .sort((a, b) => (a.getBasicInfo()?.date < b.getBasicInfo()?.date ? 1 : -1));
    };

    useEffect(() => {
        if (dataSource && dataSource.contentType === 'list' && dataSource.contentId) {
            Profile.getProfilesInList(dataSource.contentId).then((res) => {
                res = res.filter((p) => p.contentType === 'articles');
                setListArticles(res);
            });
        }
    }, [dataSource]);

    let articleMarkup = null;

    if (dataSource) {
        const filtered = filterFn(listArticles, categories);
        articleMarkup = filtered.map(renderFn);
    } else {
        try {
            const [sectionName] = profile.findRelationField('articles');
            articleMarkup = profile.renderProfileCards(sectionName, renderFn, (cards) =>
                filterFn(cards, categories)
            );
        } catch (err) {}
    }

    let Wrapper = props.Wrapper || Container;
    let wrapperClassName = props.wrapperClassName || '';

    return (
        <>
            <Wrapper className={wrapperClassName}>
                <header className='max-w-2xl'>
                    <h1 className='text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl'>
                        {pageTitle}
                    </h1>
                    <p className='mt-6 text-lg text-zinc-600 dark:text-zinc-400'>{pageLeadText}</p>
                </header>
                <div className='w-full pt-8 lg:pt-12'>
                    <div className='w-full flex mb-8 mx-auto flex-1 lg:space-x-10'>
                        <Sidebar
                            searchText={filter.search}
                            setSearchText={(val) => {
                                setFilter({
                                    ...filter,
                                    search: val
                                });
                            }}
                            categories={Array.from(categories)}
                            category={filter.year}
                            setCategory={(val) => {
                                setFilter({
                                    ...filter,
                                    year: val
                                });
                            }}
                            website={website}></Sidebar>
                        <ul className='flex flex-col space-y-4 lg:space-y-10 lg:py-5 lg:border-l lg:pl-12'>
                            {articleMarkup}
                        </ul>
                    </div>
                </div>
            </Wrapper>
        </>
    );
}
