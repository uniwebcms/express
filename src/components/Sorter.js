/**
 * Sort the profile lists.
 * @module Sorter
 */

import React from 'react';
import { BiSort } from 'react-icons/bi';
import { Popover } from '@headlessui/react';
import { usePopper, Portal } from './PopoverMenu';
import { website } from '../core';

/**
 *
 * A sorting widget to sort profiles.
 *
 * @example
 * function MyComponent() {
 *   return (
 *       <Sorter filter={filter} setFilter={setFilter} />
 *   );
 * }
 *
 * @component Sorter
 * @prop {object} filter - The filter state which return by useLinkedProfileFilterState
 * @prop {function} setFilter - The set method to update state, return by useLinkedProfileFilterState
 * @returns {function} A Sorting component.
 */
export default function Sorter(props) {
    const {
        filter: { selection },
        setFilter
    } = props;

    const { _sort, ...otherFilters } = selection;

    const [trigger, container] = usePopper({
        placement: 'bottom-end',
        modifiers: [
            { name: 'offset', options: { offset: [0, 10] } },
            {
                name: 'zIndex',
                enabled: true,
                options: {
                    zIndex: 100
                }
            }
        ]
    });

    const handleSelect = (newValue) => {
        setFilter({
            ...otherFilters,
            _sort: newValue
        });
    };

    const menu = [
        <div key={'alpha'}>
            <div className='px-2.5 py-1 sm:px-3 sm:py-1.5'>
                <p className='text-sm font-semibold text-gray-900' title={'Alphabetically'}>
                    {website.localize({ en: 'Alphabetically', fr: 'Par ordre alphabétique' })}
                </p>
            </div>
            <Popover.Button as='div'>
                <div
                    className={`px-2.5 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2 ${
                        _sort === 'title' ? 'bg-blue-200' : ''
                    } text-sm hover:bg-gray-100 text-gray-700 hover:text-gray-900 cursor-pointer`}
                    onClick={() => {
                        handleSelect(_sort === 'title' ? '' : 'title');
                    }}>
                    <span>A - Z</span>
                </div>
            </Popover.Button>
            <Popover.Button as='div'>
                <div
                    className={`px-2.5 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2 ${
                        _sort === 'title-reverse' ? 'bg-blue-200' : ''
                    } text-sm hover:bg-gray-100 text-gray-700 hover:text-gray-900 cursor-pointer`}
                    onClick={() => {
                        handleSelect(_sort === 'title-reverse' ? '' : 'title-reverse');
                    }}>
                    <span>Z - A</span>
                </div>
            </Popover.Button>
        </div>,

        <div key={'edittime'}>
            <div className='px-2.5 py-1 sm:px-3 sm:py-1.5'>
                <p className='text-sm font-semibold text-gray-900' title={'Last Edited'}>
                    {website.localize({ en: 'Last Edited', fr: 'Dernière édition' })}
                </p>
            </div>
            <Popover.Button as='div'>
                <div
                    className={`px-2.5 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2 ${
                        _sort === 'lastedit' ? 'bg-blue-200' : ''
                    } text-sm hover:bg-gray-100 text-gray-700 hover:text-gray-900 cursor-pointer`}
                    onClick={() => {
                        handleSelect(_sort === 'lastedit' ? '' : 'lastedit');
                    }}>
                    <span>{website.localize({ en: 'Newest', fr: 'Le plus récent' })}</span>
                </div>
            </Popover.Button>
            <Popover.Button as='div'>
                <div
                    className={`px-2.5 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2 ${
                        _sort === 'lastedit-reverse' ? 'bg-blue-200' : ''
                    } text-sm hover:bg-gray-100 text-gray-700 hover:text-gray-900 cursor-pointer`}
                    onClick={() => {
                        handleSelect(_sort === 'lastedit-reverse' ? '' : 'lastedit-reverse');
                    }}>
                    <span>{website.localize({ en: 'Oldest', fr: 'Le plus ancien' })}</span>
                </div>
            </Popover.Button>
        </div>
    ];

    return (
        <Popover className='relative'>
            {({ open }) => (
                <>
                    <Popover.Button as='div' ref={trigger}>
                        <div className={`h-9 w-9 p-1 hover:bg-gray-200 rounded-md`}>
                            <BiSort
                                className={`h-full w-full ${
                                    _sort ? 'text-blue-500' : 'text-gray-400'
                                }`}
                                aria-hidden='true'
                            />
                        </div>
                    </Popover.Button>
                    <Portal>
                        {open ? (
                            <div ref={container} className='z-50'>
                                <Popover.Panel
                                    static
                                    className={`bg-white rounded-md !shadow-xl ring-1 ring-black ring-opacity-10`}
                                    style={{ width: '196px' }}>
                                    {menu}
                                </Popover.Panel>
                            </div>
                        ) : null}
                    </Portal>
                </>
            )}
        </Popover>
    );
}
