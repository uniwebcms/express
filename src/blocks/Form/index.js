import React from 'react';
import { twJoin } from '@uniwebcms/module-sdk';
import Newsletter from '../../basic/Newsletter';

export default function Form(props) {
    const { block } = props;

    const { type = 'newsletter', title, buttonLabel } = block.getBlockProperties();

    let widget = null;

    if (type === 'newsletter') {
        widget = (
            <Newsletter title={title} buttonColor='var(--primary)' buttonLabel={buttonLabel} />
        );
    }

    return (
        <div
            className={twJoin(
                block.theme,
                'max-w-2xl mx-auto border rounded-xl px-8 py-6 shadow-lg'
            )}>
            {widget}
        </div>
    );
}
