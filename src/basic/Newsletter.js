import React, { useState } from 'react';
import { website } from '@uniwebcms/module-sdk';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import MoonLoader from 'react-spinners/MoonLoader';

export default function Newsletter(props) {
    const {
        title = website.localize({
            en: 'Subscribe to my newsletter',
            fr: "S'abonner à ma lettre d'information"
        }),
        titleTextColor,
        buttonTextColor,
        buttonBgColor,
        buttonLabel = website.localize({ en: 'Subscribe', fr: "S'abonner" })
    } = props;

    const siteId = website.getSiteId();

    const [email, setEmail] = useState('');
    const [buttonIcon, setButtonIcon] = useState(null);

    const handleOnSubmit = (e) => {
        e.preventDefault();

        setButtonIcon(<MoonLoader css='display:block;margin-left:6px' size='16px'></MoonLoader>);

        setTimeout(() => {
            website.submitWebsiteForm(siteId, 'newsletter', { email }).then((res) => {
                setEmail('');

                setButtonIcon(<AiOutlineCheckCircle className='h-5 w-5 ' />);

                setTimeout(() => {
                    setButtonIcon(null);
                }, 2000);
            });
        }, 500);
    };

    return (
        <div className='space-y-2.5 md:space-y-4'>
            <h3 className='text-base font-medium' style={{ color: titleTextColor }}>
                {title}
            </h3>
            <form onSubmit={handleOnSubmit} className='flex h-9'>
                <input
                    type='email'
                    placeholder={website.localize({
                        en: 'Email address',
                        fr: 'Adresse électronique'
                    })}
                    aria-label='Email address'
                    required
                    className='min-w-0 flex-auto appearance-none rounded-md border bg-white px-3 py-2 shadow-md placeholder:text-zinc-400 ring-0 focus:outline-none focus:ring-2 focus:ring-offset-1 sm:text-sm text-gray-900'
                    style={{ '--tw-ring-color': buttonTextColor }}
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value || '');
                    }}
                />
                <button
                    type='submit'
                    className='flex-none ml-4 flex items-center justify-center h-full w-28 rounded-md hover:opacity-100 text-[15px] shadow-md'
                    style={{ backgroundColor: buttonBgColor }}>
                    <span style={{ color: buttonTextColor }}>{buttonIcon || buttonLabel}</span>
                </button>
            </form>
        </div>
    );
}
