/**
 * Render a page block that contains profile assets as cards and control widgets
 * @module blocks/AssetList
 */

import React, { useState, cloneElement } from 'react';
import { Asset, FileLogo } from '@uniwebcms/module-sdk';
import SearchBox from '../../basic/SearchBox';
import Sorter from '../../basic/Sorter';

function Layout(props) {
    const { profile, section, searchText = '', sort, options = {} } = props;

    const {
        assetField = 'file',
        titleField = 'display_name',
        descriptionField = 'description'
    } = options;

    let value =
        profile.getFullData().filter((item) => {
            return item.name === section;
        })?.[0]?.value ?? [];

    if (searchText) {
        value = value.filter((info) => {
            const titleValue = info[titleField]?.value || '';

            return titleValue.toLowerCase().includes(searchText.toLowerCase());
        });
    }

    if (sort) {
        const sorted = [...value];
        sorted.sort((a, b) => {
            const titleValueA = a[titleField]?.value || '';
            const titleValueB = b[titleField]?.value || '';

            if (sort === 'title') {
                return titleValueA.localeCompare(titleValueB);
            } else if (sort === 'title-reverse') {
                return titleValueB.localeCompare(titleValueA);
            }
        });

        value = sorted;
    }

    const getValueRenderer = (value) => {
        const fileValue = value[assetField]?.value || '';
        const titleValue = value[titleField]?.value || '';
        const descriptionValue = value[descriptionField]?.value || '';

        return (
            <div
                className={`w-full h-full rounded-lg border border-gray-200 flex flex-col overflow-hidden group shadow-sm`}>
                <div className={`h-56`}>
                    <Asset
                        {...{
                            value: fileValue,
                            profile
                        }}
                    />
                </div>
                <div className={`flex items-center space-x-1 px-4 py-3 border-t border-gray-200`}>
                    <div className='w-8'>{<FileLogo filename={fileValue}></FileLogo>}</div>
                    <div className={`flex flex-col space-y-0.5 max-w-[calc(100%-40px)]`}>
                        <p className='text-[15px] text-gray-900'>{titleValue}</p>
                        {descriptionValue ? (
                            <p
                                className='text-sm text-gray-500 line-clamp-1'
                                title={descriptionValue}>
                                {descriptionValue}
                            </p>
                        ) : null}
                    </div>
                </div>
            </div>
        );
    };

    const markup = value.map((itemValue, index) => (
        <React.Fragment key={index}>{getValueRenderer(itemValue, index)}</React.Fragment>
    ));

    return markup;
}

AssetList.Search = ({ searchText, setSearchText, ...other }) => {
    const handleSearch = (newVal) => {
        setSearchText(newVal || '');
    };

    return <SearchBox searchText={searchText} handleSearch={handleSearch} {...other} />;
};

AssetList.Sort = ({ sort, setSort }) => {
    const handleSort = ({ _sort: newVal }) => {
        setSort(newVal || '');
    };

    return (
        <Sorter
            filter={{ selection: { _sort: sort } }}
            setFilter={handleSort}
            menuCategories={{ edittime: false }}
        />
    );
};

/**
 * Render a wrapper for the cards and controls
 *
 * @component AssetList
 * @prop {Profile} profile - A data profile.
 * @prop {string} section - The name of the section which contains the assets.
 * @prop {ReactNode} children - The child components to render. You can choose from [AssetList.Sort, AssetList.Search], or provide a custom React element.
 * @prop {string} className - The className for the wrapper component.
 * @prop {string} listWrapperClassName - The className for the wrapper component of the list of cards.
 * @prop {string} controlWrapperClassName - The className for the wrapper component of the controls.
 * @prop {object} options - Options for the list of cards, including the field name in the section representing the asset file, asset title, and asset description to be displayed.
 * @returns {function} A react component.
 */
export default function AssetList({
    profile,
    block,
    className = '',
    listWrapperClassName = 'grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 mt-20 gap-20',
    controlWrapperClassName = 'flex justify-end items-center space-x-2',
    children,
    options
}) {
    const [searchText, setSearchText] = useState('');
    const [sort, setSort] = useState('');

    if (children && !Array.isArray(children)) children = [children];

    let section, field;

    try {
        [section, field] = profile.findRelationField(block.inputType);
    } catch (err) {}

    if (!section) return null;

    const childProps = {
        searchText,
        setSearchText,
        sort,
        setSort
    };

    return (
        <div className={className}>
            {children ? (
                <div className={controlWrapperClassName}>
                    {children.map((child, index) =>
                        cloneElement(child, { key: index, ...childProps })
                    )}
                </div>
            ) : null}

            <div className={listWrapperClassName}>
                <Layout
                    {...{
                        profile,
                        section,
                        options,
                        className: listWrapperClassName,
                        searchText,
                        sort
                    }}
                />
            </div>
        </div>
    );
}
