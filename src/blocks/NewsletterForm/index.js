import React from 'react';
import { twJoin } from '@uniwebcms/module-sdk';
import Newsletter from '../../basic/Newsletter';

export default function NewsletterForm(props) {
    const { block } = props;

    const {
        title,
        buttonLabel,
        formBgColor = 'var(--primary,#fff)',
        titleTextColor = 'var(--on_primary,#000)',
        buttonBgColor = 'var(--on_primary,#000)',
        buttonTextColor = 'var(--primary,#fff)'
    } = block.getBlockProperties();

    return (
        <div className={twJoin('py-16 sm:py-24', block.theme)}>
            <div
                className='max-w-sm mx-auto border rounded-xl px-8 py-6 shadow-lg'
                style={{ background: formBgColor }}>
                <Newsletter
                    {...{ title, titleTextColor, buttonBgColor, buttonTextColor, buttonLabel }}
                />
            </div>
        </div>
    );
}
