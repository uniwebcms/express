import * as React from 'react';
import SearchBox from '../../basic/SearchBox';

export default function (props) {
    const {
        mode = 'static',
        sticky = false,
        searchText,
        setSearchText,
        categories,
        category,
        setCategory,
        website
    } = props;

    const placeholder = {
        en: 'Search by title',
        fr: 'Recherche par titre'
    };

    const categoryLabel = {
        en: 'Published Date',
        fr: 'Date de publication'
    };

    const scrollbar = {
        '&::WebkitScrollbar': {
            display: 'none'
        },
        scrollbarWidth: 'none',
        msOverflowStyle: 'none'
    };

    const initStyle = sticky
        ? 'md:sticky md:top-0 h-full'
        : mode === 'static'
        ? 'h-full md:sticky md:top-3 md:self-start md:h-auto'
        : 'h-full';

    return (
        <div
            className={`hidden md:flex flex-shrink-0 w-60 md:w-64 lg:w-56 xl:w-60 justify-end ${initStyle}`}>
            <div
                className={`pt-5 pb-6  h-auto ${mode === 'static' ? 'static' : 'fixed'}`}
                style={{
                    width: 'inherit',
                    paddingLeft: '1px',
                    paddingRight: '1px'
                }}>
                <div className='flex flex-col' style={{ maxHeight: '100%', ...scrollbar }}>
                    <div className={`w-full mb-3 flex`}>
                        <SearchBox
                            placeholder={website.localize(placeholder)}
                            filters={{ searchText }}
                            handleSearch={setSearchText}
                            live={true}
                            style={{ width: '100%' }}></SearchBox>
                    </div>
                    <div className='w-full mb-3 flex flex-col mt-2'>
                        {categories ? (
                            <>
                                <div className='py-3.5 pl-1.5'>
                                    <h2 className='font-bold text-gray-600 uppercase'>
                                        {website.localize(categoryLabel)}
                                    </h2>
                                </div>
                                {categories
                                    .sort((a, b) => parseInt(b) - parseInt(a))
                                    .map((item) => {
                                        const isActive = category === item;
                                        return (
                                            <div
                                                key={item}
                                                tabIndex={0}
                                                className={`flex cursor-pointer mb-1 text-gray-600 pl-5 items-center h-8 hover:bg-gray-100 ${
                                                    isActive ? '!bg-blue-200' : ''
                                                }`}
                                                onClick={() => {
                                                    setCategory(isActive ? '' : item);
                                                }}>
                                                {item}
                                            </div>
                                        );
                                    })}
                            </>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
}
