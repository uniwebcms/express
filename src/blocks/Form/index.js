import React from 'react';
import { twJoin } from '@uniwebcms/module-sdk';
import Newsletter from '../../basic/Newsletter';

export default function Form(props) {
    const { block } = props;

    const { type = 'newsletter', title, buttonLabel } = block.getBlockProperties();

    let widget = null;

    if (type === 'newsletter') {
        widget = (
            <Newsletter
                title={title}
                buttonBgColor='var(--on_primary)'
                buttonColor='var(--primary)'
                buttonLabel={buttonLabel}
            />
        );
    }

    return (
        <div className={twJoin('py-16 sm:py-24', block.theme)}>
            <div className='max-w-sm mx-auto border border-[color:var(--primary)] rounded-xl px-8 py-6 shadow-lg bg-[var(--primary)]'>
                {widget}
            </div>
        </div>
    );
}
