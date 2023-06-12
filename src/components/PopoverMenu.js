/**
 * PopoverMenu for user selections.
 * @module PopoverMenu
 */

import React, { useState, useEffect, useRef, useCallback, useMemo, Fragment } from 'react';
import { Transition, Popover } from '@headlessui/react';
import { createPopper } from '@popperjs/core';
import { createPortal } from 'react-dom';

/**
 * Example implementation to use Popper: https://popper.js.org/
 */
export function usePopper(options) {
    let reference = useRef(null);
    let popper = useRef(null);

    let cleanupCallback = useRef(() => {});

    let instantiatePopper = useCallback(() => {
        if (!reference.current) return;
        if (!popper.current) return;

        if (cleanupCallback.current) cleanupCallback.current();

        cleanupCallback.current = createPopper(reference.current, popper.current, options).destroy;
    }, [reference, popper, cleanupCallback, options]);

    return useMemo(
        () => [
            (referenceDomNode) => {
                reference.current = referenceDomNode;
                instantiatePopper();
            },
            (popperDomNode) => {
                popper.current = popperDomNode;
                instantiatePopper();
            }
        ],
        [reference, popper, instantiatePopper]
    );
}

export function Portal(props) {
    let { children } = props;
    let [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) return null;
    return createPortal(children, document.body);
}

/**
 * Render a menu with options to be selected by the user.
 *
 * @example
 * function MyComponent() {
 *   const options = [<div>Option 1</div>, <div>Option 2</div>, <div>Option 2</div>];
 *
 *    return (
 *       <PopoverMenu
 *          trigger={<div>Open Menu</div>}
 *          options={options}
 *          triggerClassName='px-2 py-1 text-blue-600 text-sm border rounded'
 *          position='top-0 left-4'
 *          width='120px'
 *          zIndex='10' />
 *    );
 * }
 *
 * @component PopoverMenu
 * @param {ReactElement} trigger - The Trigger element
 * @param {string} triggerClassName - The class name that apply to the trigger element
 * @param {CSSStyleRule} triggerStyle - The style that apply to the trigger element
 * @param {ReactElement[]} options - The option elements in the dropdown menu
 * @param {string} menuClassName - The class name that apply to the menu element
 * @param {string} width - The menu width
 * @param {number} zIndex - The zIndex value of the menu
 * @param {string} position - The position of the menu relative to the trigger
 * @returns {function} A React component.
 */
export default function PopoverMenu(props) {
    const {
        trigger,
        triggerClassName = '',
        triggerStyle = {},
        options,
        menuClassName = '',
        width = '64px',
        zIndex = '10',
        position = 'top-full right-0 mt-2.5'
    } = props;

    return (
        <Popover className='relative'>
            {({ open }) => (
                <>
                    <Popover.Button
                        className={`${
                            open ? 'text-gray-900 ring-2 ring-offset-0' : 'ring-0'
                        } ${triggerClassName}`}
                        style={triggerStyle}>
                        {trigger}
                    </Popover.Button>

                    <Transition
                        as={Fragment}
                        show={open}
                        enter='transition ease-out duration-200'
                        enterFrom='opacity-0 translate-y-1'
                        enterTo='opacity-100 translate-y-0'
                        leave='transition ease-in duration-150'
                        leaveFrom='opacity-100 translate-y-0'
                        leaveTo='opacity-0 translate-y-1'>
                        <Popover.Panel
                            static
                            className={`absolute ${position} ${menuClassName} bg-white rounded-md !shadow-xl ring-1 ring-black ring-opacity-10 divide-y divide-gray-200 overflow-hidden`}
                            style={{ width, zIndex }}>
                            {({ close }) =>
                                options.map((opt, i) => (
                                    <div
                                        key={i}
                                        onClick={() => {
                                            close();
                                        }}>
                                        {opt}
                                    </div>
                                ))
                            }
                        </Popover.Panel>
                    </Transition>
                </>
            )}
        </Popover>
    );
}
