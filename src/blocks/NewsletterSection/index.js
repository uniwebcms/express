/**
 * @module block/NewsletterSection
 */

import React from 'react';
import { twJoin } from '@uniwebcms/module-sdk';
import Newsletter from '../../basic/Newsletter';

/**
 * @deprecated This component is no longer recommended for use. Use Form instead.
 */
export default function (props) {
    const { block } = props;

    const { title } = props.block.getBlockHeader();

    return (
        <div
            className={twJoin(
                block.theme,
                'max-w-2xl mx-auto border rounded-xl px-8 py-6 shadow-lg'
            )}>
            <Newsletter title={title} buttonColor='var(--primary)' />
        </div>
    );
}
