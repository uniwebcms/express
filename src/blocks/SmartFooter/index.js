import React, { cloneElement } from 'react';

/**
 * Renders a wrapper for child footer components.
 *
 * @component SmartFooter
 * @prop {JSX} children
 * @returns {function} A react component.
 */
export default function SmartFooter({ block }) {
    const { childBlocks, Blocks } = block;
    return (
        <footer>
            <Blocks blocks={childBlocks} as='div'></Blocks>
        </footer>
    );
}
