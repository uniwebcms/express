/**
 * Webpage language toggle widget
 * @module LanguageToggle
 */

import React from 'react';
import { website, twJoin } from '@uniwebcms/module-sdk';
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

    if (langPreference === 'bilingual') {
        let langOptions = [
            { label: website.localize({ en: 'English', fr: 'Anglais' }), value: 'en' },
            { label: website.localize({ en: 'French', fr: 'Français' }), value: 'fr' }
        ];

        const menu = langOptions.map((opt) => (
            <div
                key={opt.value}
                className={twJoin(
                    'w-full px-3 py-1.5 text-lg',
                    opt.value === currentLang
                        ? 'cursor-not-allowed text-gray-400'
                        : 'cursor-pointer hover:bg-gray-50 hover:text-blue-500'
                )}
                onClick={() => {
                    if (opt.value !== currentLang) website.changeLanguage(opt.value);
                }}>
                {opt.label}
            </div>
        ));

        return (
            <PopoverMenu
                trigger={<MdLanguage className='w-full h-full' />}
                triggerClassName='w-6 h-6 flex items-center justify-center text-gray-500 hover:text-gray-700'
                options={menu}
                width={'100px'}
                position={'top-full right-0 mt-1'}
            />
        );
    }

    return null;
}
