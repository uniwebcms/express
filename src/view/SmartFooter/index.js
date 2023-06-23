import React, { cloneElement } from 'react';

/**
 * Renders a wrapper for child footer components.
 *
 * @component SmartFooter
 * @prop {JSX} children
 * @returns {function} A react component.
 */
export default function SmartFooter({ children }) {
    return <footer className={'mt-32'}>{cloneElement(children, { as: 'div' })}</footer>;
}
