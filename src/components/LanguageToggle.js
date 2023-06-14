/**
 * Webpage language toggle widget
 * @module LanguageToggle
 */

import React from 'react';
import { website } from '../core';
import PopoverMenu from './PopoverMenu';
import { MdLanguage } from 'react-icons/md';

/**
 * Create a language toggle widget for the active website
 *
 * @example
 * function MyComponent() {
 *    return (
 *       <LanguageToggle />
 *    );
 * }
 *
 * @component LanguageToggle
 * @returns {function} A language toggle component.
 */
export default function (props) {
    const currentLang = website.getLanguage();
    const langPreference = website.getLanguagePreference();

    let langOptions = [];

    if (langPreference === 'bilingual') {
        langOptions = [
            { label: website.localize({ en: 'English', fr: 'Anglais' }), value: 'en' },
            { label: website.localize({ en: 'French', fr: 'Français' }), value: 'fr' }
        ];
    } else if (langPreference === 'en') {
        langOptions = [{ label: website.localize({ en: 'English', fr: 'Anglais' }), value: 'en' }];
    } else if (langPreference === 'fr') {
        langOptions = [{ label: website.localize({ en: 'French', fr: 'Français' }), value: 'fr' }];
    }

    const menu = langOptions.map((opt) => (
        <div
            key={opt.value}
            className={`w-full px-3 py-1.5 text-lg cursor-pointer`}
            onClick={() => {
                if (opt.value !== currentLang) website.changeLanguage(opt.value);
            }}>
            <p>{opt.label}</p>
        </div>
    ));

    return (
        <PopoverMenu
            trigger={<MdLanguage className='w-full h-full' />}
            triggerClassName='w-6 h-6 flex items-center justify-center text-gray-500 hover:text-gray-700'
            options={menu}
            width={'90px'}
            position={'top-full right-0 mt-1'}
        />
    );
}
